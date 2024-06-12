import "reflect-metadata"
import { inputPath as metaKey} from "@/symbols";

/**
 * Đường dẫn tới input
 * @param path Đường dẫn tới input
 * @constructor
 */

export function InputPath(path: string): ClassDecorator{
    return (target) => {
        Reflect.defineMetadata(metaKey, path, target
        )
    }
}
