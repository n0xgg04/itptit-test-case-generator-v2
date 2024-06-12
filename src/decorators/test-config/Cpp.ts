import "reflect-metadata"
import { CppPath as metaKey } from "@/symbols"

/**
 * Đường dẫn tới file cpp
 * @param path Đường dẫn tới cpp
 * @constructor
 */

export function Cpp(path: string): ClassDecorator {
	return (target) => {
		Reflect.defineMetadata(metaKey, path, target)
	}
}
