import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { Emoted } from "../generated/EmotableRepository/EmotableRepository"

export function createEmotedEvent(
  emoter: Address,
  collection: Address,
  tokenId: BigInt,
  emoji: string,
  on: boolean
): Emoted {
  let emotedEvent = changetype<Emoted>(newMockEvent())

  emotedEvent.parameters = new Array()

  emotedEvent.parameters.push(
    new ethereum.EventParam("emoter", ethereum.Value.fromAddress(emoter))
  )
  emotedEvent.parameters.push(
    new ethereum.EventParam(
      "collection",
      ethereum.Value.fromAddress(collection)
    )
  )
  emotedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  emotedEvent.parameters.push(
    new ethereum.EventParam("emoji", ethereum.Value.fromString(emoji))
  )
  emotedEvent.parameters.push(
    new ethereum.EventParam("on", ethereum.Value.fromBoolean(on))
  )

  return emotedEvent
}
