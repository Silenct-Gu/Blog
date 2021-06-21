---
autoGroup-1: 核心C#
title: 枚举
categories:
    - C#
---

#2.6 枚举
[TOC] 1.用枚举比使用无格式的整数至少有如下 3 个优势：
① 枚举可以使代码更易于维护，有助于确保给变量指定合法的、期望的值。
② 枚举使代码更清晰，允许用描述性的名称表示整数值，而不是用含义模糊、变化多端的数来表示。
③ 枚举也使代码更易于输入。在给枚举类型的实例赋值时，Visual Studio .NET IDE 会通过 IntelliSense 弹出一个包含可接受值的列表框,减少了按键次数，并能够让我们回忆起可选的值。

2.可以定义如下的枚举，

```
public enum TimeOfDay
{
    Morning = 0,
    Afternoon = 1,
    Evening = 2
}
```

枚举中使用一个整数值，来表示一天的每个阶段，现在可以把这些值作为枚举的成员来访问。例如，TlineOfDay.Morning 返回数字 0。使用这个枚举一般是把合适的值传送给方法，并在 switch 语句中迭代可能的值。

```
using System;
namespace Wrox.ProCSharp.Basics
{
    public class EnumExample
    {
        public static int Main()
        {
            WriteGreeting(TimeOfDay.Morning);
            return 0;
        }
        static void WriteGreeting(TimeOfDay timeOfDay)
        {
            switch (timeOfDay)
            {
                case TimeOfDay.Morning:
                    Console.WriteLine("Good morning!");
                    break;
                case TimeOfDay.Afternoon:
                    Console.WriteLine("Good afternoon!");
                    break;
                case TimeOfDay.Evening:
                    Console.WriteLine("Good evening!");
                    break;
                default:
                    Console.WriteLine("Hello");
                    break;
            }
        }
        public enum TimeOfDay
        {
            Morning = 0,
            Afternoon = 1,
            Evening = 2
        }
    }
}

```

#2.6 枚举
[TOC] 1.用枚举比使用无格式的整数至少有如下 3 个优势：
① 枚举可以使代码更易于维护，有助于确保给变量指定合法的、期望的值。
② 枚举使代码更清晰，允许用描述性的名称表示整数值，而不是用含义模糊、变化多端的数来表示。
③ 枚举也使代码更易于输入。在给枚举类型的实例赋值时，Visual Studio .NET IDE 会通过 IntelliSense 弹出一个包含可接受值的列表框,减少了按键次数，并能够让我们回忆起可选的值。

2.可以定义如下的枚举，

```
public enum TimeOfDay
{
    Morning = 0,
    Afternoon = 1,
    Evening = 2
}
```

枚举中使用一个整数值，来表示一天的每个阶段，现在可以把这些值作为枚举的成员来访问。例如，TlineOfDay.Morning 返回数字 0。使用这个枚举一般是把合适的值传送给方法，并在 switch 语句中迭代可能的值。

```
using System;
namespace Wrox.ProCSharp.Basics
{
    public class EnumExample
    {
        public static int Main()
        {
            WriteGreeting(TimeOfDay.Morning);
            return 0;
        }
        static void WriteGreeting(TimeOfDay timeOfDay)
        {
            switch (timeOfDay)
            {
                case TimeOfDay.Morning:
                    Console.WriteLine("Good morning!");
                    break;
                case TimeOfDay.Afternoon:
                    Console.WriteLine("Good afternoon!");
                    break;
                case TimeOfDay.Evening:
                    Console.WriteLine("Good evening!");
                    break;
                default:
                    Console.WriteLine("Hello");
                    break;
            }
        }
        public enum TimeOfDay
        {
            Morning = 0,
            Afternoon = 1,
            Evening = 2
        }
    }
}

```

3.在 c#中，枚举的真正强大之处是它们在后台会实例化为派生于基类 System.Enum 的结构。这表示可以对它们调用方法，执行有用的任务。在语法上把枚举当作结构不会造成性能损失。实际上，一旦代码编译好，枚举就成为基本类型,与 int 和 float 类似。

可以获取枚举的字符串表示。例如使用前面的 TimeOfDay 枚举：

```
TimeOfDay time = TimeOfDay.Afternoon;
Console.WriteLine(time.ToString());
```

会返回字符串 Afternoon。

4.还可以从字符串中获取枚举值：

```
TimeOfDay time2 = (TimeOfDay) Enum.Parse(typeof(TimeOfDay), "afternoon", true);
Console.WriteLine((int)time2);
```

这段代码说明了如何从字符串获取枚举值，并转换为整数。要从字符串中转换，需要使用静态的 Enum.Parse()方法，这个方法带 3 个参数。
