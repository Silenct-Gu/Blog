---
autoGroup-1: 核心C#
title: 命名空间
categories:
    - C#
---

#2.7 名称空间
[TOC] 1.名称空间提供了一种组织相关类和其他类型的方式。与文件或组件不同,名称空间是一种逻辑组合，而不是物理组合。在 C#文件中定义类时，可以把它包括在名称空间定义中。在定义另一个类(在另一个文件中执行相关操作)时，就可以在同一个名称空间中包含它，创建一个逻辑组合，该组合告诉使用类的其他开发人员：这两个类是如何相关的以及如何使用它们：

```
namespace CustomerPhoneBookApp
{
    public struct Subscriber
    {
        //Code for struct here
    }
}
```

2.把一个类型放在名称空间中，可以有效地给这个类型指定一个较长的名称，该名称包括类型的名称空间，名称之间用句点(.)隔开，最后是类名。在上面的例子中，Subscriber 结构的全名是 CustomerPhoneBookApp.Subscriber。有相同短名的不同类就可以在同一个程中使用了。全名常常称为完全限定的名称。

3.可以在名称空间中嵌套其他名称空间，为类型创建层次结构：

```
namespace Wrox
{
    namespace ProCSharp
    {
        namespace Basics
        {
            internal class NamespaceExample
            {
                // Code for the class here..
            }
        }
    }
}
```

4.每个名称空间名都由它所在名称空间的名称组成，这些名称用句点分隔开，开头是最外层的名称空间，最后是它自己的短名.所以 ProCShaip 名称空间的全名是 Wrox.ProCShaip, NamespaceExample 类的全名是 Wrox.ProCShaip.Basics.NamespaceExample。

使用这个语法也可以组织自己的名称空间定义中的名称空间，所以上面的代码也可以写为：

```
namespace Wrox.ProCSharp.Basics
{
     class Namespace Example
    {
    }
}

```

注意不允许声明套嵌在另一个名称空间中的多部分的名称空间。 5.名称空间与程序集无关。同一个程序集中可以有不同的名称空间，也可以在不同的程序集中定义同一个名称空间中的类型。

6.应在开始一个项目之前就计划定义名称空间的层次结构。一般可接受的格式是
CompanyName.ProjectName.SystemSection。所以在上面的例子中，Wrox 是公司名，ProCSharp 是项目，对于本章，Basics 是部分名。

2.7.1 using 语句
1.C#允许简写类的全名。为此，要在文件的顶部列出类的名称空间，前面加上 using 关键字。在文件的其他地方，就可以使用其类型名称来引用名称空间中的类型了；

```
using System;
using Wrox.ProCSharp;
```

2 几乎所有的 C#源代码都以语句 using System;开头，因为 Microsoft 提供的许多有用的类都包含在 System 名称空间中。

3.如果 using 语句引用的两个名称空间包含同名的类型，就必须使用完整的名称(或者至少较长的名称)，确保编译器知道访问哪个类型。

例如，假如类 NamespaceExample 同吋存在于 Wrox.ProCSharp.Basics 和 Wrox.ProCSharp.OOP 名称空间中。如果要在名称空间 Wrox.ProCSharp 中创建一个类 Test,并在该类中实例化一个 NamespaceExample 类，就需要指定使用哪个类：

```
using Wrox.ProCSharp.OOP;
using Wrox.ProCSharp.Basics;
namespace Wrox.ProCSharp
{
    class Test
    {
        public static int Main()
        {
            Basics.NamespaceExample nSEx = new Basics.NamespaceExample();
            return 0;
        }
    }
}
```

4.公司应花一些时间开发一种名称空间模式，这样其开发人员才能快速定位他们需要的功能，而且公司内部使用的类名也不会与现有的类库相冲突。

2.7.2 名称空间的别名
1.using 关键字的另一个用途是给类和名称空间指定别名。如果名称空间的名称非常长，又要在代码中多次引用，但不希望该名称空间的名称包含在 using 指令中(例如.避免类名冲突)，就可以给该名称空间指定一个别名，其语法如下：

```
using alias = NamespaceName;
```

2.下面的例子给 Wrox.ProCShaip.Basics 名称空间指定別名 Introduction,并使这个别名实例化了一个 NamespaceExample 对象，这个对象是在该名称空间中定义的。注意名称空间别名的修饰符是因此将先从 Introduction 名称空间别名开始搜索。如果在相同的作用域中引入了一个 Introduction 类，就会发生冲突。即使出现了冲突，“::”运算符也允许引用别名。
NamespaceExanple 类有一个方法 GetNamespace()该方法调用每个类都有的 GetType()方法，以访问表示类的类型的 Type 对象。下面使用这个对象来返回类的名称空间名：

```
using System;
using Introduction = Wrox.ProCSharp.Basics;
internal class Test
{
    public static int Main()
    {
        Introduction::NamespaceExample NSEx = new Introduction::NamespaceExample();
        Console.WriteLine(NSEx.GetNamespace());
        return 0;
    }
}
namespace Wrox.ProCSharp.Basics
{
    internal class NamespaceExample
    {
        public string GetNamespace()
        {
            return this.GetType().Namespace;
        }
    }
}
```
