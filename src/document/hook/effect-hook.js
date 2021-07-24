/*
    Effect Hook

    Effect Hook允许我们在函数组件中执行副作用操作

    数据获取、设置订阅以及手动更改React组件中的DOM都属于副作用

    把useEffect Hook看作componentDidMount、componentDidUpdate、componentWillUnmount三个生命周期函数的组合
*/

/*
    无需清除的effect
    有时候我们想在React更新DOM后运行一些额外的代码，比如发送网络请求，手动变更DOM、记录日志，都是无需清除的操作
    因为执行完这些操作后，就可以忽略他们
*/

/*
    class示例
    在React的class组件中，render函数不应该有任何副作用
    一般来说，在这里执行操作太早了，应该在React更新DOM后才执行操作

    在React class中，把副作用操作放到componentDidMount和componentDidUpdate函数中
*/
// 这是一个React计数器的class组件，在React对DOM进行操作后，立即更新document的title属性
class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    componentDidMount() {
        document.title = `You clicked ${this.state.count} times`;
    }
    componentDidUpdate() {
        document.title = `You clicked ${this.state.count} times`;
    }

    render() {
        return (
            <div>
                <p>You clicked {this.state.count} times</p>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>
                    Click me
                </button>
            </div>
        );
    }
}

// 在这个class中，需要在两个生命周期函数中编写重复代码
/*
    在很多情况下，我们希望在组件加载和更新时执行同样的的操作。
    或者说，我们希望在每次渲染后都执行它。但React的class组件并没有提供这样的方法
    即使我们对方法进行提取，却依然需要在两个地方进行调用
*/

/*
    Hook示例
    useEffect Hook告诉React组件需要在渲染后执行某些操作
    React会保存传递的函数，并且在DOM更新后调用

    为什么在组件内部调用useEffect
    将useEffect放在组件内容不让我们可以在effect中直接访问count state变量或props
    不需要特殊的API读取，它已经保存在函数作用域中
    Hook使用了JS必报机制，不用在JS已经提供了解决方案的情况下，还引入特定的API
    
    useEffect会在每次渲染后执行吗
    默认情况喜爱，它在第一次渲染后和每次更新之后都会执行
    React保证了每次运行effect的同时，DOM都已经更新
*/

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createElement } from '../../utils/common';


function Example2() {
    const [count, setCount] = useState(0);

    // 在每次DOM更新时调用
    useEffect(() => {
        document.title = `You clicked ${count} times`;
    });

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}

ReactDOM.render(
    <Example2></Example2>,
    createElement('div', 'example2')
);

/*
    详细说明
    传递给useEffect的函数在每次渲染中都会不同，这就是为什么可以在effect中获取最新的count值，而不用担心其国旗
    每次我们重新渲染，都会生成新的effect替换掉之前的
    effect更像是渲染结果的一部分，每个effect属于一次特定的渲染

    与componentDidMount或componentDidUpdate不同，使用useEffect调度的effect不会阻塞浏览器更新屏幕
    大多数情况下，effect不需要同步执行
*/

/*
    需要清除的effect
    有一些副作用是需要清除的，例如订阅外部数据源
    清除工作十分重要，可以防止内存泄漏
*/

// class示例
class FriendStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOnline: null };
        this.handleStatusChange = this.handleStatusChange.bind(this);
    }

    componentDidMount() {
        ChatAPI.subscribeToFriendStatus(
            this.props.friend.id,
            this.handleStatusChange
        );
    }
    componentWillUnmount() {
        ChatAPI.unsubscribeFromFriendStatus(
            this.props.friend.id,
            this.handleStatusChange
        );
    }
    handleStatusChange(status) {
        this.setState({
            isOnline: status.isOnline
        });
    }

    render() {
        if (this.state.isOnline === null) {
            return 'Loading...';
        }
        return this.state.isOnline ? 'Online' : 'Offline';
    }
}

/*
    Hook示例
    为什么要在effect中返回一个函数
    这是effect的可选的清除机制，每个effect都可以返回一个清除函数，就可以将添加和移除订阅的逻辑放在一起，它们都属于effect的一部分

    React何时清除effect
    React会在组件卸载时执行清除操作
    effect在每次渲染时执行，这就是为什么React会在执行当前effect之前对上一个effect进行清除

    并不是必须为effect中返回的函数命名，我们可以返回一个箭头函数或匿名函数
*/
function FriendStatus(props) {
    const [isOnline, setIsOnline] = useState(null);

    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status.isOnline);
        }
        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
        // Specify how to clean up after this effect:
        return function cleanup() {
            ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        };
    });

    if (isOnline === null) {
        return 'Loading...';
    }
    return isOnline ? 'Online' : 'Offline';
}

/*
    小结
    了解了useEffect可以在组件渲染后实现各种不同的副作用，有些副作用可能需要清除，所以需要返回一个函数
    有些effect可能不必清除，不需要返回
*/

/*
    使用Effect的提示
*/

/*
    使用多个Effect实现关注点分离
    使用Hook的一个目的就是解决class中生命周期函数经常不包含不相关的逻辑，但又把相关但逻辑分离到几个不同方法但问题
*/
class FriendStatusWithCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0, isOnline: null };
        this.handleStatusChange = this.handleStatusChange.bind(this);
    }

    componentDidMount() {
        document.title = `You clicked ${this.state.count} times`;
        ChatAPI.subscribeToFriendStatus(
            this.props.friend.id,
            this.handleStatusChange
        );
    }

    componentDidUpdate() {
        document.title = `You clicked ${this.state.count} times`;
    }

    componentWillUnmount() {
        ChatAPI.unsubscribeFromFriendStatus(
            this.props.friend.id,
            this.handleStatusChange
        );
    }

    handleStatusChange(status) {
        this.setState({
            isOnline: status.isOnline
        });
    }
}
// Hook使用多个effect，将不相关但逻辑分离到不同但effect中
// Hook允许我们按照代码的用途分离他们，而不是像生命周期函数那样
// React会按照effect声明的顺序依次调用组件中的每一个effect
function FriendStatusWithCounter(props) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        document.title = `You clicked ${count} times`;
    });

    const [isOnline, setIsOnline] = useState(null);
    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status.isOnline);
        }

        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
        return () => {
            ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        };
    });
    // ...
}

/*
    为什么每次更新时都要允许effect
    Hook不需要特定的代码来处理更新逻辑，因为useEffect默认处理
    它会在调用一个新的effect之前对前一个effect进行清理
    这个默认行为保证来一致性，避免来class组件中因为没有处理更新逻辑导致常见的bug
*/

/*
    通过跳过Effect进行性能优化
    在某些情况下，每次渲染后都执行清理或执行effect可能会导致性能问题
    在class组件中，通过在componentDidUpdate中添加对prevProps或prevState的比较逻辑解决

    在Hook API中已经内置来useEffect中的比较，如果某些特定值在两次重渲染之间没有发生变化
    可以通知React跳过对effect的调用，只要传递数组作为ussEffect的第二个参数即可

    第二个参数的作用就是通知React，如果数组中的所有元素在更新前后都是相等的，跳过这个effect
    即使只有一个元素不相等，effect都会被执行
*/