---
title: 数组
categories:
    - C#
---

## 同一类型和不同类型的多个对象

如果需要使用同一类型的多个对象，就可以使用集合和数组。C#用特殊的记号声明、初始化和使用数组。Array 类在后台发挥作用，它为数组中元素的排序和过滤提供了几个方法。使用枚举器，可以迭代数组中的所有元素。需要使用不同类型多个对象，可以使用(Tuple)元组类型。

## 简单数组

如果需要使用同一类型的多个对象，就可以使用数组。数组是种数据结构，它可以包含同一类型的多个元素。

### 数组的声明

在声明数组时，应先定义数组中元素的类型，其后是一对空方括号和一个变量名。例如，下面声明了一个包含整型元素的数组：

```
int[]myArray
```

### 数组的初始化

声明了数组后，就必须为数组分配内存，以保存数组的所有元素。数组是引用类型，所以必须给它分配堆上的内存。为此，应使用 new 运算符，指定数组中元素的类型和数量来初始化数组的变量，下面指定了数组的大小。

```csharp
myArray = new int[4]；
```

在声明和初始化数组后，变量 myArray 就引用了 4 个整型值，它们位于托管堆上。在指定了数组的大小后，如果不复制数组中的所有元素，就不能重新设置数组的大小。如果事先不知道数组中应包含多少个元素，就可以使用集合。
除了在两个语句中声明和初始化数组之外，还可以在一个语句中声明和初始化数组:

```csharp
int[] myArray = new int[4];
```

还可以使用数组初始化器为数组的每个元素赋值。数组初始化器只能在声明数组变量时使用，不能在声明数组之后使用。

```csharp
int[] myArray = new int(4) {4, 7, 11, 2};
```

如果用花括号初始化数组，则还可以不指定数组的大小，因为编译器会自动统计元素的个数：

```csharp
int[] myArray = new int[] {4, 1, 11, 2};
```

使用 c#编译器还有一种更简化的形式，使用花括号可以同时声明和初始化数组，编译器生成的代码与前面的例子相同：

```csharp
int[] myArray = {4, 1, 11, 2};
```

### 访问数组元素

在声明和初始化数组后，就可以使用索引器访问其中的元素了。数组只支持有整型参数的索引器。通过索引器传递元素编号，就可以访问数组。
索引器总是以 0 开头，表示第一个元素。可以传递给索引器的最大值是元素个数减 1,因为索引从 0 开始。在下面的例子中，数组 myArray 用 4 个整型值声明和初始化。用索引器对应的值 0、1、2 和 3 就可以访问该数组中的元素。

```csharp
int[] myArray = new int[]{4, 7, 11, 2};
int v1 = myArray[0];
int v2 = myArray[1];
myArray[3] = 44;
```

如果使用错误的索引器值(大于数组的长度)，就会抛 IndexOutOfRangeException 类型的异常。

如果不知道数组中的元素个数。则可以在 for 语句中使用 Length 属性：

```csharp
for (int i = 0; i < myArray.Length; i++)
{
Console.WriteLine(myArray[i]);
}
```

除了使用 for 语句迭代数组中的所存元素之外，还可以使用 foreach 语句:

```csharp
foreach (var val in myArray)
{
Console.WriteLine(val);
}
```

### 使用引用类型

除了能声明预定义类型的数组，还可以声明自定义类型的数组。
下面用 Person 类来说明，这个类有自动实现的属性 Firstname 和 Lastname，以及从 Object 类重写的 ToString()方法:

```csharp
using System;
namespace Wrox.ProCSharp.Arrays
{
  public class Person
  {
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public override string ToString()
    {
      return String.Format("{0} {1}", FirstName, LastName);
    }
  }
}
```

声明一个包含两个 Person 元素的数组与声明一个 int 数组类似：

```csharp
Person[] myPersons = new Person[2]；
```

但是必须注意，如果数组中的元素是引用类型，就必须为每个数组元素分配内存。若用了数组中未分配内存的元素，会抛出 NullReferenceException 类型的异常。

使用从 0 开始的索引器，可以为数组的每个元素分配内存：

```csharp
myPersons[0] * new Person { FirstName="AyrtonM, LastName="Senna" };
myPersons[1] = new Person {FirstName"Michael”,LastName="Schumacher" }；
```

myPeraons 是存储在栈上的一个变量，该变量引用了存储在托管堆上的 Person 元素对应的数组。这个数组有足够容纳两个引用的空间，数组中的每一项都引用了一个 Peison 对象，而这些 Person 对象也存储在托管堆上。

与 int 类型一样，也可以对自定义类型使用数组初始化器:

```csharp
Person(] myPersons2 =
{
new Person { FirstName="Ayrton", LastName=,"Senna"},
new Person { FirstName="Michael", LastName="Schumacher"}
}；
```

## 多维数组

一般数组（也称为一维数组）用一个整数来索引。多维数组用两个或多个整数来索引。
在 C#中声明一个二维数组 a=[1,2,3][4,5,6][7,8,9]
需要在方括号中加上一个逗号。数组在初始化时应指定每一维的大小（也称为阶）。接着，就可以使用两个整数作为索引器来访问数组中的元素：

```csharp
int[,]twodim = new int[3, 3];
twodim[0,0] =1;
twodim[0,1] = 2;
twodim[0,2] = 3;
twodim[1,0] = 4;
twodim[1,1]=5;
twodim[1,2]=6;
twodim[2,0]=7;
twodim[2,1]=8;
twodim[2,2]=9;
```

如果事先知道元素的值，则也可以使用数组索引器来初始化二维数组。在初始化数组时，使用-个外层的花括号，每一行用包含在外层花括号中的内层花括号来初始化。

```
int[,] twodim = {
                            {1, 2, 3},
                            {4,5,6},
                            {7,8,9}
}；
```

使用数组初始化器时，必须初始化数组的每个元素，不能遗漏任何元素。
在花括号中使用两个逗号，就可以声明一个三维数组:

```
int[,,] threedim ={
            ({1,2},{3,4}),
            ({5,6},{7,8}),
            ({9,10},{11,12}),
            };
Console.WriteLine (threedim [0, 1, 1]);

```

## 锯齿数组

二维数组的大小对应于一个矩形，如对应的元素个数为 3X3。而锯齿数组的大小设置比较灵活，在锯齿数组中，每一行都可以有不同的大小。

二维数组：
1 2 3
4 5 6
7 8 9
锯齿数组：
1 2
3 4 5 6 7 8
9 10 11

在声明锯齿数组时，要依次放置左右括号。在初始化锯齿数组时，只在第 1 对方括号中设置该数组包含的行数。定义各行中元素个数的第 2 个方括号设置为空，因为这类数组的每一行包含不同的元素个数。之后为每一行指定行中的元素个数：

```
int [][]  jagged = new int[3][];
jagged[0] = new int[2] { 1, 2 };
jagged[1] - new int[6J { 3, 4, 5, 6, 7, 8 };
jagged[2] = new int[3]{ 9, 10, 11 };
```

迭代锯齿数组中所有元素的代码可以放在嵌套的 for 循环中。在外层的 for 循环中迭代每一行，在内层的 for 循环中迭代一行中的每个元素：

```csharp
for (int row = 0; row < jagged.Length; row++)
{
    for (int element = 0； element < jagged[row].Length;element++)
    {
        Console.WriteLine("row: {0}, element: {1}, value: {2)", row, element,
jagged[row][element]);
    }
}
```

---

## Array 类

用方括号声明数组是 C#中使用 Array 类的表示法。在后台使用 C#语法，会创建一个派生自抽象基类 Array 的新类。这样，就可以使用 Arrey 类为每个 C#数组定义的方法和属性了。例如，前面就使用了 Length 属性，或者使用 foreach 语句迭代数组。其实这是使用了 Array 类中的 GetEnumeratorO 方法。
Array 类实现的其他属性有 LongLength 和 Rank。如果数组包含的元素个数超出了整数的取值范围，就可以使用 LongLength 属性来获得元素个数。使用 Rank 属性可以获得数组的维数。下面通过了解不同的功能来看看 Array 类的其他成员。

### 创建数组

Array 类是一个抽象类，所以不能使用构造函数来创建数组。但除了可以使用 C #语法创建数组实例之外，还可以使用静态方法 CreatelnstanceO 创建数组。如果事先不知道元素的类型，该静态方法就非常有用，因为类型可以作为 Type 对象传递给 Createlnstancef)方法。下面的例子说明了如何创建类型为 int、大小为 5 的数组。CreatelnstanceO 方法的第 1 个参数应是元素的类型，第 2 个参数定义数组的大小。可以用 SetValueO 方法设置对应元素的值，用 GetValueQ 方法读取对应元素的值(代码文件 SimpleArrays4Jrogram.cs):

```
Array intArrayl = Array.Createlnstance (typeof (int) r 5〉；
for (int i = 0; i < 5; i++)
{
intArrayl.SetValue{33, i);
}
for (int i = 0; i < 5; i+- + )
<
Console. WriteLine < int Array 1. GetValue ⑴)；
}
```

还可以将己创建的数组强制转换成声明为 in 们的数组：

```
int f] intArray2 = (int[))intArrayl;
```

CreatelnstanceO 方法有许多重载版本，可以创建多维数组和不基于 0 的数组。下面的例子就创
建了个包含 2X3 个元素的二维数组。第一维基于 1，第二维基于 10:
int[] lengths = { 2, 3
int|] lowerBounds = { 1, 10 };
Array racers = Array-Createlnstance(typeof(Person), lengths, lowerBounds);
SetMueO 方法设置数组的元素，其参数是毎-维的索引：
racera.SetValue(new Person
FirstName - "Alain",
LastName = HProstM
}f indexl: lf index2: 10);
racers・ SetValue(new Person
{
FirstName = "Emerson"1,
LastNeune - "Fittipaldi11
}t 1, 11);
racers.SetValue(new Person
<
FirstName - "Ayrton",
LastName =・Senna"
}f 1, 12)；
racers 一 SetValue(new Person
{
FirstName = "Michael",
LastName ■ "Schumacher"
h 2, 10"
racers.SetValue(new Person
{
FirstName ■ "Fernando",
LastName ・"Alonso",
b 2, 11>?
racers 一 SetValue(new Person
{
FirstName ■ Jenson",
LastName = “Button"
}f 2, 12);
尽管数组不是基于 0,但可以用一般的 c#«示法将它賦予一个变量。只^注意不要超出边界
即可：
Person[,] racers2 = (Person[K)}racers;
Person first = racers2[l, 10];
Person last - racers2[2, 12]；

### 复制数组

因为数组是引用类型，所以将一个数组变量賦予另一个数组变量，就会得到两个引用同一数组
的变量。而复制数组，会使数组实现 ICloneable 接口，这个接口定义的 CkmeO 方法会创建数组的浅
表副本。
如果数组的元素是值类型，以下代码段就会复制所有值，

```
int[] 1ntArrayl = {1, 2);
int[J intArray2 = (int[])intArray1.Clone(}:
```

如果数组包含引用类型，则不复制元素，而只复制引用。
显示了变量 beatles 和 beatlesClone> 其中 beatlesClone 通
过从 beatles 中调用 CkmeO 方法来创建、beatles 和 beatlesClone
引用的 Person 对象是相同的一如果修改 beatlesClone 中一个元素的属性，就会改变 beatles 中的对应对象(代码文件 SimpleAiray/Program.cs)
Person(] beatles = {
new Person { FirstName=" John'\ ,
new Person { FirstName»"Pauln, LastName 番"McCartney" }
J;
Person[] beatlesClone = (Person[])beatles.Clone {);

除了使用 Clone() 方法之外，还可以使用 Array.Copy() 方法创建浅表副本。但 CloneO 方法和 Copy()方法有一个重要区别：CloneO 方法会创建一个新数组，而 Copy() 方法必须传递阶数相同且有足够元素的己有数组。如果需要包含引用类型的数组的深层副本，就必须迭代数组并创建新对象。

## 排序

Amy 类使用 Quicksort 算法对数组中的元素进行排序。SortO 方法需要数组中的元素实现
IComparable 接口。因为简单类型(如 System.String 和 System.lnt32)实现 IComparable 接口，所以可以
对包含这些类型的元素排序。
在示例程序中，数组 name 包含 string 类型的元素’这个数组可以排序(代码文件 SortingSaiqMe/
Program.cs)。
string[} names = {
"Christina Aguilera",
"Shakira1',
"Beyonce”，
"Lady Gaga\*1
1；
Ar ray-Sort(names);
foreach (vdr name in names)
1
Console.WriteLine(name);
}
该应用程序的输出是排好序的数组：
Beyonce
Christina Aguilera
Lady Gaga
Shakira
如果对数组使用自定义类，就必须实现 ICon^k 接口，这个接口只定义了一个方法
CompareToO.如果要比较的对象相等，该方法就返回 0。如果该实例应排在参数对象的前面，该方
法就返回小于 0 的值。如果该实例应排在参数对象的后面，该方法就返回大于 0 的值，
修改 Person 类，使之实现 IComparable< Person>接口。先使用 String 类中 CompareToO 方法对
LastName 的值进行比较。如果 LastName 的值相同，就比较 FirstName(代码文件 SortingSample/
Program.cs)：
public class Person: IComparable< Person>
{
public int CompareTo(Person other)
{
if (other -= nullj return 1;
int result = string,Compare(this.LastName, other.LastName);
if (result == 0)
{
result = string.Compare(this-FirstName, other-FirstName};
}
return result;
现在可以按照姓氏对 Person 对象对应的数组排序(代码文件 SortingSample/Programcs):
Person[) persons (
new Person { FirstName 番"Damon", LastName=HHi11N ,
new Person { FirstName 番"Niki”, LastName*"Lauda” },
new Person ( FirstName 番"Ayrton，*r LastName 番"Senna" },
new Person { FirstName=,,Graham", LastName=r,Hi 11 ■' }
);
Array.Sort(persons);
foreach (var p in persons)
(
Console.WriteLine(p);
}
使用 Person 类的排序功能，会得到按姓氏排序的姓名：
Damon Hill
Graham Hill
Niki Lauda
Ayrton Senna
如果 Person 对象的排序方式与上述不同，或者不能修改在数组中用作元素的类，就可以实现
ICon^er 接口或 IComparer^接口。这两个接口定义了方法 CompareO。要比较的类必须实现这两
个接口之一，IComparer 接口独立于要比较的类，这就是 CompareO 方法定义了两个要比较的参数的
原因.其返回值与 IComparable 接口的 ComparelbO 方法类似。
类 PersonComparer 实现了 IComparer< Person>接口，可以按照 firatName 或 lastName 对 Person

对象排序。枚举 PersonCompareType 定义了可用于 PersonComparer 的排序选项：FirstName 和
LastName。排序方式由 PersonComparer 类的构造函数定义，在该构造函数中设置了一个
PersonCompareType 值。实现 CompareO 方法吋用一个 switch 语句指定是按 FirstName 还是 LastName
排序(代码文件 SortingSample/PersonComparer.cs)。
public enum PersonCompareType
{
FirstName,
LastName
I
public class PersonComparer: IComparer< Person>
{
private PersonCompareType compareType;
public PersonComparer(PersonCompareType compareType)
{
this.compareType = compareType;
)
public int Compare(Person x. Person y)
{
if (x == null && y == null) return 0;
if (x == null) return 1;
if (y == null) return -1;
switch (compareType)
{
case PersonCompareType.FirstName:
return string.Compare(x.FirstName, y.FirstName);
case PersonCompareType.LastName:
return string.Compare(x.LastName, y.LastName);
default:
throw new ArgumentException("unexpected compare type");
I
J
}
现在，可以将一-个 PersonComparer 对象传递给 Array.SortO 方法的第 2 个参数。下面按名字对
persons 数组緋#(代码文件 SortingSample/Program.cs)：
Array.Sort(persons, new PersonComparer(PersonCompareType.FirstName));
foreach (var p in persons)
賓
Console.WriteLine(p);
I
persons 数组现在按名字排序：
Ayrton Senna
Damon Hill
Graham Hill
Niki Lauda

Array 类还提供了 Sort 方法，它需要将一个委托作为参数。这个参数可以传递给方
法，从而两个对象，而不需要依赖 IConq)arable 或 ICon^jarer 接口，第 8 章将介紹
:委托。
1

## 数组作为参数

数组可以作为参数传递给方法，也可以从方法中返回。要返回 个数组，只需要把数组声明为
返回类型，如下面的方法 GetPersonsO 所示：
static Person[] GetPersons()
return new Person[] {
new Person { FirstName=,,Danion"r LastName=nHill"),
new Person { FirstName=NNiki", LastName^1* Lauda'* },
new Person { FirstNajne-,,Ayrton", LastNaine=r,Sennar, },
new Person { FirstName=,,Graham \ \*', LastNanie-hHi 11" }
};
要把数组传递给方法，应把数组声明为参数，如下面的 DisplayPersonsO 方法所示：
static void DisplayPersons(Person[] persons)
{
//...

### 数组协变

数组支持协变。这表示数组可以声明为基类.其派生类型的 7G 素可以赋予数组元素。
例如，可以声明\ _ -个 ot(ject[]类型的参数，给它传递一个 Person[]：
static void DisplayArray(object[J data)
:'~ ~ ■ - +♦. — - - \ _\ \ \_ - ♦ ... 命 .
it - -—  
数组协变只能用于引用类型，不能用于值类型。另外，数组协变有 ■-个问题，它
ii 只能通过运行时异常来解决.如果把 Person 数组賦予 object 数组，ot^ject 数组就可以
使用派生自 ol^ject 的任何元素.例如，编译器允许把字符串传递给数组元素，但因为
9 object 数组引用 Pereon 数组，所以会出现一个运行时异常 AirayI\peMismatchException.

### ArraySegment< T>

结构 AnaySegmenKT^表示数组的一段。如果需要使用不同的方法处理某个大型数组的不同部
分，那么可以把相应的数组部分复制到各个方法中。此时，与创建多个数组相比，更有效的方法是

使用一个数组，将整个数组传递给不同的方法。这些方法只使用数组的某个部分。方法的参数除了
数组以外.还应包括数组内的偏移量以及该方法应该使用的元素数。这样一来，方法就需要至少 3
个参数。当使用数组段时，只需要一个参数就可以了。AiraySegment< I>结构包含了关于数组段的
信息(偏移量和元素个数)。
SumOfSegmentsO 方法提取-组 AnaySegment< int>元素，计算该数组段定义的所有整数之和，
并返冋粮数和(代码文件 ArraySegmentSample/Program.cs)：
static int SumOfSegments(ArraySegment< int>[] segments)
{
int sum = 0;
foreach (var segment in segments)
(
for (int i = segment.Offset; i < segment.Offset +
segment.Count; i++)
{
sum += segment.Array(i];
}
)
return sum;
)
使用这个方法吋，传递了一个数组段。第一个数组元素从 arl 的第一个元素开始，引用了 3 个
元素：第二个数组元素从 ar2 的第 4 个元素开始，引用了 3 个元素；
int[] arl = { 1, 4, 5, 11, 13, 18 };
int(] ar2 =《3, 4, 5, 18, 21, 27, 33
var segments = new ArraySegment< int>[2]
(
new ArraySegment< int>(arl, 0, 3),
new ArraySegment< int>(ar2, 3, 3)
I；
var sum = SumOfSegments(segments);
㉘
数组段不复制原数组的元素，但原数组可以通过 AiraySegmentO 访问.如果数
组段中的元素改变了，这些变化就会反映到原数组中。

## 枚举

在 foreach 语句中使川枚率，可以迭代览合(参见第 10 章)中的元素，且无须知道集合中的元素
个数。foreach 语句使 W 了 一个枚平器。图 6-7 显示了调用 foreach 方法的客户端和集合之间的关系。
数组或災含实现带 GetEumerator() Jj 法的 lEumerable 接 U。GetEumerator()方法返冋一个实现
lEumerable 接 U 的枚堆。接着，foreach 语句就可以使用 lEumerable 接 U 迭代集合了。

GetEmunCTatorO 方法用 Enumerable 接口定义.foreach 语句并不真的需要在集合
类中实现这个接口.有一个名为 GetEnumeratorO 的方法，它返因实现了 Enumerator
＞接口的对象就足够了.

### lEnumerator 接口

foreadi 语句使用 Enumerator 接口的方法和属性，迭代集合中的所有元素。为此’ Enumerator
定义丁 Current 属性’来返回光标所在的元素，该接口的 MoveNextO 方法移动到集合的下一个元素
上，如果有这个元素，该方法就返冋 true。如果集合不再有更多的元素，该方法就返冋 false.
这个接口的泛型版本 IEnumerator ＜ T ＞派生 Q 接口 [Disposable，因此定义了 Dispose0 方法，来清
理枚举器占用的资源。
Enumerator 接口还定义了 ResetO 方法，以与 COM 交互操作.许多.NET 枚举器
通过抛出 NotSupportedException 类型的昇常，来实现这个方法.

### foreach 语句

Of 的 foreach 语句不会解析为 IL 代码中的 foreach 语句》C#编译器会把(breach 语句转换为
IEnumerable 接口的方法和属性。下面是一条简单的 foreach 语句，它迭代 peraons 数组中的所有元素，
并逐个显疏们：
foreach (var p in persons)
Console.WriteLine(p);
}
foreach 语句会解析为下面的代码段。首先，调用 GetEnumeratorO 方法，获得数组的一 一个枚举器。
在 while 循环中 只要 MoveNextQ 返回 tme 就用 Current 属性访问数组中的元素：
IEnuraerator< Person> enumerator = persons.GetEnurnerator()；

while (enumerator.MoveNext())
{
Person p = enumerator.Current;
Console.WriteLine(p);
} 一

### yield 语句

自 C#的第 1 个版本以来，使用 foreach 语句可以轻松地迭代集合。在 C# 1.0 中，创建枚举器仍
炁要做大量的工作。C#2.0 添加了 yield 语句，以便于创建枚举器。yield return 语句返回集合的一个
元素，并移动到下一个元素上。yield break 可停止迭代。
下一个例子是用 yield return 语句实现-个简单集合的代码。HelloCollecrion 类包含
GetEnumeratorO 方法。该方法的实现代码包含两条 yield return 语句，它们分别返回字符串 Hello 和
World(代码文件 YieldDemo/Program.cs).
using System;
using System.Collections;
namespace Wrox.ProCSharp.Arrays
{
public class HelloCollection
<
public IEnumerator< string> GetEnumerator()
(
yield return "Hello";
yield return "World";
)
I
/) 包含 yield 语句的方法或属性也称为迭代块.迭代块必须声明为返回［Enumerator
或 IEnumerable 接口，或者这些接口的泛型版本。这个块可以包含多条 yield return 语
句或 yield break 语句，但不能包含 return 语句.
现在可以用 foreach 语句迭代集合了：
public void HelloWorld()
var helloCollection = new HelloCollection();
foreach (var s in helloCollection)
(
Console.WriteLine(s);
使川迭代块，编译器会卞成 t yield 类别，其中包含一个状态机，如下而的代妈段所 yield
类增实现 1 Enumerator 和 I Disposable 接 I」的 W 性和方法。在下曲的例 f 中，可以把 yield 类槪符作
内部类 Enumerator。外部类的 GetEnumeratorO 方法实例化并返问一个新的 yield 类型。在 yield 类期
屮，变 state 义了迭代的当前位置，侮次调用 MovcNexK)时，当前位賢都会改变。MoveNext()

封装了迭代块的代码，并设置了 current 变量的值，从而使 Current 属性根据位置返回一个对象，
public class HelloCollection
{
public ifcnumerator GetEnumerator()
(
return new Enumerator(0};
}
public class Enumerator: IEnumerator< string>, lEnumerator, IDisposable
(
private int state;
private string current;
public Enumerator(int state)
{
this.state « state;
}
bool System.Collections 一 IEnumerator,MoveNext(>
{
switch (state)
{
case 0:
current = "Hello1';
state = 1;
return true;
case 1:
current = "World";
state = 2;
return true;
case 2:
break；
)
return false;
}
void System.Collections.IEnumerator.Reset()
{
throw new NotSupportedException(J;
}
string System.Collections-Generic.IEnumeuator< string>.Current
return current;
)
)
object System.Collections.IEnumerator.Current
{
get
{
return current;
}

void IDisposable-Dispose(}
}
(^\ yield 语句会生成一个枚举器，而不仅仅生成一个包含的项的列表.这个枚举器通
^7^过 fcreach 语句调用。从 fcreach 中依次访问每一项时，就会访问枚举器.这样就可以
迭代大量的数据，而无须一次把所有的数据都读入内存. 1.迭代集合的不同方式
在下面这个比 Hello World 示例略大但比较真实的示例中，可以使用 yield return 语句，以不同方
式迭代集合的类。类 MusicTitles 可以用默认方式通过 GetEnumeratorO 方法迭代标题，用 Reversed
方法逆序迭代标题，用 SubsetO 方法迭代子集(代码文件 YieldDemo/MusicTitIes.cs}:
public class MusicTitles
(
string[J names = { "Tubular Bells", "Hergest Ridge", "Ommadawn",
"Platinum-);
public IEnuinerator< string> GetEnumerator(}
for (int i ; 0; i < 4; i++)
{
yield return names(i];
}
)
public IEnumerable< string> Reverse{)
for (int i = 3; i >= 0; i--)
{
yield return names[i]；
J
I
public IEnumerable< string> Subset(int index, int length)
for (int i - index; i < index + length； i++)
yield return names(i]r

类支持的默认迭代是定义为返回 IEnumerator 的 GetEnumeratorO 方法.命名的迭
代返因 Enumerable.
迭代字符串数组的客户端代码先使用 GetEnumeratorO 方法，该方法不必在代码中编写，因为这
是 fcreach 语句默认使用的方法。然后逆序迭代标题，最后将索引和要迭代的项数传递给 SubsetO 方
法，来迭代子集(代码文件'^eldDemo/Prograni.cs):
var titles = new MusicTitles();
foreach {var title in titles)
Console.WriteLine(title);
)
Console.WriteLine ＜〉;
Console.WriteLine("reverse");
foreach (var title in titles.Reverse⑴
Console-WriteLine(title);
)
Console.WriteLine();
Console.WriteLine("subset");
foreach (var title in titles.Subset(2, 2})
Console,WriteLine(title)；
} 2.用 yield return 返回枚举器
使用 yield 语句还可以完成更复杂的任务，例如，从 yield return 中返回枚举器。在 TicTacToe 游
戏中有 9 个域，玩家轮流在这些域中放置一个“十”字或，一个圆，这些移动操作由 GameMoves 类
模拟=方法 CrossO 和 CircleO 是创建迭代类型的迭代块。变 M cross 和 circle 在 GameMoves 类的构造
函数中设置为 CrossO 和 CircleO 方法。这些字段不设置为调用的方法，而是设置为用迭代块定义的迭
代类型。在 CrossO 迭代块中，将移动操作的信息写到控制台卜.，井递增移动次数，如果移动次数大
于 8,就用 yield break 停止迭代：否则，就在每次迭代中返因 yield 类型 circle 的枚举对象。CircleO
迭代块非常类似于 CrossO 迭代块，只是它在每次迭代中返回 cross 迭代器类型(代码文件
YieldDemo/GameMoves.cs).
public class GameMoves
{
private IEnumerator cross;
private IEnumerator circle;
public GameMoves()
(
cross = Cross ();
circle = Circle();
}

private int move = 0;
const int MaxMoves = 9;
public IEnumerator Cross()
<
while (true)
{
Console.WriteLine("Cross, move (0}", move);
if (++move >= MaxMoves)
yield break;
yield return circle;
)
}
public IEnumerator Circle()
{
while (true)
{
Console.WriteLine("Circle, move {0)", move);
if (++move >= MaxMoves)
yield break;
yield return cross;
I
I
I
在客户端程序中，可以以如下方式使用 GameMoves 类。将枚举器设置为由 game.CrossO 返回的
枚举器类型，以没置第一次移动。在 while 循环中，调用 enumerator.MoveNextO。第一次调用
enumerator.MoveNext()吋，会调用 CrossO 方法，Cross()方法使用 yield 语句返回另一个枚举器。返回
的值可以用 Current 属性访问，并设置为 enumerator 变量，用于下一次循环：
var game = new GameMoves();
IEnumerator enumerator = game.Cross();
while (enumerator.MoveNext())
(
enumerator = enumerator.Current as IEnumerator;
I
这个程序的输 II!会显示交锊移动的情况.直到最后一次移动：
Cross, move 0
Circle, move 1
Cross, move 2
Circle, move 3
Cross, move 4
Circle, move 5
Cross, move 6
Circle, move 7
Cross, move 8

## 元组

数组合并了相同类型的对象，而元组合并了不同类型的对象。元组起源于函数编程语言(如 F#),
在这些语言中頻繁使用元组。在.NETFramework 中，元组可用于所有的.NET 语言。
.NETFramework 定义了 8 个泛型 Tuple 类(自.NET4.0 以来)和一个静态 Tuple 类，它们用作元组的
工厂。不同的泛型 T 叩 le 类支持不同数量的元素。例如，Tuple< ri>^含一个元素，Tuple< ri, T2>^
含两个元素，依此離
方法 DivideO 返回包含两个成员的元组 T 叩 lKMinf。泛型类的教 8(定义了成员的类型，它们都
是元组用静态 Tuple 类的静态 CreateO 方法创建。CreateO 方法的泛型参数定义了要实例化的元
组类型。新建的元组用 result 和 reminder 变量初始化，返回这两个变量相除的结果(代码文件
Tq)leSanq>le/Prograni-cs)：
public static Tuple< int, int> Divide(int dividend, int divisor)
{
int result = dividend / divisor;
int reminder = dividend % divisor;
return Tuple.Create< int/ int>(result, reminder);
}
下面的代码说明丁 DivideO 方法的调用。可以用属性 Iteml 和 Item2 访问元组的项：
var result = Divide(5, 2};
Console.WriteLine("result of division: (0}, reminder: {1,
result.Iteml, result. It 帥 2"
如果元组包含的项超过 8 个，就可以使用带 8 个参数的 Tuple 类定义，最后一个模板参数是
TRest,表示必须给它传递一个元组。这样，就可以创建带任意个参数的元组了。
下面说明这个功能：
public class Tuple< Tl, T2, T3, T4, T5, T6, T7, TRest>
其中，最后一个模板参数是一个元组类型，所以可以创建带任意多项的元组：
var tuple = Tuple.Create< string, string, string, int, int, int, double,
Tuple< int, int>>("Stephanie”， "Alina", -Nagelh, 2009, 6， 2, 1.37,
Tuple.Create< int, int>(52, 3490));

## 结构比较

数组和元组都实现接口 IStructuralEquatable 和 IStiucturalComparable^这两个接口都是.NET 4 新
増的，不仅可以比较引用，还可以比较内容。这些接口都是显式实现的，所以在使用时需要把数组
和元组强制转换为这个接口 lsmicturaffiquatable 接口用于比较两个元组或数组是否有相同的内容，
IStructuralComparable 接口用于给元组或数组排序。
对于说明 IStmcturalEquataHe 接口的示例，使用实现 IEquatable 接口的 Person 类《 IEquatable 接

口定义了一个强类型化的 EqualsO 方法，以比较 FirslName 和 LastName 属性的值（代码文件
StiucturalConparisoii/Personxs）：
public class Person: IEquatable< Person>
1
public int Id { get; private set; }
public string FirstName { get; set; }
public string LastName { get; set; }
public override string ToString()
{
return String.Format("{0}» 11} (2}", Td, FirstName, LastName);
}
public override bool Equals(object obj}
if (obj == null}
return base.Equals(obj);
return Equals(obj as Person};
}
public override int GetHashCode()
{
return Id.GetHashCode();
}
public bool Equals(Person other)
{
if (other == null)
return base.Equals(other);
return this.Id == other.Id && this.FirstName == other,FirstName &‘
this.LastNane == other.LastName;
现在创建了两个包含 Person 项的数组。这两个数组通过变量名 janet 包含相同的 Person 对象，
和两个内容相同的不同 Person 对象。比较运算符“!=”返回 true,因为这其实是两个变量 personsl
和 pe_2 引用的两个不同数组，因为 Array 类没有重写带一一个参数的 EqualsO 方法，所以用
运算符比较引用也会得到相同的结果.即这两个变量不相同（代码文件 StructuralComparison/
Program.cs）；
var janet = new Person i FirstName = nJanet", LastName = "Jackson,F \;
Person [ ] personsl = <
new Person
1
FirstName = "Michael",
LaatName = "Jackson
h
janet
）;
Person 门 persons2 -（
new Person

FirstName = "Michael",
LastName = 11 Jackson"
J,
janet
};
if (personsl != persons2)
Console-WriteLine ("not the same reference1);
对于 IStracturalEquatable 接口定义的 EqualsO 方法，它的第一个参数是 o 切 ect 类型，第二个参数
是 IEqualityConq)arer 类型。调用这个方法时，通过传递个实现了 IEqualityComparer< T>W 对象，
就可以定义如何进行比较。通过 EqualityComparer< T>类完成 IEqualityComparer 的一个默认实现。
这个实现检查该类型是否实现丁 lEquatable 接口，并调用正 quatable.EqualsO 方法。如果该类型没有
实现 IEquatable，就调用 Ot(ject 基类中的 EqualsO 方法进行比较《
Person 实现 IEquatable< Persoii>,在此过程中比较对象的内容，而数组的确包含相同的内容：
if ((personsl as IStruc turalEquatable} .Equals (persons2,
EquslityComparer < Person>，Default))
Console - WriteLine t "the same content”；
}
下面看看如何对元组执行相同的操作。这里创建了两个内容相同的元组实例。当然，因为引用
tl 和 t2 引用了两个不同的对象，所以比较运算符返回 true：
var tl = Tuple.Create< int, string> (1, "Stephanie");
var t2 = Tuple・Create< int, string>(1, ^Stephanie");
if (tl t2)
Console・WriteLine (Mnot the same reference to the tuple1');
Tuple◊ 类提供了两个 EqualsO 方法：—个重写了 Object 基类中的 EqualsO 方法，并把 object 作
为参数，第二个由 IStructuralEqualityComparer 接 L1 定义，并把 object 和 IEqualityComparer 作为参数。
可以给第一个方法传送另一个元组，如下所示。这个方法使用 EqualityComparer< object>.Defeult 获
取一个 ObjectEqua!ityComparer< objecC>>以进行比较。这样，就会调用 Ot(jectEqualsO 方法比较元组
的每一项。如果每一项都返回 true，Equalsf)方法的最终结果就是 true’这里因为 int 和 string 值都相
同.所以返回 true:
if (tl.Equals(t2))
Console.WriteLine(Hthe same content");
还可以使用类 7\ipleConq)arer 创建一个自定义的 IEqualityComparer，如下所示，这个类实现了
IEqualityComparer 接 口的两个方法 EqualsO 和 GetHashCodeO：
class TupleComparer: IEqualityComparer
{
public new bool Equals(object x, object y)
{
return x.Equals(y);
}
154

第 6 章数 组
public int GetHashcode(object obj}
{
return obj-GetHashCode();
实现 IEqualityComparer 接口的 EqualsO 方法需要 new 修饰符或者隐式实现的接口，
因为基类 Object 也定义了带两个参数的静态 EqualsO 方法.
使用 TupleComparer，给 Tuple< Tl, T2>类的 EqualsO 方法传递一个新实例。Tuple 类的 EqualsO
方法为要比较的每一项调用 TupleComparer 的 EqualsO 方法。所以，对于 Tuple<Tl，T2>类，要调用
两次 TupleComparer,以检查所有项是否相等：
if (tl .Equals (t2, new TupleComparer。"
Console.WriteLine("equals using TupleComparer");
6.10 小结
本章介绍了创建和使用简单数组、多维数组和锯齿数组的 C#表示法。C#数组在后台使 Array
类，这样就可以用数组变量调用这个类的厲性和方法。
我们还探讨了如何使用 IComparable 和 IComparer 接口给数组中的元素排序，描述了如何使用
和创建枚举器、^Enumerable 和［Enumerator 接口，以及 yield 语句《
最后介绍了如何在数组中组织相同类型的对象，在元组中组织不同类型的对象。
第 7 章介绍运算符和强制类型转换。
