import { DigitFilter } from "@/utils/random.ts"
import bigInt from "big-integer"

const Odd: DigitFilter = (value) => {
	return value.mod(2).equals(bigInt(0))
}

const Even: DigitFilter = (value) => {
	return value.mod(2).equals(bigInt(1))
}

const Prime: DigitFilter = (n) => {
	if (n.lesserOrEquals(1)) return false
	if (n.lesserOrEquals(3)) return true
	if (n.mod(2) === bigInt(0) || n.mod(3) === bigInt(0)) return false
	for (
		let i = bigInt(5);
		bigInt(i).multiply(i).lesserOrEquals(n);
		i = i.add(bigInt(6))
	) {
		if (n.mod(i) === bigInt(0) || n.mod(i.add(2)) === bigInt(0))
			return false
	}
	return true
}

const Filter = {
	Odd,
	Even,
	Prime,
}

export default Filter
