import { TestConfig } from "@/generator/test-config.ts"
import { plainToInstance } from "class-transformer"
import { TestTemplateClass } from "@/interfaces/test-template-class.ts"
import SkillIssueException from "@/exceptions/SkillIssueException.ts"
import TestConfigMetadataIssue from "@/exceptions/TestConfigMetadataIssue.ts"

export function readConfig(
	template: Constructor<TestTemplateClass>,
	config?: InstanceType<typeof TestConfig>,
): InstanceType<typeof TestConfig> {
	const result = plainToInstance(TestConfig, config || {}, {
		exposeDefaultValues: true,
	})
	const keys = Object.keys(result)
	keys.forEach((key) => {
		const reflectKey = Reflect.getMetadata(key, new TestConfig())
		if (reflectKey == undefined) {
			throw new TestConfigMetadataIssue()
		}
		const value =
			result[key as keyof typeof result] ||
			Reflect.getMetadata(reflectKey, template)
		if (!value) {
			throw new SkillIssueException(
				`Thiết lập bộ mẫu sinh test lỗi: ${key} không tồn tại!`,
			)
		}
		Object.defineProperty(result, key, {
			value,
		})
	})
	return result
}
