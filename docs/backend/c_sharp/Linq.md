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

### 扩展方法

-   编译器会转换 LINQ 查询，以调用方法而不是 LINQ 查询。LINQ 为 lEnumerable()接口提供了各种扩展方法，以便用户在实现了该接口的任意集合上使用 LINQ 查询。扩展方法在静态类中声明，定义为一个静态方法，其中第一个参数定义了它扩展的类型。扩展方法可以将方法写入最初没有提供该方法的类中。还可以把方法添加到实现某个特定接口的任何类中，这样多个类就可以使用相同的实现代码。
    例如.String 类没有 Foo()方法。String 类是密封的，所以不能从这个类中继承。但可以创建一个扩展方法，如下所示：

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
定义 LINQ 扩展方法的一个类是 System.Lmq 名称空间中的 Enumerable.只需要导入这个名称
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

因为 Where()作为一个泛型方法实现，所以它可以用于包含在集合中的任意类型，实现了

IEnumerable< T>接口的任意集合都支持它.

这里的扩展方法在 System.Core 程序集的 SystentLinq 名称空间中定义.
现在就可以使用 Enumerable 类中的扩展方法 Where()、OrderByDescending()和 Select()这些方

法都返回 IEmimerable< TSourco>,所以可以使用前面的结果依次调用这些方法。通过扩展方法的参数，使用定义了委托参数的实现代码的匿名方法(代码文件 LINQIntro/Program-cs).

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

这是一个非常有趣也非常重要的结果。在下面的例子中，创建了 String 元素的一个集合，用名
称填充它。接着定义一个查询，从集合中找出以字母 J 开头的所有名称。集合也应是排好序的。在
定义查询吋，不会进行迭代。相反，迭代在 foreach 语句中进行，在其中迭代所有的项。集合中只有一个元素 Juan 满足 where 表达式的要求，即以字母 J 开头。迭代完成后，将 Juan 写入控制台。之后在集合中添加 4 个新名称，再次进行迭代。

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
当然，还必须注意，每次在迭代中使用查询吋，都会调用扩展方法。在大多数情况下，这是非
常有效的，因为我们可以检测出源数裾中的变化。但是在一些情况下，这是不可行的。调用扩展方法 ToAmy()、ToList()等可以改变这个操作。在示例中，ToiList 遍历集合，返回一个实现了 IList< string>的集合，之后对返回的列表遍历两次，在两次迭代之间，数据源得到了新名称。
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
