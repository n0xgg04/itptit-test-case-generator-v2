type Constructor<T = any> = new (...args: any[]) => T

type NumberFilter<T = number> = (value: T) => boolean

type LabelledVariable = `{${string}}`

type FilenameConfig = {
	/*
	Nơi lưu test-case sinh ra
	 */
	path: string
	/*
    Tên tệp: Ví dụ: input$.txt với $i là số thứ tự khi sinh test
     */
	filename: string
	/*
    Tự động chèn "0" vào trước số cho đủ số chữ số. Ví dụ input01.txt thay vì input1.txt
     */
	autoAddZero?: boolean
}
