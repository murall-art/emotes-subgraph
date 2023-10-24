import { Emoted as EmotedEvent } from "../generated/EmotableRepository/EmotableRepository"
import { Emoted } from "../generated/schema"

export function handleEmoted(event: EmotedEvent): void {
  let entity = new Emoted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.emoter = event.params.emoter
  entity.collection = event.params.collection
  entity.tokenId = event.params.tokenId
  entity.emoji = event.params.emoji
  entity.on = event.params.on

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
