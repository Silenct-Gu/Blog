---
title: 泛型
categories:
    - C#
---

#5-1 泛型概述
[TOC] 1.泛型不仅是 C#编程语言的一部分，而且与程序集中的 ILdntermediate Language,中间语言)代码紧密地集成。有了泛型，就可以创建独立于被包含类型的类和方法了。我们不必给不同的类型编写功能相同的许多方法或类，只创建一个方法或类即可。 2.另一个减少代码的选项是使用 Object 类。但 Object 类不是类型安全的。泛型类使用泛型类型，并可以根据需要用特定的类型替换泛型类型。这就保证了类型安全性：如果某个类型不支持泛型类,编译器就会出现错误。 3.泛型不仅限于类，还用于接口和方法。 4.泛型不仅是 C#语言的一种结构，而且是 CLR 定义的。所以，即使泛型类是在 C#中定义的。也可以在 Visual Basic 中用一个特定的类型实例化该泛型。 5.实例认识

```
using System;
using System.Collections.Generic;
namespace GenericApplication
{
    public class MyGenericArray<T>
    {
        private T[] array;
        public MyGenericArray(int size)
        {
            array = new T[size + 1];
        }
        public T getItem(int index)
        {
            return array[index];
        }
        public void setItem(int index, T value)
        {
            array[index] = value;
        }
    }
    class Tester
    {
        static void Main(string[] args)
        {
            // 声明一个整型数组
            MyGenericArray<int> intArray = new MyGenericArray<int>(5);
            // 设置值
            for (int c = 0; c < 5; c++)
            {
                intArray.setItem(c, c * 5);
            }
            // 获取值
            for (int c = 0; c < 5; c++)
            {
                Console.Write(intArray.getItem(c) + " ");
            }
            Console.WriteLine();
            // 声明一个字符数组
            MyGenericArray<char> charArray = new MyGenericArray<char>(5);
            // 设置值
            for (int c = 0; c < 5; c++)
            {
                charArray.setItem(c, (char)(c + 97));
            }
            // 获取值
            for (int c = 0; c < 5; c++)
            {
                Console.Write(charArray.getItem(c) + " ");
            }
            Console.WriteLine();
            Console.ReadKey();
        }
    }
}
```

##5-1-1 性能 1.泛型的主要优点是性能。对值类型使用非泛型集合类，在把值类型转换为引用类型，和把引用类型转换为值类型时，需要进行装箱和拆箱操作。 2.值类型存储在栈上，引用类型存储到堆上。C#类是引用类型，结构是值类型。.net 很容易把值类型转换为引用类型 。所以可以在需要对象的任意地方使用值类型。从值类型转换为引用类型称为装箱。例如，int 可以赋予一个对象。从值类型转换为引用类型称为装箱。如果方法需要把一个对象作为参数，同时传递一个值类型，装箱操作就会自动进行。另一方面,装箱的值类型可以使用拆箱操作转换为值类型。在拆箱时,需要使用类型强制转换运算符。
下面的例子要装箱一个整数类型。在读取 ArrayList 中的值时，要进行拆箱。把对象转换为整数类型。可以使用类型强制转换运算符把 ArrayList 集合的第与个元素赋予变量 i1,在访问 int 类型的变量 i2 的 forcach 语句中，也耍使用类型强制转换运算符:

```
var list = new ArrayList();
list.Add(44); //装箱—将值类型转换为引用类型
int il = (int)list[0]；    // 拆箱—将引用类型转换为值类型
foreach (int i2 in list)
{
Console.WriteLine(i2);
}
```

装箱和拆箱操作很容易使用，但性能损失比较大,遍历许多项时尤其如此。

3.System.Collections.Generic 名称空间中的 List<T>类不使用对象，而是在使用时定义类型。List()类的泛型类型定义为 int,所以 int 类型在 JIT 编译器动态生成的类中使用，不再进行装箱和拆箱操作：

```
var list = new List<int> ();
list-Add{44}; // 装箱—将值类型转换为引用类型
int i1 = list [0]; // no unboxing, no cast needed
foreach (int i2 in list)
{
    Console.WriteLine(i2);
}
```

##5.1.2 类型安全 1.泛型的另一个特性是类型安全，与 AirayList 类一-样，如果使用对象，就可以在这今焦合中添加任意类型。下面的例子在 AnayList 类型的集合中添加一个整数、一个字符串和一个 MyClass 类型的对象:

```
var list = new ArrayList();
list.Add(44);
list.Add("mystring");
list.Add(new MyClass{});
```

2.如果这个集合使用下面的 foreach 语句迭代，而该 foreach 语句使用整数元素来迭代，编译器就
会编译这段代码。但并不是集合中的所有元素都可以强制转换为 int,所以会出现一个运行异常：

```
foreach (int i in list)
{
    Console.WriteLine(i);
}
```

3.错误应尽早发现。在泛型类 List<T>中，泛型类型 T 定义了允许使用的类型。有了 List<int>定义，就只能把整数类型添加到集合中。编译器不会编译这段代码，因为 Add()方法的参数无效;

```
var list = new List<int>();
list.Add(44);
list.Add("mystring"); // 编译时错误
list.Add(new MyClass()); // 编译时错误
```

##5.1.3 二进制代码的重用 1.泛型允许更好地重用二进制代码。泛型类可以定义一次，井且可以用许多不同的类型实例化。
不需要访问源代码。
例如,System.Collections.Generic 名称空间中的 List<T>类用一个 int、一个字符串和一个 MyClass 类型实例化：

```
var list = new List<int>();
list.Add(44);
var stringList = new List <string>();
stringList .Add("mystring");
var myClassList = new List<MyClass>();
myClassList.Add(new MyClass());
```

泛型类型可以在一种语言中定义，在任何其他.NET 语言中使用。

##5.1.4 代码的扩展
因为泛型类的定义会放在程序集中，所以用特定类型实例化泛型类不会在 IL 代码中复制这些类。但是，在 JIT 编译器把泛型类编译为本地代码时,会给每个值类型创建一个新类。引用类型共享同一个本地类的所有相同的实现代码。这是因为引用类型在实例化的泛型类中只需要 4 个字节的内存地址(32 位系统)，就可以引用一个引用类型。值类型包含在实例化的泛型类的内存中，同时因为每个值类型对内存的要求都不同，所以要为每个值类型实例化一个新类。

##5.1.5 命名约定 1.泛型类型的命名规则：
① 泛型类型的名称用字母 T 作为前缀。
② 如果没有特殊的要求，泛型类型允许用任意类替代，且只使用了一个泛型类型，就可以用
字符 T 作为泛型类型的名称。

```
public class List<T> { }
public class LinkedList<T> { }
```

③ 如果泛型类型有特定的要求(例如，它必须实现一个接 U 或派生自基类)，或者使用了两个或
多个泛型类型|就应给泛型类型使用描述性的名称：

```
public delegate void EventHandler<TEventArgs>(object sender,TEventArgs e);
public delegate TOutput Converter<TInput, TOutput>(TInput from);
public class SortedList<TKey, TValue> {}
```

#5.2 创建泛型类 1.首先是非泛型的简化链表类，它可以包含任意类型的对象，以后再把这个类转化为泛型类。在链表中，一个元素引用下一个元索。所以必须创建一个类，它将对象封装在链表中，并引用下一个对象。类 LinkedListNode tl 含一个属性 Value,该属性用构造函数初始化。另外，LinkedListNode 类包含对链表中下一个元素和上一个元紊的引用，这些元素都可以从厲性中访问。

```
public class LinkedListNode
{
    public LinkedListNode(object value)
    {
        this.Value = value;
    }
    public object Value{get;private set;}

    public LinkedListNode Next{get;internal set;}
    public LinkedListNode Prev{get;internal set;}
}
```

2.LinkedList 类包含 LinkedListNode 类型的 First 和 Last 属性，它们分别标记了链表的头尾。AddLast()方法在链表尾添加一个新元素。首先创建一个 LinkedListNode 类型的对象。如果链表是空的，First 和 Last 属性就设置为该新元素；否则，就把新元素添加为链表中的最后一个元素。通过实现 GetEnumerator()方法，可以用 foreach 语句遍历链表。GetEnumerator()方法使用 yield 语句创建一个枚举器类型。

```
public class LinkedList: IEnumerable
{
    public LinkedListNode First {get; private set;}
    public LinkedListNode Last {get; private set; }

    public LinkedListNode AddLast(object node)
    {
        var newNode = new LinkedListNode(node);
        if (First == null)
        {
            First = newNode;
            Last = First;
        }
        else
        {
            LinkedListNode previous = Last;
            Last.Next = newNode;
            Last = newNode;
            Last.Prev = previous；
        }
        return newNode;
    }

    public IEnumerator GetEnumerator()
    {
        LinkedListNode current = First;
        while (current != null)
        {
            yield return current.Value;
            current = current.Next;
        }
    }
}
```

现在可以对于任意类型使用 LinkedList 类了。在下面的代码段中，实例化了一个新 LinkedList 对象。添加了两个整数类型和一个字符串类型。整数类型要转换为一个对象，所以执行装箱操作，如前面所述。通过 foreach 语句执行拆箱操作。在 foreach 语句中，链表中的元素被强制转换为整数，
所以对于链表中的第 3 个元素，会发生一个运行异常，因为把它强制转换为 int 时会失败。

```
var listl = new LinkedList();
listl.AddLast(2);
listl.AddLast(4);
1istl.AddLast(M6");
foreach (int i in listl)
{
Console.WriteLine(i);
}
```

下面创建链表的泛型版本。泛型类的定义与•般类类似，只是要使用泛型类型声明。之后，泛型类型就可以在类中用作一个字段成员，或者方法的参数类型。LinkedListNode 类用一个泛型类型 T 声明。属性 Value 的类型是 T,而不是 object。构造函数也变为可以接受 T 类型的对象。也可以返
冋和设置泛型类型，所以属性 Next 和 Prev 的类型是 LinkedListNode<T>(代码文件 LinkedListSample/
LinkedListNode.cs)。

```
public class LinkedListNode<T>
{
public LinkedListNode(T value)
this.Value = value;
)
public T Value ( get; private set; }
public LinkedListNode<T> Next { get; internal set;)
public LinkedListNode<T> Prev { get; internal set; }
}
```

下面的代码把 LinkedList 类也改为泛型类。LinkedList<T>包含 LinkedListNode<T>元素。
LinkedList 中的类型 T 定义了类型 T 的属性 First 和 Last。AddLast()方法现在接受类型 T 的参数，并实例化 LinkedListNode<1>类型的对象。
除了 IEnumerable 接口，还有一个泛型版本 IEnumerable<T>。IEnumerable<T>派生自 lEnumerable,添加了返回 IEnumerator<T>的 GetEnumerator()方法,LinkedList<T>实现泛型接 U lEnumerable<T>(代
时文件 LinkcdListSample/LinkedList.cs)o
枚举与接口 IEnumerable 和 IEnumerator 详见第 6 章，

```
public class LinkedList<T>: IEnumerable<T>
public LinkedListNode<T> First { get; private set;)
public LinkedListNode<T> Last { get; private set; }
public LinkedListNode<T> AddLast(T node)
{
var newNade = new LinkedListNode<T>(node);
if (First == null)
I
First = newNode;
Last = First;
)
else
(
LinkedListNode<T> previous = Last;
Last.Next = newNode;
Last =■ newNode;
Last-Prev = previous;
}
return newNode;
)
public IEnurnerator<T> GetEnumerator {)
<
LinkedListNode<T> current = First；
while (current != null)
{
yield return current.Value;
current = current.Next;
}
)
lEnumerator lEnumerable.GetEnumerator()
i
return GetEnumerator{);
}
}
```

使用泛型 LinkedListO.可以用 int 类型实例化它，且无须装箱操作。如果不使用 AddLastO
方法传递 int,就会出现一个编译错误.使用泛型 Enumerable<T>, foreach 语句也是类型安全的，
如果 foreach 语句中的变量不是 int,就会出现一个编译错误(代码文件 LinkedListSample/Program.cs)

```
var list2 = new LinkedList<int>();
list2.AddLast⑴;
list2.AddLast(3);
list2-AddLast(5};
foreach tint i in list2)
{
Console-WriteLine(i);
}
```

同样，可以对于字符串类型使用泛型 LinkedListO,将字符串传递给 AddLastQ 方法，

```
var list3 = new LinkedList<string>();
list3.AddLast (,,2M);
list3.AddLast("four");
list3.AddLast("foo");
foreach (string s in list3)
(
Console.WriteLine(s);
)
```

每个处理对象类型的类都可以有泛型实现方式。另外，如果类使用了层次结构，
泛型就非常有助于消除类型强制转换操作。

#5-5 泛型结构

#5-6 泛型方法 1.实例：创建泛型方法，实现对两个数的求和运算

```
using System;
namespace GenericDelegateAppl
{
   class TestDelegate
   {
       private static void Add<T>(T a,T b)
       {
           double sum = double.Parse(a.ToString()) + double.Parse(b.ToString());
           Console.WriteLine(sum);
       }
       static void Main(string[] args)
       {
           Add<double>(3.3, 4);
           Add<int>(3, 4);
       }
   }
}
```

2.Swap<T>（）方法把 T 定义为泛型类型，该泛型类型用于两个参数和一个变量

#5.3 泛型类的功能
在创建泛型类时，还需要一些其他 C#关键字。例如，不能把 null 赋予泛型类型。此时，如下一
节所述，可以使用 default 关键字。如果泛型类型不需要 Object 类的功能，但需要调用泛型类上的某
些特定方法，就可以定义约束。
本节讨论如下主题：
•默认值
・约束
•继承
•静态成员
首先介绍一个使用泛型文档管理器的示例。文档管理器用于从队列中读写文档。先创建•一个新的
控制台项 DocumentManager■ 并添加 DocumentManager<T>类。AddDocumentO 方法将—个文档添加
到队列中。如果队列不为空，IsDocumentAvailable 只读厲性就返回 true(代码文件 DocumentManager/
DocumentManager.cs)。

```
using System;
using System.Collections.Generic;
namespace Wrox.ProCSharp.Generics
public class DocumentManager<T>
(
private readonly Queue<T> documentQueue = new Queue<T>();
public void AddDocument(T doc)
{
lock (this)
documentQueue.Enqueue(doc);
p {
ublic bool IsDocLunentAvailable
get ( return documentQueue.Count > 0; 1
)
)
```

#5.3.1 默认值
现在给 DocumentManager<T>类添加一个 GetDocumentO 方法。在这个方法中，应把类型 T 指定
为 null。但是，不能把 mill 赋予泛型类型。原因是泛型类型也可以实例化为值类型，而 null 只能用
于引用类型。为了解决这个问题，可以使用 defcult 关键字。通过 deftult 关键字’将 null 赋予引用
类型，将 0 赋予值类型。

```
public T GetDocument()
{
T doc = default(T)；
lock (this}
{
doc = documentQueue.Dequeue()7
)
return doc;
)
```

defeult 关键字根据上下文可以有多种含义。switch 语句使用 defeult 定义默认情况.在
泛型中，根据泛型类型是引用类型还是值类型，泛型 defeult 用于将泛型类型初始化为 null
或 0.

#5.3.2 约束

如果泛型类需要调用泛型类型中的方法，就必须添加约束。
对于 DocumentManagerOT 文档的所有标题应在 DisplayAIlDocumentsO 方法中显示。Document
类实现带有 Title 和 Content 属性的 IDocument 接口 (代码文件 DocumentManager/Document.cs):

```
public interface IDocument
string Title { get; set; }
string Content { get; set; }
J
public class Document: IDocument
{
public Document()
{
1
public Document(string title, string content)
this.Title = title;
this.Content = content;
public string Title { get; set; }
public string Content { get; set; }
```

要使用 DocumentManager<T>类显示文档，可以将类型 T 强制转换为［Document 接口，以显示
标题(代码文件 DocumentManager/DocumentManager.cs)：
public void DisplayAllDocuments()
(
foreach (T doc in documentQueue)
Console.WriteLine(((IDocument)doc).Title);
问题是.如果类型 T 没有实现 IDocument 接口，这个类型强制转换就会导致一个运行异常。最
好给 DocumentManager<TDocument>类定义\_••个约束：TDocument 类型必须实现 IDocument 接口。
为了在泛型类型的名称中指定该要求，将 T 改为 TDocumento where 子句指定了实现 IDocument 接
口的要求。
public class DocumentManager<TDocument>
where TDocument: IDocument
(
这样就可以编写 foreach 语句，从而使类型 TDocument 包含属性 Titleo Visual Studio IntelliSense
和编译器都会提供这个支持。
public void DisplayAllDocuments()
(
foreach (TDocument doc in documentQueue)
(
Console.WriteLine(doc.Title);
)
}
在 Main()方法中，用 Document 类型实例化 DocumentManager<T>类，而 Document 类型实现了
1 腰的 IDocument 接口。接着添加和显示新文档，检索其中一个文档(代码文件 DocumentManager/
Program.cs)：

```
static void Main()
(
var dm = new DocumentManager<Document>();
dm.AddDocument(new Document("Title A", "Sample A"));
dm.AddDocument(new Document("Title B", "Sample B"));
dm.DisplayAl1Documents();
if (dm.IsDocumentAvailable)
Document d - dm.GetDocument();
Console.WriteLine(d.Content};
)
)
```

DocumentManager 现在可以处理任何实现了 IDocument 接口的类。
在示例应用程序中，介绍了接口约束。泛型支持几种约束类型，如表 5-1 所示，
表 5~1
• - - — ——— -- - ■ - . - - - — - , . - - ••+ ■ ■ - ■
(^) 只能为默认构造函数定义构造函数约束，不能为其他构造函数定义构造函数约束，I
使用泛型类型还可以合并多个约束。whereT:IFoo,newO 约束和 MyClassO 声明指定，类型 T
必须实现 IFoo 接口，且必须有一个默认构造函数。
public class MyClass<T>
where T: IFoo, new()
{
(2) 在 O 中，where 子句的一个重要限制是，不能定义必须由泛型类型实现的运算符，
；:运算符不肖边接口中定义.在 where 子句中，只能定义基类.接口和默认构造函数.
#5.3.3 继承
前面创建的 LinkedListO 类实现了正 numerableO^口：
public class LinkedList<T>: IEnumerable<T>
(
泛型类型可以实现泛型接口，也可以派生自-个类。泛型类可以派生自泛型基类:

```
public class Base<T>
public class Derived<T>: Base<T>
```

其要求是必须重复接口的泛型类型，或者必须指定基类的类型，如下例所示:

```
public class Base<T>
public class Derived<T>: Base<string>
```

于是，派生类可以是泛型类或非泛型类。例如，可以定义一个抽象的泛型基类，它在派生类中
用一个具体的类型实现。这允许对特定类型执行特殊的操作：

```
public abstract class Calc<T>
(
public abstract T Add(T x, T y);
public abstract T Sub(T x, T y);
}
public class IntCalc: Calc<int>
(
public override int Add(int x, int y)
(
return x + y;
}
public override int Sub(int x, int y)
(
return x - y;
}
}
```

#5.3.4 静态成员
泛型类的静态成员需要特别关注。泛型类的静态成员只能在类的一个实例中共享。下面看一个
例 f,其中 StaticDemoO 类包含静态字段 x:

```
public class StaticDemo<T>
public static int x;
```

III 尸同时对一个 string 类型和
•个 int 类型使用了 StaticDemo<I>^,所以存在两组静态字段：

```
S ta t i cDemo<s t r i ng>.x = 4;
StaticDemo<int>.x * 5;
Console.WriteLine(StaticDemo<string>.x); // writes 4
```

#5.4 泛型接口
使用泛型可以定义接口，在接口中定义的方法可以带泛型参数。在链表的示例中，就实现了
IEnuinerable<outT>接口，它定义了 GetEnumeratorQ 方法，以返回 Enumerator<outT>。.NET 为不同
的情况提供丁许多泛型接口，例如 IComparable<T>ICollection<T>和 IExtensibIeObject<T>\* 同，•
个接口常常存在比较老的非泛型版本，例如，-NET 1.0 有基于对象的 IComparable 接口。
IComparable<in T>基于一个泛型类型：

```
public interface IComparable<in T>
{
int CompareTo(T other)；
}
```

比较老的非泛型接口 IComparable 需要一个带 CompareToO 方法的对象。这需要强制转换为特定
的类型，例如，Person 类要使用 LastName 属性，就需要使用 CompareToO 方法：

```
public class Person： ICo叩arable
(
public int Compare To (object obj)
{
Person other = obj as Person;
return this.lastname.CompareTo(other・LastName}；
}
//
实现泛型版本时，不再需要将object的类型强制转换为Pereon：
public class Person： IComparable<Person>
public int CompareTo(Person other)
(
return this.LastName.CompareTo(other-LastName);
)
```

#5.4.1 协变和抗变
在.NET4 之前，泛型接口是不变的。.NET4 通过协变和抗变为泛型接口和泛型委托添加了一个
重要的扩展。协变和抗变指对参数和返问值的类型进行转换。例如，可以给一个需要 Shape 参数的
方法传送 Rectangle 参数吗？下面用示例说明这些扩展的优点。
在.NET 中，参数类型是协变的。假定有 Shape 和 Rectangle 类，Rectangle 派生自 Shape 基类。
声明 DisplayO 方法是为了接受 Shape 类型的对象作为其参数：
public void Display(Shape o) { }
现在可以传递派生自 Shape 基类的任意对象。因为 Rectangle 派生自 Shape，所以 Rectangle 满
足 Shape 的所有要求，纊译器接受这个方法调用：
var r = new Rectangle { Width: 5f Height=2-5 };
方法的返回类型是抗变的。当方法返回一个 Shape 时，不能把它赋予 Rectangle，因为 Sh^ie 不
--定总是 Rectangle。反过来是可行的：如果一个方法像 GetRectangleQ 方法那样返回一个 Rectangk，
public Rectangle GetRectangle{);
就可以把结果赋予某个 Shape：
Shape s = GetRectangle();
在.NETFramework4 版本之前，这种行为方式不适用于泛型，在 C#4 中，扩展后的语言支持泛
型接口和泛型委托的协变和抗变。下面开始定义 Shape 基类和 Rectangle 类（代码文件
Wiance/Shape.cs 和 Rectangle.cs)：

```
public class Shape
public double Width { get; set; }
public double Height { get; set; )
public override string ToString ()
{
return String.Format「Width: {0}, Height: U T'* Width, Height);
}
public class Rectangle: Shape
{
}
```

#5.4.2 泛型接口的协变
如果泛型类型用 out 关键字标注，泛型接口就是协变的。这也意味着返回类型只能是 T。接口
Ilndex 与类型丁是协变的，并从••个只读索引器中返回这个类型（代码文件 VarianceJIndex.cs）：
public interface IIndex<out T>
T this[int index] { get;
int Count ( get;)
Hndex<T>接口用 RectangleCollection 类来实现。RectangleCollection 类为泛型类型 T 定义了
Rectangle：
如杲对接口 flndex 使用了读写索引器，就把泛型类型 T 传递给方法，并从方法中
检索这个类型.这不能通过协变来实一型类型必须定义为不变的，不使用 out
和 in 标注，就可以把类型定义为不变的（代码文件 Wiance/RectangleCollection）

```
public class RectangleCollection: IIndex<Rectangle>
private Rectangle[] data = new Rectangle[3]
new Rectangle { Height=2, Width=5 },
new Rectangle { Height=3, Width=7 },
new Rectangle { Height=4.5, Width-2・9 }
}；
private static RectangleCollection coll;
public static RectangleCollection GetRectangles 0
{
return coll ?? (coll = new RectangleCollection());
}
public Rectangle this[int index]
{
get
I
if (index < 0 || index > data.Length)
throw new ArgunentOutOfRangeException (^index1*);
return data(index];
}
public int Count
{
get
{
return data.Length;

```

RectangleCtollection-GetRectanglesO 方法使用了本章后面将会介绍的合并运算符
（coalescing operator〉\*如果变量 coll 为 null,那么将会调用运算符的右侧，以创建
RectangleCollection 的一个新实例，并将其賦给变量 coll，之后，会从 GetRectanglesf）
I； 方法中返回变量 coll.
RectangleCollection.GetRectangleO 方法返回一个实现 nndex<Rectangle>S 口的 RectangleCollection
类，所以可以把返回值赋予 IIndex<Rectangle>^型的变量 Rectangle。因为接口是协变的，所以也可以
把返回值赋予 nndex<Shape>类型的变量。Sh^re 不需要 Rectangle 没有提供的内容。使用 shapes 变量,
就可以在 for 循环中使用接口中的索引器和 Count 属性(代码文件 Variance/Program.cs):

```
Static void Main{)
{
IIndex<Rectangle> rectangles = RectangleCollection.GetRectangles();
IIndex<Shape> shapes = rectangles;
for (int i = 0; i < shapes.Count; i++)
{
Console.WriteLine(shapes[il)；
}
```

#5.4.3 泛型接口的抗变
如果泛型类型用 in 关键字标注，泛型接口就是抗变的。这样，接口只能把泛型类型 T 用作其方
法的输入(代码文件 Variance/IDisplay.cs):

```
public interface IDisplay<in T>
(
void Show(T item);
ShapeDisplay类实现IDisplay<Shape>,并使用Shape对象作为输入参数(代码文件Variance/
ShapeDisplay.es)：
public class ShapeDisplay: IDisplay<Shape>
{
public void Show(Shape s)
{
Console.WriteLine("{0) Width: {1}, Height: {2}", s.GetTypeO.Name,
s.Width, s.Height);
)
```

创建 ShapeDisplay 的一个新实例，会返回 lDisplay<Shape>,并把它赋予 shapeDisplay 变量。因
为 lDisplay<T>是抗变的，所以可以把结果赋予 IDisplay<Rectangle>,其中 Rectangle 派生自 Shape<>
这次接 U 的方法只能把泛型类型定义为输入，而 Rectangle 满足 Shape 的所有要求(代码文件
Variance/Program.cs):

```
static void Main()
{
//...
IDisplay<Shape> shapeDisplay = new ShapeDisplay();
IDisplay<Rectangle> rectangleDisplay = shapeDisplay;
rectangleDisplay.Show(rectangles[0]);
```

#5.5 泛型结构
与类相似.结构也可以是泛型的。它们非常类似于泛型类.只是没有继承特性。本节介绍泛型
结构 Nullable<T>.它由.NET Framework 定义。
.NET Framework 中的•个泛型结构是 Nullable<T>。数据库中的数字和编程语言中的数字侖显
矜不同的特征，因为数据库中的数 7 可以为空，而 C#中的数字不能为空。lnt32 是一个结构.而结
构的实现 M 值类型.所以结构不能为空。这种区别常常令人很头捕，映射数据也耍多做汴多辅助
工作。这个问题不仅存在于数据痄中.也存在于把 XML 数据映射到.NET 类型。

--种解决方案是把数据库和 XML 文件中的数字映射为引用类型，因为引用类型可以为空值。
但这也会在运行期间带来额外的系统开销。
便用 NullableO 结构很容易解决这个问题。下面的代码段说明了如何定义一个简
化版本，结构 NullableO 定义了一个约束，其中的泛型类型 T 必须是一个结构。把类定义为泛型
类型后’就没有低系统开销这个优点了，而且因为类的对象可以为空，所以对类使用 NuliableO
类型是没有意义的。除了 Nullable^定义的 T 类型之外，唯一的系统开销是 has 地 lue 布尔字段，
它确定是设置对应的值，还是使之为空。除此之外，泛型结构还定义了只读属性 HasValue 和 Value,
以及一些操作符重载。把 NuDable<I>类型强制转换为丁类型的操作符重载是显式定义的，因为当
hasV^hie 为 ^时，它会抛出一个异常。强制转换为 Nunable<I>类型的操作符重载定义为隐式的,
因为它总是能成功地转换：

```
public struct Nullable<T>
where T: struct
public Nullable(T value)
this-hasValue = true;
this.value = value;
}
private bool hasValue;
public bool HasValue
{
get
{
return hasValue;
)
)
private T value;
public T Value
{
get
{
if {ShasValue)
(
throw new InvalidOperationException("no value"):
)
return value;
}
}
public static explicit operator T(Nullable<T> value)
{
return value.Value;
J
publicstatic implicit operator Nullable<T>(T value)
return new Nullable<T>(value);
1
public override string ToString (}
if (JHasValue)
return String.Empty;
return this.value.ToString();
```

在这个例子中，NullableOffl Nullable<int>实例化。变量 x 现在可以用作一个 int,进行赋值或
使用运算符执行一些计算。这是因为强制转换了 NullableO 类型的运算符。但是，x 还可以为空。
Nullable<T>的 HasWlue 和 Value 属性可以检查是否有一个值，该值是否可以访问：

```
Nullable<int> x;
x = 4;
x += 3;
if (x.HasValue)
{
int y = x.Value;
}
x = null;
```

因为可空类型使用得非常频繁，所以 C#有•种特殊的语法，它用于定义可空类型的变量。定义
这类变量时，不使用泛型结构的语法，而使用“？”运算符。在下面的例子中，变量 xl 和 X2 都是可
空的 int 类型的实例：
Nullable<int> xl;
int? x2;
可空类型可以与 null 和数字比较，如上所示。这里，x 的值与 null 比较，如果 x 不是 null,它
就与小于 0 的值比较：
int? x = GetNullableType();
if (x == null)
<
Console.WriteLine("x is null");
I
else if (x < 0)
Console.WriteLine("x is smaller than 0");
知道 r Nullable<1>是如何定义的之后，下面就使用可空类型。可空类型还可以与算术运算符-
起使用。变是变!d xl 和 x2 的和。如果这两个可空变景中任何•个的值是 null,它们的和就是
nullo
int? xl = GetNullableType();
int? x2 二 GetNullableType();
int? x3 = xl + x2;

的 int.为了进行测试，简单起见，可以使实现的 GetNullableType()返回 null 或返回任意整数.
非可空类型可以转换为可空类型。从非可空类型转换为可空类型时，在不需要强制类型转换的
地方可以进行隐式转换。这种转换总是成功的：
int yl = 4;
int? xl = yl;
但从可空类型转换为非可空类型可能会失败。如果可空类型的值是 mill,井且把 null 值赋予非
可空类型，就会抛出 InvalidOperationException 类型的异常。这就是需要类型强制转换运算符进行显
式转换的原因：
int? xl = GetNullableType ();
int yl = (int)xl；
如果不进行显式类型转换，还可以使用合并运算符从可空类型转换为非可空类型。合并运算符
的语法是“??"，为转换定义了一个默认值，以防可空类型的值是 null。这里，如果 xl 是 mill, yl
的值就是 0。
int? xl = Ge t Null able Type ;
int yl = xl ?? 0;

#5.6 泛型方法 1.除了定义泛型类之外，还可以定义泛型方法。在泛型方法中，泛型类型用方法声明来定义。泛
型方法可以在非泛型类中定义。
2.Swap<T>()方法把 T 定义为泛型类型，该泛型类型用于两个参数和一个变量 temp：

```
void Swap<T>(ref T x, ref T y}
{
    T temp;
    temp = x;
    x = y;
    y = temp;
}
```

2.把泛型类型赋予方法调用，就可以调用泛型方法：

```
int i = A;
int j = 5;
Swap<int>(ref i, ref j);
```

但是，因为 C#编译器会通过调用 Swap()方法来获取参数的类型，所以不需要把泛型类型赋予
方法调用。泛型方法可以像非泛型方法那样调用：

```
int i = 4;
int j - 5;
Swap (ref i, ref j);
```

##5.6.1 泛型方法示例
5.6.1——5.6.3 示例 使用泛型方法累加集合中的所有元素
①Account.cs

```
using System;
namespace Wrox.ProCSharp.Generics
{
  //接口定义了只读属性Balance和Name
  public interface IAccount
  {
    decimal Balance { get; }
    string Name { get; }
  }
   //包含Name和Balance属性的Account类
   //重构的Account类实现接口IAccount
  public class Account : IAccount
  {
    public string Name { get; private set; }
    public decimal Balance { get; private set; }
    public Account(string name, Decimal balance)
    {
      this.Name = name;
      this.Balance = balance;
    }
  }
}
```

②Algorithm.cs

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
namespace Wrox.ProCSharp.Generics
{
   //累加Account对象传统方式是用foreach遍历所有Account对象
  public static class Algorithm
  {
      //方法参数是IEnumerable类型
      //可用于所有实现接口的集合类
      //版本1，只能用于Account对象
      public static decimal AccumulateSimple(IEnumerable<Account> source)
    {
      decimal sum = 0;
      //使用IEnumerable接口迭代集合元素，处理实现接口的每个对象
      foreach (Account a in source)
      {
        //直接访问Account对象的Balance属性
        sum += a.Balance;
      }
      return sum;
    }
    //带约束的泛型方法。接受了实现IAccount接口的任意类型
    //方法参数修改为IEnumerable<T>,泛型集合类实现的泛型接口
    public static decimal Accumulate<TAccount>(IEnumerable<TAccount> source)
        //泛型类型可以用where子句来限制。可以用于泛型方法
        where TAccount : IAccount
    {
      decimal sum = 0;
      foreach (TAccount a in source)
      {
        sum += a.Balance;
      }
      return sum;
    }
    //带委托的泛型方法，使用了两个泛型参数T1和T2，第一个用于实现了IEnumerable<T1>参数集合
    //第二个使用泛型委托Fun<T1,T2,TResult>第二、三个泛型参数是T2类型。
    //需要传递的方法有两个输入参数一个T2类型的返回值。
    public static T2 Accumulate<T1, T2>(IEnumerable<T1> source, Func<T1, T2, T2> action)
    {
      T2 sum = default(T2);
      foreach (T1 item in source)
      {
        sum = action(item, sum);
      }
      return sum;
    }
  }
}
```

③Program.cs

```
using System.Collections.Generic;
namespace Wrox.ProCSharp.Generics
{
  class Program
  {
    static void Main()
    {
      //应累加余额的所有账户操作添加到List<Account>类型账户列表
      var accounts = new List<Account>()
      {
        new Account("Christian", 1500),
        new Account("Stephanie", 2200),
        new Account("Angela", 1800),
        new Account("Matthias", 2400)
      };
      //AccumulateSimple()方法的调用
      decimal amount = Algorithm.AccumulateSimple(accounts);
      //带约束后可以调用新的Accumulate()方法，
      //decimal amount = Algorithm.Accoumulate<Account>(accounts);
      //编译器会从方法的参数类型自动推断出泛型类型参数，以下方法有效
      amount = Algorithm.Accumulate(accounts);
      //第一个参数IEmumerable<Account>类型，第二个使用Lambda表达式来定义Account和decimal两个类型参数，
      //返回一个小数，对于每一项通过Accumulate方法调用Lambda表达式
      amount = Algorithm.Accumulate<Account, decimal>(accounts, (item, sum) => sum += item.Balance);
    }
  }
}
```

1.说明泛型方法的功能，下面使用包含 Name 和 Balance 厲性的 Account 类

```
public class Account
{
    public string Name { get; private set;)
    public decimal Balance { get; private set; }
    public Account(string name, Decimal balance)
    {
    this.Name = name;
    this.Balance = balance;
    }
}
```

2.其中应累加余额的所有账户操作都添加到 List<Account>类型的账户列表中。

```
var accounts = new List<Account>()
{
    new Account("Christian", 1500),
    new Account("Stephanie", 2200),
    new Account("Angela", 1800),
    new Account("Matthias", 2400)
)；
```

3.累加所有 Account 对象的传统方式是用 foreach 语句遍历所有的 Account 对象，如下所示。foreach 语句使用 IEnumerable 接口迭代集合的元素，所以 AccumulateSimple()方法的参数是 Enumerable 类型。foreach 语句处理实现正 numerable 接 L1 的每个对象。这样，AccumulateSimple()方法就可以用于所打实现 IEnumerable<Account>接口的集合类。在这个方法的实现代码中，直接访问 Account 对象的 Balance 属性。

```
public static class Algorithm
{
    public static decimal AccumulateSimple(IEnumerable<Account> source)
    {
        decimal sum = 0;
        foreach (Account a in source)
        {
        sum += a.Balance;
        }
        return sum;
    }
}
```

AccumulateSimple()方法的调用方式如下：
decimal amount a Algorithm.AccumulateSimple(accounts);
##5.6.2 带约束的泛型方法
第一个实现代码的问题是，它只能用子 Account 对象。使用泛型方法就可以避免这个问题。Accumulate()方法的第二个版本接受实现了 lAccount 接口的任意类型。如前面的泛型类所述，泛型类型可以用 where 子句来限制，用于泛型类的这个子句也可以用于泛型方法。Accumulate()方法的参数改为 IEnumerable<T>。IEnumerable<T>是泛型集合类实现的泛型接口

```
public static decimal Accumulate<TAccount> (IEnumerable<TAccoLint> source)
where TAccount: lAccount
{
    decimal sun = 0;
    foreach (TAccount a in source}
    {
        sum += a.Balance;
    }
    return sum;
}
```

重构的 Account 类现在实现接口 IAccount：

```
public class Account: IAccount
{
    //...
IAccount 接口定义了只读属性 Balance 和 Name。
public interface IAccount
{
    decimal Balance { get; }
    string Name { get; }
}
```

将 Account 类型定义为泛型类型参数，就可以调用新的 Acculate()方法。
decimal amount = Algorithm.Accumulate<Account>(accounts);
因为编译器会从方法的参数类型中自动推断出泛型类型参数，所以以如下方式调用 Accumulate()方法是有效的：
decimal amount = Algorithm.Accumulate(accounts);

##5.6.3 带委托的泛型方法
泛型类型实现 IAccount 接口的要求过于严格。下面的示例提示了，如何通过传递一个泛型委托
来修改 Accumulate()方法。这个 Accumulate()方法使用两个泛型参数 T1 和 T2。第一个参数 T1 用于实现了 IEnumerable<T1>参数的集合，第二个参数使用泛型委托 Fun<Tl,T2,TResult>。其中，第 2 个和第 3 个泛型参数都是 T2 类型。需要传递的方法有两个输入参数(T1 和 T2>和一个 T2 类型的返回值

在调用这个方法时，需要指定泛型参数类型，因为编译器不能 G 动推断出该类型。对于方法的
第 1 个参数，所赋予的 accounts 集合是 IEnumerable<Account>类型。对于第 2 个参数，使用一个
Lambda 表达式来定义 Account 和 decimal 类型的两个参数，返回一个小数。对于每一项，通过
Accumulate()方法调用这个 Lambda 表达式(代码文件 GenericMethods/Program.cs):
decimal amount = Algorithm.Accumulate<Account/ decimal>(
accounts, (item, sum) => sum += item.Balance);
不要为这种语法伤脑筋。该示例仅说明了扩展 Accumulate()方法的可能方式。第 8 章详细介绍
J' Lambda 表达式。

5.6.4 泛型方法规范
实例以及规范解释

```
using System;
namespace Wrox.ProCSharp.Generics
{
    public class MethodOverloads
    {
        //泛型方法可以重载，为特定的类型定义规范。在此定义了两个方法规范版本。
        //编译期间最佳匹配，传递int就选择带int参数的方法，其它泛型方法。
        //①接受泛型参数
        public void Foo<T>(T obj)
        {
            Console.WriteLine("Foo<T>(T obj), obj type: {0}", obj.GetType().Name);
        }
        //②用于Int参数的专用版本
        public void Foo(int x)
        {
            Console.WriteLine("Foo(int x)");
        }
        public void Bar<T>(T obj)
        {
            Foo(obj);
        }
    }
    //Foo()方法现在可以通过任意参数类型来调用。下面的示例代码给该方法传递了int和string：
    class Program
    {
        static void Main()
        {
            var test = new MethodOverloads();
            //输出选择了最佳匹配的方法：
            test.Foo(33);//输出Foo(int x)
            test.Foo("abc");//输出 Foo<T>(T obj), obj type ：String
            //调用方法在编译期间定义，而不是运行期间。编译期间选择Bar()方法调用的Foo()方法。
            //由于Bar()方法定义了一个泛型参数，而且泛型Foot()方法匹配这个类型，所以调用了 Foo()方法，
            //在运行期间给Bar()方法传递一个int值不会改变这一点。
            test.Bar(44);
        }
    }
}

```
