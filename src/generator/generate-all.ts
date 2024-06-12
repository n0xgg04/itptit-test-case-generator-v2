import { TestTemplateClass } from "@/interfaces"
import { TestConfig } from "@/generator/test-config.ts"
import app from "@/config"
import { readConfig } from "@/generator/read-config.ts"
import SkillIssueException from "@/exceptions/SkillIssueException.ts"
import { terminal } from "terminal-kit"
import { generateTestCase } from "@/generator/generator.ts"
import fs from "fs"
import * as path from "path"

/**
 * Khởi chạy bộ generate test case
 * @param TestCaseTemplate Template Class chứa dữ liệu file test
 * @param config Thiết lập
 * @return void
 */
export function generate(
	TestCaseTemplate: Constructor<TestTemplateClass>,
	config?: InstanceType<typeof TestConfig>,
) {
	console.clear()
	terminal.bold(`ITPTIT Test Generator ${app.version}\n`)
	const generateConfig = readConfig(TestCaseTemplate, config)
	console.log(generateConfig)

	const numberOfTests = generateConfig.maxAmount
	if (!numberOfTests) {
		throw new SkillIssueException("Số test tối đa không hợp lệ!")
	}
	const proc = ["Đang khởi tạo...", "Đang sinh..."]
	const progressBar = terminal.progressBar({
		width: 80,
		title: "Đang bắt đầu...",
		eta: true,
		percent: true,
		items: proc.length,
	})
	function next() {
		const task = proc.shift()
		progressBar.startItem(task)
		progressBar.itemDone(task)
	}

	next()
	if (!fs.existsSync(<string>config?.inputFileConfig?.path)) {
		throw new SkillIssueException("Thư mục lưu input không tồn tại")
	}

	if (!fs.existsSync(<string>config?.outputFileConfig?.path)) {
		throw new SkillIssueException("Thư mục lưu output không tồn tại")
	}

	for (let i = 0; i <= numberOfTests; i++) {
		const result = generateTestCase(TestCaseTemplate, config)
	}

	next()
	console.clear()
	terminal.green("Xong !")
}
