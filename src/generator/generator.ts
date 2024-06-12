import { TestTemplateClass } from "@/interfaces/test-template-class.ts"
import { TestConfig } from "@/generator/test-config.ts"
import { extractBracedContent } from "@/utils/extractor.ts"

/**
 * Khởi chạy bộ generate test case
 * @param TestCaseTemplate Template Class chứa dữ liệu file test
 * @param config Thiết lập
 * @return void
 */
export function generateTestCase(
	TestCaseTemplate: Constructor<TestTemplateClass>,
	config?: InstanceType<typeof TestConfig>,
): string {
	const metaKeys: (string | symbol)[] =
		Reflect.getMetadataKeys(TestCaseTemplate)
	const instant = new TestCaseTemplate()
	let result = instant.template
	const variables = extractBracedContent(instant.template)
	variables.forEach((v) => {
		if (instant[v] == undefined) return
		result = result.replaceAll(`{${v}}`, instant[v])
	})
	return result
}
