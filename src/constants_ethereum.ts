import { Address } from '@graphprotocol/graph-ts'

export let MURALL_NFT_ADDRESS = Address.fromString(
  '0x5BB3d01F32687f92F8636799687E55cba0627704'
)
export let MURALL_L2_BRIDGED_NFT_ADDRESS = Address.fromString(
  '0x125d9e25d4ae2dcfa43d9303d3e549b8a6f2ba42'
)
export let MURALL_MONTAGE_L2_BRIDGED_NFT_ADDRESS = Address.fromString(
  '0x42ea05fb3d5cf4ef3927e370dc2beffd453195d3'
)

export function isValidEmoteAddress (address: Address): bool {
  return (
    address == MURALL_NFT_ADDRESS ||
    address == MURALL_L2_BRIDGED_NFT_ADDRESS ||
    address == MURALL_MONTAGE_L2_BRIDGED_NFT_ADDRESS
  )
}
