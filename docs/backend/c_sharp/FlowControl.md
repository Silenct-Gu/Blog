---
autoGroup-1: 核心C#
title: 流控制
categories:
    - C#
---

#2.5 流控制
[TOC]
本节将介绍 c#语言的重要语句：控制程序流的语句，它们不是按代码在程序中的排列位置顺序执行的。

##2.5.1 条件语句
条件语句可以根据条件是否满足或根据表达式的值控制代码的执行分支。C#有两个控制代码分支的结构：if 语句，测试特定条件是否满足；switch 语句，它比较表达式和多个不同的值。

###1.if 语句
C#语法非常直观:

```
if (condition)
    statement(s)
else
    statement(s)
```

如果在条件中要执行多个语句，就需要用花括号({...})把这些语句组合为一个块(这也适用于其他吋以把语句组合为一个块的 C#结构，如 for 和 while 循环)。

```
        bool isZero;
        if (i == 0)
        {
            isZero = true;
            Console.WriteLine("i is Zero");
        }
        else
        {
            isZero = false;
            Console.WriteLine("i is Non-zero");
        }
```

还可以单独使用 if 语句，不加最后的 else 语句。也可以合并 else if 子句，测试多个条件。

```
using System;
namespace Wrox
{
    class MainEntryPoint
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Type in a string");
            string input;
            input = Console.ReadLine();
            if (input == "")
            {
                Console.WriteLine("You typed in an empty string.");
            }
            else if (input.Length < 5)
            {
                Console.WriteLine("The string had less than 5 characters.");
            }
            else if (input.Length < 10)
            {
                Console.WriteLine("The string had at least 5 but less than 10 Characters.");
            }
            Console.WriteLine("The string was " + input);
        }
    }
}
```

添加到 if 子句中的 else if 语句的个数不受限制。
对于 if,要注意的一点是如果条件分支中只有一条语句，就无须使用花括号：

```
            int i = 0;
            if (i == 0) //Let's add some brackets here.
            Console.WriteLine("i is Zero'");
            Console.WriteLine("i can be anything");

```

在 C#中，if 子句中的表达式必须等于布尔值。不能直接测试整数(如从函数中返回的值)，而必须明确地把返回的整数转换为布尔值 true 或 false。

例如，将值与 0 或 null 进行比较：

```
           if (DoSomething() != 0)
            {
                // Non-zero value returned
            }
            else
            {
                // Returned zero
            }
```

###2. switch 语句
switch...case 语句适合于从一组互斥的分支中选择一个执行分支。其形式是 switch 参数的后面跟一组 case 子句。如果 switch 参数中表达式的值等于某个 case 子句旁边的某个值，就执行该 case 子句中的代码。此时不需要使用花括号把语句组合到块中；只需要使用 break 语句标记每段 case 代码的结尾即可。也可以在 switch 语句中包含一条 default 子句，如果表达式不等于任何 case 子句的值，就执行 default 子句的代码。下面的 switch 语句测试 integerA 变量的值：

```
             switch (integerA)
            {
                case 1:
                    Console.WriteLine("integerA =1");
                    break;
                case 2:
                    Console.WriteLine("integerA =2");
                    break;
                case 3:
                    Console.WriteLine("integerA =3");
                    break;
                default:
                    Console.WriteLine("integerA is not 1,2, or 3");
                    break;
            }
```

注意 case 的值必须是常最表达式：不允许使用变量。
C#的 switch...case 语句更安全。特别是它禁止几乎所有 case 中的失败条件。如果激活了块中靠前的一条 case 子句，后面的 case 子句就不会被激活，除非使用 goto 语句特别标记要激活后而的 case 子句。编译器会把没有 break 语句的 case 子句标记为错误：

```
Control cannot fall through from one case label ('case 2:') to another
```

在有限的几种情况下，这种错误与继续，大多情况下不希望出现这种失败，这会导致出现很难察觉的逻辑错误。在使用 goto 语句时，会在 switch...cases 中重复出现失败。如果确实想这么做，就应重新考虑设计方案。
下面的代码说明使用 goto 模拟失败，得到的代码会非常混乱：

```
             switch (country)
            {
                case "America":
                    CallAmericanOnlyMethod();
                    goto case "Britain";
                case "France":
                    language = "French";
                    break;
                case "Britain":
                    language = "English";
                    break;
            }

```

但有一种例外情况，如果一条 case 子句为空，就可以从这个 case 跳到下一条 case 上.这样就可以用相同的方式处理两条或多条 case 子句了(不需要 goto 语句)。

```
switch (country)
            {
                case "au":
                case "uk":
                case "us":
                    language = "English";
                    break;
                case "at"：
                case "de":
                    language = "German”;
                    break;
            }
```

在 C#中，switch 语句中 case 子句的排放是无关紧要的，甚至可以把 default 子句放在最前面！因此，任何两条 case 都不能相同。
这包括值相同的不同常量，所以不能这样编写:

```
            const string england = "uk";
            const string britain = "uk";
            switch (country)
            {
                case england:
                case britain:
                    language = "English";
                    break;
            }
```

##2.5.2 循环
C#提供了 4 种不同的循环机制(for、while、 do...while 和 foreach)。在满足某个条件之前，可以重复执行代码块。

1. for 循环
   其语法如下：

```
for (initializer; condition;iterator):
    statement(s)
```

其中：

-   initializer 是指在执行第一次循环前要计算的表达式(通常把一个局部变量初始化为循环计数器)。
-   condition 是在每次迭代执行新循环前要测试的表达式(它必须等于 true,才能执行下一次迭代)。
-   iterator 是每次迭代完要计算的表达式(通常是递增循环计数器)。当 condition 等于 false 吋，迭代停止。
    for 循环是所谓的预测试循环，因为循环条件是在执行循环语句前计算的，如果循环条件为假，循环语句就根本不会执行。
    for 循环非常适合于一个语句或语句块重复执行预定的次数。
    下面的例子就是 for 循环的典型用法，这段代码输出从 0~99 的整数：

```

for (int i = 0; i < 100; i = i + 1)
            {
                Console.WriteLine(i);
            }
```

实际上，上述编写循环的方式并不常用。C#在给变量加 1 吋有一种简化方式，即不使用 i = i+1,而简写为 i++：

```
            for (int i = 0; i < 100; i++)
            {
                // etc.
            }
```

也可以在 k 面的例子中给循环变量 i 使用类型推断功能。使用类型推断功能吋，循环结构变成:

```
for (var i = 0; i < 100; i++)

```

嵌套的 for 循环非常常见.在每次迭代外部的循环吋，内部循环都耍彻底执行完毕。这种模式通常用于在矩形多维数组中遍历毎个元素。
下而的代码显示数字行:

```
using System;
namespace Wrox
{
    internal class MainEntryPoint
    {
        private static void Main(string[] args)
        {
            for (int i = 0; i < 100; i+=10)
            {
                for (int j = i; j < i + 10; j++)
                {
                    Console.Write("" + j);
                }
                Console.WriteLine();
            }
        }
    }
}
```

尽管 j 是一个整数，但它会自动转换为字符串，以便进行连接。

2. while 循环
   与 for 循环一样，while 也是一个预测试循环。其语法是类似的，但 while 循环只有一个表达式:

```
while(condition)
    statement(s);
```

与 for 循环不同的是，while 循环最常用于以下情况：在循环开始前，不知道重复执行一个语句或语句块的次数，通常，在某次迭代中，while 循环体中的语句把布尔标志设置为 false,结束循环。
如下面的例子所示。

```

            bool condition = false;
            while (!condition)
            {
                DoSomeWork();
                condition = Checkcondition();
            }

```

3. do... while 循环
   do...while 循环是 while 循环的后测试版本。该循环的测试条件要在执行完循环体之后执行。因此 do...while 循环适用于至少要将循环体执行一次的情况：

```
            bool condition;
            do
            {
                MustBeCalledAtLeast0nce();
                condition = CheckCondition();
            } while (condition);

```

4. foreach 循环
   foreach 循环可以迭代集合中的每一项。知道集合是一种包含一系列对象的对象即可。从技术上看要使用集合对象，就必须支持 lEnumerable 接口。集合的例子有 C#数组、System.Collection 名称空间中的集合类，以及用户定义的集合类。从下面的代码中可以了解 foreach 循环的语法，其中假定 arrayOflnts 是一个整型数组：

```
            foreach (int temp in arrayOflnts)
            {
                Console.WriteLine(temp);
            }
```

其中，foreach 循环每次迭代数组中的 个元素。它把每个元素的值放在 int 型的变量 temp 中，然后执行一次循环迭代。
这里也可以使用类型推断功能。此时，foreach 循环变成：

```
foreach (var temp in arrayOflnts)
```

temp 的类型推断为 int,因为这是集合项的类型。注意，foreach 循环不能改变集合中各项(上面的 temp)的值，所以下面的代码不会编译：

```
            foreach (int temp in arrayOflnts)
            {
                temp++;
                Console.WriteLine(temp);
            }
```

如果需要迭代集合中的各项，并改变它们的值，就应使用 for 循环。

##2.5.3 跳转语句
C#提供了许多可以立即跳转到程序中另一行代码的语句,先介绍 goto 语句。

1. goto 语句
   goto 语句可以直接跳转到程序中用标签指定的另一行。

```
goto Label1;
    Console.WriteLine("This won't be executed");
Label1:
    Console.WriteLine("Continuing execution from here");
```

goto 语句有两个限制。不能跳转到像 for 循环这枰的代码块中，也不能跳出类的范围，不能退出 try...catch 块后面的 finally 块。

2. break 语句
   break 可以用于退出 for、foreach, while 或 do...while 循环，该语句会使控制流执行循环后面的语句。如果该语句放在嵌套的循环中，就执行最内部循环后面的语句。如果 break 放在 switch 语句或循环外部，就会产生编译错误。

3. continue 语句
   continue 语句类似于 tweak，也必须在 for、foreach、while 或 do...while 循环中使用一但它只退出循环的当前迭代，开始执行循环的下一次迭代，而不是退出循环。

4. return 语句
   return 语句用于退出类的方法，把控制权返回方法的调用者。如果方法有返回类型，return 语句必须返回这个类型的值；如果方法返回 void,应用没有表达式的 return 语句。
