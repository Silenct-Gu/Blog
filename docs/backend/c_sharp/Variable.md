---
autoGroup-1: 核心C#
title: 变量和常量
categories:
    - C#
---

-   在 c#中声明变量使用下述语法： datatype identifier;
    例如：

```
int i;
```

编译器不允许在表达式中使用这个变量，除非用一个值初始化该变量。

```
i=10;
```

还可以在代码中声明变量并初始化：

```
int i=10;
```

一条语句声明和初始化多个变量，那所有的变量都具有相同数据类型

```
int x=10,y=20;//x、y 都是 int 类型
```

要声明不同类型的变量，需要使用单独的语句。在多个变量的声明中，不能指定不同的数据类型：

```
    int x = 10;
    bool y = true; // 创建一个存储 true 或 false 的变量
    int x = 10, bool y = true; // This won't complile!
    //是注释，自动忽略，不是程序一部分
```

## 变量的初始化

1. 变量的初始化是 C#强调安全性的另一个例子。简单地说，C#编译器需要用某个初始值对变量进行初始化，之后才能在操作中引用该变量。
   大多编译器标记为警告，但 C#当成错误来看待，防止从其他程序遗留下的内存中获取垃圾值。
2. C#有两个方法可以确保在使用前进行了初始化：

-   变量是类或结构中的字段，如果没有显式初始化，创建这些变量时，其默认值就是 0(类和结构在后面讨论)。
-   方法的局部变量必须在代码中显式初始化，之后才能在语句中使用它们的值。此吋，初始化不是在声明该变量吋进行的，但编译器会通过方法检查所有可能的路径，如果检测到局部变量在初始化之前就使用了它的值，就会产生错误。

3. 错误示例

```
public static int Main()
{
    int d;
    Console.WriteLine(d); // Can't do this! Need to initialize(初始化) d before use
    return 0;
}
```

演示了如何定义 Main（）使之返回一个 int 类型的数据，而不是 void，会得到错误信息:Use of unassigned local variable 'd'。

4. Something objSomething;
   这行代码会为 Something 对象创建一个引用，但这个引用没有指向任何对象，该变量调用方法或属性会导致错误。
   在 C#中实例化一个引用对象需要使用 new 关键字。
   objSomething = new Something();

## 类型推断

1.类型推断(type inference)使用 var 关键字。声明变量的语法有些变化。编译器可以根据变 M 的初始化值“推断”变僦的类型。
例如：
int someNumber = 0;
就变成：
var someNumber = 0;
编译器可以确定，只要 someNumber 在其作用域内,就是一个 int。编泽后，上面两个语句是等价的。

2.实例

```csharp
using System;
namespace Wrox
{
    public class Program
    {
        static void Main(string[] args)
        {
            var name = "Bugs Bunny";
            var age = 25;
            var isRabbit = true;
            Type nameType = name.GetType();
            Type ageType = age.GetType();
            Type isRabbitType = isRabbit.GetType();
            Console.WriteLine("name is type " + nameType.ToString());
            Console.WriteLine("age is type " + ageType.ToString());
            Console.WriteLine("isRabbit is type " + isRabbitType.ToString());
        }
    }
}

//输出结果name is type Sysrem.String
//age is type System.Int32
//IsRabbit is type System Boolean
```

3.需要遵循的规则

-   变量必须初始化。否则，编译器就没有推断变量类型的依据。
-   初始化器不能为空。
-   初始化器必须放在表达式中。
-   不能把初始化器设置为一个对象，除非在初始化器中创建了一个新对象。

## 变量的作用域

变量的作用域是可以访问该变量的代码区域。一般情况下，确定作用域遵循以下规则：

-   只要类在某个作用域内其字段(也称为成员变量)也在该作用域内。
-   局部变量存在于表示声明该变量的块语句或方法结束的右花括号之前的作用域内。
-   在 for、while 或类似语句中声明的局部变量存在于该循环体内。

    1.局部变量作用域冲突
    ① 同名的局部变量不能在同一作用域声明两次，所以不能使用以下代码

```
int x =20;//some more code
int x = 30;
```

② 代码示例

```
using System;
namespace Wrox.ProCSharp.Basics
{
   public class ScopeTest
   {
      public static int Main()
      {
         for (int i = 0; i < 10; i++)
         {
            Console.WriteLine(i);
         }   // i goes out of scope here
         // We can declare(宣布) a variable(变量) named i again, because
         // there's no other variable with that name in scope
         for (int i = 9; i >= 0; i--)
         {
            Console.WriteLine(i);
         }   // i goes out of scope here.
         return 0;
      }
   }
}
//使用两个for循环打印0~9的数字，再逆序打印0~9，同一方法中，变量i声明了两次，i再两个不同循环内部声明
//变量i对于各自循环来说是局部变量。
```

③ 错误示例

```
using System;
namespace Wrox
{
   public class ScopeBad
   {
        public static int Main()
        {
           int j = 20;
           for (int i = 0; i < 10; i++)
           {
              int j = 30;   // Can’t do this—j is still in scope
              Console.WriteLine(j + i);
           }
           return 0;
        }
    }
}

//变量j是在for循环开始前定义的，执行for循环应处于其作用域中。在Main()执行结束后，变量j才超出作用域。
//第二个j(不合法)责在循环作用域，编译器无法区分两个变量，不允许声明第二个变量
```

2.字段和局部变量的作用域冲突
① 某些情况下可以区分名称相同名称相同、作用域相同同的两个标识符。此时允许声明第二个变量，因为 C#在变量间有基本的区分，
在类型级别声明变量看做字段，把在方法中声明的变量看作局部变量。

```
using System;
namespace Wrox
{
    public class ScopeTest2
    {
        static int j = 20;
        public static void Main()
        {
            //新声明的隐藏了同级类变量，运行时显示30
            int j = 30;
            Console.WriteLine(j);
            return;
        }
    }
}
```

② 如果引用类级变量，可以使用语法 object.fieldname,在对象的外部引用类和结构的字段。上述粒子中，我们访问静态方法中的一个静态字段，所以不能使用类的实例，至使用类本身的名称。

```
public static void Main()
        {
            int j = 30;
            Console.WriteLine(j);
            Console.WriteLine(ScopeTest2.j);
        }
```

如果访问一个实例字段(该字段属于类的一个特定实例)，就需要使用 this 关键字。 3.作用域区分图样

## 常量

1.常量是其值在使用过程中不会发生变化的变量。在声明和初始化变量时.在变量的
前面加上关键字 const，就可以把该变量指定为一个常量。
const int a = 100; // 值不可改变

2.常量具有如下特点：

-   常量必须在声明时初始化。指定了其值后，不能再改写。
-   常量的值必须能在编译时用于计算。不能用从一个变量中提取的值来初始化常量。
-   常量总是静态的，注意不允许在常量声明中包含修饰符 static。

    3.在程序中使用常量至少有 3 个好处：

-   使用易于读取的名称替代了较难读取的数字或字符串，常量使程序变得更易于阅读。
-   常量使程序更易于修改。
-   常量更容易避免程序出现错误。如果在声明常量的位置以外的某个地方将另一个值赋给常量，编译器就会报告错误。
