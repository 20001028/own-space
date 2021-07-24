/*
    Context
    context提供来一个无需为每层组件手动添加props，就能在组件树间进行数据传递的方法
*/

import { createElement } from "../../utils/common";

/*
    在一个典型的React应用中，数据是通过props属性自上而下进行传递，但者对于某些类型的属性极其繁琐
    Context提供了一种在组件间共享此类值的方式，而不必显示的通过组件树逐层传递props
*/

/*
    何时使员工Context
    Context设计目的是为了共享哪些对于一个组件树而言是“全局”的数据
    例如当前认证的用户、主题或首选语言
*/

class App extends React.Component {
    render() {
        return <Toolbar theme="dark"></Toolbar>;
    }
}
// 往下传
const Toolbar = function (props) {
    return (
        <div>
            <ThemedButton theme={props.theme}></ThemedButton>
        </div>
    );
};
// 往下传
class ThemedButton extends React.Component {
    render() {
        return <Button theme={this.props.theme}></Button>;
    }
}

// 使用Context，可以避免通过中间元素传递props
const ThemeContext = React.createContext("light");
class App2 extends React.Component {
    render() {
        return (
            <ThemeContext.Provider value="dark">
                <Toolbar2></Toolbar2>
            </ThemeContext.Provider>
        );
    }
}
// 往下传
const Toolbar2 = function (props) {
    return (
        <div>
            <ThemedButton2></ThemedButton2>
        </div>
    );
};
// 往下传
class ThemedButton2 extends React.Component {
    // 指定contextType读取当前的theme context
    // React会往上找到最近的theme provider，并使用它
    // 当前theme值为dark
    static contextType = ThemeContext;
    render() {
        return <button theme={this.context}>click</button>;
    }
}

ReactDOM.render(<App2></App2>, createElement("div", "app"));

/*
    使用Context之前的考虑
    Context主要应用场景在于很多不同层级的组件需要访问同样一些数据
    Context会使得组件的复用性变差
    如果只是想避免层层传递一些属性，组件组合有时候比context更好
*/

// 对于一个深度嵌套的Page->PageLayout->NavigationBar->Link->Avatar
// 如果只是Avatar组件真的需要user和avatarSize属性值，那么层层传递显得十分多余
// 而且如果想要添加属性，也会十分繁琐

// 不使用context的方法就是将Avatar组件自身传递下去

// 这种方法下，只有最顶部的Page组件菜户i知道Link和Avatar组件如何使用user和avatarSize
// 这种对组件的控制反转减少来应用中要传递的props数量，使代码更干净
// 但是这会让高层组件的逻辑变得更复杂

/*
    API
*/

/*
    React.createContext
    创建一个context对象，当React渲染一个订阅了这个Context对象的组件，这个组件会从组件树中离自身最近的那个匹配的Provider中读取到当前的context值
    只有当组件所处的树中没有匹配到Provider时，其defaultValue参数才会生效
    这有助于在不实用Provider包装组件的情况下对组件进行测试
    注意：将undefined传递给Provider的value时，消费组件的defaultValue不会生效
    */
// const MyContext=React.createContext(defaultValue);

/*
    Context.Provider
    每个Context对象都会返回一个Provider React组件，允许消费组件订阅context变化
    Provider接受一个value属性，传递给消费组件。一个Provider可以和多个消费组件有对应关系
    多个Provider可以嵌套使用，里层的会覆盖外层的数据
    当Provider的value值发生变化时，它内部的所有消费组件都会重新渲染
    Provide极其内部所有consumer组件都不受制于shouldComponentUpdate函数，因此当consumer组件在其祖先组件退出更新的情况下也能更新
    通过新旧值检测来确定变化，使用来与Object.is相同的算法
*/

/*
    Class.contextType

*/
class MyClass extends React.Component {
    static contextType = MyContext;

    componentDidMount() {
        let value = this.context;
        /* 在组件挂载完成后，使用 MyContext 组件的值来执行一些有副作用的操作 */
    }
    componentDidUpdate() {
        let value = this.context;
        /* ... */
    }
    componentWillUnmount() {
        let value = this.context;
        /* ... */
    }
    render() {
        let value = this.context;
        /* 基于 MyContext 组件的值进行渲染 */
    }
}
// 挂载在class上的contextType属性会被重复制为一个由React.createContext()创建的Context对象/
// 这样就可以使用this.context来消费最近Context上的那个值
// 我们可以在任何生命周期中访问，包括render函数
MyClass.contextType = MyContext;

/*
    Context.consumer
*/
// 这个函数接受当前的context值，返回一个React节点
// 传递给函数的value值等同于往上组件树离这个context最近的Provider提供的value值
// 如果没有对应的Provider，value参数等同于传递给createContext的defaultValue
const consumer = (
    <MyContext.Consumer>
        {value => /* 基于 context 值进行渲染*/ {}}
    </MyContext.Consumer>
);

/*
    Context.displayName
    context对象接受以恶搞名为displayName的property，类型为字符串
    React DevTools使用该字符串来确定context要显示的内容
*/

/*
    示例
*/

/*
    动态Context
*/

/*
    在嵌套组件中更新Context
    与子组件更新父组件中的属性类似，在context中添加相应的方法传入嵌套组件中
*/

/*
    消费多个Context
    为了确保context快速进行重渲染，React需要使每一个consumers组件的context在组件树中成为一个单独的节点
*/

/*
    注意事项
    因为context会使用参考标识来决定何时进行渲染
    当Provider的父组件进行重渲染时，可能会在consumers组件中触发意外的渲染
*/

// 为了防止这种情况，将value状态提升到父节点的state中