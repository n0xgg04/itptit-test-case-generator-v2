import {
	DigitFilter,
	getRandomBigIntInRangeWithFilter,
} from "@/utils/random.ts"
import bigInt from "big-integer"

export const DefaultFilter: DigitFilter = (value: bigInt.BigInteger) => true

/**
 * Số nguyên ngẫu nhiên từ {min} tới {max}
 * @param min - Giới hạn dưới
 * @param max - Dưới hạn trên
 * @param filter - Bộ lọc tuỳ chỉnh
 * @constructor
 *
 * @example
 * Int(2,4) //Số ngẫu nhiên từ 2-4
 * Int(2,4, (n) => n%2==0 ) //Số ngẫu nhiên là chẵn từ 2-4
 * Int(2,4,Filter.Even) //Số ngẫu nhiên là lẻ từ 2-4
 */
export function Int(
	min: string | number,
	max: string | number,
	filter: DigitFilter = DefaultFilter,
): PropertyDecorator {
	return (target, propertyKey) => {
		const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey)

		Object.defineProperty(target, propertyKey, {
			...descriptor,
			get() {
				return bigInt(
					getRandomBigIntInRangeWithFilter(
						bigInt(min as string),
						bigInt(max as string),
						filter,
					),
				)
			},
			configurable: true,
		})
	}
}
