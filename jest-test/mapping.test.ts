import { ethers, Contract, Signer, BigNumber } from "ethers";
import SeigManagerABI from "../abis/SeigManager.json";
import DepositManagerABI from "../abis/DepositManager.json";
import TonABI from "../abis/TON.json";
import WtonABI from "../abis/WTON.json";
import CandidateABI from "../abis/Candidate.json";
import { padLeft } from "web3-utils";
import {
  getStakedQueryData,
  marshalString,
  roundDown,
  unmarshalString,
} from "./utils";
import axios from "axios";

//env setup
import dotenv from "dotenv";
dotenv.config({ path: "./.env.dev" });

const account = {
  from: process.env.ACCOUNT_ADDRESS,
  pk: process.env.ACCOUNT_PK,
};

//goerli
const contracts = {
  SeigManager: "0x50255c955d0F760C8512ff556453AEe6502ef47f",
  DepositManager: "0x0e1EF78939F9d3340e63A7a1077d50999CC6B64f",
  DAOCommittee: "DAOCommittee",
  TON: "0x68c1F9620aeC7F2913430aD6daC1bb16D8444F00",
  WTON: "0xe86fCf5213C785AcF9a8BFfEeDEfA9a2199f7Da6",
};

const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_RPC);
const signer = new ethers.Wallet(
  "2bdd21761a483f71054e14f5b827213567971c676928d9a1808cbfa4b7501202",
  provider
);
const SeigManager_Contract = new Contract(
  contracts.SeigManager,
  SeigManagerABI,
  provider
);
const DepositManager_Contract = new Contract(
  contracts.DepositManager,
  DepositManagerABI,
  provider
);
const TON_CONTRACT = new Contract(contracts.TON, TonABI, provider);

//test params
const candidate = "0x2e8400ec60349a18dd84de0566881379056a3085";
const query = `query {
   userStakeds {
    id
    stakedAmount
  }
}`;
const amount = "1000";

const Candidate_CONTRACT = new Contract(candidate, CandidateABI.abi, provider);

describe("staking-v1-subgraph test starting--", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  it("should have a pk", () => {
    expect(process.env.ACCOUNT_PK).toBeDefined();
  });
  it("should have a account address", () => {
    expect(process.env.ACCOUNT_ADDRESS).toBeDefined();
  });
  it("should have a rpc", () => {
    expect(process.env.GOERLI_RPC).toBeDefined();
  });

  test("**staking test**", async () => {
    // const wtonAmount = ethers.utils.parseEther("10" + "0".repeat(9));
    // const wtonAmount1 = ethers.utils.parseEther("7" + "0".repeat(9));
    // const wtonAmount2 = ethers.utils.parseEther("3" + "0".repeat(9));

    //compare balance
    //   const beforeSenderBalance = await WTON.balanceOf(
    //     deployer.address
    //   );
    //   expect(beforeSenderBalance).to.be.gte(wtonAmount);

    //staked amount compare
    const beforeStakingAmount = await SeigManager_Contract[
      "stakeOf(address,address)"
    ](candidate, account.from);
    const beforeStakingQueryResponse = await axios.post(
      "https://api.thegraph.com/subgraphs/name/cd4761/staking-v1-subgraph-goerli",
      {
        query,
      }
    );

    expect(beforeStakingQueryResponse.status).toBe(200);

    const beforeStakingQueryResponseAmount = getStakedQueryData(
      beforeStakingQueryResponse,
      account.from
    );

    console.log("beforeStakingAmount", beforeStakingAmount.toString());
    console.log(
      "beforeStakingQueryResponseAmount",
      beforeStakingQueryResponseAmount
    );

    const tonAmount = ethers.utils.parseEther(amount);

    const data = marshalString(
      [contracts.DepositManager, candidate]
        .map(unmarshalString)
        .map((str) => padLeft(str, 64))
        .join("")
    );

    await (
      await TON_CONTRACT.connect(signer).approveAndCall(
        contracts.WTON,
        tonAmount,
        data,
        { from: account.from }
      )
    ).wait();

    const afterStakingAmount = await SeigManager_Contract[
      "stakeOf(address,address)"
    ](candidate, account.from);

    //check at a contract side
    expect(roundDown(afterStakingAmount.add(ethers.constants.Two), 1)).toEqual(
      roundDown(
        beforeStakingAmount.add(
          tonAmount.mul(ethers.BigNumber.from("1000000000"))
        ),
        1
      )
    );

    const afterStakingQueryResponse = await axios.post(
      "https://api.thegraph.com/subgraphs/name/cd4761/staking-v1-subgraph-goerli",
      {
        query,
      }
    );

    expect(afterStakingQueryResponse.status).toBe(200);

    const afterStakingQueryResponseAmount = getStakedQueryData(
      afterStakingQueryResponse,
      account.from
    );

    console.log("afterStakingAmount", afterStakingAmount.toString());
    console.log(
      "afterStakingQueryResponseAmount",
      afterStakingQueryResponseAmount
    );

    const beforeConverted = ethers.utils.formatUnits(
      beforeStakingQueryResponseAmount,
      27
    );
    const afterConverted = ethers.utils.formatUnits(
      afterStakingQueryResponseAmount,
      27
    );

    expect(Number(afterConverted)).toEqual(
      Number(beforeConverted) + Number(amount)
    );

    return;
  }, 30000);

  test("**update seigniorage", async () => {
    await (await Candidate_CONTRACT.connect(signer).updateSeigniorage()).wait();
  }, 30000);

  test("**unstaking test**", async () => {
    const beforeUnstakingAmount = await SeigManager_Contract[
      "stakeOf(address,address)"
    ](candidate, account.from);
    const beforeUnstakingQueryResponse = await axios.post(
      "https://api.thegraph.com/subgraphs/name/cd4761/staking-v1-subgraph-goerli",
      {
        query,
      }
    );

    expect(beforeUnstakingQueryResponse.status).toBe(200);

    const beforeUnstakingQueryResponseAmount = getStakedQueryData(
      beforeUnstakingQueryResponse,
      account.from
    );

    console.log("beforeStakingAmount", beforeUnstakingAmount.toString());
    console.log(
      "beforeStakingQueryResponseAmount",
      beforeUnstakingQueryResponseAmount
    );

    const wtonAmount = ethers.utils.parseEther(amount + "0".repeat(9));

    await (
      await DepositManager_Contract.connect(signer)[
        "requestWithdrawal(address,uint256)"
      ](candidate, wtonAmount)
    ).wait();

    const afterStakingAmount = await SeigManager_Contract[
      "stakeOf(address,address)"
    ](candidate, account.from);

    console.log("afterStakingAmount", afterStakingAmount.toString());

    //check at a contract side
    // expect(
    //   roundDown(beforeUnstakingAmount.sub(ethers.constants.Two), 1)
    // ).toEqual(roundDown(afterStakingAmount.add(wtonAmount), 1));

    const afterStakingQueryResponse = await axios.post(
      "https://api.thegraph.com/subgraphs/name/cd4761/staking-v1-subgraph-goerli",
      {
        query,
      }
    );

    expect(afterStakingQueryResponse.status).toBe(200);

    const afterUnstakingQueryResponseAmount = getStakedQueryData(
      afterStakingQueryResponse,
      account.from
    );

    const beforeConverted = ethers.utils.formatUnits(
      beforeUnstakingQueryResponseAmount,
      27
    );
    const afterConverted = ethers.utils.formatUnits(
      afterUnstakingQueryResponseAmount,
      27
    );

    expect(Number(afterConverted)).toEqual(
      Number(beforeConverted) - Number(amount)
    );

    return;
  }, 30000);

  test("**restaking test**", async () => {
    const beforeStakedAmount = await SeigManager_Contract[
      "stakeOf(address,address)"
    ](candidate, account.from);
    const beforeQueryResponse = await axios.post(
      "https://api.thegraph.com/subgraphs/name/cd4761/staking-v1-subgraph-goerli",
      {
        query,
      }
    );

    expect(beforeQueryResponse.status).toBe(200);

    const beforeUnstakingQueryResponseAmount = getStakedQueryData(
      beforeQueryResponse,
      account.from
    );
    const beforeTONBalance = await TON_CONTRACT.balanceOf(account.from);

    console.log("beforeStakingAmount", beforeStakedAmount.toString());
    console.log(
      "beforeStakingQueryResponseAmount",
      beforeUnstakingQueryResponseAmount
    );
    console.log("beforeTONBalance", beforeTONBalance.toString());

    // it("processRequest to level19 will be fail when delay time didn't pass.", async () => {
    //   const delayCheck = await DepositManager_Contract.connect(signer)[
    //     "processRequest(address,bool)"
    //   ](candidate, true);
    //   console.log("delayCheck", delayCheck);
    // });

    //put a dealy to request
    // const globalWithdrawalDelay = await DepositManager_Contract.globalWithdrawalDelay();

    // console.log("globalWithdrawalDelay", globalWithdrawalDelay.toString());

    await (
      await DepositManager_Contract.connect(signer)[
        "processRequest(address,bool)"
      ](candidate, true)
    ).wait();

    const afterStakingAmount = await SeigManager_Contract[
      "stakeOf(address,address)"
    ](candidate, account.from);

    console.log("afterStakingAmount", afterStakingAmount.toString());

    const afterStakingQueryResponse = await axios.post(
      "https://api.thegraph.com/subgraphs/name/cd4761/staking-v1-subgraph-goerli",
      {
        query,
      }
    );

    expect(afterStakingQueryResponse.status).toBe(200);

    const afterUnstakingQueryResponseAmount = getStakedQueryData(
      afterStakingQueryResponse,
      account.from
    );

    // const beforeConverted = ethers.utils.formatUnits(
    //   beforeUnstakingQueryResponseAmount,
    //   27
    // );
    // const afterConverted = ethers.utils.formatUnits(
    //   afterUnstakingQueryResponseAmount,
    //   27
    // );

    const afterTONBalance = await TON_CONTRACT.balanceOf(account.from);

    console.log("afterTONBalance", afterTONBalance.toString());

    const beforeConverted = ethers.utils.formatUnits(beforeTONBalance, 18);
    const afterConverted = ethers.utils.formatUnits(afterTONBalance, 18);

    expect(Number(beforeConverted)).toEqual(
      Number(afterConverted) + Number(amount)
    );

    // expect(Number(afterConverted)).toEqual(
    //   Number(beforeConverted) - Number(amount)
    // );

    return;
  }, 60000);
});

// export function createNewGravatarEvent(
//   id: i32,
//   ownerAddress: string,
//   displayName: string,
//   imageUrl: string
// ): NewGravatar {
//   let newGravatarEvent = changetype<NewGravatar>(newMockEvent());
//   newGravatarEvent.parameters = new Array();
//   let idParam = new ethereum.EventParam("id", ethereum.Value.fromI32(id));
//   let addressParam = new ethereum.EventParam(
//     "ownderAddress",
//     ethereum.Value.fromAddress(Address.fromString(ownerAddress))
//   );
//   let displayNameParam = new ethereum.EventParam(
//     "displayName",
//     ethereum.Value.fromString(displayName)
//   );
//   let imageUrlParam = new ethereum.EventParam(
//     "imageUrl",
//     ethereum.Value.fromString(imageUrl)
//   );

//   newGravatarEvent.parameters.push(idParam);
//   newGravatarEvent.parameters.push(addressParam);
//   newGravatarEvent.parameters.push(displayNameParam);
//   newGravatarEvent.parameters.push(imageUrlParam);

//   return newGravatarEvent;
// }
