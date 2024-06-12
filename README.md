# ITPTIT TEST GENERATOR (Stable)
#### Author: [@n0xgg04](https://facebook.com/n0xgg04)
#### Công cụ sinh test dành cho BCB ITPTIT

_Hướng dẫn này rất cụ thể, dành cho thành viên mới sử dụng, có thắc mắc hãy liên hệ qua Facebook nhé_

Ví dụ nhanh:
> Tạo 10 test-case để tính tổng 2 số nguyên

Code:
```ts
@TestAmount(3)
@InputPath("./input")
@OutputPath("./output")
@Cpp("./main.cpp")
export default class Test extends TestTemplateClass{
    @UseRepeat("{b}")
    @Int(1,10)
    a: CPP.Int

    @Int(1, 10)
    b: CPP.Int
    
    template = `
    {a} {b}
    `
}
generate(TestTemplate)
```

Kết quả các file input:
- ``input01.txt``
```
1 4
```

- ``input02.txt``
```
4 6
```

- ``input03.txt``
```
6 10
```


### I. CÀI ĐẶT
1. Cài đặt BunJS
#### **Linux**:
```bash
curl -fsSL https://bun.sh/install | bash- 
```
#### **Windows**:
```bash
powershell -c "irm bun.sh/install.ps1 | iex"
- ```

2. Tạo 1 thư mục mới, chạy lệnh ``bun init`` để tạo một project mới (Cứ ấn Enter để bỏ qua đặt tên, ...)
3. Cài đặt deps
```bash
bun add @itptit/test-generator
```
4. Tạo ``index.ts`` (nếu chưa có)
5. Bổ sung đoạn code sau và ``package.json`` ở sau đoạn ``type: "module",``, sau dấu ``,``
```
  "scripts": {
    "start": "bun run index.ts"
  }, 
```

### II. Sử dụng
##### Khung chương trình
_Thiếu gì thì tự import nhé_

Ví dụ: 
```ts
@TestAmount(20)
@InputFileConfig({
    filename: "input$.txt",
    path: "./input",
    autoAddZero: false,
})
@OutputFileConfig({
    filename: "output$.txt",
    path: ".output",
    autoAddZero: false,
})
@Cpp("./solution.cpp")
export default class Test extends TestTemplateClass{
    @UseRepeat(2)
    @Int(1,10)
    a: CPP.Int

    @Int(1, 10)
    b: CPP.Int

    @ArrayInt()
    c: CPP.ArrayInt


    @UseRepeat("{b}")
    @UseLogic((num) => num + 2, [2])
    d: CPP.Auto

    template = `
    {a} {b} {c} {d}
    `
}
generate(TestTemplate)
```

> ``Annotation`` (``@``) dùng để định nghĩa/ghi chú thêm cho đối tượng, thuộc tính,etc...

Các câu lệnh bên dưới dùng để khai báo một số cấu hình cho việc sinh test, các ``annotation`` này **đặt trước khi khai báo class**
```ts
@TestAmount(20)
@InputFileConfig({
    filename: "input$.txt",
    path: "./input",
    autoAddZero: false,
})
@OutputFileConfig({
    filename: "output$.txt",
    path: "./output",
    autoAddZero: false,
})
@Cpp("./solution.cpp")
```
<h3 id="cn">Config Annotation</h3>

| Annotation              | Mục đích sử dụng                                                                                               | Bắt buộc(*) |
|-------------------------|----------------------------------------------------------------------------------------------------------------|-------------|
| ``@TestAmount(number)`` | Khai báo số test-case tối đa muốn tạo ra                                                                       | **Có**      |       |
| ``@Cpp(string)``        | Nơi chứa file ``.cpp`` hoặc ``.c`` sử dụng để sinh test, nên sử dụng ``.cpp`` thay cho ``.c`` để tránh lỗi nhé | **Có**      |

Thiết lập file sinh
```ts
@InputFileConfig({
    filename: "input$.txt", //tên file dạng input<số thứ tự>.txt
    path: "./input", //lưu file vào ./input
    autoAddZero: false, //không chèn thêm 0 vào đầu số
})
```

tương tự với `@OutputFileConfig`

Đoạn lệnh dưới đây để tạo 1 mẫu test-case (``Test Case Template``), có thể thay ``Test`` bằng tên tuỳ ý
```ts
export default class Test extends TestTemplateClass{
    //...
}
```
Các thuộc tính nằm trong ``class`` này do bạn tự định nghĩa, sử dụng sao cho hợp lý với ý tưởng tạo test-case của bạn.

Ví dụ, mình cần tạo input test có chứa 2 số nguyên từ 1 tới 20

```ts
@Int(1, 20) 
a //Đặt tên biến bất kỳ
```

hoặc

```ts
@Int(1, 20) 
a: CPP.Int //Đặt thêm kiểu dữ liệu (không bắt buộc)
```

Lát nữa ta sẽ sử dụng biến ``a`` để sinh test

Ở đây, biến ``a`` sử dụng ``@Int()`` để định nghĩa ``a`` là số nguyên ngẫu nhiên.

**Quan trọng**

#### Định nghĩa mẫu file ``input``:
**Cách 1**: Khai báo trực tiếp trong class
```ts
template=`
{a} {b}
`
```
Ví dụ trên, in ra file input 2 biến ``a``, ``b`` định nghĩa ở trên
> Lưu ý: Nếu sử dụng VSCode hoặc các editor/compiler hầu như sẽ tự động thêm ``Tab`` ở đầu nên sẽ khiến ``input`` bị cách ra một đoán, nhớ hãy xoá nó đi.
> 
**Cách 2**: Sử dụng ``@UseTemplate(string)``
```ts
@UseTemplate("template.itptit")
template: string //khai báo kiểu string hoặc không cũng được :>
```

Nội dung file ``template.itptit``
```
{a} {b}
```
> Cách này sẽ không gặp phải lỗi ``Tab`` như cách 1, khuyến khích dùng cách này

### Rules
> Các biến ``labelled``, ví dụ ``{a}``, ``{b}`` sẽ trỏ tới biến ngẫu nhiên có giá trị thực. Vì vậy, giả dụ biến ``{b}`` sử dụng biến `{a}` trong ``@annotation``, thì `a` phải được khai báo trước.
Ví dụ:

#### 👏 Hợp lệ:
```ts
@Int(1, 10)
a

@ArrayInt("{a}", 1, 20) //tạo mảng b gồm a phần tử từ 1 tới 20
b
```

#### 😾 Không hợp lệ:
```ts
@ArrayInt("{b}", 1, 20) //b chưa khởi tạp
a

@Int(1, 20)
b
```
Nếu cố tình làm sai, kết quả sẽ không đúng mong đợi, hoặc `throw` lỗi `SkillIssueException`
> Cách ``@annotation`` mang tính bao quát, thực thi như ``@UseRepeat()``, ``@UseLogic()`` (nói chung là mấy hàm có `Use` ở đầu) cần đặt lên trước các `@annotation` liên quan tới định nghĩa dữ liệu ngẫu nhiên (`@Int`, `@ArrayInt`)

Ví dụ:

#### 👏 Hợp lệ:

```ts
@UseRepeat(5)
@ArrayInt(2, 1, 20) //Lặp lại mảng 2 phần từ 1-20 5 lần
b

// b: 1 5 2 5 2 10 4 20 2 12
```

#### 😾 Không hợp lệ:
```ts
@ArrayInt(2, 1, 20) 
@UseRepeat(5)
b
```

### Danh sách Annotation 
#### Sinh dữ liệu

Có dấu `?` ở trước kiểu dữ liệu tức là `optional`, còn không là **bắt buộc** nhé

| Annotation                                                           | Mục đích sử dụng                         | Ví dụ                   |
|----------------------------------------------------------------------|------------------------------------------|-------------------------|
| ``@Int(min: number, max: number, filter?: Fn)``                      | Khai báo số test-case tối đa muốn tạo ra | `@Int(2, 2, 10)`        |
| ``@ArrayInt(amount: number, min: number, max: number, filter?: Fn)`` | Nơi lưu các test-case đầu vào            | `@ArrayInt(2,2, 2, 10)` |

``filter`` là 1 `callback function` có thể bỏ trống, dùng để định nghĩa lại các số phù hợp 
- Ví dụ: 
> Cần số chẵn từ 1-20

```ts
@Int(1,20,(num) => +num%2==0 )
```
_Dùng dấu `+` vào trước `num` để hiểu num là số chứ không phải chữ nhé, không là `1+1=11` đấy :))_

Một số `filter` có sẵn:


| Filter           | Mục đích sử dụng   |
|------------------|--------------------|
| ``Filter.Odd``   | Lọc số chẵn        | 
| ``Filter.Even``  | Lọc số lẻ          | 
| ``Filter.Prime`` | Lọc số nguyên tố |

Cứ ghi vào rồi nó gợi ý import thôi -)


#### Điều khiển, logic, custom

| Annotation                                                       | Mục đích sử dụng                 |
|------------------------------------------------------------------|----------------------------------|
| ``@UseRepeat(times: number \| LabelledVariable)``                | Lặp lại việc in biến {times} lần | 
| ``@UseLogic(logicFn: Fn, args: (string \| LabelledVariable)[])`` | Tự định nghĩa cách sinh dữ liệu  | 

#### Chú ý: 
`LabelledVariable` là biến dạng `{a}`, `{c}`
- Ví dụ sử dụng `@UseRepeat`:
```ts
@UseRepeat(10)
@Int(1,10)
a
//a: 2222222222
```

- Ví dụ sử dụng `@UseLogic`:
```ts
@Int(1,5)
a
//a: 3

@Int(1,10)
b
//b: 5

function myLogic(a, b, c){
    return a + b + c
}

@UseLogic(myLogic, ["{a}", "{b}", 5])
sum
//sum: 13
```

### Use cases:
> Tạo 20 test case cho bài toán: _Nhập một số nguyên n (n<=10<sup>6</sup>), tính tổng n chữ số. Biết rằng, 0<= a[i] <= 10<sup>10</sup>_, lưu vào thư mục `input` và thư mục `output`
> 
Trước tiên hãy tạo solution `.cpp`

Code sinh test:
```ts
@TestAmount(20)
@InputFileConfig({
    filename: "input$.txt",
    path: "./input",
    autoAddZero: false,
})
@OutputFileConfig({
    filename: "output$.txt",
    path: ".output",
    autoAddZero: false,
})
@Cpp("./solution.cpp")
export default class Test extends TestTemplateClass{
    @Int(1,1000000)
    n
    
    @ArrayInt("{n}", 1, "10000000000")
    array

    template = `{n}\n{array}`
}
generate(TestTemplate)
```

### Tips:
- Nếu số quá lớn, hãy chuyển toàn bộ `number` thành `string` để xử lý số lớn

Ví dụ:
`@Int("123456789","987654321")`

- Định dạng số lớn trong mảng chưa được hỗ trợ
