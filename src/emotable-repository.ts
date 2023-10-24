import { BigInt } from '@graphprotocol/graph-ts'
import { Emoted as EmotedEvent } from '../generated/EmotableRepository/EmotableRepository'
import {
  EmojiCount,
  Emote,
  Emoted,
  Token,
  TokenContract
} from '../generated/schema'
import { isValidEmoteAddress } from './constants_polygon'

export function handleEmoted (event: EmotedEvent): void {
  if (!isValidEmoteAddress(event.params.collection)) {
    return
  }

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

  let emoteCountId =
    event.params.collection.toHex() +
    '_' +
    tokenId.toString() +
    '_' +
    event.params.emoji

  let emoteCount = EmojiCount.load(emoteCountId)
  if (emoteCount == null) {
    emoteCount = new EmojiCount(emoteCountId)
    emoteCount.token = token.id
    emoteCount.emoji = event.params.emoji
    emoteCount.count = BigInt.fromI32(0)
    emoteCount.save()
  }

  let emotedEvent = new Emoted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  emotedEvent.emoter = event.params.emoter
  emotedEvent.token = token.id
  emotedEvent.emoji = event.params.emoji
  emotedEvent.on = event.params.on
  emotedEvent.blockNumber = event.block.number
  emotedEvent.blockTimestamp = event.block.timestamp
  emotedEvent.transactionHash = event.transaction.hash

  emotedEvent.save()

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
    // first time emote - increment count if on
    if (event.params.on) {
      emoteCount.count = emoteCount.count.plus(BigInt.fromI32(1))
    }
  } else {
    // emote already exists - increment/decrement count if on value changed
    if (emote.on && !event.params.on) {
      emoteCount.count = emoteCount.count.minus(BigInt.fromI32(1))
    } else if (!emote.on && event.params.on) {
      emoteCount.count = emoteCount.count.plus(BigInt.fromI32(1))
    }
  }
  emote.on = event.params.on
  emote.save()
  emoteCount.save()
  token.save()
}
