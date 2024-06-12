import { generate } from "@/generator"

export abstract class TestTemplateClass {
	public generate = generate
	/**
	 * Mẫu input của test case muốn generate
	 * @example
	 * Ví dụ
	 * const input = `
	 * $a $b $sum
	 * `;
	 *
	 */
	public abstract template: string
}
