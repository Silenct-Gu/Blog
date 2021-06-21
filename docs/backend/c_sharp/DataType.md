---
autoGroup-1: 核心C#
title: 数据类型
categories:
    - C#
---

#2-4 预定义数据类型
[TOC]
##2-4-1 值类型和引用类型 1.值类型（value type）：

-   简单类型：
    -   有符号整型：sbyte、short、int、long
    -   无符号整型：byte、ushort、uint、ulong
    -   Unicode 字符：char，表示 UTF-16 代码单元
    -   IEEE 二进制浮点：float，double
    -   高精度十进制浮点数：decimal
    -   布尔值：bool
-   枚举类型 emum E{...}格式的用户定义类型。enum 类型是一种包含已命名常量的独特类型。每个 enum 都有一个基础类型(必须
    是八种整型类型之一)。enum 类型的值集与基础类型的值集相同。
-   结构类型 格式为 struct S {...} 的用户定义类型
-   可以为 null 的值类型 值为 null 的其他所有值类型的扩展
-   元组值类型 格式为 (T1, T2, ...) 的用户定义类型
    值类型变量声明后，不管是否已经赋值，编译器为其分配内存，存储在栈堆中。

    2.引用类型（reference type）：

-   类类型
    -   其他所有类型的最终基类：object
    -   Unicode 字符串：string，表示 UTF-16 代码单元序列
    -   格式为 class C {...} 的用户定义类型
-   接口类型
    -   格式为 interface I {...} 的用户定义类型
-   数组类型
    -   一维、多维和交错。 例如：int[]、int[,] 和 int[][]
-   委托类型
    -   格式为 delegate int D(...) 的用户定义类型

当声明一个类时，只在栈中分配一小片内存用于容纳一个地址，而此时并没有为其分配堆上的内存空间。当使用 new 创建一个类的实例时，分配堆上的空间，并把堆上空间的地址保存到栈上分配的小片空间中。

3.考虑下面的代码。这段代码假定己经定义了一个类 Vector, Vector 是一个引用类型，它有一个 int 类型的成员变最 Value：

```
Vector x, y;
x = new Vector ();
x. Value = 30; // Value 是在Vector定义的字段
y = x;
Console.WriteLine(y.Value);
y. Value = 50;
Console.WriteLine(x.Value);
```

只有一个 Vector 对象。x 和 y 都指向包含该对象的内存位置。x 和 y 是引用类型的变量，不会真正创建对象。要创建对象.就必须使用 new 关键字，如上所示。因为 x 和 y 引用同一个对象，所以对 x 的修改会影响 y,反之亦然。因此上面的代码会显示 30 和 50。

4.如果变量是一个引用，就可以把其值设置为 null，表示它不引用任何对象：
y = null;
值为 null，显然不可能对它调用非静态成员函数或字段，这么做会在运行期间抛出异常。

5.值类型、引用类型实例

```
using System;
namespace Parameters
{
    class Program
    {
        static void Main(string[] args)
        {
            Dowork();
        }
        static void Dowork()
        {
            int i = 0;  // int 是值类型
            Console.WriteLine(i);   // i = 0
            Pass.value(i);          // 值类型使用的是 i 的副本，i不变
            Console.WriteLine(i);   // i = 0
            WrappendInt wi = new WrappendInt(); // 创建类 WrappendInt 的另外一个实例
            Console.WriteLine(wi.Number);   // 0 // 被默认构造器初始化
            Pass.Reference(wi);     // 调用方法，wi 和 param 将引用同一个对象
            Console.WriteLine(wi.Number);   // 42
        }
    }
    class Pass
    {
        public static void value(int param)
        {
            param = 42; // 赋值操作使用的是值类型参数的一个副本，原始参数不受影响
        }
        public static void Reference(WrappendInt param) // 创建类 WrappendInt 的一个实例
        {
            param.Number = 42;  // 此参数是引用类型的参数
        }
    }
    class WrappendInt   // 类是引用类型
    {
        public int Number;
    }
}
```

6.引用类型和值类型，这两个类型可以相互转换，方法是装箱和拆箱。

##2.4.2 CTS 类型(Common Type System 通用类型系统)

1. C#认可的基本预定义类型并没有内置于 C#语言中，而是内置于.NETFramework 中。例如，在 C#中声明一个 int 类型的数据时，声明的实际上是.NET 结 System.Int32 的一个实例。
2. 在语法上，可以把所有的基本数据类型看成支持某些方法的类。例如，要把 int i 转换为 string,可以编写下面的代码：string s = i.ToString（）;
   这种便利语法的背后，类型实际上仍存储为基本类型。基本类型在概念上用.NET 结构表示，没有性能损失。
3. C#有 15 个预定义类型，其中 13 个是值类型，两个是引用类型（string 和 object）。
4. CTS 定义了一个类型库，无论时 Visual Basic.NET 还是 c#，他们的类型系统大体类似。因此.NET 将各种不同的编程语言的数据类型进行抽象，就有了 CTS。虽然每种编程语言都有自己的类型系统，但编译后都会转成 CTS 类型。不同的语言编写的程序直间可以相互操作。Vb 的 integer 而 C#的 System.Int32 都对应 CTS 的 System.Int32 类型。

##2.4.3 预定义的值类型
内置的 CTS 值类型表示基本类型，如整型和浮点类型、字符类型和布尔类型。 1.整型
| 名 称 | CTS 类型 | 说 明 | 范 围 |
|--------------|--------------|-----------------|---------------------------|
| sbyte | System. SByte | 8 位有符号的整数 |-128~127(-2<sup>7</sup>~2<sup>7</sup>-1) |
| short | System.Intl6 |16 位有符号的整数 | -32 768〜32 767 (-2<sup>13</sup> 〜2<sup>15</sup>-1)|
| int |System. InB2|32 位有符号的整数|-2 147 483 648 ~2 147 483 647 (-2<sup>31</sup> ，~2<sup>31</sup>-1)|
|long|System. Int64|64 位有符号的整数|-9 223 372 036 854 775 808〜9 223 372 036 854 775 807 (-2<sup>63</sup> 〜2<sup>63</sup> -1)|
|byte|System.Byte|8 位无符号的整数|0-255 (0~2<sup>8</sup> -1)|
|ushort|System.UIntl6|16 位无符号的整数|0~65 535 (0~2<sup>16</sup> -1)|
|uint|Syslem.UlnB2|32 位无符号的整数|0 〜4 294 967 295 (0〜2<sup>32</sup>-1)|
|ulong|System. Ulnt64|64 位无符号的整数| 0-18 446 744 073 709 551 615 (0~2<sup>64</sup>-1)|

-   在.NET 中，short 不再很短，现在它有 16 位长。int 类型更长，有 32 位。long 类型最长，有 64 位。所有整数类型的变量都能被赋予十进制或十六进制的值，后者需要 0x 前缀：
    long x = 0xl2ab;
-   如果对一个整数是 int、uint、long 或是 ulong 没有任何显式的声明，则该变量默认为 int 类型。为了把输入的值指定为其他整数类型，可以在数字后面加上如下字符：
    uint ui = 1234U;
    long 1 = 1234L;
    ulong ul = 1234UL;
    也可以使用小写字母 u 和 l,但后者会与整数 1 混淆。

    2.浮点类型
    C#提供了许多整型数据类型，也支持浮点类型，如表所示。
    | 名 称 | CTS 类型 | 说 明 | 位数 | 范 围 |
    |--------------|--------------|-----------------|---------------------------|
    |float| Systcm.Single | 32 位单精度浮点数 | 7 | ±1.5X10<sup>245</sup>~±3.4X10<sup>38</sup> |
    |double | System. Double | 64 位双精度浮点数 | 15/16 | ±5.0X10<sup>-324</sup>~±1.7X10<sup>308</sup> |

如果在代码中对某个非整数值（如 12.3）硬编码，则编译器一般假定该变量是 double。
如果想指定该值为 float,可以在其后加上字符 F（或 f）：
floatf = 12.3F;

3.decimal 类型
decimal 类型表示精度更高的浮点数
| 名 称 | CTS 类型 | 说 明 | 位数 | 范 围 |
|--------------|--------------|-----------------|---------------------------|
|decimal|Systcm.Single | 128 位高精度十进制数表示法 | 28| ±1.0X10-28~±7.9X1028 |
CTS 和 C#一个重要的优点是提供了一种专用类型进行财务计算，这就是 decimal 类型可以用较大的精确度（带有美分）来表示较小的美元值，也可以在小数部分用更多的舍入来表示较大的美元值。但应注意，decimal 类型不是基本类型，所以在计算时使用该类型会有性能损失。要把数字指定为 decimal 类型，而不是 double、float 或整型，可以在数字的后面加上字符 M（或 m）。
decimal d = 12.30M;

4.bool 类型
C#的 bool 类型用于包含布尔值 true 或 false。
| 名 称 | CTS 类型 | 说 明 | 位数 | 范 围 |
|--------------|--------------|-----------------|---------------------------|
|bool| Sysiem-Boolean | 表示 true 或 felse | NA | true 或 false |

bool 值和整数值不能相互隐式转换。如果变量（或函数的返回类型）声明为 bool 类型，就只能使用值 true 或 false，如果试图用 0 表示 fales，非 0 值表示 true,就会出错。

5.字符类型
为了保存单个字符的值，C#支持 char 数据类型。
| 名 称 | CTS 类型 | 值 |
|--------------|--------------|-----------------|
|char| System.Char | 表示一个 16 位的（Uniwde）字符 |
char 类型的字面量是用单引号括起来的，如'A'。如果把字符放在双引号中，编译器会把它看作字符串，从而产生错误。除了把 char 表示为字符字面最之外，还可以用 4 位十六进制的 Unicode 值(如\u0041')、带有数据类型转换的整数值(如(char)65)或十六进制数以 0041')表示它们。它们还可以用转义序列表示。

| 转义序列 | 字符       |
| -------- | ---------- |
| V        | 单引号     |
| \*       | 双引号     |
| \\       | 反斜杠     |
| \0       | 空         |
| \a       | 警告       |
| \b       | 退格       |
| \f       | 换页       |
| \n       | 换行       |
| \r       | 回车       |
| \t       | 水平制表符 |
| \v       | 垂直制表符 |

##2.4.4 预定义的引用类型
C#支持两种预定义的引用类型。
| 名 称 | CTS 类型 | 说 明 |
|--------------|--------------|-----------------|
| object | SyslemObjcct | 根类型，CTS 中的其他类型都是从它派生而来的(包括值类型) |
| string | System-String | Unicode 字符 |

1. object 类型
   许多编程语言和类结构都提供了根类型，层次结构中其他对象都是从它派生而来。在 C#中，object 类型就是最终的父类型，所有内置类型和用户定义的类型都从它派生而来。
   object 类型可以用于两个目的：

-   可以使用 object 引用绑定任何子类型的对象。
-   object 类型实现许多一般用途的基本方法，也括 Equals()、GetHashCode()、GetType()和 ToString（）。用户定义的类需要使用一种面向对象技术——重写，提供其中一些方法的替代实现代码。
    例如，重写 ToString()时，要给类提供一个方法，给出类本身的字符串表示。如果类中没有提供这些方法的实现代码，编译器就会使用 object 类型中的实现代码，它们在类中的执行不一定正确。

2. string 类型
   C#有 string 关键字，在编译为.NET 类时，它就是 system.String。有了它，像字符串连接和字符串复制这样的操作就很简单了：

```
string strl = "Hello";
string str2 = "World";
string str3 = strl + str2; //字符串连接
```

尽管这是一个值类型的赋值，但 string 是一个引用类型。String 对象被分配在堆上，而不是栈上。
string 与引用类型的常见行为有一些区别，例如，字符串是不可改变的。修改其中一个字符串，就会创建一个全新的 string 对象，而另一个字符串不发生任何变化。考虑下面的代码：

```
using System;
class StringExample
{
    public static int Main()
    {
        string s1 = "a string";
        string s2 = s1;
        Console.WriteLine("s1 is"+s1);
        Console.WriteLine("s2 is"+s2);
        s1 = "another string";
        Console.WriteLine("s1 is now" + s1);
        Console.WriteLine("s2 is now" + s2);
        return 0;
    }
}
```

其输出结果为：
s1 is a string
s2 is a string
s1 is now another string
s2 is now a string
改变 s1 的值对 s2 没有影响，当用值"a string"初始化 s1 时,就在堆上分配了一个新的 string 对象，在初始化 s2 时，引用也指向这个对象，所以 s2 的值也是"a string"。但是当现在要改变 s1 的值时，并不会替换原来的值，堆上会为新值分配一个新对象。s2 变量仍指向原来的对象，所以它的值没有改变。这实际上是运算符重载的结果。基本上，string 类实现为其语义遵循一般的、直观的字符串规则。字符串字面量放在双引号中("...")如果试图把字符串放在单引号中，编译器就会把它当作 char 类型，从而引发错误。不能在字符串中使用没有经过转义的反斜杠字符，而需要用两个反斜杠字符(\\)来表示它：

```
string filepath = "C:\\ProCSharp\\First.cs";
```

输入两个反斜杠容易混淆，C#也提供了另一种替代方式。可以在字符串字面量的前面加上字符@，在这个字符后的所有字符都看成其原来的含义——它们不会解释为转义字符：

```
string filepath = @"C:\\ProCSharp\First.cs";
```

甚至允许在字符串字面量中包含换行符：

```
string jabberwoeky = @"'Twas brillig and the slithy toves Did gyre and gimble in the wabe.";
```

那么 jabberwocky 的值就是：'Twas brillig and the slithy toves Did gyre and gimble in the wabe.
