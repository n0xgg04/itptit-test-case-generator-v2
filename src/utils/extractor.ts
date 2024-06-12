export function extractBracedContent(input: string): string[] {
	const regex = /\{([^}]+)}/g
	let match: string[] | null
	const result: string[] = []
	while ((match = regex.exec(input)) !== null) {
		result.push(match[1])
	}

	return result
}
