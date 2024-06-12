import bigInt from "big-integer"

export type DigitFilter = (digit: bigInt.BigInteger) => boolean

export function getRandomBigIntInRangeWithFilter(
	min: bigInt.BigInteger,
	max: bigInt.BigInteger,
	filter?: DigitFilter,
): string {
	let randomNumber = bigInt(0)
	const length = bigInt(max).subtract(min).add(1).toString().length
	do {
		randomNumber = bigInt.randBetween(min, max)
	} while (filter && !filter(randomNumber))
	return randomNumber.toString()
}
