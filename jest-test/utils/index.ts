import { BigNumber, Contract, Signer, ethers } from "ethers";

export function marshalString(str) {
  if (str.slice(0, 2) === "0x") return str;
  return "0x".concat(str);
}

export function unmarshalString(str) {
  if (str.slice(0, 2) === "0x") return str.slice(2);
  return str;
}

export function roundDown(val: BigNumber, decimals: number) {
  return ethers.utils.formatUnits(val, decimals).split(".")[0];
}
export async function execAllowance(
  contract: Contract,
  fromSigner: Signer,
  toAddress: string,
  amount: BigNumber
) {
  const allowance = await contract.allowance(fromSigner, toAddress);
  if (allowance.lt(amount)) {
    await contract.connect(fromSigner).approve(toAddress, amount);
  }
}

export function getStakedQueryData(response: any, account: string) {
  const userDatas = response.data.data.userStakeds; //[[Object]]
  const testAccountData = userDatas.filter(
    (data: any) => data.id.split("-")[0] === account.toLocaleLowerCase()
  );
  return testAccountData[0].stakedAmount;
}
