export default class NoInputPathException extends Error{
    constructor() {
        super("Chưa thiết đường dẫn tới nơi lưu input",{
            cause: "TEMPLATE_INVALID_CONFIG"
        });
    }

}
