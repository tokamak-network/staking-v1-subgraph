import { Layer2 } from "@/schema";
import { LAYER2_ADDRESS, ONE_BI } from "@/constants";
import { Transactions } from "@/types";

export function handleLayer2(event: Transactions) {
  // factory update
  let layer2 = Layer2.load(LAYER2_ADDRESS);
  if (layer2 === null) layer2 = new Layer2(LAYER2_ADDRESS);
  layer2.stakingTxCount = layer2.stakingTxCount.plus(ONE_BI);
  layer2.totalStakedTON = layer2.totalStakedTON.plus(event.params.amount);

  return layer2.save();
}
