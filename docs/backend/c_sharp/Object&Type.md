---
title: 对象和类型
categories:
    - C#
---

#3-2

1.类和结构实际上都是创建对象的模板，每个对象都包含数据，并提供了处理和访问数据的方法。

2.类定义了类的每个对象(称为实例)可以包含什么数据和功能，还可以定义处理在这些字段中存储的数据的功能。

接着就可以实例化表示某个顾客的类的对象，为这个实例设置相关字段的值，并使用其功能。

```

class PhoneCustomee

{

    public const string DayOfSendingBill = "Monday";

    public int CustomerlD;

    public string FirstName;

    public string LastName;

}

```

3.结构与类的区别是它们在内存中的存储方式、访问方式(**类是存储在堆(heap)上的引用类型，而结构是存储在栈(stack)上的值类型**)和它们的一些特征(如结构不支持继承)。

4.较小的数据类型使用结构可提髙性能。但在语法上，结构与类非常相似主要的区别是使用关键字\_struct 代替 class 来声明结构。

例如，如果希望所有的 PhoneCustomer 实例都分布在栈上，而不是分布在托管堆上，就可以编写下面的语句：

```

struct PhoneCustomerStruct

{

    public const string DayOfSendingBill = "Monday";

    public int CustomerlD;

    public string FirstName;

    public string LastName;

}


```

5.对于类和结构，都使用关键字 new 来声明实例：这个关键字创建对象并对其进行初始化。

在下面的例子中，类和结构的字段值都默认为 0:

```

PhoneCustomer myCuatoraer = new PhoneCustomer ();

PhoneCustomer Struct myCustomer2 = new PhoneCustatkerStract ();

```

除非特别说明，否则就可以假定用于类的代码也适用于结构。

#3-3 类 1.**类中的数据和函数称为类的成员**。Microsoft 的正式术语对数据成员和函数成员进行了区分。除了这些成员外，类还可以包含嵌套的类型(如其他类)。

2.成员的可访问性可以是 public、protected、 internal、protected、private 或 internal。

##3-3-1 数据成员 1.**数据成员是包含类的数据——字段、常量和事件的成员**。数据成员可以是静态数据。类成员总是实例成员，除非用 static 进行显式的声明。

2.字段是与类相关的变量。前面的例子使用过 PhoneCustomer 类中的字段。实例化 PhoneCustomer 对象后，就可以使用语法

Object.FieldName 来访问这些字段，如下所示：

```

PhoneCustomer Customerl = new PhoneCustomer();

Customerl.FirstName = "Simon";

```

3.常量与类的关联方式和变量与类的关联方式相同。使用 const 关键字来声明常量。如果把它声明为 public,就可以在类的外部访问它。

```

class PhoneCustomer

{

    public const string DayOfSendingBill = "Monday";

    public int CustomerlD;

    public string FirstName;

    public string LastName;

}

```

##3-3-2 函数成员 1.**函数成员提供了操作类中数据的某些功能，包括方法、属性、构造函数和终结器、运算符以及索引器。**

方法是与某个类相关的函数，与数据成员一样，函数成员默认为实例成员。使用 static 修饰符可以把方法定义为静态方法。

属性是可以从客户端访问的函数组.其访问方式与访问类的公共字段类似。C#为读写类中的诚性提供了专用语法，所以不必使用那些名称中嵌有 Get 或 Set 的方法。

构造函数是在实例化对象时自动调用的特殊函数。它们必须与所属的类同名，且不能有返回类型。构造函数用于初始化字段的值

终结器类似于构造函数。

运算符执行的最简单的操作就是加法和减法。

索引器允许对象以数组或集合的方式进行索引。

① 方法

⑴ 方法的声明

方法的定义包括任意方法修饰符(如方法的可访问性)、返回值的类型，然后依次是方法名、输入参数的列表(用圆括号括起来)和方法体(用花括号括起来)，

```

[modifiers]  return_type  MethodName {(parameters)}

// Method body

```

每个参数都包括参数的类型名和在方法体中的引用名称，但如果方法有返回值，return 语句就必须与返回值一起使用，以指定出口点，例如：

public bool IsSguare{Rectangle rect}//Rectangle 表示矩形的.net 基类

{

return (rect.Height == rect.Width);

}

如果方法没有返回值，就把返回类型指定为 void,不能省略返回类型。如果方法不带参数,仍需要在方法名的后面包含一对空的圆括号（）。此时 return 语句就是可选的一当到达右花括号时，

方法会 S 动返回。注意方法可以包含任意多条 return 语句：

```

public bool IsPositive（int value）

{

if (value < 0)

return false;

return true;

}

```

(2)调用方法

在下面的例子中，MathTest 说明了类的定义和实例化、方法的定义和调用的语法。除了包含 MainO 方法的类之外，它还定义了类 MathTest,该类包含几个方法和一个字段。

```

using System;
namespace Unit3
{
    class MainEntryPoint
    {
        static void Main()
        {
            Console.WriteLine("Pi is " + MathTest.GetPi());
            int x = MathTest.GetSquareOf(5);
            Console.WriteLine("Square of 5 is " + x);
            //MathTest实例化
            MathTest math = new MathTest();
            //调用非静态方法
            math.Value = 30;
            Console.WriteLine("Value field of math variable contains " + math.Value);
            Console.WriteLine("Square of 30 is " + math.GetSquare());
        }
    }
    //定义MathTest类，调用一个方法
    class MathTest
    {
        //字段
        public int Value;
        //方法
        public int GetSquare()
        {
            return Value * Value;
        }
        //两个静态方法
        public static int GetSquareOf(int x)
        {
            return x * x;
        }
        public static double GetPi()
        {
            return 3.14159;
        }
    }
}
```

(3)给方法传递参数

**参数可以通过引用或通过值传递给方法。在变量通过引用传递给方法时，被调用的方法得到的就是这个变量，更准确地说，是指向内存中变量的指针，方法退出后仍旧有效。**

**通过值传送给方法，得到的是变量的相同副本，在方法退出后修改会丢失。**

对于复杂的数据类型，按引用传递的效率更髙，因为在按值传递时，必须复制大量的数据。

```

using System;
namespace Unit3
{
    class ParameterTest
    {
        static void SomeFunction(int[] ints, int i)
        {
            ints[0] = 100;
            i = 100;
        }
        public static int Main()
        {
            int i = 0;
            int[] ints = { 0, 1, 2, 4, 8 };
            // 显示原始值
            Console.WriteLine("i = " + i);
            Console.WriteLine("ints[0] = " + ints[0]);
            Console.WriteLine("Calling SomeFunction...");
            // 此方法返回后，将更改变ints，但i不会
            SomeFunction(ints, i);
            Console.WriteLine("i = " + i);
            Console.WriteLine("ints[0] = " + ints[0]);
            return 0;
        }
    }
}
```

⑷ref 参数
通过值传送变量是默认的.也可以迫使值参数通过引用传送给方法。为此，要使用
ref 关键字。如果把一个参数传递给方法，且这个方法的输入参数前带有 ref 关键字，则该方法对变量所做的任何改变都会影响原始对象的值：

```
static void SomeFunction(int(] ints, ref int i)
(
ints[0] = 100;
i = 100; // 对i的更改将在方法退出后保持
}
```

在调用该方法时，还需要添加 ref 关键字：
SomeFunction(ints, ref i);
求对传递给方法的参数进行初始化，传递给方法前，无论是按值传递还是按引用传递，任何变量必须初始化。

(5)out 参数
**out 能够简化编译器所坚持的输入参数的初始化。**
在方法的输入参数前面加上 out 前缀时，传递给该方法的变量可以不初始化。该变试通过引用传递，所以在从被调用的方法中返回时，对应方法对该变最进行的任何改变都会保留下来。在调用该方法时，还需使用 out 关键字，与在定义该方法时一样：

```
static void SomeFunction(out int i)
{
    i = 100;
}
public static int Main()
{
    int i; //注意i声明后没初始化
    SomeFunction(out i);
    Console.WriteLine(i);
    return 0;
}
```

（6）命名参数
参数一般需要按定义的顺序传送给方法。命名参数允许按任意顺序传递。

```
string FullName(string firstName, string lastName)
{
return firstName + " " + LastName;
}
```

下面的方法调用会返回相同的全名：

```
FullName("John","Doe");
FullName(lastName: "Doe", firstName: "John");
```

如果方法有几个参数，就可以在同一个调用中混合使用位置参数和命名参数。
(7)可选参数
参数也可以是可选的。必须为可选参数提供默认值。可选参数还必须是方法定义的最后的参数。
所以下面的方法声明是不正确的：

```
void TestMethod(int optionalNumber = 10, int notOptionalNumber)
System.Console.Write(optionalNumber + notOptionalNumber);
}
```

要使这个方法正常工作，就必须在最后定义 optionalNumber 参数，
(8)方法的重载
重载：方法的几个版本有不同的签名(即，方法名相同，但参数的个数或类型不同)。为了重载方法，只需要声明同名但参数个数或类型不同的方法即可：

```
class ResultDisplayer
{
    void DisplayResult(string result}
    {
        //实现
    }
    void DisplayResult{int result)
    {
    // 实现
    }
}
```

如果不能使用可选参数，就可以使用方法重载来达到此目的：

```
class MyClass
{
    int DoSomething(int x)//使用默认值第二个参数
    {
        DoSomething(x, 10);
    }
        intDoSomething(int x,int y)
    {
            //实现
    }
}
```

重载方法的参数方面限制：

-   两个方法不能仅在返回类型上有区别。
-   两个方法不能仅根据参数是声明为 ref 还是 out 来区分。

② 属性
属性(property)的概念是：它是一个方法或一对方法。
//mainForm 的类型是 System.Windows.Forms
mainForm.Height = 400;
执行这段代码时，窗口的髙度设置为 400,因此窗口会在屏幕上重新设置大小。在语法上,代码类似于设置一个字段。但实际上是调用了属性访问器，它包含的代码重新设置了窗体的大小。
在 C#中定义属性，可以使用下面的语法：

```
public string SomeProperty
(
    get
    {
        return "属性值";
    }
    set
    {
        //做任何设置的事需要属性
    }
}
```

get 访问器不带任何参数，且必须返回属性声明的类型。也不应为 set 访问器指定任何显式参数，但编译器假定它带一个参数，其类型也与属性相同，并表示为 value。例如，下面的代码包含一个属性 Age,它设置了 一个字段 age。在这个例子中，age 表示属性 Age 的后备变量。

```
private int age;
public int Age
{
    get
    {
        return age;
    }
    set
    {
        age = value;
   }
}
```

注意这里所用的命名约定。我们采用 c#的区分大小写模式，使用相同的名称，但公有属性采用 Pascal 大小写形式命名。

(1)只读和只写属性
在属性定义中省略 set 访问器，就可以创建只读属性。因此，如下代码把 Name 变成只读属性：

```
private string name;
public string Name
{
    get
    {
    return Name;
    }
}
```

同样，在属性定义中省略 get 访问器，就可以创建只写属性。

(2)属性的访问修饰符
C#允许给属性的 get 和 set 访问器设置不同的访问修饰符，所以属性可以有公有的 get 访问器和私有或受保护的 set 访问器。这有助于控制属性的设置方式或时间。在下面的代码示例中，注意 set 访问器有一个私有访问修饰符，而 get 访问器没有任何访问修饰符。这表示 get 访问器具有属性的访问级别，在 get 和 set 访问器中，必须有一个具备属性的访问级别，如果 get 访问器的访问级别是 protected,就会产生一个编译错误，因为这会使两个访问器的访问级别都不是属性。

```
public string Name
{
    get
{
    return  _name;
    }
    private set
    {
        _name = value;
    }
}
```

(3)自动实现的属性
如果属性的 set 和 get 访问器中没有任何逻辑，就可以使用自动实现的属性。这种属性会自动实现后备成员变量。前面 Age 示例的代码如下：

```
public int Age {get； set;}
```

不需要声明 private int Age;。编译器会自动创建它。
使用自动实现的属性，就不能在属性设置中验证属性的有效性，所以在上面的例子中，不能检查是否设置了无效的年龄，但必须有两个访问器。尝试把该属性设置为只读属性，就会出错：

```
public int Age {get;}
```

但是，每个访问器的访问级别可以不同。因此，下面的代码是合法的：

```
public int Age (get; private set;)
```

C#通过属性访问字段，而不直接访问字段，这些额外的函数调用不会增加系统开销，导至系统性能下降。C#代码会编译为 IL，然后再运行时 JIT 编译为本地可执行代码。JIT 编译器可生成高度优化的代码，并在适当的时侯随意地内联代码(即用内联代码代替函数调用)。实现某个方法或属性近视调用另一个方法，或返回一个字段，该方法或属性肯定是内联的。在何处内联代码完全由 CLR 决定。 3.构造函数
**声明基本构造函数的语法就是声明一个与包含的类同名的方法，但该方法没有返回类型：**

```
public class MyClass
{
    public MyClass()
    {
    }//余额定义
```

没有必要给类提供构造函数。一般情况下,如果没有提供任何构造函数，编译器会在后台创建一个默认的构造函数。这是一个非常基本的构造函数，它只能把所有的成员字段初始化为标准的默认值(例如，引用类型为空引用，数值数据类型为 0, bool 为 false)。这通常就足够了，否则就需要编写自己的构造函数。
构造函数的重载遵循与其他方法相同的规则。换言之，可以为构造函数提供任意多的重载，只要它们的签名有明显的区别即可：

```
public MyClass() // 构造函数
{
// 构造代码
}
public MyClass(int number) // 另一个过载 another overload
{
// 构造代码
}
```

但是,如果提供了带参数的构造函数，编译器就不会自动提供默认的构造函数。只有在没有定义任何构造函数时.编译器才会自动提供默认的构造函数。在下面的例子中，因为定义了一个带单个参数的构造函数，编译器会假定这是可用的唯一构造函数，所以它不会隐式地提供其他构造函数：

```
public class MyNumber
{
private int number;
public MyNumber(int number)
{
    this.number = number;
}
```

上面的代码还说明.一般使用 this 关键字区分成员字段和同名的参数。如果试图使用无参数的构造函数实例化 MyNumber 对象，就会得到一个编译错误：

```
MyNumber numb = new MyNumber(); // causes compilation(编译) error
```

注意，可以把构造函数定义为 private 或 protected.这样不相关的类就不能访问它们：

```
Public class MyNumber
{
    private int number;
    private MyNumber(int number) // another overload
        {
        this.number = number;
        }
}
```

这个例子没有为 MyNumber 定义任何公有的或受保护的构造函数。这就使 MyNumber 不能使用 new 运算符在外部代码中实例化(但可以在 MyNumber 中编写一个公有静态属性或方法，以实例化该类)。这在下面两种情况下是有用的：

-   类仅用作某些静态成员或属性的容器，因此永远不会实例化它
-   希望类仅通过调用某个静态成员函数来实例化(这就是所谓对象实例化的类工厂方法)
    (1)静态构造函数
    C#的一个新特征是也可以给类编写无参数的静态构造函数。这种构造函数只执行一次，而前面的构造函数是实例构造函数，只要创建类的对象，就会执行它。

```
class MyClass
{
    static MyClass()
    {
        // initialization code
    }
    // rest of class definition
}
```

编写静态构造函数的一个原因是，类有一些静态字段或域性。需要在第一次使用类之前，从外部源中初始化这些静态字段和属性。
.NET 运行库没有确保什么时候执行静态构造函数.所以不应把要求在某个特定时刻(例如，加载程序集时)执行的代码放在静态构造函数中。也不能顶计不同类的静态构造函数按照什么顺序执行。但是，可以确保静态构造函数至多运行一次，即在代码引用类之前调用它。在 C#中，通常在第—次调用类的任何成员之前执行静态构造数。
注意，静态构造函数没有访问修饰符，其他 C#代码从来不调用它，何在加载类时，总是由.NET 运行库调用它，所以像 public 或 private 这样的访问修饰符就没有任何意义。出于同样原因，静态构造函数不能带任何参数，一个类也只能宵一个静态构造函数。很显然.静态构造函数只能访问类的静态成员，不能访问类的实例成员。
无参数的实例构造函数与静态构造函数可以在同一个类中同时定义。尽管参数列表相同，但这并不矛盾.因为在加载类时执行静态构造函数，而在创建实例时执行实例构造函数。所以何时执行哪个构造函数不会有冲突。
如果多个类都有静态构造函数。先执行哪个静态构造函数就不确定。此时静态构造函数中的代码不应依赖于其他静态构造函数的执行情况。另一方面，如果任何静态字段有默认值，就在调用静态构造函数之前指定它们。
下面用一个例 A 来说明静态构造函数的用法，该例子的思想基于包含用户首选项的程序(假定用户首选项存储在某个配置文件中)。为了简单起见。假定只有一个用户首选项—BackColor,它表示要在应用程序中使用的背景色。因为这里不想编写从外部数据源中读取数据的代码。所以假定该首选项在工作日的背景色是红色.在周末的背景色是绿色。程序仅在控制台窗口中显示首选项——但这足以说明静态构造函数是如何工作的。

```
namespace Wrox.ProCSharp.StaticConstructorSampie
{
    public class UserPreferences
    {
        public static readonly Color BackColor;
        static UserPreferences()
         {
            DateTime now = DateTime.Now;
            if (now.DayOfWeek == DayOfWeek.Saturday
                I I now.DayOfWeek == DayOfWeek.Sunday)
                BackColor = Color.Green;
            else
                BackColor = Color.Red;
        }
        private UserPreferences()
       {
        }
    }
}
```

这段代码说明了颜色首选项如何存储在静态变量中.该静态变讎静态构造函数中进行初始化。
把这个 7 一段声明 Ml 读类軋这发小脯 ⑴ 能 6:构造函数中没況。本章后而将详细介绍只读字段。
这段代时使用了 Microsoft {[. Framework 处叩中女持的 W 个用的结钩 Systcm.DateTime 和
System.Drawing.Cdor。DateTime 结沟'尖现门诈态诚性 Now 和实例 14 性 DayOfWeek. Now 诚性返|"1
3 前时 DayOfWeek W 性计 ft ll!采个 11 期记尼期儿。Color 用于存储颜色.它实现了各种静态诚
性，如本例使用的 Red 和 Green,本例返回常用的颜色。为了使用 Color 结构，需要在编译吋引用
Systcm.Drawing.dll 程序集.H.必须为 System.Drawing 名称空间添加一条 using 语句:
using System;
usingSystem.Drawing;
ffl 卜'而的代奶测试舴态构造函数：

```
class MainEntryPoint
(
static void Main(string|) args)
(
Console.WriteLine("User-preferences: BackColor is: " +
UserPreferences.BackColor.ToSt ring());
```

编译并运行这段代码，会得到如下结果：
User-preferences: BackColor is: Color [Red]
当然，如果在周末执行上述代码，颜色设置就是 Green。
(2)从构造函数中调用其他构造函数
有时，在一个类中有几个构造函数，以容纳某些可选参数，这些构造函数包含一些共同的代码。
例如，下面的情况：

```
class Car
private string description；
private uint nWheels;
public Car(string description, uint nWheels)
{
this-description - description;
this.nWheels = nHheels;
J
public Car(string description)
{
this.description = description;
this.nWheels = 4;
}
```

这两个构造函数初始化了相同的字段，显然，最好把所有的代码放在一个地方。c#一个特殊的语法，称为构造函数初始化器，可以实现此目的：

```
class Car
{
private string description;
private uint nWheels;
public Car[string description, uint nWheels)
{
this.description = description;
this.nWheels = nWheels;
}
public Car{string description): this(description, 4)
{
}
```

这里，this 关键字仅调用参数最匹配的那个构造函数，注意，构造函数初始化器在构造函数的函数体之前执行。现在假定运行下面的代码：
Car myCar = newCar(MProton Persona");
在本例中，在带一个参数的构造函数的函数体执行之前，先执行带两个参数的构造函数(但在本例中，因为在带一个参数的构造函数的函数体中没有代码，所以没有区别)。可以包含对茛接基类的构造函数的调用(使用相同的语法，似应使用 base 关键字代替 this)。初始化
器中不能有多个调用。
##3.3.3 只读字段
常量的概念就是一个包含不能修改的值的变量，常量是 C#与大多数编程语言共有的。但是，常量不必满足所有的要求。有时可能需要一些变量。其值不应改变。但在运行之前其值是未知的。C#为这种情形提供了另一种类型的变量：只读字段。
readonly 关键字比 const 灵活得多，允许把 个字段设置为常量，但还需要执行一些计算，以确定它的初始值。其规则是可以在构造函数中给只读字段赋值，但不能在其他地方赋值。只读字段还以是一个实例字段，而不是静态字段.类的每个实例可以有不同的值。与 const 字段不同 I 如果要把只读字段设置为静态，就必须显式声明它。
如果佴 个用 Is 编辑文档的 MDI 程序，因为要注册，所以需要限制可以同时打开的文档数。现
A:假定耍销将该软件的不同版本，而 K 顾客可以升级他们的版本，以便同时打开更多的文档。显然 I
不能在源代码中对最大文档数进行硬编码.而是需要一个字段表示这个最大文档数。这个字段必须是只读的——每次动程序时，从注册表键或其他文件存储中读取。代码如下所示：

```
public class DocumentEditor
(
public static readonly uint MaxDocuments;
static DocumentEditor()
MaxDocuments = DoSomethingToFindOutMaxNumber();
```

ft 本例中，字段是静态的，因为每次运行程序的实例时，只需要存储最大文档数一次。这就是/I:静态构造函数中初始化它的原因。如果只读字段是一个实例字段，就要在实例构造函数中初始化它。例如.假定编辑的每个文档都有-个创迚| I 期，们不允许用户修改它(因为这会覆盖过去的日期)。
注总，该字段也是公嵙的.我们不要把只读字段设置为私因为按照定义，它们不能在外部修改(这条规则也适用于常勤。
如前所述.FI 期用越类 System.DatcTime 。F 面的代码使用带有 3 个参数(年份、月份和月
份中的[])的 System.DatcTime 构造函数，"f 以从 MSDN 文杓中找到这个构造函数和其他 DateTime
构造函数的史多信息。

```
public class Document
{
public readonly DateTime CreationDate;
{
public Document()
{
// Read in creation date from file. Assume result is 1 Jan 2002
// but in general this can be different for different instances
// of the class
CreationDate ■ new DateTime(2002, 1, 1);
```

在上面的代码段中，CreationDate 和 MaxDocuments 的处理方式与任何其他字段相同，但因为它
们是只读的，所以不能在构造函数外部赋值：

```
void SomeMethod()
{
MaxDocuments = 10; // compilation error here. MaxDocuments is readonly
```

还要注意，在构造函数中不必给只读字段赋值。如果没有赋值，它的值就是其特定数据类型的
默认值，或者在声明时给它初始化的值。这适用于只读的静态字段和实例字段。
#3.4 匿名类型

===============================================

5. 字段 静态字段与实例字段两种

静态字段是属于类的，实例字段是属于对象的。

private static int i = 0; //声名一个静态字段

private int j = 0; //声名一个实例字段

static void Main(string[] args)

{

    Program a = new Program();//建立对像引用，并实例化。

    Console.WriteLine(a.j);//用对像来访问字段j

    Console.WriteLine(Program.i);//静态字段需要用类名来访问

}

6.

<Access Specifier> <Return Type> <Method Name>(Parameter List)

{

Method Body

}

Access Specifier：访问修饰符，这个决定了变量或方法对于另一个类的可见性。

Return type：返回类型，一个方法可以返回一个值。返回类型是方法返回的值的数据类型。如果方法不返回任何值，则返回类型为 void。

Method name：方法名称，是一个唯一的标识符，且是大小写敏感的。它不能与类中声明的其他标识符相同。

Parameter list：参数列表，使用圆括号括起来，该参数是用来传递和接收方法的数据。参数列表是指方法的参数类型、顺序和数量。参数是可选的，也就是说，一个方法可能不包含参数。

Method body：方法主体，包含了完成任务所需的指令集。

class NumberManipulator

{

public int FindMax(int num1, int num2)

{

      /* 局部变量声明 */

      int result;



      if (num1 > num2)

         result = num1;

      else

         result = num2;



      return result;

}

}

7.调用方法 ，说明了类的定义和实例化，方法的定义和调用的语法

using System;

namespace ceshi1

{

    class MainEntryPoint

    {

        static void Main(string[] args)

        {

            Console.WriteLine("Pi is" + MathTest.GetPi());

            int x = MathTest.GetSquareof(5);

            Console.WriteLine("Square of 5 is" + x);

            MathTest math = new MathTest();

            math.value = 30;

            Console.WriteLine("value field of math variable contains" + math.value);

            Console.WriteLine("Square of 30 is" + math.GetSquare());

        }

    }

    class MathTest

    {

        public int value;

        public int GetSquare()

        {

            return value * value;

        }



        public static int GetSquareof(int x)

        {

            return x * x;

        }

        public static double GetPi()

        {

            return 3.14159;

        }

    }

}

3-4 匿名类型
1.var 与 new 关键字一起使用时，可以创建匿名类型。它是一个继承自 Object 且没有名称的类 2.创建一个对象，有一些属性想在 new 时初始化，如果不想重新写构造函数，可以创建匿名类型

3-5 结构 1.结构由其自身的一个成员和方法，但是和类不一样类是一种引用类，结构体是一种值类型。 2.结构体是隐式封闭的不能够被继承（派生） 3.结构构造函数不允许替换
3-5-1 结构是值类型

3-6 弱引用 1.程序代码内实例化一个类或结构，只要有代码引用它，就先定城强引用。 2.弱引用允许创建和使用对象，但垃圾回收器运行时，就会回收对象并释放内存。
3 弱引用使用：
Object obj = new Object();//强引用
WeakReference wref = new WeakReference( obj );//弱引用
obj = null;
3-7 部分类
1.partical 关键字允许把类、结构、方法或接口放在多个文件中。适合用于多个开发人员访问一个类 2.实例
项目中首先创建 Name.cs
using System;
namespace ConsoleApp1
{
partial class MyClass
{
public void ShowName()
{
Console.WriteLine("姓名：45");
}
}
}
然后创建 Age.cs
using System;
namespace ConsoleApp1
{
partial class MyClass
{
public void ShowAge()
{
Console.WriteLine("年龄：48");
}
}
}
最后建立 Program.cs
using System;
namespace ConsoleApp1
{
static class program
{
static void Main(string[] args)
{
MyClass My = new MyClass();
My.ShowName();
My.ShowAge();
}
}
}

3.部分类不是定义了多个类，是一个类，只是把该类拆分。编译时将类合并在一起。

3-8 静态类 1.类只包含静态的方法和属性，该类就是静态的。 2.静态类在功能上与使用私有静态构造函数创造的类相同。 3.不能创建静态类的实例。

3-9 Object 类 1.所有.net 类都派生自 System.Object。
3-9-1 System.Object 方法
3-9-2 ToString 方法

3.1 创建及使用类
到 IT 前为 ik,我们介绍/组成 C#语吉的卞嬰模块，包括变饿、数掘类型和程序流语句.并简嬰
介绍丫 •个只也；f Main()方法的完粮小例 f。似还没釘介绍如何把这些内荇组合在•起.构成 个
完粮的 JI:关键就/I:于对类的处理。这就足本章的 h 题。第 4 章将介绍继承以及与继承相关的
特性。

第 I 部分 C#语言
g) 本章将讨论与类相关的基本语法，但假定你已经熟悉了使用类的基本原则，例如，
J 知道构造函数或属性的含义，因此本章主要阐述如何把这些原则应用于(^码。
3.2 类和结构
类和结构实际上都是创建对象的模板，每个对象都包含数据，并提供了此埋和访问数据的方法。
类定义了类的每个对象(称为实例)可以包含什么数据和功能，例如，如果一个类表示一个顾客，就
可以定义字段 CustomerlD、FirstName、LastName 和 Address，以包含该顾客的信息。还可以定义处
理在这些字段中存储的数据的功能。接着，就可以实例化表示某个顾客的类的对象，为这个实例设
置相关字段的值，并使用其功能。
class PhoneCustomee
{
public const string DayOfSendingBill = "Monday11;
public int CustomerlD;
public string FirstName;
public string LastName;
)
结构与类的区别是它们在内存中的存储方式、访问方式(类是存储在堆(heap)上的弓|用类型，而
结构是存储在栈(stack)上的值类型)和它们的一些特征(如结构不支持继承)。较小的数据类型使用结
构可提髙性能。但在语法上，结构与类非常相似’主要的区别是使用关键字\_ 代替 class 来声明
结构。例如，如果希望所有的 PhoneCustomer 实例都分布在栈上，而不是分布在托管堆上，就可以
编写下面的语句：
struct PhoneCustomerStruct
(
public const string DayOfSendingBill = "Monday"?
public int CustomerlD;
public string FirstName;
public string LastName;
)
对于类和结构，都使用关键字 new 来声明实例：这个关键字创建对象并对其进行初始化。在下
面的例子中，类和结构的字段值都默认为 0:
PhoneCustomer rnyCuatoraer = new PhoneCustomer (); " works for a class
PhoneCustomerStruct myCustomer2 = new PhoneCustatkerStract (); // works for d struct
在大多数情况下，类要比结构常用得多。因此，我们先讨论类，然后指出类和结构的 E 别，以
及选择使用结构而不使用类的特殊原因。但除非特别说明，否则就可以假定用于类的代码也适用于
结构。
助

第 3 章对象和类型
3.3 类
类中的数据和函数称为类的成员。Microsoft 的正式术语对数据成员和函数成员进行了区分。除
了这些成员外，类还可以包含嵌套的类型(如其他类)。成员的可访问性可以是 public.protected. internal
protected> private 或 internal。第 5 章将详细解释各种可访问性。
3.3.1 数据成员
数据成员是包含类的数据一字段、常量和事件的成员。数据成员可以是静态数据。类成员总
是实例成员，除非用 static 进行显式的声明。
字段是与类相关的变量。前面的例子己经使用了 PhoneCustomer 类中的字段。
—旦实例化 PhoneCustomer 对象，就可以使用语法 Object.FieldName 来访问这些字段，如下例
所示：
PhoneCustomer Customerl = new PhoneCustomer();
Customerl.FirstName = "Simon";
常量与类的关联方式和变量与类的关联方式相同。使用 const 关键字来声明常量。如果把它声
明为 public,就可以在类的外部访问它。
class PhoneCustomer
{
public const string DayOfSendingBill = "Monday";
public int CustomerlD;
public string FirstName;
public string LastName;
I
事件是类的成员.在发生某些行为(如改变类的字段或属性，或者进行了某种形式的用户交互操
作)时.它可以让对象通知调用方。客户可以包含所谓“事件处理程序”的代码来响应该事件。第 8
章将详细介绍事件。
3.3.2 函数成员
函数成员提供了操作类中数据的某些功能.包括方法、属性、构造函数和终结器(finalizer)、运
算符以及索引器。
•方法是与某个类相关的函数，与数据成员一•样，函数成员默认为实例成员.使用 static 修饰
符可以把方法定义为静态方法。
• W 性是可以从客户端访问的函数组.其访问方式与访问类的公共字段类似。C#为读写类中
的诚性提供了专用语法，所以不必使用那些名称中嵌有 Get 或 Set 的方法。因为属性的这种
语法不同于•般函数的语法.在客户端代码中，虚拟的对象被当作实际的东西。
•构造函数是在实例化对象时 l\*J 动调用的特殊函数。它们必须与所诚的类同名.且不能有返
回类型。构造函数川 P 初始化字段的值，
•终结器类似于构造函数，似是在 CLR 检测到不冉需要某个对象吋凋用它。它们的名称 1 j 类
相同，伹前面存 个符号。不可能预测什么吋候调用终结器。第 14 章将介绍终结器。
69

第 I 部分 C#语言
•运算符执行的最简单的操作就是加法和减法。在两个整数相加时，严格地说，就是对整数
使用“+”运算符。C#a 允许指定把已有的运算符应用于自己的类(运算符重载)。第 7 章将
详细娜运算符。
•索引器允许对象以数组或集合的方式进行索引。 1.方法
注意，正式的 C#术语区分函数和方法。在 C#术语中’ “函数成员”不仅包含方法，也包含类或
结构的一些非数据成员，如索引器、运算符、构造函数和析构函数等，甚至还有属性。这些都不是
数据成员，字段、常量和事件才是数据成员。
⑴ 方法的声明
在 C#中，方法的定义包括任意方法修饰符(如方法的可访问性)、返回值的类型，然后依次是方
法名、输入参数的列表(用圆括号括起来)和方法体(用花括号括起来)，
[modifiers] return_type MethodName {(parameters])
// Method body
每个参数都包括参数的类型名和在方法体中的引用名称，但如果方法有返回值，return 语句就
必须与返回值•一起使用，以指定出口点，例如：
public bool IsSguare{Rectangle recti
I
return (rect.Height 88 番 rect.Width);
}
这段代码使用了一个表示矩形的.NET 基类 System.Drawing.Rectangle。
如果方法没有返回值，就把返回类型指定为 void,因为不能省略返回类型，如果方法不带参数,
仍需要在方法名的后面包含一对空的圆括号 0。此时 return 语句就是可选的一当到达右花括号时，
方法会 S 动返回。注意方法可以包含任意多条 return 语句：
public bool IsPositive tint value)
if (value < 0)
return false;
return true;
(2)调用方法
在下面的例子中，MathTest 说明了类的定义和实例化、方法的定义和调用的语法。除了包含
MainO 方法的类之外，它还定义了类 MathTest,该类包含几个方法和一个字段。
using System;
namespace Wrox
class MainEntryPoint
70

第 3 章对象和类型
static void Main(J
{
// Try calling some static functions.
Console .WriteLine ("Pi is •，+ MathTest -GetPi ());
int x = MathTest.GetSquareOf(5〉；
Console .WriteLine (’’Square of 5 is " + x)；
// Instantiate a MathTest object
MathTest math = new MathTest(); // this is C#，s way of
// instantiating a reference type
"Call nonstatic methods
math.value = 30;
Console.WriteLine{
"Value field of math variable contains " + math.value);
Console .WriteLine ("Square of 30 is r, + math-GetSquare (I );
// Define a class named MathTest on which we will call a method
classMathTest
publicint value;
publicintGetSquare f}
return value\*value;
}
public static intGetSquareOt(int x)
{
return w
public static double GetPi()
return 3.14159;
}
}
)
运行 MathTest 示例，会得到如下结果：
Pi is 3. 14159
Square of 5 is 25
Value field of math variable contains 30
Square of 30 is 900
从代码中可以看出’ MathTest 类包含一个字段和，个方法’该字段包含一个数字’该方法计算
该数字的平方。这个类还包含两个静态方法，一个返回 pi 的值，另一个计算作为参数传入的数字的
平方。
这个类有，-些功能并不是设计 C#程序的好例子。例如，GetPiO 通常作为 const 字段来执行，而
好的设计应使用目前还没有介绍的概念。
(3)给方法传递参数
参数可以通过引用或通过值传递给方法。在变量通过引用传递给方法吋，被调用的方法得到的
71

第 1 部分 C#语盲
就是这个变量，更准确地说，是指向内存中变量的指针。所以在方法内部对变量进行的任何改变在
方法退出后仍旧有效。而如果变量通过值传送给方法，被调用的方法得到的是变量的---个相同副本，
也就是说，在方法退出后，对变量进行的修改会丢失，对于复杂的数据类型，按引用传递的效率更
髙，因为在按值传递时，必须复制大量的数据，
在 c#中，除别指定’所有的引用类型都通过引用传递，所有的值类型都通过值来传递。但
是，在理解引用类型的含义时需要注意，因为引用类型的变量只包含对象的引用，作为参数传递的
正是这个引用，而不是对象本身，所以对底层对象的修改会保留下来，相反，值类型的变量包含的
是实际数据，所以传递给方法的是数据本身的副本，例如，int 通过值传递给方法，对应方法对该 int
的值所做的任何改变都没有改变原 int 对象的值，但如果把数组或其他引用类型(如类)传递给方法，
对应的方法就会使用该引用改变这个数组中的值’而新值会反射在原始数组対象上。
下面的例子 ParameterTest.cs 说明了用作参数的值类型和引用类型的区别：
using System;
namespace Wrox
class ParameterTest
{
static void SomeFunction(int[] ints, inti]
{
intsfO] = 100;
i = 100;
}
public static int MainO
{
inti = 0;
int[】 ints : { 0， 1, 2, 4, 8 };
// Display the original values.
Console.WriteLine = H + i);
Console.WriteLine("intsfO] = " + ints 10]};
Console-Writ eLine ('^Calling Some Function,");
// After this method returns, ints will be changed,
// but i will not.
SomeFunction{ints, i};
Console .WriteLine (，，i - " + i};
Console .WriteLine (\*'ints [0 j = " + ints f0]);
return 0;
}
}
)
结果如下：
ParameterTest.exe
i 0
ints[0]二 0
Calling SomeFunction
i = 0
ints[0] = 100
72

第 3 章 对象和类型
注意.i 的值保持不变，而在 ints 中改变的值在原始数组中也改变了。
注意字符串的行为方式有所不同.因为字符串是不可变的(如果改变字符串的值，就会创建一个
全新的字符串)，所以字符串无法采用一般引用类型的行为方式。在方法调用中，对字符串所做的任
何改变都不会影响原始字符串。这一点将在第 9 章详细讨论。
⑷ref 参数
如前所述，通过值传送变量是默汄的.也可以迫使值参数通过引用传送给方法。为此，要使用
ref 关键字。如果把-个参数传递给方法，且这个方法的输入参数前带有 ref 关键字，则该方法对变
W 所做的任何改变都会影响原始对象的值：
static void SomeFunction(int(] ints, ref int i)
(
ints[0] = 100;
i = 100; // The change to i will persist after SomeFunction() exits.
在调用该方法时，还需要添加 ref 关键字：
SomeFunction(ints, ref i);
诚后，c#仍要求对传递给方法的参数进行初始化.理解这一点也非常重要。在传递给方法之前,
尤论是按值传递.还是按引用传递，任何变量都必须初始化。
(5)out 参数
/GC 风格的语言中，函数常常能从•个例程中输出多个值，这使用输出参数实现，只要把输出
的值赋 f•通过引用传递给方法的变最即可。通常，变最通过引用传递的初值并不重要，这些值会被
函数番写.函数甚至从来没有使用过它们。
如果||了以在 C#中使用这利钓定，就会非常方便。fl! C#要求变量在被引用前必须用一个初值进
行初始化。尽宵在把输入变传递给函数前.可以用没有意义的值初始化它们，因为函数将使用真
实，有怠义的值初始化它们.似是这样做是没有必耍的.有吋甚至会引起混乱。但有一种方法能够
简化 C#编译器所坚持的输入参数的初始化。
编译器使用 out 关键字来初始化。在方法的输入参数前面加上 out 前缀吋.传递给该方法的变
1|1:呵以不初始化。该变试通过引用传递，所以在从被调用的方法中返 I 叫吋.对应方法对该变最进行
的仃:何改变都会保留 F 来。在调用该方法时.还需要使用 out 关键字.与在定义该方法吋一样：
static void SomeFunction(out inti)
I
i - 100;
I
public static int Main()
I
int i; // note how i is declared but not initialized.
SomeFunction(out i);
Console.WriteLine(i);
return 0;
(6)命名参数
参数 般滞嬰按定义的顺序传送给方法。命名参数允许按任意顺序传逆。所以下 ifti 的方法:
73

第 1 部分 C#语言
string FullName(string firstName, string lastName)
{
return firstName + " " + LastName;
}
下面的方法调用会返回相同的全名：
FullName(MJohn"f "Doe">;
FullName(lastName: "Doe", firstName: "John");
如果方法有几个参数，就可以在同一个调用中混合使用位置参数和命名参数。
(7)可选参数
参数也可以是可选的。必须为可选参数提供默认值。可选参数还必须是方法定义的最后的参数。
所以下面的方法声明是不正确的：
void TestMethod(int optionalNumber = 10, int notOptionalNumber)
System.Console.Write(optionalNumber + notOptionalNumber);
}
要使这个方法正常工作，就必须在最后定义 optionalNumber 参数，
(8)方法的重载
C#支持方法的重载一方法的几个版本有不同的签名(即，方法名相同，但参数的个数和/或类
型不同)。为了重载方法.只需要声明同名但参数个数或类型不同的方法即可：
class ResultDisplayer
{
void DisplayResult(string result}
{
// implementation
}
void DisplayResult{int result)
{
// implementation
}
}
如果不能使用可选参数，就可以使用方法重载来达到此目的：
class MyClass
{
int DoSomething(int x} // want 2nd parameter with default value 10
(
DoSomething(x, 10);
}
intDoSomething(int xr int y)
{
// implementation
在任何语言中，对于方法重载，如果调用了错误的重载方法，就有可能 Hi 现运行错误。第 4 章
74

第 3S 对象和类型
将讨论如何使代码避免这些错误。现在，知道 C#在重载方法的参数方面有一些小限制即可：
•两个方法不能仅在返回类型上有区别。
•两个方法不能仅根据参数是声明为 ref 还是 out 来区分。 2.属性
属性(property)的概念是：它是一个方法或一对方法，在客户端代码看来，它(们)是一个字段。
例如 Windows 窗体的 Height 属性。假定有下面的代码：
// mainForm is of type System.Windows. Foirms
mainForm.Height = 400;
执行这段代码时，窗口的髙度设置为 400,因此窗 U 会在屏幕上重新设置大小。在语法上，上
面的代码类似于设置一个字段.但实际上是调用了属性访问器，它包含的代码重新设置了窗体的
大小。
在 C#中定义属性，可以使用下面的语法：
public string SomeProperty
(
get
{
return "This is the property value.
II do whatever needs to be done to set the property.
get 访问器不带任何参数，且必须返 M 属性声明的类型。也不应为 set 访问器指定任何显式参数，
何编译器假定它带一个参数，其类型也与属性相同.并表示为 value。例如，下面的代码包含一个属性
Age,它设置了 •个字段 age。在这个例子中，age 表示屈性 Age 的后备变量。
private int age;
public int Age
(
get
(
return age;
)
set
(
age = value;
注惫这里所用的命名约定。我们采用 c#的区分大小写模式，使用相同的名称.但公行 M 性采用
Pascal 大小写形式命名，如果存在•个等价的私存字段.则它采用 camel 大小写形式命名。•些开
发人员#欢使川把 F 划线作为前缀的字段名，＜ lll_agc,这会为识别字段提供极大的便利。
75

第 I 部分 0#语盲
(1)只读和只写属性
在属性定义中省略 set 访问器，就可以创建只读属性。因此，如下代码把 Name 变成只读属性：
private string name;
public string Name
{
get
{
return Name;
}
}
同样，在属性定义中省略 get 访问器，就可以创建只写属性。但是，这是不好的编程方式，因
为这可能会使客户端代码的作者感到迷惑.一般情况下，如果要这么做，最好使用一个方法替代。
(2)属性的访问修饰符
C#允许给属性的 get 和 set 访问器设置不同的访问修饰符，所以属性可以有公有的 get 访问器和
私有或受保护的 set 访问器。这有助于控制属性的设置方式或时间。在下面的代码示例中，注意 set
访问器有一个私有访问修饰符，而 get 访问器没有任何访问修饰符。这表示 get 访问器具有属性的访
问级别，在 get 和 set 访问器中，必须有一个具备属性的访问级别，如果 get 访问器的访问级别是
protected,就会产生一个编译错误，因为这会使两个访问器的访问级别都不是属性。
public string Name
{
get
{
return \_\_name;
}
private set
(
\_name = value;
}
)
(3)自动实现的属性
如果属性的 set 和 get 访问器中没有任何逻辑，就可以使用自动实现的属性。这种属性会自动实
现后备成员变量。前面 Age 示例的代码如下：
publicint Age (get； set;}
不需要声明 private intAge;。编译器会自动创建它，
使用自动实现的属性，就不能在属性设置中验证属性的有效性，所以在上面的例子中，不能检
査是否设置了无效的年龄•但必须有两个访问器。尝试把该属性设置为只读属性，就会出错：
public int Age {get;}
但是，每个访问器的访问级别可以不同。因此，下面的代码是合法的：
public int Age (get; private set;)
76

第 3 章对象和类型
\_  
一些开发人员可能会担心，前面我们列举了许多情况，其中标准 C#编码方式导致了大材小用，
例如，通过属性访问字段，而不是直接访问字段。这些额外的函数调用是否会增加系统开销，导致
性能下降？其实，不需要担心这种编程方式会在 C#中带来性能损失。编译为 IL，然后在
运行时 J1T 编译为本地可执行代码.JIT 编译器可生成高度优化的代码，并在适当的时候随意地内联
代码(即，用内联代码来替代函数调用)。如果实现某个方法或属性仅是调用另一个方法，或返回一
个字段，则该方法或属性肯定是内联的。但要注意，在何处内联代码完全由 CLR 决定。我们无法使
用像 CH•中 inline 这样的关键字来控制哪些方法是内联的. 3.构造函数
声明基本构造函数的语法就是声明一个与包含的类同名的方法，但该方法没有返回类型：
public class MyClass
(
public MyClass()
)
// rest of class definition
没有必要给类提供构造函数，到目前为止本书的例子中没有提供这样的构造函数。一般情况下,
如果没有提供任何构造函数，编译器会在后台创建一个默汄的构造函数。这是一个非常基本的构造
函数，它只能把所有的成员字段初始化为标准的默认值(例如，引用类型为空引用，数值数据类型为
0, bool 为 false)。这通常就足够了，否则就需要编写自己的构造函数。
构造函数的重载遵循与其他方法相同的规则。换言之.可以为构造函数提供任意多的重载，只
要它们的签名有明显的区别即可：
public MyClass() // zeroparameter constructor
(
// construction code
}
public MyClass(int number) // another overload
<
// construction code
} \*
但是.如果提供了带参数的构造函数，编译器就不会自动提供默认的构造函数。只有在没有
定义任何构造函数吋.编译器才会自动提供默认的构造函数。在下面的例子中，因为定义了一个
带单个参数的构造函数，编译器会假定这是可用的唯•构造函数，所以它不会隐式地提供其他构
造函数：
public class MyNumber
(
private int number;
public MyNumber(int number)
I
this.number - number;
)
77

第丨部分 C#语言
上面的代码还说明.•般使用 this 关键字区分成员字段和同名的参数。如果试图使用无参数的
构造函数实例化 MyNumber 对象，就会得到一个编译错误：
MyNumber numb = new MyNumber(); // causes compilation error
注意，可以把构造函数定义为 private 或 protected.这样不相关的类就不能访问它们：
P
ublic class MyNumber
e
t
a
V
i
r
p
r
p.{
int number;
MyNumber(int number) // another overload
this.number = number;
}
}
这个例子没有为 MyNumber 定义任何公有的或受保护的构造函数。这就使 MyNumber 不能使川
new 运算符在外部代码中实例化(但可以在 MyNumber 中编写•个公有静态属性或方法，以实例化该
类)。这在下面两种情况下是有用的：
•类仅用作某些静态成员或属性的容器，因此永远不会实例化它
•希望类仅通过调用某个静态成员函数来实例化(这就是所谓对象实例化的类工厂方法)
(1)静态构造函数
C#的一个新特征是也可以给类编写无参数的静态构造函数。这种构造函数只执行•次，而前面
的构造函数是实例构造函数，只要创建类的对象，就会执行它。
class MyClass
(
static MyClass()
(
// initialization code
I
// rest of class definition
I
编写静态构造函数的一个原因是，类有•些静态字段或域性.需要在第•次使用类之前，从外
部源中初始化这些静态字段和屈性。
■NET 运行库没有确保什么吋候执行静态构造函数.所以不应把耍求在某个特定吋刻(例如，加
载程序集时)执行的代硏放在静态构造函数中。也不能顶计不同类的静态构造函数按照什么顺序执
行。但是，可以确保静态构造函数至多运行一次，即在代码引用类之前调用它。在 C#中，通常在第
—次调用类的任何成员之前执行静态构造函数。
注意，静态构造函数没有访问修饰符，其他码从来不调用它，何在加载类吋，总是由.NET
运行库调用它，所以像 public 或 private 这样的访问修饰符就没有任何意义。出于同样原因，静态构
造函数不能带任何参数，一个类也只能宵一个静态构造函数。很显然.静态构造函数只能访问类的
静态成员，不能访问类的实例成员。
无参数的实例构造函数与静态构造函数可以在同•个类中同吋定义。尽管参数列表相同，但这
并不矛盾.因为在加载类吋执行静态构造函数，而在创建实例吋执行实例构造函数.所以何时执行
哪个构造函数不会 W 冲突。

如果多个类都打胙态构造函数.先执行哪个舴态构造函数就不确定。此吋静态构造函数中的代
时不应依赖于其他舴态构造函数的执行沾况。＞ 5 •方側，如果任何静态字段釘默汄值，就在调用静
态构造函数之前指定它们。
卜\*而川•个例 A 來说明静态构造函数的用法，该例子的思想越于包.含用户首选项的程序(假定
川户酋选项存储在菜个屺咒文件中)。为了简单起见.假定只有•个用户首选项—BackColor,它
畏泊初|術序中使用的竹 K 色。因为这里不想编勾从外部数据源中读取数据的代码.所以假
定该 1"1‘选项/1:1 :作 11 的竹規色是红色.在周末的竹误色是绿色。程序仅在控制台窗 U 中显示首选
项一丨 1 这足以说明 I 浄态构造函数是如何工作的。
namespace Wrox.ProCSharp.StaticConstructorSampie
(
public class UserPreferences
public static readonly Color BackColor;
static UserPreferences()
(
DateTime now = DateTime.Now;
if (now.DayOfWeek == DayOfWeek.Saturday
I I now.DayOfWeek == DayOfWeek.Sunday)
BackColor = Color.Green;
else
BackColor = Color.Red;
I
private UserPreferences()
I
这段代码说明了颜色首选项如何存储在静态变 W 中.该静态变讎静态构造函数中进行初始化。
把这个 7•段声明 Ml 读类軋这发小脯 ⑴ 能 6:构造函数中没況。本章后而将详细介绍只读字段。
这段代时 f 史川了 Microsoft {[. Framework 处叩中女持的 W 个用的结钩 Systcm.DateTime 和
System.Drawing.Cdor。DateTime 结沟'尖现门诈态诚性 Now 和实例 14 性 DayOfWeek. Now 诚性返|"1
3 前时 DayOfWeek W 性计 ft ll!采个 11 期记尼期儿。Color 用于存储颜色.它实现了各种静态诚
性，如本例使用的 Red 和 Green,本例返回常用的颜色。为了使用 Color 结构，需要在编译吋引用
Systcm.Drawing.dll 程序集.H.必须为 System.Drawing 名称空间添加•条 using 语句:
using System;
usingSystem.Drawing;
ffl 卜'而的代奶测试舴态构造函数：
class MainEntryPoint
(
static void Main(string|) args)
(
Console.WriteLine("User-preferences: BackColor is: " +
UserPreferences.BackColor.ToSt ring());
79

第 I 部分 C#语官
编译并运行这段代码，会得到如下结果：
User-preferences: BackColor is: Color [Red]
当然，如果在周末执行上述代码，颜色设置就是 Green。
(2)从构造函数中调用其他构造函数
有时，在一个类中有几个构造函数，以容纳某些可选参数，这些构造函数包含一些共同的代码。
例如，下面的情况：
class Car
private string description；
private uint nWheels;
public Car(string description, uint nWheels)
{
this-description - description;
this.nWheels = nHheels;
J
public Car(string description)
{
this.description = description;
this.nWheels = 4;
}
"etc.
这两个构造函数初始化了相同的字段，显然，最好把所有的代码放在一个地方。c#<\_个特殊
的语法，称为构造函数初始化器，可以实现此目的：
class Car
{
private string description;
private uint nWheels;
public Car[string description, uint nWheels)
{
this.description = description;
this.nWheels = nWheels;
}
public Car{string description): this(description, 4)
{
}
"etc
这里，this 关键字仅调用参数最匹配的那个构造函数，注意，构造函数初始化器在构造函数的
函数体之前执行。现在假定运行下面的代码：
Car myCar = newCar(MProton Persona");
在本例中，在带一个参数的构造函数的函数体执行之前，先执行带两个参数的构造函数(但在本
例中，因为在带一个参数的构造函数的函数体中没有代码，所以没有区别)。
C#构造函数初始化器可以包含对同一个类的另一个构造函数的调用(使用前面介绍的语法)，也

第 3 章对象和类型
可以包含对茛接基类的构造函数的调用(使用相冋的语法，似应使用 base 关键字代替 this)。初始化
器中不能有多个调用。
3.3.3 只读字段
常 W 的概念就是•个包含不能修改的值的变量，常量是 C#与大多数编程语言共有的。但是，常
黾不必满足所有的要求。有吋可能需要一些变最.其值不应改变.伹在运行之前其值是未知的。C#
为这种情形提供了另-种类型的变量：只读字段。
readonly 关键字比 const 灵活得多，允许把 个字段设置为常量，但还需要执行一些计算，以确
定它的初始值。其规则是可以在构造函数中给只读字段赋值，但不能在其他地方赋值。只读字段还
nJ■ 以是•个实例字段，而不是静态字段.类的每个实例可以有不同的值。与 const 字段不同 I 如果
嬰把只读字段设置为静态，就必须显式声明它。
如果佴 个用 Is 编辑文档的 MDI 程序，因为要注册，所以需要限制可以同时打开的文档数。现
A:假定耍销将该软件的不同版本，而 K 顾客可以升级他们的版本，以便同吋打开更多的文档。显然 I
不能在源代码中对最大文档数进行硬编码.而是需要一个字段表示这个最大文档数。这个字段必须
是只读的——毎次动程序时，从注册表键或其他文件存储中读取。代码如下所示：
public class DocumentEditor
(
public static readonly uint MaxDocuments;
static DocumentEditor()
MaxDocuments = DoSomethingToFindOutMaxNumber();
ft 本例中，字段是静态的，因为毎次运行程序的实例吋，只需要存储最大文档数一次。这就是
/I:静态构造函数中初始化它的原因。如果只读字段是-个实例字段，就要在实例构造函数中初始化
它。例如.假定编辑的每个文档都有-个创迚| I 期，们不允许用户修改它(因为这会覆盖过去的日期)。
注总，该字段也是公嵙的.我们不嬰把只读字段设置为私因为按照定义，它们不能在外部修
改(这条规则也适用于常勤。
如前所述.FI 期用越类 System.DatcTime 。F 面的代码使用带有 3 个参数(年份、月份和月
份中的[])的 System.DatcTime 构造函数，"f 以从 MSDN 文杓中找到这个构造函数和其他 DateTime
构造函数的史多信息。
public class Document
(
public readonly DateTime CreationDate; •
public Document()
(
// Read in creation date from file. Assume result is 1 Jan 2002
// but in general this can be different for different instances
// of the class
CreationDate ■ new DateTime(2002, 1, 1);
81

第丨部分 C 林语言
在上面的代码段中，CreationDate 和 MaxDocuments 的处理方式与任何其他字段相同，但因为它
们是只读的，所以不能在构造函数外部赋值：
void SomeMethod()
{
MaxDocuments = 10; // compilation error here. MaxDocuments is readonly
还要注意，在构造函数中不必给只读字段赋值。如果没有赋值，它的值就是其特定数据类型的
默认值，或者在声明时给它初始化的值。这适用于只读的静态字段和实例字段。
3.4 匿名类型
第 2 章讨论了 var 关键字，它用于表示隐式类型化的变量。var 与 new 关键字一起使用时，可
以创建匿名类型。匿名类型只是一个继承自 Object 且没有名称的类。该类的定义从初始化器中推断,
类似于隐式类型化的变量。
如果需要一个对象包含某个人的姓氏、中间名和名字，则声明如下：
var captain = new {FirstName = "James", MiddleName = "T", LastNane = "Kirk"};
这会生成一个包含 FirstNameMiddleName 和 LastName 诚性的对象。如果创建另，个对象，
如下所示：
var doctor = new {FirstName = "Leonard", MiddleName = LastName = "McCoy");
captain 和 doctor 的类型就相同。例如，可以设置 captain = doctor。
如果所设置的值来自于另一个对象，就可以简化初始化器。如果己经有--个包含 FiretName、
MiddleName 和 LastName 属性的类，且有该类的一个实例(person), captain 对象就可以初始化为：
var captain — new {person.FirstName, person.MiddleName, person.LastName);
person 对象的属性名应投射到新对象名 captaino 所以 captain 对象应有 FirstName> MiddleName
和 LastName 属性。
这些新对象的类型名未知。编译器为类型“伪造” 了一个名称，但只有编译器才能使用它。我
们不能也不应使用新对象上的任何类型反射，因为这不会得到一致的结果。
3.5 结构
前面介绍了类如何封装程序中的对象，也介绍了如何将它们存储在堆中.通过这种方式可以在
数据的生存期上获得很大的灵活性，但性能会有一定的损失。因为托管堆的优化.这种性能损失比
较小。但是，有时仅需要一个小的数据结构。此吋，类提供的功能多于我们需要的功能，由于性能
原因，最好使用结构。看看下面的例子：
class Dimensions
82

第 3 章对象和类型
public double Length;
public double Width;
)
L 面的代码定义了类 Dimensions,它只存储了某一项的长度和宽度。假定编写一个布置家具的
程序.让人们试着在计算机上重新布置家具.并存储每件家具的尺寸。表面看來使字段变为公共字
段会违背编程规则，但这里的关键是我们实呩 h 并不需嬰类的全部功能。现在只有两个数字，把它
们当成一对來处理.要比单个处理方便一些。既不需耍很多方法.也不需要从类中继承.也不希
望.NET 运行库在堆中遇到麻烦和性能问题，只需要存储两个 double 类型的数据即可。
为此，只需要修改代码，用关键字 struct 代替 class,定义一个结构而不是类，如本章前面所述:
struct Dimensions
<
public double Length;
public double Width;
I
为结构定义函数与为类定义函数完全相同。下面的代码说明了结构的构造函数和属性：
struct Dimensions
(
public double Length;
public double Width;
public Dimensions(double length, double width)
(
Length=length;
Width=width;
public double Diagonal
{
get
(
return Math.Sqrt(Length*Length + Width*Width);
I
}
结构是偾类型.+是引用类型。它们存储在栈中或存储为内联(inline)(如果它们是存储在堆中的
另•个对象的•部分)，其中存期的限制与简中-的数据类型一样。
•结构小支持继承。
•对 r-结构，构造函数的 I：作方式打•呜区别。尤其是编译器总是提供一个无参数的默汄构
造函数 I 它是不允许枰换的。
•使用结构.可以指定字段如何在内存中布局(第 15 章在介紹特性吋将详细论述这个问题)。
闵为结构实际 k 是把数裾项组合在一起.有吋大多数成荇全部字段都声明为 publico 严格來说.
这~编 V.NET 代码的规则相反——根裾 Microsoft.字段(除了 const 字段之外)应总是私衍的.并由公
行城性封装。们是.对乎简中的结构.昨多开发人 M 都认为公苻字段是可接受的编程方式。
F 面几节将诈细说明类和结构之间的区别。
83

第丨部分 C#语言
3.5.1 结构是值类型
虽然结构是值类型，但在语法上常常可以把它们当作类来处理。例如，在上面的 Dimensions 类
的定义中，可以编写下面的代码：
Dimensions point = new Dimensions（）;
point.Length = 3;
point.Width = 6;
注意，因为结构是值类型，所以 new 运算符与类和其他引用类型的工作方式不同。new 运算符
并不分配堆中的内存，而是只调用相应的构造函数，根据传送给它的参数，初始化所有的字段。对
于结构，可以编写下述完全合法的代码：
Dimensions point;
point.Length = 3;
point.Width = 6;
如果 Dimensions 是一个类，就会产生一个编译错误.因为 point 包含一个未初始化的引用一
不指向任何地方的一个地址，所以不能给其字段设置值。但对于结构，变量声明实际上是为整个结
构在栈中分配空间，所以就可以为它赋值了。但要注意下面的代码会产生一个编译错误，编译器会
抱怨用户使用了未初始化的变量：
Dimensions point;
Double D = point.Length;
结构遵循其他数据类型都遵循的规则：在使用前所有的元素都必须进行初始化。在结构上调用
new 运算符，或者给所有的字段分别赋值，结构就完全初始化了，当然，如果结构定义为类的成员
字段，在初始化包含的对象时，该结构会自动初始化为 0。
结构是会影响性能的值类型，但根据使用结构的方式，这种影响可能是正面的，也可能是负面
的。正面的影响是为结构分配内存时，速度非常快，因为它们将内联或者保存在栈中。在结构超出
了作用域被删除时，速度也很快，不需要等待垃圾回收。负面影响是，只要把结构作为参数来传递
或者把一个结构赋予另一个结构（如 A=B，其中 A 和 B 是结构），结构的所有内容就被复制，而对于
类，则只复制引用。这样就会有性能损失，根据结构的大小，性能损失也不同。注意.结构主要用
于小的数据结构。但当把结构作为参数传递给方法时，应把它作为 ref 参数传递，以避免性能损失一
一此时只传递了结构在内存中的地址，这样传递速度就与在类中的传递速度一样快了。但如果这样
做，就必须注意被调用的方法可以改变结构的值。
3.5.2 结构和继承
结构不是为继承设计的。这意味着：它不能从一个结构中继承。唯一的例外是对应的结构（和
C#中的其他类型一样）最终派生于类 System.Object。因此，结构也可以访问 System.Object 的方法。
在结构中，甚至可以重写 System.0 切 ect 中的方一如重写 ToStringO 方法。结构的继承链是：每个
结构派生自 System.ValueType 类，System.ValueType 类又派生 £] System.Object。ValueType 并没有给
Object 添加任何新成员，但提供了一些更适合结构的实现方式。注意，不能为结构提供其他基类：
每个结构都派生自 ValueType。
84

第 3 章 对象和类型
3.5.3 结构的构造函数
为结构定义构造函数的方式与为类定义构造函数的方式相同,但不允许定义无参数的构造函数。
这看起来似乎没有意义，但其原因隐藏在.NET 运行库的实现方式中。在一些极罕见的情况中，.NET
运行库不能调用用户提供的自定义无参数构造函数，因此 Microsoft 干脆采用一种非常简单的方式：
禁止在 C#的结构内使用无参数的构造函数。
前面说过.默汄构造函数把数值字段都初始化为 0,把引用类型字段初始化为 null,且总是隐
式地给出，即使提供了其他带参数的构造函数，也是如此。提供字段的初始值也不能绕过默认构造
函数。下面的代码会产生编译错误：
struct Dimensions
{
public double Length = 1; // error. Initial values not allowed
publicdouble Width = 2; // error. Initial values not allowed
)
当然，如果 Dimensions 声明为一个类，这段代码就不会有编译错误。
另外.可以像类那样为结构提供 CloseQ 或 Dispose!)方法。第 14 章将讨论 DisposeO 方法。
3.6 弱引用
在应用程序代码内实例化一个类或结构时，只要有代码引用它，就会形成强引用。例如，如果
■(1 •个类 MyClass().并创建了一个变量 myClassVariable 来引用该类的对象，那么只要
myClassVariable 在作用域内，就存在对 MyClass 对象的强引用，如下所示：
MyClass myClassVariable = new MyClass();
这意味着垃圾回收器不会清理 MyClass 对象使用的内存。一般而言这是好事，因为可能需要访
问 MyClass 对象，但是如果 MyClass 对象很大，并且不经常访问呢？此吋可以创建对象的弱引用。
弱引用允许创建和使用对象，但是垃圾回收器运行吋(第 14 章将介绍垃圾回收)，就会回收对象
并释放内存。由于存在潜在的 bug 和性能问题.般不会这么做，但是在特定的情况下使用弱引用
是很合理的。
弱引用是使用 WeakReference 类创建的。因为对象可能在任意吋刻被回收，所以在引用该对象
前必须确汄它存在。以前面的 MathTest 类为例，这次使用 WeakReference 类创建对它的弱引用：
static void Main()
{
// Instantiate a weak reference to MathTest object
WeakReference mathReference = new WeakReference(new MathTest());
MathTest math;
if(mathReference.IsAlive)
(
math - mathReference.Target as MathTest;
math.Value ■ 30;
Console.WriteLine(\*'Value field of math variable contains " + math.Value);
Console.WriteLine("Square of 30 is " + math.GetSquare());
85

第 I 部分 C#语言
else
I
Console.WriteLine (^Reference is not available.11};
}
GC.Collect();
if(mathReference.IsAlive)
{
math = mathReference.Target as MathTest;
)
else
i
Console-WriteLine(^Reference is not available.");
J
}
创建 mathReference 时，会向其构造函数传递一个新的 MathTest 对象《 MathTest 对象成为了
WeakReference 对象的目标。想要使用 Mathlfest 对象时，就需要先检查 mathReference 对象以确保其
未被回收。IsAlive 属性就用于这个目的。如果 IsAlive 为 true,就从目标属性得到 MathTest 对象的
引用。注意，因为 Target 属性返回的是 Object 类型，所以必须将其强制转换为 MathTest 类型.
然后，调用垃圾回收器(GC.CollectO),并尝试再次获得 MathTest 对象，这一次，IsAlive 属性返
回 fclse，如果确实想要使用 MathTest 对象，就必须实例化一个新的 MathTest 对象。
3.7 部分类
partial 关键字允许把类、结构、方法或接口放在多个文件中。一般情况下，•个类全部驻留在
单个文件中，但有时 I 多个开发人员需要访问同•-个类.或者某种类型的代码生成器生成了一个类
的某部分，所以把类放在多个文件中是有益的。
partial 关键字的用法是：把 partial 放在 class、struct 或 interfece 关键字的前面。在下面的例子中，
TheBigClass 类驻留在两个不同的源文件 BigClassPartl.cs 和 BigClassPart2.cs 中：
//BigClassPartl.cs
partial class TheBigClass
{
public void MethodOne()
{
}
//BigClassPart2.cs
partial class TheBigClass
{
public void MethodTwo()
}
}
编译包含这两个源文件的项目时，会创建一个 TTieBigClass 类，它有两个方法 MethodOneO 和
MethodlwoQc
的

第 3 章对象和类型
如果声明类吋使用了下面的关键字，这些关键字就必须应用于同一个类的所有部分：
•public
•private
•protected
•internal
•abstract
•sealed
•new
・•般约束
在嵌套的类型中，只要 partial 关键字位于 class 关键字的前面，就可以嵌套部分类。在把部分
类编译到类型中时，属性、XML 注释、接口、泛型类型的参数属性和成员会合并。有如下两个源
文件：
//BigClassPartl.cs
[CustomAttribute]
partial class TheBigClass: TheBigBaseClass, IBigClass
(
public void MethodOne()
{
I
)
"BigClassPart2.cs
[AnotherAttribute]
partial class TheBigClass: IOtherBigClass
{
public void MethodTwo()
编泽后，等价的源文件变成:
(CustomAttribute)
[AnotherAttribute]
partial class TheBigClass: TheBigBaseClass, IBigClass, IOtherBigClass
(
public void MethodOne()
public void MethodTwo()
3.8 静态类
本章前面讨论了静态构造函数和它们如何初始化静态的成员变燉。如果类只包含静态的方法和
87

第 I 部分 C#语言
属性.该类就是静态的。静态类在功能上与使用私有静态构造函数创建的类相同。不能创建静态类
的实例。使用 static 关键字，编译器可以检查用户是否不经意间给该类添加了实例成员。如果是.
就生成一个编译错误。这可以确保不创建静态类的实例。静态类的语法如下所示：
static class Staticutilities
(
public static void HelperMethodO
调用 HelperMethodO 不需要 StaticUtilities 类型的对象。使用类型名即可进行该调用：
Staticutilities.HelperMethod();
3.9Object 类
前面提到，所有的.NET 类都派生自 SystemObject。实际上，如果在定义类吋没有指定基类，编
译器就会自动假定这个类派生自 Object。本章没有使用继承，所以前面介绍的每个类都派生 1'1
System.Object(如前所述，对于结构，这个派生是间接的：结构总是派生自 System.ValueType,
System.ValueType 又派生自 System.Object)。
其实际意义在于，除了自己定义的方法和属性等外，还可以访问为 Object 定义的许多公有的和
受保护的成员方法。这些方法可用于 0 己定义的所有其他类中。
3.9.1System.Object()方法
下面将简要总结每个方法的作用，3.9.2 小节讳细论述 ToString()方法。
・ToStringO 方法：是获取对象的字符串表示的•种便捷方式。当只需要快速获取对象的内容，
以进行调试时，就可以使用这个方法。在数裾的格式化方面，它几乎没有提供选择：例如.
在原则上日期可以表示为件多不同的格式，仆 I DateTimc.ToStringO 没有在这方面提供任何选
择。如果需要更复杂的字符串表示，例如，考虑用户的格式化首选项或区域性(区域)，就应
实现 IFomattable 接口(详见第 9 章)。
•GetHashCodeO 方法：如果对象放在名为映射(也称为敗列表或字典)的数据结构中，就可以
使用这个方法。处理这咎结构的类使用该方法确定把对象放在结构的什么地方。如果希望
把类用作字典的•个键.就需要重写 GetHashCodeO 方法。实现该方法重载的方式存•呰相
当严格的限制，这些将在第 10 章介绍字典吋讨论。
•Equals()(两个版本)和 RefcrenceEquals()方法：注意有 3 个用于比较对象相等性的不同方法，
这说明.NET Framework 在比较相等性方面相相当复杂的模式。这 3 个方法和比较运算符
在使用方式上存微妙的区别。而且，在重写带•个参数的虚 Equals()方法时也有一些
限制，因为 System.Collections 名称空间中的一些基类要调用该方法.并希望它以特定的方
式执行。第 7 章在介绍运算符吋将探讨这鸣方法的使用。
•FinalizeO 方法：第 13 章将介绍这个方法，它 ii 接近 C++风格的析构函数，在引用对象作为
垃圾被回收以淸理资源吋调用它。Object 中实现的 FinalizeO 方法实际 b.什么也没有做.因
88

第 3 章对象和类型
而被垃圾冋收器忽略。如果对象拥有对未托管资源的引用，则在该对象被删除时，就需要
删除这些引用，此吋一般要重写 FinalizeO。垃圾收集器不能直接删除这些对未托管资源的
引用，因为它只负责托管的资源，于是它只能依赖用户提供的 FinalizeO。
•GetTypeO 方法：这个方法返回从 System.Type 派生的类的一个实例。这个对象可以提供对
象成员所属类的更多信息，包括基本类型、方法、属性等。System.Type 还提供 T.NET 的反
射技术的入口点。这个主题详见第 15 章。
•MemberwiseCloneO 方法:这是 System.Object 中唯一没有在本书的其他地方详细论述的方法。
不需要讨论这个方法，因为它在概念上相当简单，它只复制对象，并返回对副本的一个引
用(对于值类型，就是一个装箱的引用)。注意，得到的副本是一个浅表复制，即它复制了类
中的所有值类型。如果类包含内嵌的引用，就只复制引用.而不复制引用的对象。这个方
法是受保护的，所以不能用于复制外部的对象。该方法不是虚方法，所以不能重写它的实
现代码。

3.9.2ToString()方法
1.ToString()方法，它是快速获取对象的字符串表示的最便捷方式。
例如：
inti = 50;
string str = i.ToString(); // returns "50"
下面是另一个例子：
enum Colors {Red, Orange, Yellow};
Colors favoriteColor = Colors.Orange;
string str = favoriteColor.ToString(); // returns "Orange"
2.Object.ToString()声明为虚方法，在这些例子中，实现该方法的代码都是为 C#预定义数据类型重写过的代码，以返回这些类型的正确字符串表示。Colors 枚举是-•个预定义的数据类型，它实际上实现为•个派生自 System.Enum 的结构.而 System.Enum 有一个相当智能的 ToStringO 重写方法，处理用户定义的所佴枚举。如果不在自己定义的类中重写 ToStringO,该类将只继承 System.Object 的实现方式——它显示类的名称。如果希绍 ToStringO 返冋•个字符串，其中包含类中对象的值信息，就需要重写它。下面用个例子 Money 来说明这•点。在该例子中，定义-个非常简单的类 Money.它表示美元数。Money 只是 decimal 类的包装器，但它提供了 •个 ToStringO 方法。注意，这个方法必须声明为 override.因为它将荇代(重写^Object 提供的 ToStringO 方法。第 4 章将详细讨论重写。该例子的完整代码如下所注怠它还说明了如何使用屈性封装字段)：
using System;
namespace Wrox
(
class MainEntryPoint
static void Main(stringl] args)
Money cashl = new Money 0;
cashl.Amount * 40M;
Console-WriteLine("cashl»ToString{) returns: " + cashl-ToString()};
Console*ReadLine();
}
}
public class Money
{
private decimal amount;
public decimal Amount
{
get
return amount;
}
set
amount = value;
}
public override string ToStringt)
{
return rr$" + Amount.ToString{);
}
这个例子仅说明了 C#的语法特性。C#己经有表示货币量的预定义类型decimaL所以在现实生
活中，不必编写这样的类来重复该功能，除非要给它添加其他各种方法，在许多情况下，由于格式
化要求，也可以使用String.FonnatO方法(详见第8章)来表示货币字符串，而不是TbStringO、
在Main()方法中，先实例化一个Money对象，再调用IbStringO,执行该方法的重写版本。运
行这段代码，会得到如下结果：
cashl.ToString () returns i $40

3.10 扩展方法 1.有许多扩展类的方式。如果有类的源代码，继承就是给对象添加功能的好方法。但如果没有源代码，则可以使用扩展方法，它允许改变一个类，但不需要该类的源代码，扩展方法是静态方法，它是类的一部分，但实际上没有放在类的源代码中。 2.假定上例中的 Money 类需要一个方法 AddToAmount(decimal amount ToAdd)。但是，由于某种原因，程序集最初的源代码不能直接修改。此时必须创建一个静态类,把方法 AddTbAmount()添加为一个静态方法。对应的代码如下：
namespace Wrox
{
public static class MoneyExtension
{
public static void AddToAmount(this Money money, decimal amountToAdd)
{
money.Amount +=.amountToAdd;
}
}
}
注意 AddToAmount()方法的参数，对于扩展方法，第一个参数是要扩展的类型，它放在 this 关键字的后面，这告诉编译器这个方法是 Money 类型一部分。在这个例子中，Money 是要扩展的类型。在扩展方法中，可以访问所扩展类型的所有公有方法和属性。 3.在主程序中，AddToAmount()方法看起来像是另一个方法。它没有显示第一个参数，也不能对它进行任何处理。要使用新方法，需要执行如下调用，这与其他方法相同：
cash1.AddToAmount(10M); 4.即使扩展方法是静态的，也要使用标准的实例方法语法。注意这里使用 cash1 实例变量来调用
AddToAmount()而没有使用类型名。如果扩展方法与类中的某个方法同名，就从来不会调用扩展方法。类中己有的任何实例方法优先。 5.实例 1
using System;
//必须是静态类才可以添加扩展方法
static class Program
{
static void Main(string[] args)
{
string str = "quzijing";
//注意调用扩展方法,必须用对象来调用
string Newstr = str.Add();
Console.WriteLine(Newstr);
Console.ReadKey();
}
//声明扩展方法
//扩展方法必须是静态的，Add 有三个参数
//this 必须有，string 表示我要扩展的类型，stringName 表示对象名
//三个参数 this 和扩展的类型必不可少，对象名可以自己随意取如果需要传递参数，再增加一个变量即可
public static string Add(this string stringName)
{
return stringName + "a";
}
}
