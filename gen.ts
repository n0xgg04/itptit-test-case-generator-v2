import { TestTemplateClass } from "@/interfaces"
import {
	ArrayInt,
	Cpp,
	TestAmount,
	Int,
	InputFileConfig,
	OutputFileConfig,
} from "@/decorators"
import { CPP } from "@/datatypes"
import { generate } from "@/generator"
import * as path from "path"

@TestAmount(20)
@Cpp("./solution.cpp")
@OutputFileConfig({
	filename: "output$.txt",
	path: path.join(process.cwd(), "output"),
	autoAddZero: false,
})
@InputFileConfig({
	filename: "input$.txt",
	path: path.join(process.cwd(), "input"),
	autoAddZero: false,
})
export default class Test extends TestTemplateClass {
	@Int(1, 5)
	n: CPP.Int

	@ArrayInt("{n}", "2", "{n}")
	array: CPP.ArrayInt

	template = `{n}\n{array}`
}

generate(Test)
