import { BigDecimal, BigInt, Address } from "@graphprotocol/graph-ts";

export function toDp (value: BigDecimal, dp: u8): BigDecimal {
    return (
      value.div(
      new BigDecimal(BigInt.fromI32(1).times(BigInt.fromI32(10).pow(dp)))
    ))
  }