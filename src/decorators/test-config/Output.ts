import "reflect-metadata"
import { outputPath as metaKey} from "@/symbols";

/**
 * Đường dẫn tới output
 * @param path Đường dẫn lưu test case
 * @constructor
 */

export function OutputPath(path: string): ClassDecorator{
    return (target) => {
        Reflect.defineMetadata(metaKey, path, target
        )
    }
}
