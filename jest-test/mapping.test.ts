import { ethers, Contract, Signer, BigNumber } from "ethers";
import SeigManagerABI from "../abis/SeigManager.json";
import DepositManagerABI from "../abis/DepositManager.json";
import TonABI from "../abis/TON.json";
import WtonABI from "../abis/WTON.json";
import { padLeft } from "web3-utils";
import { marshalString, roundDown, unmarshalString } from "./utils";
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

// unit tests for env file
// describe("env", () => {
//   it("should have a pk", () => {
//     expect(process.env.PK).toBeDefined();
//   });
// });

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
    const wtonAmount = ethers.utils.parseEther("10" + "0".repeat(9));
    const wtonAmount1 = ethers.utils.parseEther("7" + "0".repeat(9));
    const wtonAmount2 = ethers.utils.parseEther("3" + "0".repeat(9));

    //compare balance
    //   const beforeSenderBalance = await WTON.balanceOf(
    //     deployer.address
    //   );
    //   expect(beforeSenderBalance).to.be.gte(wtonAmount);

    //staking compare
    const beforeStakingAmount = await SeigManager_Contract[
      "stakeOf(address,address)"
    ]("0x2e8400ec60349a18dd84de0566881379056a3085", account.from);
    const beforeStakingQuery = await axios.post("http://your-graphql-api-url", {
      query,
    });
    // const beforeTonBalance = await TON_CONTRACT.balanceOf(account.from);

    // await execAllowance(
    //   new Contract(contracts.WTON, WtonABI.abi, provider),
    //   singer,
    //   contracts.DepositManager,
    //   wtonAmount2
    // );

    const tonAmount = ethers.utils.parseEther("1");

    const data = marshalString(
      [contracts.DepositManager, "0x2e8400ec60349a18dd84de0566881379056a3085"]
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
    ]("0x2e8400ec60349a18dd84de0566881379056a3085", account.from);

    console.log("afterStakingAmount", afterStakingAmount.toString());

    expect(roundDown(afterStakingAmount.add(ethers.constants.Two), 1)).toEqual(
      roundDown(
        beforeStakingAmount.add(
          tonAmount.mul(ethers.BigNumber.from("1000000000"))
        ),
        1
      )
    );
    return;
  }, 30000);
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
