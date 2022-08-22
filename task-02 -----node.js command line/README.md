# 任务笔记

## ls：

### 项目完成步骤：

1. 我们首先忽略掉后面的排序等功能，先把 ls 主体功能实现.

- 通过 fs.readdirSync(dir) 指令读取目录，利用 stat 函数来获取各种属性，将其分别存进数组里。
- 将获取到的属性全部 push 到 allFiles 数组里面。
- 通过调用 string 的 padstart 和 padend 方法来对信息进行打印。
- 对于排序功能我封装了一个函数，有 3 个参数，分别是要排序的数组，是否是正序，以及按照那种属性进行排序。
- 时间的格式化： 通过 ` new Date()`函数将获取到的时间传进去，通过 get 方法分别获取时分秒，然后进行字符串拼接。
- 我添加了许多输入错误的提示信息： 输入 --sort 、--order 后面的内容的时候，如果参数错误会进行提示正确是输入方法。

### 难点：

1. 要对文件夹以及文件分别排序，开始我的想法是把文件夹、文件分别存下，然后一次遍历排序。 后面将其整合再排序的时候再判断其是否是文件。
2. 使用 padStart、padEnd 的时候不够熟练。

## wget

### 完成步骤

1. 此项目整体不难，就是把老师提供的例子更加完善一下。
2. 由与该命令需要获取到一个 url，所以就存在一种 url 缺失或者输入错误的情况，因此我使用了 `try...catch`函数，如果输入正确就继续，错误直接 return。
3. 当开始读取文件内容的时候我记录了一下当前的时间，再下载时获取现在的时间，两者的差值就是花费的时间。并以此来计算下载速度、剩余时间。
4. 通过 headers 来获取到 url 的返回头，并通过正则来解析到文件名。

## cloc

### 实现：

1.此项目是最难的，我在 src 目录下面封装了一个文件夹 clocData 里面存放了

- languangTypes 用来规范每种语言的扩展名、注释规则。
- languageDAta 用来存放每种语言文件的代码行数、注释行数等信息。
- comments：实现统计代码注释的函数
- output：实现打印功能。

2. 排序函数同 ls 差不多。
3. 通过 fs.readdirSync(dir) 指令读取目录，利用 stat 函数来获取各种属性，将其分别存进数组里。对数组进行递归调用，文件夹就继续读文件。
4. 对读到的文件进行遍历，通过其扩展名来判断是哪个文件，使用 readline 来逐行读取。
5. 注释的判断：经过归纳，注释总共分为两种，一种是多行注释、一种是单行注释。多行注释有两种符号："/_...._/","<!--..-->"逻辑都是相同的。
6. 通过判断该语言的注释规则来选择调用统计注释的函数。
7. 统计开始的时间和结束的时间来完善读取速度。
8. 考虑到路径有可能没有，我们应该用 try 函数来包裹起来，错误则 return。

### 难点：

- 获取所有文件信息，要用到递归，来遍历所有文件夹下面的文件，这是一个稍微复杂的实现结构。
- 关于对各种语言以及各种语言所对应的扩展名的封装，是有难度的，我先后调整了 3 次结构。
- 读入文件内容这里我用的 readline 有一个小 bug，当最后一行为空的时候，会自动认为文件读取结束，导致最后一行如果是空则读取不到。
- 将每次读文件读到的内容进行统计，并且 push 到存放的地址，先后重构了 3、4 次。
- 对于注释行的读取，考虑到每种语言的注释规则不一样，要加以区分，并且注释出现的位置不一样，也有一些及特殊的情况，在这里，我写的算法，可以实现几乎全部的注释情况，除了一行内多个注释相互嵌套（估计没人这么写注释），其他情况均能正确判断。
- 判断注释用掉了我大量的时间来进行优化结构。

## 收获

- 本次练习，对于 node 编程可以说有了全新的掌握与理解，对于 js 、ts 语言的使用有了很大的提升
- 对于 ts 的类型判断、定义掌握的更加娴熟了。
- 锻炼了逻辑思维，尤其是再判断注释行以及代码的整体结构上面。
- 提高了全面思考问题的能力，写代码前一定要把逻辑、结构规划好了，一个合理的结构才能事半功倍，相反，结构不好要频烦的修改，增加了代码量以及负担。
- 学会了读文件，获取文件的属性，下载文件等。
- 对于代码结构的封装的锻炼有了提高。