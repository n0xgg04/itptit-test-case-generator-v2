import { Mapping, Singleton } from "@/decorators"
import {
	CppPath as cppPathSymbol,
	inputFileConfig,
	outFileConfig,
	testAmount as testAmountSymbol,
} from "@/symbols"

@Singleton()
export class TestConfig {
	/**
	 * Số lượng test-case tối đa
	 * Nếu không đặt annotation TestCaseAmount, sẽ đặt số lượng test bằng tuỳ chọn này
	 */
	@Mapping(testAmountSymbol)
	maxAmount?: number = 0
	/**
	 * Đường dẫn tới file cpp để sinh output
	 * Nếu không đặt annotation Cpp, sẽ đặt đường dẫn bằng tuỳ chọn này
	 */
	@Mapping(cppPathSymbol)
	cpp?: string = ""

	/**
	 * Thiết lập nơi sinh test
	 */
	@Mapping(inputFileConfig)
	inputFileConfig?: FilenameConfig = { path: "", filename: "" }

	/**
	 * Thiết lập lưu file output
	 */
	@Mapping(outFileConfig)
	outputFileConfig?: FilenameConfig = { path: "", filename: "" }
}
