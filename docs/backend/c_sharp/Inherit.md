---
title: 继承
categories:
    - C#
---

1.实例认识

```csharp
using System;
namespace InheritanceApplication
{
    class Shape
    {
        public void setWidth(int w)
        {
            width = w;
        }
        public void setHeight(int h)
        {
            height = h;
        }
        //protect只能由类或派生类访问
        protected int width;
        protected int height;
    }
    // 派生类
    class Rectangle : Shape
    {
        public int getArea()
        {
            return (width * height);
        }
    }
    class RectangleTester
    {
        static void Main(string[] args)
        {
            Rectangle Rect = new Rectangle();
            Rect.setWidth(5);
            Rect.setHeight(7);
            // 打印对象的面积
            Console.WriteLine("总面积： {0}", Rect.getArea());
            Console.ReadKey();
        }
    }
}
```

## 继承类型

### 实现继承和接口继承 function implementations&function interfaces

1.实现继承：表示一个类型派生于一个基类型，拥有该类型的所有成员字段和函数。派生类型采用基类型的每个函数的实现代码，除非在派生类型的定义中指定重写某个函数的实现代码。 2.接口继承：只继承函数的签名，没继承任何实现代码。在需要指定该类型具有某些可用的特性吋，最好使用这种类型的继承。

### 多重继承

1.一个类派生自多个类。C#不支持多重实现继承，但允许派生自多个接口——多重接口继承。C#类可以派生自另一个类和任意多个接口。更准确地说，System.Object 是一个公共的基类，所以每个 C#类（除了 Object 类之外）都有一个基类，还可以有任意多个基接口。 2.实例

using System;
namespace InheritanceApplication
{
class Shape
{
public void setWidth(int w)
{
width = w;
}
public void setHeight(int h)
{
height = h;
}
protected int width;
protected int height;
}
// 基类 PaintCost
public interface PaintCost
{
int getCost(int area);
}
// 派生类
class Rectangle : Shape, PaintCost
{
public int getArea()
{
return (width _ height);
}
public int getCost(int area)
{
return area _ 70;
}
}
class RectangleTester
{
static void Main(string[] args)
{
Rectangle Rect = new Rectangle();
int area;
Rect.setWidth(5);
Rect.setHeight(7);
area = Rect.getArea();
// 打印对象的面积
Console.WriteLine("总面积： {0}", Rect.getArea());
Console.WriteLine("油漆总成本： \${0}", Rect.getCost(area));
Console.ReadKey();
}
}
}

### 结构和类

结构并不支持实现继承，但支持接口继承。定义结构和类可以总结为： 1.结构总是派生自 System.ValueType，它们还可以派生自任意多个接口。 2.类总是派生自 System.Object 或用户选择的一个类，它们可以派生自任意多接口。

## 实现继承

1.如果要声明派生自另一个类的一个类.就可以使用下面的语法：
class MyDerivedClass: MyBaseClass
{
//函数和数据成员
}
C#不支持私有继承，因此在基类名上没有 public 或 private 限定符。 2.如果类(或结构)也派生自接口，则用逗号分隔列表中的基类和接口 ：
public class MyDerivedClass: MyBaseClass, lnterface1, Interface2
{
// etc.
}
对于结构，语法如下：
public struct MyDerivedStruct: lnterface1, Interface2
{
// etc
} 3.如果在类定义中没有指定基类，C#编译器就假定 System.Object 是基类。
下面的两段代码生成相同的结果：
class MyClass: Object //来源于 Object
{
//etc
}
class MyClass //来源于 Object
{
// etc.
}
第二种形式比较常用，因为它较简单。 4.因为 C#支持 object 关键字，它用作 System.Object 类的假名，所以也可以编写下面的代码：
class MyClass: object
//"etc"
}
如果要引用 Oliject 类，就可以使用 object 关键字，智能编辑器(如 Visual Studio .NET)会识别它，因此便于编辑代码。

### 虚方法

1.实例
using System;
namespace ConsoleApp1
{
//定义一个 Person 类
public class Person
{
//定义方法跑,使用 virtual 修饰
public virtual void PerRun()
{
Console.WriteLine("正长运动");
}
}
//定义学生类继承人类
public class Student : Person
{
public override void PerRun()
{
Console.WriteLine("百米冲刺");
}
}
class Program
{
static void Main(string[] args)
{
//使用父类调用子类
Person p = new Student();
p.PerRun();
Console.ReadKey();
}
}
} 2.虚方法：把一个基类函数声明为 virtual,就可以在任何派生类中重写该函数：
class MyBaseClass
{
public virtual string VirtualMethod()
(
return "方法是虚拟的";
)
} 3.可以把属性声明为 virtual,对于虚属性或重写属性，语法与非虚属性相同，但要在定义中添加关键字 virtual，其语法如下所示:
public virtual string ForeName
(
get ( return foreName；）
set ( foreName = value；）
}
private string foreName;

4.C#要求在派生类的函数重写另一个函数吋，要使用 override 关键字显式声明：
class MyDerivedClass: MyBaseClass
{
public override string VirtualMethod()
{
return "This method is an override defined in MyDerivedClass.";
}
}

5.重写方法的语法避免了 c#中很容易发生的潜在运行错误：当派生类的方法签名无意中与基类版本略有差别吋，该方法就不能重写基类的方法。在 C#中，这会出现一个编译错误，因为编译器会 r 认为函数己标记为 override,但没有重写其基类的方法。 6.虚方法在子类中可以实现也可以不实现。虚方法必须有方法体哪怕是空的。不能用 sealed 修饰。 7.与抽象方法不同：抽象方法必须在抽象类，虚方法不需要，抽象方法在父类中不可以实现，虚方法可以。抽象方法子类必须实现抽象方法，虚方法可以选择 8.成员字段和静态函数都不能声明为 virtual,因为这个概念只对类中的实例函数成员有意义。

### 隐藏方法

1.如果签名相同的方法在基类和派生类中都进行了声明，但该方法没有分别声明为 virtual 和 override，派生类方法就会隐藏基类方法。 2.在大多数情况下，是要重写方法，而不是隐藏方法，因为隐藏方法会造成对于给定类的实例调用错误方法的危险。但是，下面的例子 C#i 语法可以确保开发人员在编译吋收到这个潜在错误的警告，从而使隐藏方法(如果这确实是用户的本意)更加安全。这也是类库开发人员得到的版本方面的好处。
假定有一个类 HisBaseClass：
class HisBaseClass
{
// various members
}
在将来的某刻，要编写一个派生类,用它给 HisBaseClass 添加某个功能，特别是要添加该基类中目前没有的方法——MyGroovyMcthod()：
class MyDerivedClass: HisBaseClass
{
public int MyGroovyMet.hod ()
{
// some groovy implementation
return 0;
}
}

一年后，编者决定扩展基类的功能。为保持一致，添加了一个方法，该方法的名称和签名与前面添加的方法相同，但并不完成相同的工作。因为 MyGroovyMethod()与基类的 MyGroovyMethod()不相关，运行这段代码就可能会产生意外的结果。C#可以很好地处理这种冲突。此吋，编译时系统会发出警告。在 C#中，要隐藏一个方法应使用 new 关键字声明:
class MyDerivedClass: HisBaseClass
{
public new int MyGroovyMethod()
{
// some groovy implementation
return 0;
}
}
新添加的 MyGroovyMethod()没有声明为 new,所以编译器会认为它隐藏了基类的方法，但没有显式声明，因此系统会发出一个警告(这也适用于是否把 MyGroovyMethod()声明为 virtual)。如果愿意，就可以给新方法重命名。最好这么做，因为这会避免许多冲突。但是，如果觉得重命名方法不可能(例如，己经针对其他公司把软件发布为一个库，所以无法修改方法的名称)，则所有的已有客户端代码仍能正确运行，选择新添加的 MyGroovyMethodO。这是因为访问这个方法的任何己有代码必须通过对 MyDerivedClass(或进一步派生的类)的弓 I 用进行选择。己有的代码不能通过对 HisBaseClass 类的引用访问这个方法，因为在对 HisBaseClass 类的早期版本进行编译吋，会产生一个编译错误。这个问题只会发生在将來编写的客户端代码上。C#会发出一个警告，告诉用户在将來的代码中可能会出问题——用户应注意这个警告，不要试图在将来添加的代码中通过对 HisBaseClass 的引用调用新的 MyGroovyMethod()方法，但所有己有的代码仍会正常工作。这是比较微妙的，但它很好地说明了 C#如何处理类的不同版本。

4-3-3 调用函数的基类版本 1.一种特殊的语法用于从派生类中调用方法的基类版本：
base.< MethodName>() 2.假定派生类中的一个方法要返回基类的方法 90%的返回值，就可以使用下面的语法：
class CustomerAccount
{
public virtual decimal CalculatePrice()
{
return 0.0M;
}
}
class GolaAccount : CustomerAccount
{
public override decimal CalculatePrice()
{

{
return base.CalculatePrice() \ \ \*0.9M;
}
}
}
注意.可以使用 base.< MethodName>()语法调用基类中的任何方法，不必从同一个方法的重载中调用它。

4-3-4 抽象类和抽象函数 1.允许把类和函数声明为 abstract。抽象类不能实例化，抽象函数不能直接实现。 2.类包含抽象函数，该类也是抽象的，必须声明为抽象的：
abstract class Building
{
public abstract decimal CalculateHeatingCost();
}

3.实例：
using System;
namespace test
{
public abstract class Teacher //抽象类
{
public abstract int Number //抽象属性
{
set;
get;
}
public abstract void Teaching(); //只要一个类中有关抽象函数则一定要在抽象类中
}
class MathTeacher : Teacher
{
public override void Teaching() //重写的抽象方法
{
Console.WriteLine("我是数学老师，我教数学");
}
public override int Number //重写的抽象属性
{
get { return Number; }
set
{
if (value <= 100)
Number = value;
else
Number = 0;
}
}
}
class Program
{
static void Main(string[] args)
{
MathTeacher myMathTeacher = new MathTeacher();
myMathTeacher.Teaching();
Console.Read();
}
}
}

4-3-5 密封类和密封方法
1.C#允许把类和方法声明为 sealed。对于类，不能继承该类；对于方法，不能重写该方法。
sealed class Finalclass
{
// etc
}

class DerivedClass: Finalclass  
{
// etc
} 2.把类成方法标记为 sealed 吋，最可能的情形是：如果要对库、类或自己编写的其他类作用域之外的类成方法进行操作,则重写某些功能会导致代码混乩。或因商业原因把类或方法标记为 sealed,以防第三方以违反授权协议的方式扩展该类。
3..NET 基类库大量使用了密封类.使希望从这些类中派生出自己的类的第三方开发人员无法访问这些类。例如，string 就是-个密封类。
把方法声明为 scaled 也可以实现类似的目的:
class MyClass: MyClassBase
{
public sealed override void FinalMethod()
{
// etc.
}
}
class DerivedClass: MyClass
{
public override void FinalMethod()
{
}
}
要在方法或属性上使用 sealed 关键字，必须先从基类上把它声明为要重写的方法或属性。如果
基类上不希望有重写的方法或属性，就不要把它声明为 virtual。

4-3-6 派生类的构造函数 1.为了说明为什么必须调用基类的构造函数.下面是手机公司 MortimerPhones 开发的一个例子。这个例子包含一个抽象类 GenericCustomer.它表示顾客。还有一个（非抽象）类 Nevermore60Customer.它表示采用特定付费方式（称为 NevermoreSO 付费方式）的顾客。所有的顾客都有一个名字，它由个私有字段表示。在 Nevermore60 付费方式中，顾客前几分钟的电话费比较髙.需要一个字段 highCostMinutesUsed ,它详细说明了每个顾客该如何支付这些较高的电话费。
抽象类 GenericCustomer 的定义如下所示：
abstract class GenericCustomer
{
private string name;
// lots of other methods etc.
}
class Nevermore60Customer: GenericCustomer
privateu int highCostMinutesUsed;
// other methods etc.
不嬰扣.心在这鸣类中实现的其他方法，因为这里仅考虑构造过程。如果下载 T 本章的示例代码，
就会发现类的定义仪包含构造函数。
下面看看使用 new 运算符实例化 Nevermore60Customer 吋，会发生什么情况：
GenericCustomer customer = new Nevermore60Customer();
然，成员字段 name 和 highCostMinutesUsed 都必须介实例化 customer 吋进行初始化。如果没
有提供 Q 己的构造函数.而是仅依赖默认的构造函数，那么 name 会初始化为 null 引用，
highCostMinutesUsed 初始化为 0。下面详细讨论其过程。
highCostMinutesUsed 字段没有问题：编译器提供的默认 Nevermore60Customer 构造函数会把它
初始化为 0。
那么 name 呢？看看类定义，显然，Nevermore60Customer 构造函数不能初始化这个值。字段
name 卢明为 private,这意味着派巾的类不能访问它。默汄的 Nevermore60Customer 构造函数甚至不
知道存在这个字段。唯-知道这个字段的代码项是 GenericCustomer 的其他成员，这意味着如果对
name 进行初始化，就必须在 GenericCustomer 的某个构造函数中进行。无论类层次结构存多大，这
种怙况都会一 ft 延续到敁终的站类 System.Object 上。
理解了 I:而的问题后，就可以明白实例化派生类吋会发生什么样的情况了。假定默认的构造函
数 1*1:在使用：编译器旨先找到它试图实例化的类的构造函数，在本例中是 Nevermore60Customer.
这个默汄 Nevermore60Customer 构造函数萏先要做的是为其 A 接基类 GenericCustomer 运行默认构造
函数，然后 GenericCustomer 构造函数为其 1*1:接坫类 System.Object 运行默汄构造函数.System.Object
没打仃:何基类，所以它的构造函数就执行.并把控制权返冋给 GenericCustomer 构造函数。现在执
fl GenericCustomer 构造函数，把 name 初始化为 null，W 把控制权返冋给 Nevermore60Customer 构
造函数.接科执行这个构造函数，把 highCostMinutesUsed 初始化为 0,并退出，此吋，
Nevermore60C ustomcr 实例就己经成功地构造和初始化了》
所介操作的鉍终结果足.构造函数的调川顺 W 是先调用 System.Object,再按照层次结构由上
l"J F 进行，If［到到达编译器耍实例化的类为止。还迆注怠/I:这个过程中，侮个构造函数部初始化
它门己的类屮的字段。这足它的-般 I:作方式，在开始添加 tl 己的构造函数吋 I 也应尽可能遵循
这条规则，
注意构造函数的执行顺序。城先凋 H］的总是战类的构造函数。也就是说，派生类的构造函数可
以在执行过程中调用它可以访 M 的任何战类方法、屈性和任何其他成员，因为基类已经构造出来了 I
字段也初始化广这也怠味打.如火派十.类不弘欢初始化坫类的方式.那么只嬰它能汸问褪类的
数則.就"r 以改变数椐的初始位。似足.好的编柷方式几乎总是应尽可能避免这种情况.让基类构
造函数來处坪炖字段。
现解/构造过柷后，就吋以开始添/jiiriLi 的构造函数 r。 1.在层次结构中添加无参数的构造函数
行先 h 论 w 問中的悄况.次结构屮川•个无参数的构造函数來衿换默认的构造函数后.晋
看会发生什么悄况。假定要把每个人的名字初始化为字符串"< noname>"，而不是 null 引用。就可以
修改 GenericCuslomer 屮的代砰，如 F 所不:
99

第丨部分 C#语言
public abstract class GenericCustomer
{
private string name;
public GenericCustomer()
:base() // We could omit this line without affecting the compiled code.
{
name = \ \*'< no name>";
)
添加这段代码后，代码运行正常。Nevermore60Customer 仍有自己的默认构造函数，所以上面
描述的事件的顺序保持不变，但编译器会使用自定义 GenericCustomer 构造函数，而不是生成默认
的构造函数，所以 name 字段按照需要总是初始化为"< no name>"»
注意，在定制的构造函数中，在执行 GenericCustomer 构造函数前，添加了一个对基类构造函
数的调用，使用的语法与前面解释如何让构造函数的不同重载版本互相调用吋使用的语法相同。唯
一的区别是，这次使用的关键字是 base,而不是 this,表示这是基类的构造函数，而不是要调用的
当前类的构造函数，在 base 关键字后面的圆括号中没有参数，这非常重要，因为没有给基类构造函
数传送任何参数，所以编译器必须调用无参数的构造函数。其结果是编译器会插入要调用
System.Object 构造函数的代码，这正好与默认情况相同。
实际上，可以省略这行代码，只加上为本章中大多数构造函数编写的代码：
public GenericCustomer()
如果编译器没有在左花括号的前面找到对另一个构造函数的任何引用，它就会假定我们要调用
基类的构造函数一这符合默认构造函数的工作方式。
base 和 this 关键字是调用另一个构造函数吋允许使用的唯一关键字，其他关键字都会产生编译
错误。还要注意只能指定唯一一个其他的构造函数。
到目前为止，这段代码运行正常。但是，要通过构造函数的层次结构把进度弄乱的最好方法是
把构造函数声明为私有：
private GenericCustomer()
{
name = "< no name>";
)
如果试图这样做，就会产生一个有趣的编译错误，如果不理解构造是如何按照层次结构由上而
下的顺序工作的，这个错误就会让人摸不着头脑。
'Wrox. ProCSharp.GenericCustomer.GenericCustomer () • is inaccessible due to its protection
level
有趣的是，该错误没有发生在 GenericCustomer 类中，而是发也在 Nevermore60Customer 派生类
中。编译器试图为 Nevermore60Customer 生成默汄的构造函数，但又做不到，因为默汄的构造函数
应调用无参数的 GenericCustomer 构造函数。把该构造函数声明为 private,它就不可能访问派生类
了。如果为 GenericCustomer 提供•个带参数的构造函数，们同时没有提供•个无参数的构造函数,
100

第 4 章继 承
也会发生类似的错误。在本例中，编译器不能为 GenericCustomer 生成默认构造函数，所以当编译
器试图为任何派生类也成默认构造函数吋，它会再次发现它不能做到这一点，因为没有无参数的基
类构造函数可调用。这个问题的解决方法是为派生类添加自己的构造函数——实际上不需要在这些
构造函数中做任何工作，这样,编译器就不会为这些派生类生成任何默汄构造函数了。
前面介绍了所有的理论知识，下面用•个例子来说明如何给类的层次结构添加构造函数。下面
为 MortimerPhones 示例添加带参数的构造函数。 2.在层次结构中添加带参数的构造函数
首先是带一个参数的 GenericCustomer 构造函数，它仅在顾客提供其姓名时才实例化顾客：
abstract class GenericCustomer
(
private string name;
public GenericCustomer(string name)
<
this.name = name;
}
到目前为止，代码正常运行，但刚才说过，在编译器试图为派生类创建默认构造函数吋，会产
•个编译错误，因为编译器为 NevenBore60Customer 生成的默认构造函数会试图调用一个无参数
的 GenericCustomer 构造函数，但 GenericCustomer 没有这样的构造函数。因此，需要为派生类提供 -个构造函数，来避免这个编译错误：
class Nevermore60Customer: GenericCustomer
(
private uint highCostMinutesUsed;
public Nevermore60Customer(string name)
: base(name)
{
}
现在，Nevermore60Customer 对象的实例化只有在提供了包含顾客姓名的字符串吋才能进行，
这正是我们耑要的。有趣的是 Nevermore60CuStomer 构造函数对这个字符串所做的处理。它本身不
能初始化 name 字段，因为它不能访问雄类中的私有字段.但可以把顾客姓名传送给基类，以便
GenericCustomer 构造函数处理。具体方法是，把先执行的越类构造函数指定为把顾客姓名作为参数
的构造函数。除此之外，它不需要执行任何操作。
卜\ \*面讨论如果要处理不同的靈载构造函数和，个类的层次结构.会发生什么情况，最终.假定
Nevermore60 的顾客通过朋友联系到 MortimerPhones.即 MortimerPhones 公司中有一个人是朋友，
此通过 U 朋友签约以获得折扣。这表示在构造•个 Nevermore60Customer 吋，还需要传递联系
人的姓名。在现实中活屮.构造函数必须利用该姓名去完成更复杂的工作，如处理折扣等，仴这里
只是把联系人的姓名存储到另-个字段中。
此吋，Nevermore60Customcr 的定义如下所不：
class Nevermore60Customer: GenericCustomer
public Nevermore60Customer(string name, string referrerName)
101

第丨部分 C#语言
:base(name)
{
this.referrerName = referrerName;
)
private string referrerName;
private uint highCostMinutesUsed;
该构造函数将姓名作为参数，把它传递给 GenericCustomer 构造函数进行处理。referrerName 是
一个需要声明的变量，这样构造函数才能在其主体中处理这个参数。
但是，并不是所有的 NeveimorebOCustomers 都有联系人.所以还需要有•-个不需要此参数的构
造函数(或为它提供默认值的构造函数)。实际上.我们指定如果没有联系人，referrerName 字段就设
置为"< None>",使用如下带一个参数的构造函数：
public Nevermore60Customer(string name)
:this(name, "< None>">
{
)
这样就正确建立了所有的构造函数。执行下面的代码行吋，检查事件链很有益：
GenericCustomer customer = new Nevermore60Customer("Arabel Jones");
编译器汄为它需要带个字符串参数的构造函数，所以它确认的构造函数就是刚才定义的最后
—个构造函数，如下所示。
public Nevermore60Customer(string Name)
:this(Name, "< None>")
在实例化 customer 吋，就会调用这个构造函数。之后立即把控制权传递给对应的
Nevermore60Customer 构造函数，该构造函数带两个参数，分別是"Arabel Jones"和"〈NonW。在这个构
造函数中，把控制权依次传递给 GenericCustomer 构造函数.该构造函数带有丨个参数，即字符串
"Arabel Jones"。然后这个构造函数把控制权传送给 System.Object 默认构造函数。现在才能执行这些
构造函数，酋先执行 System.Object 构造函数。接着执行 GenericCustomer 构造函数，它初始化 name
字段。然后带有两个参数的 Nevermore60Customer 构造函数得到控制权，把 referrerName 初始化为
"< None>"«最后，执行 Nevermore60Customer 构造函数，该构造函数带有 1 个参数 这个构造函
数什么也不做。
这个过程非常简洁，设计也很合理。每个构造函数都负责处理相应变最的初始化。在这个过程
中，正确地实例化了类，以备使用。如果在为类编写自己的构造函数吋遵循同样的规则，就会发现，
即便是最复杂的类也可以顺利地初始化，并且不会出现任何问题。

4-5 接口 1.一个类派生自一个接口，声明这个类就会实现某些函数。
2.public interface IDisposable{
void Dispose();
}
声明接口在语法上于声明抽象类相同，但不允许提供接口任何成员的实现方式。 3.实例
using System;
interface IParentInterface
{
void ParentInterfaceMethod();
}
interface IMyInterface : IParentInterface
{
void MethodToImplement();
}
class InterfaceImplementer : IMyInterface
{
static void Main()
{
InterfaceImplementer iImp = new InterfaceImplementer();
iImp.MethodToImplement();
iImp.ParentInterfaceMethod();
}
public void MethodToImplement()
{
Console.WriteLine("MethodToImplement() called.");
}
public void ParentInterfaceMethod()
{
Console.WriteLine("ParentInterfaceMethod() called.");
}
}

4-5-1 定义和实现接口

4.4 修饰符
前面己经遇到许多所谓的修饰符，即应用于类型或成员的关键字。修饰符可以指定方法的可见
性，如 public 或 private：还可以指定一项的本质，如方法是 virtual 或 abstract., C#有许多访问修饰
符.下面讨论完整的修饰符列表。
102

第 4 章继 承
4.4.1 可见性修饰符
表 4-1 中的修饰符确定了是否允许其他代码访问某一项。
表 4-1
注意，类型定义可以是内部或公有的，这取决于是否希望在包含类型的程序集外部访问它：
public class MyClass
（
// etc.
不能把类型定义为 protected、private 和 protected internal，因为这柴修饰符对于包含在名称空间中
的类型没有意义。因此这些修饰符只能应用于成员。但是，可以用这些修饰符定义嵌套的类型（即，
包含在其他类型中的类型），因为在这种情况下，类型也具有成员的状态。于是，下面的代码是合
法的：
public class OuterClass
protected class InnerClass
{
// etc.
I
// etc.
}
如果存嵌奮的类型，则内部的类型总是可以访问外部类型的所有成员。所以，在上面的代码中.
InnerClass 中的代码可以访问 OuterClass 的所介成员，甚至可以访问 OuterClass 的私存成员。
4.4.2 其他修饰符
表 4\*2 中的修饰符可以应用于类型的成员，而且存不同的用途。在应用于类型时，其中的几个
修饰符也是釘怠义的。
表 4-2
103

第 I 部分 C#语言
(续茨)
4.5 接口
如前所述，如果一个类派生自一个接口，声明这个类就会实现某些函数。并不是所有的面向对
象语言都支持接口’所以本节将详细介绍 C#接口的实现，下面列出 Microsoft 预定义的一个接口
System.IDisposable 的完整定义。［Disposable 包含一个方法 DisposeO,该方法由类实现，用于清理
代码：
public interface IDisposable
void Dispose ();
}
上面的代码说明，声明接口在语法上与声明抽象类完全相同’但不允许暹供接口中任何成员的
实现方式，一般情况下，接口只能包含方法、属性、索引器和事件的声明.
不能实例化接口，它只能包含其成员的签名，接 U 既不能有构造函数(如何构建不能实例化的对
象？)也不能有字段(因为这隐含了某些内部的实现方式)，接 U 定义也不允许包含运算符重载，尽管
这不是因为声明它们在原则上有什么问题，而是因为接口通常是公共协定，包含运算符重载会引起
一些与其他.NET 语言不兼容的问题，如 Visual Basic.NET,因为它不支持运算符重载。
在接口定义中还不允许声明关于成员的修饰符。接 U 成员总是公有的，不能声明为虚拟或静
态。如果需要，就应由实现的类来声明，因此最好实现挾行的类来声明访问修饰符，就像本节的
代码那样。
例如 IDisposable.如果类希望声明为公有类型，以便它实现方法 DisposeO,该类就必须实现
IDisposable。在 C#中，这表示该类派生 Q IDisposable 类。
class SomeClass: IDisposable
{
// This class MUST contain an implementation of the
"IDisposable.Dispose() method, otherwise
"you get a compilation error,
public void Dispose()
{
"implementation of Dispose() method
}
// rest of class
在这个例子中，如果 SomeClass 派生自 IDisposable 类，但不包含与(Disposable 类中签名相同的
104

第 4 章继 承
DisposeO 实现代码，就会得到一个编译错误.因为该类破坏了实现 IDisposable 的一致协定。当然，
编译器允许类有一个不派生自 IDisposable 类的 DisposeO 方法。问题是其他代码无法识别出
SomeClass 类支持 IDisposable 特性。
0
[Disposable 是一个相当简单的接口，它只定义了一个方法。大多数接口都包含许多
成员.
4.5.1 定义和实现接口
下面开发一个遵循接口继承规范的小例子来说明如何定义和使用接口。这个例子建立在银行账
户的基础上。假定编写代码，最终允许在银行账户之间进行计算机转账业务。许多公司可以实现银
行账户，但它们一致认为，表示银行账户的所有类都实现接口 IBankAccount。该接口包含一个用于
存取款的方法和一个返冋余额的属性。这个接口还允许外部代码识别由不同银行账户实现的各种银
行账户类。我们的目的是允许银行账户彼此通信，以便在账户之间进行转账业务，但还没有介绍这
个功能。
为了使例子简单一些，我们把本例子的所有代码都放在同一个源文件中，但实际上不同的银行
账户类不仅会编译到不同的程序集中，而且这些程序集位于不同银行的不同机器上。但这些内容对
于我们的目的过于复杂了。为了保留一定的真实性，我们为不同的公司定义不同的名称空间。
酋先，需要定义 IBankAccount 接口：
namespace Wrox.ProCSharp
public interface IBankAccount
{
void Payin(decimal amount);
bool Withdraw(decimal amount);
decimal Balance < get; }
)
注意，接口的名称为 IBankAccount。接口名称通常以字母丨开头，以便知道这是•个接口。
0
如第 2 章所述，在大多数情况下，.NET 的用法规则不鼓励采用所谓的 Hungarian 表示
法,在名称的前面加一个字母，表示所定义对象的类型.接口是少数儿个推荐使 Hungarian
表示法的例外之一.
现在可以编写表氺银行账户的类了。这些类不必彼此相关，它们可以是完全不同的类。但它们
都表示银行账户，因为它们都实现了 IBankAccount 接 U。
下 ifti 足第’个类，•个山 Royal Bank of Venus 运行的存款账户：
namespace Wrox.ProCSharp.VenusBank
105

第 I 部分 C#语言
p
ublic class SaverAccount: IBankAccount
private decimal balance;
p (
vblic void Payin(decimal amount)
balance += amount;
public bool Withdraw(decimal amount)
i
if (balance >= amount)
{
balance -= amount;
return true;
}
Console.WriteLine("Withdrawal attempt failed."):
return false;
}
public decimal Balance
{
get
return balance;
)
}
public override string ToString()
{
returnstring・Format("Venus Bank Saver: Balance = (0,6:C}r,, balance);
}
)
实现这个类的代码的作用一目了然。其中包含个私有字段 balance,当存款或取款时就调整这
个字段。如果因为账户中的金额不足而取款失败，就会显示一条错误消息。还要注意，因为我们要
使代码尽可能简单，所以不实现额外的属性，如账户持有人的姓究。在现实生活中，这是最基本的
信息，但对于本例不必要这么复杂。
在这段代码中，唯一有趣的一行是类的声明：
public class SaverAccount: IBankAccount
SaverAccount 派生自一个接口 IBankAccount，我们没有明确指出任何其他基类(当然这表示
SaverAccount 直接派生自 System-Object)^另外，从接口中派生完全独立于从类中派生。
SaverAccount 派生自 IBankAccount，表示它获得了 IBankAccount 的所有成员，但接口实际上并
不实现其方法，所以 SaverAccount 必须提供这些方法的所有实现代码。如果缺少实现代码，编译器
就会产生错误，接口仅表示其成员的存在性，类负责确定这些成员是虚拟还是抽象的(僚只有在类本
身是抽象的，这些函数才能是抽象的)，在本例中，接口的任何函数不必是虚拟的，
为了说明不同的类如何实现相同的接口，下面假定 Planetary Bank of Jupiter 还实现一•个类
GoldAccount 来表示其银行账户中的一个：
nameSpaceWrox•ProCSharp.JupiterBank
public class GoldAccount: IBankAccount
106

第 4 章继 承
// etc
这里没有列出 GoldAccount 类的细节，因为在本例中它基本上与 SaverAccount 的实现代码相同，
GoldAccount 与 SaverAccount 没有关系，它们只是碰巧实现相同的接 □ 而己。
有了自己的类后，就可以测试它们了。首先需要一些 using 语句：
using System;
usingWrox.ProCSharp;
usingWrox.ProCSharp.VenusBank;
usingWrox.ProCSharp.JupiterBank;
然后需要一个 Main()方法：
namespaceWrox.ProCSharp
{
classMainEntryPoint
(
static void Main()
(
IBankAccountvenusAccount = new SaverAccount();
IBankAccountjupiterAccount = new GoldAccount();
venusAccount.Payin(200);
venusAccount.Withdraw(100);
Console.WriteLine(venusAccount.ToString());
jupiterAccount.Payin(500);
jupiterAccount.Withdraw(600);
jupiterAccount.Withdraw(100);
Console.WriteLine(jupiterAccount.ToString());
}
)
)
这段代码(如果下载本例子，就会发现它在 BankAccounts.cs 文件中)的执行结果如下：
C:>BankAccounts
Venus Bank Saver: Balance = £100.00
Withdrawal attempt failed.
Jupiter Bank Saver: Balance = £400.00
在这段代码中，耍点是把两个引 ffl 变镜声明为 IBankAccount 引用的方式。这表示它们可以指向
实现这个接 L1 的仃何类的任何实例。们我们只能通过这些引用调用接 U 的-部分方一如果要调
用由类实现的但不在接口中的方法，就需耍把引用强制转换为合适的类型。在这段代码中，我们调
用了 ToString()(不是 IBankAccount 实现的)，们.没有进行任何显式的强制转换，这只是因为 ToStringQ
是•个 System.Objcct 方法，因此 C#编译器知道任何类都支持这个方法(换言之.从任何接口到
System.Object 的数据类型强制转换是隐式的)。第 7 韋将介绍强制转换的语法。
接 U 引用完全可以揞成类 U 用——但接 U 引川的强大之处在于.它可以引用任何实现该接口的
类。例如，我们可以构造接 U 数姐.其屮数组的每个元素都是不同的类：
IBankAccount(] accounts = new IBankAccount[2];
accounts(0J = new SaverAccount();
107

第 1 部分 C#语言
accounts[1] = new GoldAcccunt();
但注意，如果编写了如下代码，就会生成一个编译错误：
accounts[1J = new SomeOtherClass (); // SomeOtherClass does NOT implement
// IBankAcccunt: WRONG!!
这会导致一个如下所示的编译错误：
Cannot implicitly convert type 'Wrox.ProCSharp. SomeOtherClass' to
1Hrox.ProCSharp.IBankAccount1

4.5.2 派生的接口
接口可以彼此继承，其方式与类的继承方式相同，下面通过定义一个新的接口
ITransfcrBankAccount 来说明这个概念，该接口的功能与 IBankAccount 相同，只是又定义了一个方法，把资金直接转到另一个账户上。
namespaceWrox.ProCSharp
public interface ITransferBankAccount: IBankAccount
{
{
boolTransferTo(IBankAccount destination, decimal amount);
}
}
因为 ITransferBaiikAccount 派生自 IBankAccount.所以它拥有 IBankAccount 的所有成员和它自己的成员。这表示实现(派生自)ITransferBankAccount 的任何类都必须实现 IBankAccount 的所有方法
和在 ITransferBankAccount 中定义的新方法 TransfciToO,没有实现所有这些方法就会产生一个编译
雕。
注意，TransferToO 方法对于目标账户使用了 EankAccount 接口引用。这说明了接口的用途：在
实现并调用这个方法时，不必知道转账的对象类型，只需知道该对象实现 IBankAccount 即可。
下面说明 ITransferBankAccount:假定 Planetary Bank of Jqjiter 还提供了一个当前账户。
CuirentAccount 类的大多数实现代码与 SaverAccount 和 GoldAccount 的实现代码相同(这仅是为了使
例子更简单，一般是不会这样的).所以在下面的代码中，我们仅突出显示了不同的地方：
public class CurrentAccount: ITransferBankAccount
{
private decimal balance;
public void Payin(decimal amount)
{
balance += amount;
J
publicbool Withdraw(decimal amount)
{
if {balance >= amount) ♦
{
balance -= amount;
return true；
}
Console・Writ 眘 Lin 翁("Withdrawal attempt failed.\*');
return false;
108

第 4 華继 承
public decimal Balance
{
get
{
return balance;
}
publicboolTransferTo(IBankAccount destination, decimal amount)
<
bool result;
result = Withdraw (amount);
if (result)
{
destination.PayIn(amount);
return result;
}
public override string ToString()
<
returnstring.Format("Jupiter Bank Current Account: Balance = {0,6:C}"zbalance);
可以用下面的代码验证该类：
static void Main()
IBankAccountvenusAccount = new SaverAccount();
ITransferBankAccountjupiterAccount = new CurrentAccount();
venusAccount.Payin(200);
jupiterAccount.Payin(500);
jupiterAccount.TransferTo(venusAccount, 100);
Console.WriteLine(venusAccount.ToString());
Console.WriteLine(jupiterAccount.ToString());
)
这段代码(CunentAccounts,cs)的结果如下所示，可以验证，其中说明了正确的转账金额:
C:>CurrentAccount
Venus Bank Saver: Balance = £300.00
Jupiter Bank Current Account: Balance = £400.00
