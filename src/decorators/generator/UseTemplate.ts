import fs from "fs"
import SkillIssueException from "@/exceptions/SkillIssueException.ts"
/**
 * Load mẫu (template) từ file (.itptit)
 * @param path - Đường dẫn tới file template
 * @constructor
 *
 * @example
 * LoadFromFile("./bai1.itptit")
 */
export default function UseTemplate(path: string): PropertyDecorator {
	return (target, propertyKey) => {
		const isExisted = fs.existsSync(path)
		if (!isExisted) {
			throw new SkillIssueException(
				`File mẫu (${path}) không tồn tại hoặc đọc lỗi`,
			)
		}
		const template = fs.readFileSync(path, {
			encoding: "utf-8",
		})
		Object.defineProperty(target, propertyKey, {
			...Object.getOwnPropertyDescriptor(target, propertyKey),
			get() {
				return template
			},
			configurable: true,
		})
	}
}
