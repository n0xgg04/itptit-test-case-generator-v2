import { extractBracedContent } from "@/utils/extractor.ts"
import bigInt from "big-integer"

export function getLabelVariableValue<
	T extends Object = Object,
	P = bigInt.BigInteger,
>(obj: T, $var: LabelledVariable | number | string): P {
	if (typeof $var == "number" || !isNaN(Number($var)))
		return bigInt($var as string) as P
	const varKey = extractBracedContent($var)[0]
	const getter = Object.getOwnPropertyDescriptor(obj, varKey)?.get
	if (getter) {
		const res = bigInt(getter())
		return res as P
	}
	return bigInt(0) as P
}
