import "reflect-metadata"
import { inputFileConfig as metaKey } from "@/symbols"

/**
 * Thiết lập input file
 * @param inputFileConfig - Thiết lập
 * @constructor
 */

export function InputFileConfig(
	inputFileConfig: FilenameConfig,
): ClassDecorator {
	return (target) => {
		Reflect.defineMetadata(metaKey, inputFileConfig, target)
	}
}
