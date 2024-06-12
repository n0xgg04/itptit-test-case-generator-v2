import { extractBracedContent } from "@/utils/extractor.ts"
import SkillIssueException from "@/exceptions/SkillIssueException.ts"

/**
 * Lặp lại kết quả {times} lần
 * @param times - Số lần lặp lại
 * @constructor
 *
 * @example
 * UseRepeat(5) // lặp lại 5 lần
 * UseRepeat("{b}") // lặp lại {b} lần
 */
export function UseRepeat(times: number | LabelledVariable): PropertyDecorator {
	return (target, propertyKey) => {
		const getter = Object.getOwnPropertyDescriptor(target, propertyKey)?.get
		let origin: string
		if (getter) {
			origin = getter()
		} else {
			throw new SkillIssueException(
				"Lỗi sử dụng @UseRepeat. Vui lòng đặt @UseRepeat trước 1 @ khác",
			)
		}
		if (typeof times != "number") {
			const vars = extractBracedContent(times)[0]
			times = Number(Object.getOwnPropertyDescriptor(target, vars)?.value)
		}
		for (let i = 0; i < times; i++) {
			origin += origin
		}

		Object.defineProperty(target, propertyKey, {
			...Object.getOwnPropertyDescriptors(target),
			get() {
				return origin
			},
			configurable: true,
		})
	}
}
