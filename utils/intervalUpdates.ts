import { ZERO_BD, ZERO_BI, ONE_BI } from './constants'
import { Factory, StakingDayData } from '../generated/schema';
import { ethereum } from '@graphprotocol/graph-ts'

export function updateDailyStakingData(event: ethereum.Event): StakingDayData {
  let factory = Factory.load('1')
  if (factory == null) factory = new Factory('1')
  let timestamp = event.block.timestamp.toI32()
  let dayID = timestamp / 86400
  let dayStartTimestamp = dayID * 86400
  let stakingDayData = StakingDayData.load(dayID.toString())
  if (stakingDayData === null) {
    stakingDayData = new StakingDayData(dayID.toString())
    stakingDayData.date = dayStartTimestamp
  }
  stakingDayData.totalStaked = factory.totalStaked
  stakingDayData.save()

  return stakingDayData as StakingDayData
}