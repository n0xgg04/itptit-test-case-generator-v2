export default class NoTestAmountException extends Error {
	constructor() {
		super("Chưa thiết lập số test-case tối đa", {
			cause: "TEMPLATE_INVALID_CONFIG",
		})
	}
}
