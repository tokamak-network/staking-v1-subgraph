import { describe } from "matchstick-as";
import { ethers, Contract } from "ethers";
import SeigManagerABI from "../abis/SeigManager.json";

const account = {
  from: process.env.ACCOUNT_ADDRESS as string,
  pk: process.env.ACCOUNT_PK as string,
};

const SeigManager = "0x8829Cb37CbbF32404B372113F9Fc3F6cd965c474";
const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_RPC);
const singer = new ethers.Wallet(account.pk, provider);
const SeigManagerContract = new Contract(SeigManager, SeigManagerABI, singer);

describe("staking-v1-subgraph test starting--", () => {
  async function fetchAllData() {
    const wtonAmount = ethers.utils.parseEther("10" + "0".repeat(9));
    const wtonAmount1 = ethers.utils.parseEther("7" + "0".repeat(9));
    const wtonAmount2 = ethers.utils.parseEther("3" + "0".repeat(9));

    //compare balance
    //   const beforeSenderBalance = await WTON.balanceOf(
    //     deployer.address
    //   );
    //   expect(beforeSenderBalance).to.be.gte(wtonAmount);

    //staking compare
    const stakingAmount = await SeigManagerContract.stakeOf(account.from);
  }
});
