import { BigDecimal, BigInt, Address } from "@graphprotocol/graph-ts";

export let ZERO_ADDRESS = Address.fromString("0x0000000000000000000000000000000000000000");
export let BIGINT_ZERO = BigInt.fromI32(0);
export let BIGINT_ONE = BigInt.fromI32(1);
export let BIGINT_TWO = BigInt.fromI32(2);
export let BIGDECIMAL_ZERO = new BigDecimal(BIGINT_ZERO);
export let BIGDECIMAL_ONE = new BigDecimal(BIGINT_ONE);
export let BIGDECIMAL_TWO = new BigDecimal(BIGINT_TWO);