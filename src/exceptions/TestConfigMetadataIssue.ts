export default class TestConfigMetadataIssue extends Error {
	constructor(message: string = "Lỗi do test config reflect") {
		super(`[TestConfig MetaData Issue] ${message}`, {
			cause: "TEMPLATE_INVALID_CONFIG",
		})
	}
}
