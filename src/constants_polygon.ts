import { Address } from '@graphprotocol/graph-ts'

export let MURALL_NFT_ADDRESS = Address.fromString(
  '0xffbce889d62f6c73f005b836255ad69b0a01b222'
)
export let MURALL_MONTAGE_NFT_ADDRESS = Address.fromString(
  '0xb200c550749c8f996376e7dbf56b368bc0967b8e'
)

export function isValidEmoteAddress (address: Address): bool {
  return address == MURALL_NFT_ADDRESS || address == MURALL_MONTAGE_NFT_ADDRESS
}
