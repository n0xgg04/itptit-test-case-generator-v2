import "reflect-metadata"
import { outFileConfig as metaKey } from "@/symbols"

/**
 * Thiết lập output file
 * @param outputFileConfig - Thiết lập
 * @constructor
 */

export function OutputFileConfig(
	outputFileConfig: FilenameConfig,
): ClassDecorator {
	return (target) => {
		Reflect.defineMetadata(metaKey, outputFileConfig, target)
	}
}
