---
title: Linq
tags:
    - C#
    - Linq
categories:
    - C#
---

## Linq 概述

语言集成查询(Language Integrated Query, LINQ)在 C#编程语言中集成了查询语法，可以用相同的语法访问不同的数据源。LINQ 提供了不同数据源的抽象层，所以可以使用相同的语法。

### LINQ 查询：

```csharp
private static void LinqQuery(){
    var query = from r in Formulal.GetChapions()
                where r.Contry=="Brazil"
                orderby r.Wins descending
                select r;
    foreach(Racer r in query)
    {
        Console.WriteLine("{0:A}",r);//显示来自巴西的所有世界冠军并排好序
    }
}
```

-   query 后是一个 LINQ 查询，子句 from、where、orderby、descending 和 select 都是查询预定义的关键字。查询表达式必须以 from 子句开头，以 select 或 group 子句结束。两个子句之间可以使用 where、orderby、join、let 和其他 from 子句。
-   变量 query 只指定了 LINQ 查询，该查询不是通过赋值语句执行的，只要使用 foreach 循环访问查询，该查询就会执行。

### 扩展方法

-   编译器会转换 LINQ 查询，以调用方法而不是 LINQ 查询。LINQ 为 lEnumerable()接口提供了各种扩展方法，以便用户在实现了该接口的任意集合上使用 LINQ 查询。扩展方法在静态类中声明，定义为一个静态方法，其中第一个参数定义了它扩展的类型。扩展方法可以将方法写入最初没有提供该方法的类中。还可以把方法添加到实现某个特定接口的任何类中，这样多个类就可以使用相同的实现代码。
    例如,String 类没有 Foo()方法。String 类是密封的，所以不能从这个类中继承。但可以创建一个扩展方法，如下所示：

```
public static class StringExtension
        {
            public static void Foo(this string s)
            {
                Console.WriteLine("Foo invoked for {0}", s);
            }
        }
```

扩展方法定义为静态方法，其第一个参数定义了它扩展的类型，扩展方法在一个静态类中声明。
Foo()方法扩展了 String 类，因为它的第一个参数定义为 String 类型。为了区分扩展方法和一般的静态方法，扩展方法还需要对第一个参数使用 this 关键字。
现在就可以使用带 string 类型的 Foo()方法了：

```
string s = "Hello";
s.Foo();
```

结果在控制台上显示“Foo invoked for Hello"。因为 Hello 是传递给 Foo()方法的字符串。
也许这看起来违反了面向对象的规则，因为给一个类型定义了新方法，但没有改变该类型或派生自它的类型。似实际上并非如此。扩展方法不能访问它扩展的类型的私有成员。调用扩展方法只是调用静态方法的一种新语法。对于字符串.可以用如下方式调用 Foo()方法，获得相同的结果：

```
string s = "Hello";
StringExtension.Foo(s);
```

要调用静态方法，应在类名的后面加上方法名。扩展方法是调用静态方法的另一种方式。不必
提供定义了静态方法的类名，相反，编译器调用静态方法是因为它带的参数类型。只要导入包含该类的名称空间，就可以将 Foo()扩展方法放在 string 类的作用域中。
定义 LINQ 扩展方法的一个类是 System.Linq 名称空间中的 Enumerable.只需要导入这个名称
空间，就打开了这个类的扩展方法的作用域。下面列出了 Where()扩展方法的实现代码。Where()扩展方法的第一个参数包含了 this 关键字，其类型是 lEnumerable< T>这样，Where()方法就可以用于实现了 lEnumerable< T>的每个类型。例如数组和 List()类实现了 IEnumerablc()接口。第二个参数是一个 Func< T,bool>委托，它引用了一个返回布尔值、参数类型为 T 的方法，这个谓词在实现代码中调用，检査 IEnumerable< T>源中的项是否应放在目标集合中。如果委托引用了该方法，yield return 语句就将源中的项返回给目标。

```
public static lEnumerable<TSource> where<TSource>{
this IEnumerable<TSource> source,
Func<TSource, bool> predicate)
{
foreach (TSource item in source)
if (predicate(item))
yield return item;
}
```

因为 Where()作为一个泛型方法实现，所以它可以用于包含在集合中的任意类型，实现了 IEnumerable< T>接口的任意集合都支持它.

这里的扩展方法在 System.Core 程序集的 SystentLinq 名称空间中定义.
现在就可以使用 Enumerable 类中的扩展方法 Where()、OrderByDescending()和 Select()这些方法都返回 IEmimerable< TSourco>,所以可以使用前面的结果依次调用这些方法。通过扩展方法的参数，使用定义了委托参数的实现代码的匿名方法(代码文件 LINQIntro/Program-cs).

```
private static void ExtensionMethods()
        {
            var champions = new List<Racer>(Formula1.GetChampions());
            IEnumerable<Racer> brazilChampions =
                champions.Where(r => r.Country == "Brazil").
                        OrderByDescending(r => r.Wins).
                        Select(r => r);
            foreach (Racer r in brazilChampions)
            {
                Console.WriteLine("{0:A}", r);
            }
        }
```

## 推迟查询的执行

在运行期间定义査询表达式时，査询就不会运行。査询会在迭代数据项时运行。
再看看扩展方法 Where()。它使用 yield return 语句返回谓词为 true 的元素。因为使用了 yield return 语句，所以编译器会创建一个枚举器，在访问枚举中的项后，就返回它们。

```
 public static IEnumerab1e<T> Where<T>(this IEnumerable<T> source,
                            Func<T, bool> predicate)
        {
            foreach (T item in source)
            {
                if (predicate(item))
                {
                    yield return item;
                }
            }
        }
```

这是一个非常有趣也非常重要的结果。在下面的例子中，创建了 String 元素的一个集合，用名称填充它。接着定义一个查询，从集合中找出以字母 J 开头的所有名称。集合也应是排好序的。在定义查询吋，不会进行迭代。相反，迭代在 foreach 语句中进行，在其中迭代所有的项。集合中只有一个元素 Juan 满足 where 表达式的要求，即以字母 J 开头。迭代完成后，将 Juan 写入控制台。之后在集合中添加 4 个新名称，再次进行迭代。

```
 var names = new List<string> { "Nino", "Alberto", "Juan", "Mike", "Phil" };
            var namesWithJ = from n in names
                             where n.StartsWith("J")
                             orderby n
                             select n;
            Console.WriteLine("First iteration");
            foreach (string name in namesWithJ)
            {
                Console.WriteLine(name);
            }
            Console.WriteLine();
            names.Add("John");
            names.Add("Jim");
            names.Add("Jack");
            names.Add("Denny");
            Console.WriteLine("Second iteration");
            foreach (string name in namesWithJ)
            {
                Console.WriteLine(name);
            }
```

冈力迭代在查询定义吋不会进行，而是在执行每个 foreach 语句时进行，所以可以看到其中的变
化.如应用程序的结果所示：
First iteration
Juan

Second iteration
Jack
Jim
John
Juan
当然，还必须注意，每次在迭代中使用查询吋，都会调用扩展方法。在大多数情况下，这是非常有效的，因为我们可以检测出源数裾中的变化。但是在一些情况下，这是不可行的。调用扩展方法 ToAmy()、ToList()等可以改变这个操作。在示例中，ToiList 遍历集合，返回一个实现了 IList< string>的集合，之后对返回的列表遍历两次，在两次迭代之间，数据源得到了新名称。
new List< string>
var names=
{ ',NinoN, "Alberto", "JuanM, "Mike", "Phil/， };
var namesWithJ = (from n in names
where n.StartsWith(，'J”)
orderby n
select n).ToList();
Console-WriteLine (,rFirst iteration");
foreach (string name in namesWithJ)
Console.WriteLine(name);
}
Console.WriteLine(>;
names.Add("John”);
names,Add("Jim");
names ♦Add ("Jack");
names.Add ("Denny");
Console.WriteLine{"Second iteration"};
foreach (string name in namesWithJ)
{
Console-WriteLine(name);
}
在结果中可以看到，在两次迭代之间输出保持不变，但集合中的值改变了：
First iteration
Juan
Second iteration
Juan

## 标准的查询操作符

Where、OrderByDescending 和 Select 只是 LINQ 的几个查询操作符。LINQ 查询为最常用的操
作符定义丁一个声明语法。还有许多査询操作符可用于 Emunerable 类。
表 11-1 列出了 Emimerabk 类定义的标准査询操作符。

| 标准查询操作符                                                                              | 说明                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Where OfType                                                                                | 筛选操作符定义了返回元素的条件，在 Where 查询操作符中，可以使用谓词，例如 lambda 表达式定义的谓词,来返回布尔值。OfType< TResult>根据类型筛选元素，只返回 TResult 类型的元素                                                                                                       |
| Select SelectMany                                                                           | 投射操作符用于把对象转换为另一个类型的新对象，Select 和 SelectMany 定义了根据选择器函数选择结果值的投射                                                                                                                                                                           |
| OrderBy ThenBy OrderByDescending ThenByDescending Reverse                                   | 排序操作符改变所返回元素的顺序。OrderBy 按升序排序，OrderByDescending 按降序排序。如果第一次排序的结果很类似，就可以使用 ThenBy 和 ThenByDescending 操作符进行第二次排序，Reverse 反转集合中元素的顺序                                                                            |
| Join GroupJoin                                                                              | 连接操作符用于合并不直接相关的集合，使用 Join 操作符，可以根据键选择器函数连接两个集合，类似于 SQL 中的 JOIN，GroupJoin 操作符连接刘昂个集合，组合其结果                                                                                                                          |
| Any All Contains                                                                            | 如果元素序列满足指定的条件，限定符操作符就返回布尔值。Any、All 和 Contains 都是限定操作符。Any 确定集合中是否有满足谓词函数的元素；All 确定集合中的所有元素是否逗满足谓词函数；Contains 检查某个元素是否在集合中                                                                  |
| Take Skip TakeWhile SkipWhile                                                               | 分区操作返回集合的一个子集。Take、Skip、TakeWhile 和 SkipWhile 都是分区操作符。使用他们可以得到部分结果。使用 Take 必须要指定从集合中提取的元素个数；Skip 跳过指定的元素个数，提取其他元素；TakeWhile 提取条件为真的元素                                                          |
| Distinct Union Intersect Except Zip                                                         | Set 操作符返回一个集合。Distinct 从集合中删除重复的元素。除了 Distinct 之外。其他 Set 操作符都需要两个集合。Union 返回出现在其中一个集合中的唯一元素。Intersect 返回两个集合都有的元素。Except 返回只出现在一个集合中的元素。Zip 把两个集合合并为一个                             |
| First FirstOrDefault Last LastOfDefault ElementAt ElementAtOrDefault Single SingleOrDefault | 这些元素操作符仅返回一个元素。First 返回第一个满足条件的元素。FirstOrDefault 类似于 First，但如果没有找到满足条件的元素，就返回类型的默认值。Last 返回最后一个满足条件的元素。                                                                                                    |
| First FirstOrDefault Last LastOfDefault ElementAt ElementAtOrDefault Single SingleOrDefault | 这些元素操作符仅返回一个元素。First 返回第一个满足条件的元素。FirstOrDefault 类似于 First，但如果没有找到满足条件的元素，就返回类型的默认值。Last 返回最后一个满足条件的元素。指定了要返回的元素的位置。Single 只返回一个满足条件的元素。如果有多个元素都满足条件，就抛出一个异常 |
| Count Sum Min Max Average Aggregate                                                         | 聚合操作符计算集合的一个值，利用这些聚合操作符，可以计算所有值的总和、所有元素的个数、值最大和最小的元素，以及平均值等                                                                                                                                                            |
| ToArray AsEnumerable ToList ToDictionary Cast< TResult>                                     | 这些转换操作符将集合转换为数组：IEnumerable、IList、IDictionary 等                                                                                                                                                                                                                |
| Empty Range Repeat                                                                          | 这些生成操作符返回一个新集合，使用 Empty 时集合是空的;Range 返回一系列数字;Repeat 返回一个始终重复一个值得的集合                                                                                                                                                                  |

## 筛选

下面介绍一些査询的示例。
使用 where 子句，可以合并多个表达式。例如，找出赢得至少 15 场比赛的巴西和奥地利赛车手。
传递给 where 子句的表达式的结果类型应是布尔类型：
var racers = from r in Formulal.GetChampions()
where r,Wins > 15 &&
(r-Country == ^Brazil11 1 | r.Country «， ^Austria11}
select r;
foreach (var r in racers}
{
Console.WriteLine("{0:A}H, r);
}
用这个 LINQ 査询启动程序，会返回 Niki Lauda、Nelson Piquet 和~«0115011«1，如下：
Niki Lauda, Austria, Startsi 173, Wins: 25
Nelson Piquet, Brazil, Starts: 204, Wins: 23
Ayrton Senna, Brazil, Starts: 161, Wins: 41
并不是所有的査询都可以用 LINQ 査询语法完成。也不是所有的扩展方法都映射到 LINQ 査询
子句上。髙级査询需要使用扩展方法。为了更好地理解带扩展方法的复杂査询，最好看看简单的查
询是如何映射的。使用扩展方法 WhereO 和 SelectO,会生成与前面 LINQ 査询非常类似的结果：
var racers ・ Formulal.GetChampions().
Where(r => r.Wins > 15 &&
(r.Country == "Brazil" I| r,Country =; "Austria"".
Select(r => r)；
##11.2.2 用索引筛选
不能使用 LINQ 査询的二^例子是 WhereO 方法的重载，在 WhereO 方法的重载中，可以传递第
二个参数一索引，索引是筛选器返回的每个结果的计数器一可以在表达式中使用这个索引，执行

基于索引的计算。下固的代码由 Where()扩展方法调用，它使用索引返回姓氏以 A 开头、索引为偶
数的務东手(代码文件 EnumerableSampIc/Program.cs):
var racers = Formulal.GetChampions().
Where((rr index) => r.LastName.StartsWith("A") && index % 2 != 0);
foreach (var r in racers)
{
Console.WriteLine("{0:A|", r);
I
姓氏以 A 开头的所有務车手有 Alberto Ascari^ Mario Andretti 和 Fernando Alonso。因为 Mario
Andretti 的索引是奇数，所以他不在结果中：
Alberto Ascari, Italy; starts: 32, wins: 10
Fernando Alonso, Spain; starts: 177, wins: 27
##11.2.3 类型筛选
为广进行越于类型的筛选，可以使用 OfTypeO 扩展方法。这里数组数据包含 string 和 int 对象。
使用 OfType()扩展方法，把 string 类传送给泛型参数，就从集合中仅返回字符串(代码文件
EnumerableSample/Program.cs)：
object[) data = { "one", 2, 3, "four", "five", 6 };
var query = data.OfType< string>();
foreach (var s in query)
(
Console.WriteLine(s);
}
运行这段代码，就会显示字符串 one、four 和 five。
one
four
five
##11.2.4 复合的 from 子句
如果：要根据对象的一个成员进行筛选，而该成员本身是 个系列，就可以使用复合的 from 子
句。Racer 类定义了个诚性 Cars. K 屮 Cars 是一个字符串数组。耍筛选驾驶法拉利的所有冠军.
以使川如卜'所〆的 LINQ friiijo 第一个 from f 句汸问从 Formulal .Get Champions()方法返|?1 的 Racer
对象，第一.个 from f.句访问 Racer 类的 Can;诚性，以返冋所宵 string 类型的赛车。接着在 where f
fij 屮使川这巧费 V 筛选呀驶法拉利的所代奶义件 EnumerableSample/Program.cs)。
var ferrariDrivers = from r in Formulal.GetChampions()
from': in r .Cars
where c ― \*'Ferrari"
orderby r.LastName
select r.FirstName + " " + r.LastName;
这个作洵的结果驶法拉利的所行一级方程式冠军：
Alberto Ascari
Juan Manuel Fangio

Mike Hawthorn
Phil Hill
Niki Lauda
Kimi Raikk&nen
Jody Scheckter
Michael Schumacher
John Surtees
译器把复合的 from 子句和 LINQ 查询转换为 SelectManyO 扩展方法。SelectManyO 方法可

<!-- 用于迭代序列的序列，示例中 SelectManyO 方法的重载版本如下所示：
public static IEnumerable<TResult> SelectMany<TSourcef TCollection, TResult> (
this IEnumerable<TSource> source,
Func<TSource,
IEnumerable<TCollection» collectionselector,
Func<TSovrce, TCollection, TResult> resvltSelector); -->

第一个参数是隐式参数，它从 GetChampionsG 方法中接收 Racer 对象序列。第二个参数是
collectionselector 委托，其中定义了内部序列。在 lambda 表达式 r => r.Cars 中，应返回赛车集合。
第三个参数是一个委托，现在为每个赛车调用该委托，接收 Racer 和 Car 对象。lambda 表达式创建
了一个匿名类型，它有 Racer 和 Car 属性。这个 SelectManyO 方法的结果是摊平了赛车手和赛车的层
次结构，为每辆赛车返回匿名类型的一个新对象集合。
这个新集合传递给 WhereO 方法，筛选出驾驶法拉利的赛车手。最后’调用 OrderByO 和 SelectO
方法：
var ferrariDrivers = Formulal.GetChanpions ()-
SelectMany(r => r-Cars,
(r, c) => new { Racer - r. Car = c }).
Where(r => r-Car == ''Ferrari").
OrderBy(r => r.Racer.LastName).
Select(r => r.Racer.FirstName + N " + r-Racer.LastName);
把 SelectManyO 泛型方法解析为这里使用的类型，所解析的类型如下所示，在这个例子中，数
据源是 Racer 类型，所筛选的集合是一个 string 数组，当然所返回的匿名类型的名称是未知的，这
里显示为 TResult：

<!-- public static IEnumerable<TResult> SelectMany<Racer, string, TResuIt> (
this IEnuinerable<Racer> source,
Func<Racer, IEnumerable<string» collectionselector,
Func<Racerr string, TResult> resultselector);
査询仅从 LINQ 査询转换为扩展方法，所以结果与前面的相同。
##11.2.5 排序 -->

要对序列排序，前面使用了 orderby 子句。下面复习一下前面使用的例子，但这里使用 orderby
descending 子句。其中赛车手按照贏得比赛的次数进行降序排序，赢得比赛的次数用关键字选择器
指定(代码文件 EnumerableSample/Progranixs):
var racers = from r in Formula1-GetChampions()
where r.Country ®・"Brazil11

orderbyr.Wins descending
select r;
orderby 子句解析为 OrderByO 方法，orderby descending 子句解析为 OrderByDescendingQ 方法:
var racers = Formulal.GetChampions().
Where(r => r.Country == "Brazil").
OrderByDescending(r => r・Wins).
Select(r => r);

<!-- OrderByO 和 OrderByDescendingO 方法返回 IOrderEnumerable<TSource>。这个接口派生自
IEnumerable<TSource>接口，但包含一个额外的方法 CreateOrderedEnumerable<TSource>0° 这个方
法用于进一步给序列排序。如果根据关键字选择器来排序，其中有两项相同，就可以使用 ThenByO
和 ThenByDescending 0 方法继续排序。这两个方法需要 10rderEnumerable<TSource>接口才能工作，
但也返回这个接口。所以，可以添加任意多个 ThenByO 和 ThenByDescendingO 方法，对集合排序。
使用 LINQ 查询吋，只需要把所有用于排序的不同关键字(用逗号分隔开)添加到 orderby 子句中。
在下例中，所有的赛车手先按照国家排序，再按照姓氏排序，最后按照名字排序。添加到 LINQ 査 -->

询结果中的 TakeO 扩展方法用于提取前 10 个结果：
var racers = (from r in Formulal.GetChampions()
orderby r.Country, r.LastName, r.FirstName
select r).Take(10);
排序后的结果如下:
Argentina: Fangio, Juan Manuel
Australia: Brabham, Jack
Australia: Jones, Alan
Austria: Lauda, Niki
Austria: Rindt, Jochen
Brazil: Fittipaldi, Emerson
Brazil: Piquet, Nelson
Brazil: Senna, Ayrton
Canada: Villeneuve, Jacques
Finland: Hakkinen, Mika
使用 OrderByO 和 ThenByO 扩展方法可以执行相同的操作：
var racers = Formulal.GetChampions().
OrderBy(r => r.Country).
ThenBy(r => r.LastName).
ThenBy(r => r.FirstName).
Take(10);
##11.2.6 分组
要根据一个关键 7 值对査询结果分组，可以使用 group 子句。现在一级方程式冠军应按照 K 家
分组，并列 II! 一个 ㈤ 家的冠军数。子句 group r by r.Country into g 根据 Country 属性组合所有的務车
手，并定义一个新的标识符 g,它以后用于访问分组的结果信息。group 子句的结果根据应用到分组
结果 1：的扩展方法 CoiinK)来排序，如果冠军数相同，就根据关键字来排序.该关键字是国家.因为
这是分组所使用的关键字。where 子句根据至少有 W 项的分组来筛选结果.select 子句创建一个带

Country 和 Count 属性的匿名类型(代码文件 EnumerableSample/Program.cs) 0
var countries = from r in Formulal.GetChampions()
groupr by r,Country into g
orderby g,Count() descending, g.Key
where g.Count() >= 2
select new {
Country = g.Key,
Count = g.Count{)
}；
foreach (var item in countries)
{
Console.WriteLine (0, -10} item.Country, item.Count);
结果显示了带 Country 和 Count 属性的对象集合:
UK io
Brazil 3
Finland 3
Australia 2
Austria 2
Germany 2
Italy 2
USA 2
要用扩展方法执行相同的操作，应把 groupby 子句解析为 GroupByO 方法。在 GroupByO 方法的
声明中，注意它返回实现丁 IGrouping 接口的枚举对象。IGrouping 接口定义了 Key 属性，所以在定

<!-- 义了对这个方法的调用后，可以访问分组的关键字：
public static IEnumerable<IGrouping<TKey, TSource» GroupBy<TSource, TKey>(
this IEnumerable<TSource> source, Func<TSource, TKey> keySelector);
把子句 groiq)r by rCountry into g 解析为 GroupBy(r => r.Countiy)，返回分组序列。分组序列首先
用 OrderByDescendingO 方法排序，再用 HienByO 方法排序。接着调用 WhereO 和 SelectO 方法。
var countries = Formulal.GetChampions().
Gzoi^>By(r => r・Country). -->

OrderByDescending(g => g・Count()).
ThenBy(g => g.Key).
Where(g => g.Count(} >= 2)一
Select (g => new { Country = g.Key,
Count = g-Count() });
11.2.7 对嵌套的对象分组
如果分组的对象应包含嵌套的序列，就可以改变 select 子句创建的匿名类型。在下面的例子中，
所返回的国家不仅应包含国家名和赛车手数量这两个属性，还应包含赛车手名序列，这个序列用一
个赋予 Racers 属性的 fiom/m 内部子句指定，内部的 from 子句使用分组标识符 g 获得该分组中的所
有赛车手，用姓氏对它们排序，再根据姓名创建一字符串(代码文件 EnumerableSample/Programcs)：

var countries = from r in Formulal.GetChampions()
group r by r.Country into g
orderby g.Count() descending, g.Key
where g.Count() >= 2
select new
{
Country = g.Key,
Count = g・Count()/
Racers = from rl in g
orderby rl.LastName
select rl.FirstName + " " + rl.LastName
)；
foreach (var item in countries)
(
Console.WriteLine("{0, -10} {1}", item.Country, item.Count);
foreach (var name in item.Racers)
(
Console.Write("{0}; ", name);
}
Console.WriteLine();
)
结果应列出某个国家的所有冠军：
UK 10
Jenson Button; Jim Clark; Lewis Hamilton; Mike Hawthorn; Graham Hill;
Damon Hill; James Hunt; Nigel Mansell; Jackie Stewart; John Surtees;
Brazil 3
Emerson Fittipaldi; Nelson Piquet; Ayrton Senna;
Finland 3
Mika Hakkinen; Kimi Raikkonen; Keke Rosberg;
Australia 2
Jack Brabham; Alan Jones;
Austria 2
Niki Lauda; Jochen Rindt;
Germany 2
Michael Schumacher; Sebastian Vettel;
Italy 2
Alberto Ascari; Nino Farina;
USA 2
Mario Andretti; Phil Hill;
##11.2.8 内连接
使川 join f 句可以根据特定的条件合并两个数据源.们之前要获得两个要连接的列表。在-级
方杓式比赛中.打赛车手冠军和车队冠军。務车手从 GetChampionsO 方法中返回，车队从 GetConstm-
ctortl’hampionsO 方法中返冋。现在要获得-个年份列表，列出每年的赛车手冠军和车队冠军。
为此，先定义网个汽询.用于资询赛车手和车队(代码文件 EnumerableSample^rogram.cs)：
var racers - from r in Formulal.GetChampions()
from y in r.Years
select new
Year - y,

Name = r-FirstName + " " + r.LastName
);
var teams - from t in Formvlal.GetContructorChampions{)
from y in t.Years
select new
(
Year = y,
Name = t.Name
}；
有了这两个査询，再通过 join 子句，根据赛车手获得冠军的年份和车队获得冠军的年份进行连
接。select 子句定义了一个新的匿名类型，它包含 Year、Racer 和 Team 属性。
Console.WriteLine ("Year World ChampionXt Constructor Tide1\*};
foreach (var item in racersAndTeams)
{
Console.WriteLine{"{0}t {1,-20) {2}H, item.Year, item.Champion,
item.Constructor);
}
当然，也可以把它们合并为一个 UNQ 査询，但这只是一种个人喜好的问题了:
var racersAndTeams =
(from r in
from rl in Formulal.GetChampions()
from yr in rl.Years
select new
Year = yr,
Name = rl.FirstName + " " + rl.LastName
joint in
from tl in Forrtiulal. GetContructorChampions 0
from yt in tl-Years
select new
Year = yt.
Name = tl.Name
}
onr.Year equals t-Year
orderby t.Year
select new
Year = r.Year,
Racer = r.Name,
Team = t.Name
)).TakeflO);
302

第 11 章 LINQ
结果显示了在同时有了赛车手冠军和车队冠军的前 10 年中，匿名类型中的数据:
11.2.9 左外连接
上一个连接示例的输出从 1958 年开始，因为从这一年开始，才同吋有了赛车手冠军和车队冠军。
赛车手冠军出现得更早一些，是在 1950 年。使用内连接吋，只有找到了匹配的记录才返回结果。为
了在结果中包含所有的年份.可以使用左外连接。左外连接返回左边序列中的全部元素，即使它们
在右边的序列中并没有匹配的元素。
下面修改前面的 LINQ 查询，使用左外连接。左外连接用 join 子句和 DefaultlfEmpty 方法定义。
如果查询的左侧(赛车手 y 没有匹配的车队冠军，那么就使用 DefaultlfEmpty 方法定义其右侧的默认值
(代码文件 EnumerableSample/Program.cs):
var racersAndTeams =
(from r in racers
joint in teams on r.Year equals t.Year into rt
fromt. in rt .DefaultlfEn^ty ()
orderby r.Year
select new
<
Year = r.Year,
Champion = r.Name,
Cons true tor = t = null ?"no constructor chanpionship" : t.Name
)).Take(10);
用这个査询运行应用程序,
得到的输出将从 1950 年开始，如下所示:
Constructor Title
no constructor
no constructor
no constructor
no constructor
no constructor
no constructor
no constructor
no constructor
championship
championship
championship
championship
championship
championship
championship
championship
Vanwal1
Cooper
11.2.10 组连接
灰外连接使川 f 组连接和 into
f 句。它介 部分语法与组连接相同，
只不过组连接不使用

DefaultlfEn^ty 方法。
使用组连接时，可以连接两个独立的序列，对于其中一个序列中的某个元素，另一个序列中存
在对应的一个项列表。
下面的示例使用丁两个独立的序列。一个是前面例子中已经看过的冠军列表，另一个是一个
Championship 类型的集合。下面的代码段显示了 Championship 类。该类包含冠军年份以及该年份中
获得第一名、第二名和第三名的赛车手，对应的属性分别为 Year、First, Second 和 Third(代码文件
DataLib/Chauqiioiiship.cs)：
public class Championship
{
public int Year { get; set; }
public string First { get; set; }
public string Second { get； set; J
public string Third { get; set; }
)

<!-- GetChan^ionships 方法返回了冠军集合，如下面的代码段所示(代码文件 DataLib/FormuIal.cs)：
private static List<Championship> championships;
public static IEnumerable<Championship> GetCharapionships()
{
if (championships = null〉
{
championships = new List<Championship>();
championships.Add(new Championship
{ -->

Year 1950,
First = "Nino Farina",
Second = "Juan Manuel Fangio",
Third = "Luigi Fagioli"
)};
championships.Add(new Championship
{
Year = 1951,
First = "Juan Manuel Fangio",
Second = "Alberto Ascari",
Third = "Froilan Gonzalez"
J);
//...
冠军列表应与每个冠军年份中获得前三名的赛车手构成的列表组合起来，然后显示每一年的
结果。
Racerinfo 类定义了要显示的信息，如下所示(代码文件 EnumerableSample/Racerlnfb.cs):
public class Racerinfo
{
public int Year { get; set; }
public int Position { get; set; }
public string FirstName { get； set; }
public string LastName { get; set; }
J
304

第 11 章 LINQ
使用连接语句可以把两个列表中的赛车手组合起来。
因为冠军列表中的每一项都包含 3 个赛车手，所以首先需要把这个列表摊平，一种方法是使用
SelectMany 方法。该方法使用的 lambda 表达式为冠军列表中的每一项返回包含 3 项的一个列表。在
这个 lambda 表达式的实现中.，因为 Racerlnfb 包含 FirstName 和 LastName 属性，而收到的集合只包
含带有 First、Second 和 Third 属性的一个名称，所以必须拆分字符串。这可以通过扩展方法 FirstName
和 SecondName 完成(代码文件 EnumerableSample/Program.cs):
var racers = Formulal.GetChampionships()

<!-- .SelectMany(cs => new List<RacerInfo>()
(
new Racerinfo { -->

Year = cs.Year,
Position = 1, 一
FirstName = cs.First.FirstName(),
LastName = cs.First.LastName()
b
new Racerinfo {
Year = cs.Year,
Position = 2,
FirstName = cs.Second.FirstName(),
LastName = cs.Second.LastName()
I,
new Racerinfo {
Year = cs.Year,
Position = 3,
FirstName = cs.Third.FirstName()f
LastName = cs.Third.LastName()
扩展方法 FirstName 和 SecondName 使用空格字符拆分字符串:
public static class StringExtension
b
u
p {
static string FirstName(this string name)
int ix = name.LastIndexOf(' \*);
return name.Substring(0, ix);
public static string LastName(this string name)
int ix = name.LastIndexOf(1 ');
return name.Substring(ix + 1);
I
I
现/l:就 uf 以述接网个序列。Formula 1 .GetChampions 返冋一，个 Racers 列表，racers 变傲返冋包含
什:份、比赛结果和赛车手姓名的一个 Racerinfo 列表。仅使用姓氏比较两个集合中的项是不够的。有
吋候列表中可能同吋包含 T 一个孫乍手和他的父亲(如 Damon Hill 和 Graham Hill),所以必须同时使
用 FirstName 和 LastName 进行比较。这是通过为两个列表创逑一个新的匿名类型实现的。通过使用
into f 句，第：个集合中的结果被添加到 f 变 IftycarResults 屮。对于第一个集合中的苺-个赛车手,

都创建了一个 yearResuhs,它包含了在第二个集合中匹配名和姓的结果，最后，用 LINQ 查询创建
了一个包含所需信息的新匿名类型：
var q = (from r in Formulal-GetChampions()
joinr2 in racers on
new
{
FirstName = r.FirstName,
LastName = r.LastName
}
equals
new
!
FirstName 二 r2.FirstName,
LastName = r2-LastName
}
into yearResults
select new
{
FirstName = r.FirstName,
LastName = r-LastName,
Wins = r.Wins,
Starts = r.Starts,
Results = yearResults
});
foreach (var r in q}
{
Console.WriteLine("{0} 11}°, r.FirstName, r.LastName);
foreach (var results in r.Results!
(
Console .WriteLine (n {0) {1} 一，一，results .Year, results. Position);
下面显示了 foreach 循环得到的最终结果。Lewis Hamilton 两次进入前三:2007 年是第二名，2008
年则是冠军。Jenson Button 三次进入前三：2004、2009 和 2011。Sebastian Wttel 两次夺得冠军，并
且是 2009 年的第二名：
Lewis Hamilton 20072. 20081.
Jenson Button
2004 3. 20091.
2011 2.
Sebastian Vettel
20092, 20101. 20111.
11.2.11 集合操作
扩展方法 DistinctO、UnionO、IntersectO 和 ExceptQ 都是集合操作。下面创建〜一个驾驶法拉利的
306

第 11 章 LINQ -级方程式冠军序列和驾驶迈凯轮的一级方程式冠军序列，然后确定是否有驾驶法拉利和迈凯轮的
冠军。当然，这里可以使用 IntersectO 扩展方法。
首先获得所有驾驶法拉利的冠军。这只是一个简单的 LINQ 査询，其中使用复合的 from 子句访
问 Cars 属性，该属性返回一个字符串对象序列(代码文件 EnumerableSample/Program.cs)。
var ferrariDrivers = from r in
Formulal.GetChampions()
from c in r.Cars
where c == MFerrari"
orderby r.LastName
select r;

<!-- 现在建立另一个基本相同的查询，但 where 子句的参数不同，以获得所有驾驶迈凯轮的冠军。
最好不要再次编写相同的查询。而可以创建一个方法，给它传递参数 car:
private static IEnumerable<Racer> GetRacersByCar(string car)
{ -->

return from r in Formulal.GetChampions()
from c in r.Cars
where c = car
orderby r.LastName
select r;
何是，因为该方法不需要在其他地方使用，所以应定义一个委托类型的变量来保存 LINQ 查询。

<!-- racerByCar 变景必须是一个委托类型，该委托类型需要一个字符串参数，并返回 IEnumerable<Racer>,
类似于前面实现的方法。为此，定义了几个泛型委托 Funco,所以不需要声明自己的委托。把一个
lambda 表达式赋予 racerByCar 变 i。lambda 表达式的左边定义了 -个 car 变量，其类型是 Func 委
托的第一个泛型参数(字符串)。右边定义了 LINQ 查询，它使用该参数和 where 子句：
Func<stringr IEnumerable<Racer» racersByCar =
car => from r in Formulal.GetChampions() -->

from c in r.Cars
where c = car
orderby r.LastName
select r;
现在可以使用 IntersectO 扩展方法，获得驾驶法拉利和迈凯轮的所有冠军：
Console.WriteLine(''World champion with Ferrari and McLaren");
foreach (var racer in racersByCar ("Ferrari 一\*)・Intersect (
racersByCar《"McLaren")))
(
Console.WriteLine(racer);
I
结果只有一个赛车手 Niki Lauda：
World champion with Ferrari and McLaren
Niki Lauda

集合操作通过调用实体类的 GetHashCodeO 和 Eq\ \_方法来比较对象.对于自定卜
义比较，还可以传递一个实现了正 qualityCo 叫）arciO 接口的对象.在这里的示例中，；
GetC_ionsO 方法总是返 ® 相同的对象，因此默认的比较操作是有效的.如果不是:
这种情况，就可以重载集合方法来自定义比较操作.
11.2.12 合并
3?0 方法是.^4 新増的，允许用一个谓词函数把两个相关的序列合井为一个。
首先，创建两个相关的序列，它们使用相同的筛选（意大利）和排序方法，对于合并，这要,
因为第合中的第一项会与第二个集合中的第一项合并，第一个集合中的第二会与第二个集
合中的第二项合并，依此类推。如果两个序列的项数不同，zipo 方法就在到达较小集合的末尾时
停止，
第一个集合中的元素有一个 Name 属性，第二个集合中的元素有 LastName 和 Starts 两个属性。
在 racerNames 集合上使用刪）方法,需要把第二个集合（racerNamesAndSterts）作为第一个参数。
第二个参数的类型是 Funt^IFirst.TSecand.TResuIO,这个参数实现为一个 lambda 表赋，它通过
錄 first 接收第一悄合的元素，通过参数卿 d 接收第二悄合的元素.其实现代码创建并返回
一个字符串，该字符串包含第一十集合中元素的 Name 属性和第二^合中元素的 Starts 属性（代码
文件 EnumerableSan^le/Prcgram^）:
var racerNames = from r in Formulal-GetChampions （｝
where r.Country =■ 11 Italy"
orderby r,Wins descending
select new
（
Name ■ r .FirstNama + ,r H + r. LastName
var racerNamesAndStarts - from r in Formula 1 .GetChampions
where r.Country == "Italy"
orderby r.Wins descending
select new
(
LastName - r.LastName,
Starts = restarts
}:
var racers ■ racerNames«Zip(racerNamesAndStarts r
(first, second} => first.Name + ", starts: ’’ + second.Starts};
foreach (var r in racers}
{
Console・WriteLine(r)；
}
这个合井的结果是：
Alberto Ascari, starts: 32
306

第 11 章 LINQ
Nino Farina, starts: 33
11.2.13 分区
扩展方法 TakeO 和 SkipO 等的分区操作可用于分页，例如在第一个页面上只显示 5 个赛车手，
在下一个页面上显示接下来的 5 个赛车手等。
在下面的 LINQ 査询中，把扩展方法 SkipO 和 TakeO 添加到查询的最后。SkipO 方法先忽略根据
页面大小和实际页数计算出的项数，再使用 Take()方法根据页面大小提取一定数量的项(代码文件
EnumerableSample/Program.cs)：
int pageSize = 5;
int numberPages = (int)Math.Ceiling(Formulal.GetChampions().Count() /
(double)pageSize);
for (int page =0; page < numberPages; page++)
{
Console.WriteLine("Page {0}"r page);
var racers =
(from r in Formulal.GetChampions()
orderby r.LastName, r.FirstName
select r.FirstName + " " + r.LastName).
Skip(page \* pageSize).Take(pageSize);
foreach (var name in racers)
{
Console.WriteLine(name);
I
Console.WriteLine();

<!-- > 下面输出了前 3 页：
> Page 0
> Fernando Alonso
> Mario Andretti
> Alberto Ascari
> Jack Brabham
> Jenson Button
> Page 1
> Jim Clark
> Juan Manuel Fangio
> Nino Farina
> Emerson Fittipaldi
> Mika Hakkinen
> Page 2
> Lewis Hamilton
> Mike Hawthorn
> Damon Hill
> Graham Hill
> Phil Hill
> 309 -->

第 I 部分 C#语言
分页在 Windows 或 Web 应用程序中非常有用，可以只给用户显示一部分数据。
这个分页机制的一个要点是，因为查询会在每个页面上执行’所以改变底层的数
据会影响结果。在继续执行分页操作时，会显示新对象。根据不同的情况，这对于应
用程序可能有利.如杲这个操作是不需要的，就可以只对原来的数据源分页，然后使
用映射到原始数据上的缓存.
使用 TakeWhileO 和 SldpWhileO 扩展方法，还可以传递一个谓词，根据谓词的结果提取或!眺某
些项。
11.2.14 聚合操作符
聚合操作符(如 CountO、SumO、MinO、MaxO、AverageO 和 AggregateO)不返回一个序列，而返
回一个值，
CountO 扩展方法返回集合中的项数。下面的 CountO 方法应用于 Racer 的 Years 属性，来筛选赛
车手，只返回获得冠军次数超过 3 次的赛车手。因为同一个查询中需要使用同一个计数超过一次，
所以使用 let 子句定义了一个变量 numberYears(代码文件 EnumerableSample/Program.cs):
var query = from r in Formulal.GetChampions()
let numberYears = r.Years.Count()
where numberYears >= 3
orderby numberYears descending, r.LastName
select new
(
Name = r.FirstName + 一' " + r .LastName,
TimesChampion = numberYears
}；
foreach (var r in query)
{
Console.WriteLine("{0) {1) ", r.Name, r.TimesChampion);
)
结果如下：
Michael Schumacher 7
Juan Manuel Fangio 5
Alain Prost 4
Jack Brabham 3
Niki Lauda 3
Nelson Piquet 3
Ayrton Senna 3
Jackie Stewart 3
SumO 方法汇总序列中的所有数字.返回这些数字的和。下面的 SumO 方法用于计算一个国家蠃
得比赛的总次数。首先根据国家对赛车手分组.再在新创建的匿名类型中，把 Wins 属性赋予某个
国家赢得比赛的总次数。
var countries =
310

第 11 章 LINQ
(from c in
from r in Formula1.GetChampions()
group r by r.Country into c
select new
(
Country = c.Key,
Wins = (from rl in c
select rl.Wins).Sum()
I
orderby c.Wins descending, c.Country
select c).Take(5);
foreach (var country in countries)
(
Console. WriteLine ("{0| ⑴"，country. Country, country .Wins);
I
根裾获得一级方程式冠军的次数，最成功的国家是：
UK 167
Germany 112
Brazil 78
France 51
Finland 42
方法 Min(), Max()» AverageO 和 Aggregate()的使用方式与 CountO 和 Sum()相同。Min()方法返回
Ui 合中的敁小值.Max()方法返冋集合中的最大值，AverageO 方法计算集合中的平均值。对于
AggregateO 方法，可以传递 个 lambda 表达式，该表达式对所有的值进行聚合。
11.2.15 转换操作符
本这前面提到，査询可以推迟到访问数据项时再执行，在迭代中使用査询吋，査询会执行。而
使川转换操作符会立即执行査询，把査询结果放在数组、列表或字典中。

<!-- 迮卜面的例子中，调用 ToListO 扩敁方法，立即执行査询，得到的结果放在 ListO 类中(代码文
件 EnumerableSample/Program.cs)：
List<Racer> racers = (from r in Formula1.GetChampions()
where r.Starts > 150
orderby r.Starts descending
select r).ToList(); -->

foreach (var racer in racers)
I
Console.WriteLine (\*' (0} (0:S) "r racer);
I

<!-- 把返网的对象放在列表中并没存这么简单。例如，对于集合类中从赛车到赛车手的快速访问，
以使川新类 Lookup<TKey, TEIement>。
Dictionary<TKey, 7\^1116>类只支持一个健对应一个值.在 SystemLinq 名称空间的类
Lookup<TKey,TEIemenP*类中，一个键可以对应多个值.这些类详见第 10 章.
311 -->

第 I 部分 C#语窗
使用复合的 from 査询，可以摊平赛车手和赛车序列，创建带有 Car 和 Racer 属性的匿名类型。
在返回的 Lookup 对象中，键的类型应是表示汽车的 string,值的类型应是 Racen 为丁进行这个选
择，可以给 ToLookupO 方法的一个重载版本传递一个键和一个元素选择器。键选择器引用 Car 属性,
元素选择器引用 Racer 属性，
var racers = (from r in Formula 1・GetChampions ()
from c in r.Cars
select new
(
Car ■ cf
Racer = r
H .ToLoo1c^(cr ■> os.CaZf cr => os.tacar》；
if (racers .Contains ("Williams'1))
{
foreach (var williamsRacer in racers [ "Hllliams11) >
(
Console. Writ eLine (williamsRacer};
}
}
用 Lookup 类的索引器访问的所有 WilUams 冠军如下：
Alan Jones
Keke Rosberg
Nigel Mansell
Alain Prost
Damon Hill
Jacques Villeneuve
如果需要在非类型化的集合上(如 AnayList 卿 LINQ 査询，就可以使用 CastO 方法，在下面的
例子中，基于 O^ect 类型的 AnayList 集合用 Racer 对象填充。为了定义强类型化的査询，可以使用
CastO 方法。
var list - new System,Collections-ArrayList JFormulal .GetChampions ()
as System.Collections.ICollection);
var query ■ from r in list .Cat t^ac«r>{)
where r.Country == "USA"
orderby r.ttins descending
select r;
foreach (var racer in query)
{
Console-HriteLine (" {0:A} 一\*, racer);
J
11.2.16 生成操作符
生\_&作符 RangeO、En^j^O 和 RepearO 不是扩展方法，而是返回序歹!j 的正常静态方法一在 UNQ
toObjecte 中，这些方法可用于 Enumerable 类。
有时痛要填充一个范围的数字，此时就应使用 RangeO 方法，这个方法把第一个参数作为起始值，
把第二个参数作为要填充的项数，
312

第 11 章 LINQ
var values = Enumerable.Range(1, 20);
foreach (var item in values)
Console.Write("{0) ", item);
I
Console.WriteLine();
羿然.结果如下所示：
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20
0
RangeO 方法不返回填充了所定义值的集合，这个方法与其他方法一样，也惟迟执行
查询，并返回一个 RangeEnumerator,其中只有一条 yield return 语句，来递增值。
"I 以把该结!liUJl:他扩展力’法介几起米，获得另-个结果，例如，使用 SelectO 扩展方法:
var values = Enumerable.Range(1, 20).Select(n => n \* 3);
Empty()^法返冋一个不返冋値的迭代器，它可以用于需耍一个集合的参数.其中可以给参数传
递 A 级合。
RepeatO 方法返 M 一个迭代器，该迭代器把同一个值重复特定的次数。
11.3 并行 LINQ

<!-- System.Linq 名称空叫屮包貪的类 Parallel Enumerable 可以分解査询的工作，使其分布在多个线
ft' I:。尽竹 Enumerable 炎给 lEnumerable<T>接 U 定义了扩展方法，但 ParallelEnumerable 类的大多
数扩展万法足 ParalleiQuery<TSource>^的扩展。一个重要的例外是 AsParallel()方法，它扩展了
ll iiuincrable<TSourcc>接 LI,返|"| ParallclQuery<TSource>类，所以 iH 常的舍类可以以平行方式
査询。
11.3.1 并行查询
为 J'说明并行 LINQ(Parallel LINQ, PL1NQ),加盟一个大型似合。对于可以放在 CPU 的缓存中
的小级合.并行 LINQ 肴不出效果。/l: F 而的代码中,用随机值填充一个大型的 int 粜合(代码文件
Paral lei LinqSampIc/Program.cs)：
static IEnumerable<int> SampleData()
{ -->

const int arraysize ・ 100000000;
var r - new Random();
return Enumerable.Range(0, arraySize).Select(x -> r.Next(140)).ToList();
I
现在可以删 LINQ 査询筛选数据.进行 些计算，获取所筛选数据的平均数。该査询,)U where
f 句定义 f 个筛选器.仪’;1:总对 1、V 值小十 20 的项，接调用聚介呐数 Sum()方法。与前而的 L1NQ
盘询的唯，区别是，这次调用了 AsParallelO 方法。
313

第 I 部分 C#语言

<!-- var res = (from x in data.AsParallei()
where Math・Log<x) < 4
select x).Average(); -->
<!-- 与前面的 LINQ 查询一样，编译器会修改语法，以调用 AsParallelO、WhereQ、Selector AverageO
方法。AsParallelO 方法用 ParallelEnumerable 类定义，以扩展 Enumerable<r>接口，所以可以对简单
的数组调用它。AsParallelO 方法返回 ParaUelQuery<TSource>。因为返回的类型，所以编译器选择的
WhereO 方法是 ParallelEnumerable-WhereO,而不是 Enumerable.WhereO» 在下面的代码中，SelectQ
和 AverageO 方法也来自 Parallel&iumerabie 类。与 Enumerable 类的实现代码相反，对于
ParallelEnumerable 类，查询是分区的，以便多个线程可以同时处理该査询。集合可以分为多个部分，
其中每个部分由不同的线程处理，以筛选其余项\_完成分区的工作后，就需要合并，获得所有部分
的总和。 -->

var res = data-AsParallel () .Where (x => Math.Log (x) < 4).
Select(x => x)- Average{);
运行这行代码会启动任务管理器，这样就可以看出系统的所有 CPU 都在忙碌。如果删除
AsParallelO 方法’就不可能使用多个 CPU。当然，如果系旣上没有多个 CPU,就不会看到并行版本
带来的改进。
11.3.2 分区器
AsParallelO 方法不仅扩展了 IEnumerable< T>接口，还扩展了 Partitioner 类.通过它，可以影响
要创建的分区。
Partitioner 类用 System.Collection.Concurrent 名称空间定义，并且有不同的变体.CreateO 方
法接受实现了 ILisKI>类的数钽或对象。根据这一点，以及 Boolean 类型的参数 loadBahnce 和

<!-- 该方法的一些重载版本，会返回一个不同的 Partitioner 类型。对于数组，.NET 4 包含派生自抽
象基类 0«1031>16?31 曲 0110<1'80«€^>的 DynamicPartitione!ForAn3y<TSourc^>类和 StaticPartitioDeiFor
Array<TSource^o -->

修改 11.3.1 小节中的代码，手工创建一个分区器，而不是使用默认的分区器：
var result = (from x in Partitioner.Create(data, true).AsParallel()
where Math.Log(x) < 4
select x) .AverageO ;
也可以调用 則 thExecutionModeO 和 WithDegreeOfParallelismO 方法，来影味并行机制。对于
WithExecutionModeO 方法可以传递 ParallelExecutionMode 的一个 Defeult 值或者 ForceParallelism 值勞
默认情况下，并行 UNQ 避免使用系统开销很高的并行机制。对于 WithDegreeOfParalleUsmO 方法，
可以传递一个整数值，以指定应并行运行的最大任务数，査询不应使用全部 CPU，这个方法会很
有用。
11.3.3 取消
.NET 提供了一种标准方式，来取消长时间运行的任务，这也适用于并行 LINQ。
要取消长时间运行的査询，可以给査询添加 WidiCanceUationO 方法,并传递一\*个 Cancelhtiafrbkai
令牌作为参数。CancellationTbken 令牌从 CancellatiODlbkfflSoiirce 类中创建。该査询在单独的线程中
314

第 11 章 LINQ
运行，在该线程中，捕获一个 OperationCanceledException 类型的异常。如果取消了查询，就触发这个
异常。在主线程中，调用 CancellationTokenSource 类的 CancelO 方法可以取消任务。
var cts = new CancellationTokenSource();
Task・ractory・StartNew((> =>
{
try
{
var res = (from x in data.AsParallel().WithCancellation(cts.Token)
where Math.Log(x) < 4
select x).Average ();
Console.WriteLine("query finished, sum: {0}", res);
}
catch (OperationCanceledException ex)
{
Console.WriteLine(ex.Message);
Console.WriteLine("query started");
Console.Write("cancel?");
string input = Console.ReadLine();
if (input.ToLower().Equals("y"))
{
// cancel!
cts .Cancel ();
在 LINQ to Objects 中，扩展方法耑要将一个委托类型作为参数，这样就可以将 lambda 表达式

<!-- 赋予参数。lambda 表达式也"]一以赋了，Expression<T>类型的参数。C#编译器根据类型给 lambda 表达
式定义不同的行为。如果类型是 Expression<T>,编译器就从 lambda 表达式中创建-个表达式树，
并存储在程序集中。这样，就可以在运行期间分析表达式树，并进行优化.以便于查询数据源。 -->

下面看石外前面使用的査询表达式(代码文件 ExpressionTreeSampIe/Program.cs)：
var brazilRacers = from r in racers
where r.Country == "Brazil"
orderby r.Wins
select r;

<!-- 这个査询衣达式使用了扩展方法 Where()、OrderByO 和 Select()。Enumerable 类定义了 Where()
扩展方法，并将委托类型 Func<T,bool>作为参数谓词。
public static IEnumerable<TSource> Where<TSource>(
315

第 I 部分 C#语言
this IEnumerable<TSource> source, Func<TSource, bool> predicate);
这样.就把 lambda 表达式赋予谓词。这里 lambda 表达式类似于前面介绍的匿名方法。 -->
<!-- Func<Racer, bool> predicate = r => r.Country ― "Brazil";
Enumerable 类不是唯 个定义了扩展方法 WhereO 的类。Queryable<T>类也定义了 WhereO 扩
展方法。这个类对 WhereO 扩展方法的定义是不同的：
public static IQueryable<TSource> Where<TSource>(
this IQueryable<TSource> source,
Expression<Func<TSource, bool» predicate);
其中，把 lambda 表达式赋予类型 Expression<T>，该类型的操作是不同的：
Expression<Func<Racer, bool» predicate = r => r.Country — "Brazil";
除了使用委托之外，编译器还会把表达式树放在程序集中。表达式树可以在运行期间读取。
表达式树从派生自抽象基类 Expression 的类中构建。Expression 类与 Expression<T>不同。继承自
Expression 类的表达式类有 BinaryExpression> ConstantExpressionx InvocationExpression>
lambdaExpression > NewExpression、NewArrayExpression > TemaryExpression fO Unary Expression
等。编译器会从 lambda 表达式中创建表达式树。 -->

例如，lambda 表达式 r.Countiy —'Brazil"使用了 ParameterExpression> MemberExpression、
ConstantExpression 和 MetiiodCallExpression,来创建一个表达式树，并将该树存储在程序集中。之
后在运行期间使用这个树，创建一个用于底层数据源的优化查询。
DisplayTreeO 方法在控制台上图形化地显示表达式树。其中传递了一个 Expression 对象，并根据
表达式的类型，把表达式的一些信息写到控制台上。根据表达式的类型，递归地调用 DisplayTreeO

private static void DisplayTree(int indent, string message,
Expression expression)
<
string output = String.Format("{0} {1} 一 NodeType: {2}; Expr: {3}",
"".PadLeft(indent, \*>'), message, expression.NodeType, expression);
indent++;
switch (expression.NodeType)
(
case ExpressionType.lambda:
Console.WriteLine(output);
lambdaExpression lambdaExpr = (lambdaExpression)expression;
foreach (var parameter in lambdaExpr.Parameters)
DisplayTree(indent, "Parameter", parameter);
316

第 11 章 LINQ
DisplayTree(indent, "Body", lambdaExpr.Body);
break;
case Express ionType.Constant:
ConstantExpression constExpr = (ConstantExpression)expression;
Console.WriteLine("{0} Const Value: ⑴"， output, constExpr.Value);
break;
case ExpressionType.Parameter:
ParameterExpression paramExpr = (ParameterExpression)expression;
Console. WriteLine (" {0} Param Type: ⑴"，output,
paramExpr.Type.Name);
break;
case ExpressionType.Equal:
case ExpressionType.AndAlso:
case Express ionType.GreaterThan:
BinaryExpression binExpr = (BinaryExpression)expression;
if (binExpr.Method != null)
(
Console.WriteLine("(0) Method: (1} ", output,
binExpr.Method.Name);
}
else
(
Console.WriteLine(output);
}
DisplayTree(indent, "Left", binExpr.Left);
DisplayTree(indent, "Right", binExpr.Right);
break;
case ExpressionType.MemberAccess:
MemberExpression memberExpr = (MemberExpression)expression;
Console.WriteLine (" {01 Member Name: ⑴，Type: {2} ", output,
memberExpr.Member.Name, memberExpr.Type.Name);
DisplayTree(indent, "Member Expr", memberExpr.Expression);
break;
default:
Console.WriteLine();
Console.WriteLine("(0| ⑴"， expression.NodeType,
expression.Type.Name);
break;
前血己经介绍了用于显示表达式树的表达式。这是-个 lambda 表达式，它有一个 Racer 参数.
衣达式体提取赢得比赛次数超过 6 次的巴两赛车手：

<!-- Expression<Func<Racer, bool» expression =
r -> r.Country ― \*'Brazil" && r.Wins > 6;
DisplayTree(0, "lambda", expression); -->

F 面而析结果。lambda 表达式包含一个 Parameter 和一个 AndAlso 节点类型。AndAlso 节点类
型的左边足一个 Equal 节点类型，右边是一个 GreaterThan 节点类型。Equal 节点类型的左边是
MemberAccess 节点类型，石边是 Constant 节点类型。
317

第 1 部分 C#语言
lambda! NodeType: lambda; Expr: r => ((r.Country == "Brazil'\*)
AndAlso (r.Wins > 6))

<!--
> Parameter! NodeType: Parameter; Expr: r Param Type: Racer
> Body! NodeType: AndAlso; Expr: ((r.Country == "Brazil"}
> AndAlso (r.Wins > 6))
> » Left! NodeType: Equal; Expr: (r.Country == "Brazil") Method: op 一 Equality
> »> Left! NodeType: MemberAccess; Expr: r.Country
> Member Name: Country, Type: String
> »» Member Expr! NodeType: Parameter; Expr: r Param Type: Racer
> »> Right! NodeType: Constant; Expr: "Brazil" Const Value: Brazil
> » Right! NodeType: GreaterThan; Expr: (r.Wins > 6)
> »> Left! NodeType: MemberAccess; Expr: r.Wins Member Name: Wins, Type: Int32
> »» Member Expr! NodeType: Parameter; Expr: r Param Type: Racer
> »> Right! NodeType: Constant; Expr: 6 Const Value: 6
> 使用 Expression<T>类型的一个例子是 ADO.NET Entity Framework 和 WCF 数据服务的客户端
> 提供程序。这些技术用 ExpressionO 参数定义了扩展方法。这样.访问数据库的 LINQ 提供程序就
> 可以读取表达式，创建一个运行期间优化的查询，从数据库中获取数据。
> 11.5LINQ 提供程序
> .NET 包含几个 LINQ 提供程序。LINQ 提供程序为特定的数据源实现了标准的查询操作符。LINQ
> 提供程序也许会实现比 LINQ 定义的更多扩展方法，但至少要实现标准操作符。LINQtoXML 实现
> 了一些专门用于 XML 的方法，例如，System.Xml.Linq 名称空间中的 Extensions 类定义的 ElementsO、
> Descendants0 和 Ancestors()方法 o
> LINQ 提供程序的实现方案是根据名称空间和第一个参数的类型来选择的。实现扩展方法的类
> 的名称空间必须是开放的，否则扩展类就不在作用域内。在 LINQ to Objects 中定义的 Wheref)方法
> 的参数和在 LINQ to Entities 中定义的 Where()的方法参数不同。
> LINQ to Objects 中的 WhereO 方法用 Enumerable 类定义：
> public static IEnumerable<TSource> Where<TSource>(
> this IEnumerable<TSource> source, Func<TSource, bool> predicate);
> 在 System.Linq 名称空间中，还有另一个类实现了操作符 Where。这个实现代码由 LINQ to Entities
> 使用。这些实现代码在 Queryable 类中可以找到：
> public static IQueryable<TSource> Where<TSource>(
> this IQueryable<TSource> source,
> Expression<Func<TSource, bool» predicate);
> 这两个类都在 System.Linq 名称空间的 System.Core 程序集中实现。那么，编译器如何选择使
> 用哪个方法？表达式类型有什么用途？无论是用 FunccTSource, bool>参数传递，还是用 Expression
> <Func<rSource，1>001»参数传递，lambda 表达式都相同。只是编译器的行为不同，它根据 source 参数
> 来选择。编译器根据其参数选择最匹配的方法。在 AEX3.NET Entity Framework 中定义的 ObjectContext
> 类的 CreateQuery<T>0 方法返回一个实现了 IQueryable<TSource>接口的 Ol^jectQuery<T>对象，因此
> 318 -->

第 11 章 LINQ
Entity Frameworic 使用 Queryable 类的 WhereO 方法。
11.6 小结
本章讨论了 LINQ 查询和査询所基于的语言结构，如扩展方法和 lambda 表达式，还列出了各种
LINQ 查询操作符，它们不仅用于筛选数据源，给数据源排序，还用于执行分区、分组、转换、连
接等操作。
使用并行 LINQ 可以轻松地并行化运行时间较长的查询。
另一个重要的概念是表达式树。表达式树允许在运行期间构建对数据源的查询，因为表远式树
存储在程序集中。表达式树的用法详见第 33 章。LINQ 是一个非常深奥的主题’更多的信息可查阅
第 33 章和第 34 章。还可以下载其他第三方提供程序，例如，LINQ to MySQL、LINQ to Amazon、
LINQ to Flickr、LINQ to LDAP 和 LINQ to SharePoint。无论使用什么数据源，都可以通过 UNQ 使
用相同的査询语法。 -->
