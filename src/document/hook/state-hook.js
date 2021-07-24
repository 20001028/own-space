/*
    State Hook
*/

import React, { useState } from 'react';

function Example() {
    // 声明一个叫 "count" 的 state 变量
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}

/*
    等价的class实例
*/

class Example2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
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

/*
    Hook和函数组件
*/
const Example3=(props)=>{
    return <div />
};

// Hook在class内部不起作用，但可以用来取代class

/*
    Hook是什么？

    Hook是一个特殊的函数，可以让你钩入React的特性
    例如，useState允许在React函数组件中添加state的Hook

    如果在编写函数组件时，需要向其添加一些state，可以使用hook
*/

/*
    声明state变量
*/

// 在class中，可以在构造函数中设置来初始化count的state为0

// 在函数组件中，没有this，直接在组件中调用useState Hook

/*
    调用useState时做了什么
    定义了一个state变量叫count，在函数调用时保存变量，与class中的this.state提供的功能完全相同。
    一般来说，在函数退出后，变量会小时，但state中但变量会被React保留

    useState需要哪些参数
    useState方法里面惟一的参数就是初始state
    不同于class的时，我们可以根据需要使用数字或字符串进行赋值，不一定时对象

    useState的返回值是什么
    返回当前state以及更新state的函数，它一定是被成对获取的

    state只在组件首次渲染时被创建，在下一次重新渲染时，useState返回给我们当前的state
*/

/*
    读取State
*/

/*
    更新State
*/