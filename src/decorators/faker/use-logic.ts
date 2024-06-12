import { extractBracedContent } from "@/utils/extractor.ts"
import SkillIssueException from "@/exceptions/SkillIssueException.ts"

/**
 * Tự định nghĩa logic chạy, cần biết 1 chút kiến thức JS(TS) nhé
 * @param fn - Hàm callback bao gồm tham số truyền vào là {variables}
 * @param variables - Danh sách tham số tự động truyền vào hàm {fn}, là một mảng
 * @constructor
 *
 * @example
 * UseLogic((num: number) => number * 10, [2]) //kết quả trả về là 20
 * UseLogic((num: number) => number + 2, ['{a}'] //kết quả trả về là biến a + 2
 */
export function UseLogic(
	fn: (...args: any[]) => unknown,
	variables?: (LabelledVariable | number)[],
): PropertyDecorator {
	return (target, propertyKey) => {
		const args = variables?.map((e) => {
			if (typeof e === "number") return e
			if (!isNaN(Number(e))) {
				return Number(e)
			}
			const val = extractBracedContent(e)[0]
			const f = Object.getOwnPropertyDescriptor(target, val)?.get
			if (f) {
				const res = f()
				if (!isNaN(Number(res))) {
					return Number(res)
				}
				return res
			} else {
				throw new SkillIssueException("Lỗi khi dùng @UseLogic")
			}
		})
		const result = fn.call(null, args)
		Object.defineProperty(target, propertyKey, {
			...Object.getOwnPropertyDescriptor(target, propertyKey),
			get() {
				return result
			},
			configurable: true,
		})
	}
}
