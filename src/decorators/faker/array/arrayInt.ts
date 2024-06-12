import {
	DigitFilter,
	getRandomBigIntInRangeWithFilter,
} from "@/utils/random.ts"
import bigInt from "big-integer"
import { DefaultFilter } from "@/decorators"
import { getLabelVariableValue } from "@/utils/labelled-value.ts"
import SkillIssueException from "@/exceptions/SkillIssueException.ts"

/**
 * Tạo mảng có {amount} phần tử, các phần tử từ {min} tới {max} và thoả mãn {filter}
 * @param amount - Số lượng phần tử của mảng
 * @param min - Số bé nhất
 * @param max - Số lớn nhất
 * @param filter - Bộ lọc
 * @constructor
 *
 */
export function ArrayInt(
	amount: number | LabelledVariable | string,
	min: number | LabelledVariable | string,
	max: number | LabelledVariable | string,
	filter: DigitFilter = DefaultFilter,
): PropertyDecorator {
	return (target, propertyKey) => {
		let res = ""
		let amountParsed = getLabelVariableValue(target, amount)
		let minParsed = getLabelVariableValue(target, min)
		let maxParsed = getLabelVariableValue(target, max)
		if (typeof amountParsed != "object") {
			throw new SkillIssueException(
				"Số phần tử mảng không hợp lệ!" + typeof amountParsed,
			)
		}

		if (typeof minParsed != "object") {
			throw new SkillIssueException("Số phần tử nhỏ nhất không hợp lệ!")
		}

		if (typeof maxParsed != "object") {
			throw new SkillIssueException("Số phần tử lớn nhất không hợp lệ!")
		}

		for (let i = bigInt(1); i.lesserOrEquals(amountParsed); i = i.add(1)) {
			res += `${getRandomBigIntInRangeWithFilter(bigInt(minParsed), bigInt(maxParsed), filter).toString()} `
		}

		const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey)
		Object.defineProperty(target, propertyKey, {
			...descriptor,
			get() {
				return res
			},
			configurable: true,
		})
	}
}
