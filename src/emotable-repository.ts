import { Emoted as EmotedEvent } from '../generated/EmotableRepository/EmotableRepository'
import { Emote, Emoted, Token, TokenContract } from '../generated/schema'
import { isValidEmoteAddress } from './constants_polygon'

export function handleEmoted (event: EmotedEvent): void {
  if(!isValidEmoteAddress(event.params.collection)) {
    return
  }
  let entity = new Emoted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  let tokenContract = TokenContract.load(event.params.collection.toHex())
  if (tokenContract == null) {
    tokenContract = new TokenContract(event.params.collection.toHex())
    tokenContract.address = event.params.collection
    tokenContract.save()
  }
  let tokenId = event.params.tokenId
  let id = event.params.collection.toHex() + '_' + tokenId.toString()
  let token = Token.load(id)
  if (token == null) {
    token = new Token(id)
    token.tokenId = tokenId
    token.contract = tokenContract.id
    token.save()
  }

  entity.emoter = event.params.emoter
  entity.token = token.id
  entity.emoji = event.params.emoji
  entity.on = event.params.on

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let emoteId =
    event.params.emoter.toHex() +
    '_' +
    event.params.emoji +
    '_' +
    event.params.collection.toHex() +
    '_' +
    tokenId.toString()

  let emote = Emote.load(emoteId)
  if (emote == null) {
    emote = new Emote(emoteId)
    emote.token = token.id
    emote.emoji = event.params.emoji
    emote.emoter = event.params.emoter
  }
  emote.on = event.params.on
  emote.save()
}
