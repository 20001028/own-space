/*
    错误边界
    过去，组件内地JS错误会导致React的内部状态被破坏，并且在下一次渲染时产生无法追踪的错误
    这些错误基本上由较早的其他代码错误引起的
*/

/*
    错误边界
    部分UI的JavaScript错误不应该导致整个应用奔溃
    错误边界是一种React组件，这种组件可以捕获并打印发生在其子组件树任何未知的JavaScript错误
    并且它会渲染除备用UI，而不是渲染那些奔溃了的子组件树。
    错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误
*/

/*
    生命周期无法捕获的错误：
    1. 事件处理
    2. 异步代码
    3. 服务端渲染
    4. 它自身抛出来的错误（并非它的子组件）
*/

// 如果一个class组件中定义了static getDerivedStateFromError()或componentDidCatch()
// 这两个生命周期方法中任意一个或两个，那么他就是一个错误边界
// 当抛出错误时，使用getDerivedStateFromError渲染备用UI
// 使员工componentDidCatch打印错误信息

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromErrror(error) {
        // 更新state，使下一次渲染能够显示降级后的UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // 上报或输出错误信息
        console.log(error, errorInfo);
    }

    render() {
        // 如果有错误，显示替代的UI
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        // 否则，显示组件内嵌入的内容
        return this.props.children;
    }
}

// 错误边界的工作方式类似于catch，但是错误边界只针对React组件
// 只有class组件才可以成为错误边界组件
// 大多数情况下，我们只需要声明一次错误边界组件，就可以全局使用

// 错误边界只可以捕获子组件的错误，无法捕获自身的错误
// 如果一个错误边界无法渲染错误信息，错误会冒泡至最近的上层错误边界
// 这同样类似于catch

/*
    错误边界应该放置在哪
    错误边界的粒度可以自己决定，可以将其包装在最顶层的路由组件并为用户展示错误信息
    也可以将单独的部件包装在错误边界以保护应用其他部分不崩溃
*/

/*
    未捕获错误的新行为
    任何未被错误边界捕获的错误将会导致整个React组件树被卸载
*/

/*
    组件栈追踪
    在开发环境下，React会把渲染期间发生的所有错误打印到控制台
    组件栈追踪可以让我们准确的查看发生在组件树内地错误信息
*/

/*
    关于try/catch
    try/catch只能用于命令式代码
    React组件是声明式的并且具体之处什么需要被渲染
*/

/*
    关于事件处理器
    错误边界无法捕获事件处理器内部的错误
    React不需要错误边界来捕获事件处理器中的错误
    与render方法和生命周期不同，事件处理器不会在渲染期间触发
    因此如果它们抛出异常，React仍然能够知道需要在屏幕上显示什么
    如果须髯在事件处理器内部捕获错误，使用try/catch即可
*/

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        try {
            // 执行操作，如有错误则会抛出
        } catch (error) {
            this.setState({ error });
        }
    }

    render() {
        if (this.state.error) {
            return <h1>Caught an error.</h1>;
        }
        return <button onClick={this.handleClick}>Click Me</button>;
    }
}
