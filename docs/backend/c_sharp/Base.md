---
autoGroup-1: 核心C#
title: 基础
tags:
    - C#
categories:
    - C#
---

## 第一个 C#程序

```csharp
//helloword项目
//using关键字用于在程序中包含System命名空间
//一个程序一般有多个using语句
using System;
//namespace声明 一个namespace里包含了一系列的类
namespace C_Sharp_Study.Unit_2
{
    //class声明，类MyFirstClass包含了程序使用的数据和方法声明
    //类一般包含多个方法，方法定义了类的行为
    public class HelloWorld
    {
        //Main方法，是所有C#程序的入口点
        private static void Main()
        {
            //WriteLine是一个定义在System命名空间中Console类的一个方法,
            //把一行文本写到控制台窗口上。它是静态方法，调用前不需要实例化Console对象。
            //Console是控制台输入和输出类
            Console.WriteLine("Hello from Wrox.");
            //针对VS.NET用户，使程序会等待一个按键的动作
            Console.ReadLine();
            return;
        }
    }
}
```

## 详细介绍

-   C#程序主要包括以下部分：

    -   命名空间
    -   一个 Class （Class 方法、Class 属性）
    -   一个 Main 方法
    -   语句（Statements）& 表达式（Expressions）
    -   注释

*   在 C#中，与其他 C 风格的语言一样，大多数语句都以分号(;)结尾，语句可以写在多个代码行上，不需要使用续行字符。用花括号({})把语句组合为块。单行注释以两个斜杠字符开头(//)，多行注释以一条斜杠和一个星号(/)开头，以一个星号和一条斜杠(/)结尾。C#区分大小写，也就是说，变量 myVar 与 MyVar 是两个不同的变量。

*   名称空间是把相关类组合在一起的方式。namespace 关键字声明了应与类相关的名称空间。其后花括号中的所有代码都被认为是在这个名称空间中。编译器在 using 语句指定的名称空间中查找没有在当前名称空间中定义但在代码中引用的类。using System 语句允许把 System.Console 这个类简写为 Console(System 名称空间中的其他类也与此类似)。如果没有 using,就必须完全限定对 Console.WriteLine0 方法的调用，如下所示：

```
System.Console.WriteLine("Hello from Wrox."）;
```

-   C#没有用于输入和输出的内置关键字，而是完全依赖于.NET 类。
-   声明方法 Main（）。每个 C#可执行文件(如控制台应用程序、Windows 应用程序和 Windows 服务)都必须有一个入口点——Main()方法(注意 M 大写)：

```
public static void Main(){
```

该方法要么没有返回值，要么返回一个整数，C#中方法定义如下：

```
//修饰符(modifiers)表示可选关键字，用于指定用户所定义的方法的某些特性。
//如可以在什么地方调用该方法。修饰符public表示可以在任何地方访问该方法，所以在类的外部调用它。
//修饰符static表示方法不能在类的实例上执行，因此不必先实例化类再调用。
[modifiers] return_type MethodName([parameters])
{
    // Method body. NB. This code block is pseudo-code.
}
```
