import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { CoinageCreated } from "../generated/schema"
import { CoinageCreated as CoinageCreatedEvent } from "../generated/SeigManager/SeigManager"
import { handleCoinageCreated } from "../src/seig-manager"
import { createCoinageCreatedEvent } from "./seig-manager-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let layer2 = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let coinage = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newCoinageCreatedEvent = createCoinageCreatedEvent(layer2, coinage)
    handleCoinageCreated(newCoinageCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CoinageCreated created and stored", () => {
    assert.entityCount("CoinageCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CoinageCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "layer2",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CoinageCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "coinage",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
