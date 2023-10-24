import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { Emoted } from "../generated/schema"
import { Emoted as EmotedEvent } from "../generated/EmotableRepository/EmotableRepository"
import { handleEmoted } from "../src/emotable-repository"
import { createEmotedEvent } from "./emotable-repository-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let emoter = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let collection = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let tokenId = BigInt.fromI32(234)
    let emoji = "Example string value"
    let on = "boolean Not implemented"
    let newEmotedEvent = createEmotedEvent(
      emoter,
      collection,
      tokenId,
      emoji,
      on
    )
    handleEmoted(newEmotedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Emoted created and stored", () => {
    assert.entityCount("Emoted", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Emoted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "emoter",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Emoted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "collection",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Emoted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenId",
      "234"
    )
    assert.fieldEquals(
      "Emoted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "emoji",
      "Example string value"
    )
    assert.fieldEquals(
      "Emoted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "on",
      "boolean Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
