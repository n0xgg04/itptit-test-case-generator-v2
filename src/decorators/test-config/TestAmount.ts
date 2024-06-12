import "reflect-metadata"
import { testAmount as metaKey } from "@/symbols"

/**
 * Số lượng test case muốn generate, nếu không set, mặc định test case sẽ là 20
 * @param testAmount Số lượng test case, mặc định = 20
 * @constructor
 */

export function TestAmount(testAmount: number = 20): ClassDecorator {
	return (target) => {
		Reflect.defineMetadata(metaKey, testAmount, target)
	}
}
