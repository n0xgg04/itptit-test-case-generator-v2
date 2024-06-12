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
	const inp = generateConfig?.inputFileConfig?.path
	const out = generateConfig?.outputFileConfig?.path
	if (!fs.existsSync(<string>inp)) {
		throw new SkillIssueException(
			`Thư mục lưu input không tồn tại (${config?.inputFileConfig?.path})`,
		)
	}

	if (!fs.existsSync(<string>out)) {
		throw new SkillIssueException(
			`Thư mục lưu output không tồn tại (${config?.outputFileConfig?.path})`,
		)
	}

	for (let i = 0; i <= numberOfTests; i++) {
		const result = generateTestCase(TestCaseTemplate, config)
		let stt = generateConfig.inputFileConfig?.autoAddZero
			? fill(i.toString(), numberOfTests.toString().length)
			: i.toString()

		if (inp != null) {
			fs.writeFileSync(
				path.join(
					inp,
					generateConfig.inputFileConfig!.filename.replaceAll(
						"$",
						stt,
					),
				),
				result,
			)
		} else {
			throw new SkillIssueException("Input không hợp lệ")
		}
	}

	next()
	console.clear()
	terminal.green("Xong !")
}

function fill(name: string, size: number) {
	while (name.length != size) name = "0" + name
	return name
}
