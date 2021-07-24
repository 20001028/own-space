/*
    Hook概览
*/

/*
    State Hook
*/

import React, { useContext, useEffect, useReducer, useState } from 'react';
import ReactDOM from 'react-dom';
import { createElement } from '../../utils/common';

const Example = function () {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
};
/*
    useState就是一个Hook
    通过在函数组件里调用它来给组件添加一些内部state
    React会在重复渲染时保留state
    useState会返回一对值：当前状态和一个让你更新它的函数，可以在事件处理函数中或其他地方调用这个半数
    它类似于class组件的this.setState，但是它不会合并新的和旧的state
*/

/*
    useState唯一的参数就是初始state、
    对于计数器来说，state初始值为0，但对于其他的来说，他可以为任何值
    初始state参数只有在第一次渲染时被用到
*/

/*
    声明多个state变量
*/
const ExampleWithManyStates = function () {
    // 声明多个state变量
    const [age, setAge] = useState(42);
    const [fruit, setFruit] = useState('banana');
    const [todos, setTodos] = useState({ text: 'Learn Hooks' });
    // ...
};

/*
    数组解构的语法让我们在调用useState时可以给state变量取不同的名字
    useState多次调用时，可以保证每次渲染时调用顺序不变
*/

/*
    什么是Hook
    Hook是一些可以让你在函数组件里钩入React state及生命周期等特性的函数
    Hook不能再class组件中使用，我们即使不使用class也可以使用React
*/

/*
    Effect Hook
    副作用：数据获取、订阅、或者手动修改DOM等操作
    useEffect就是一个Effect Hook，给函数组件增加了操作副作用的能力
    它根class组件中的componentDidMount、componentDidUpdate和componentWillUnmount具有相同用途
*/

const Example2 = function () {
    const [count, setCount] = useState(0);

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
    )
};

ReactDOM.render(
    <Example2></Example2>,
    createElement('div','example2')
);

/*
    当调用useEffect时，就是在告诉React在完成对DOM的修改后运行副作用函数
    由于副作用函数是在组件内声明的，所以可以访问到组件的props和state
    默认情况下，React会在每次渲染后调用副作用函数，包括第一次渲染

    副作用函数还可以通过返回一个函数来指定如何清除副作用
*/

const FriendStatus=function(props){
    const [isOnline,setIsOnline]=useState(null);

    function handleStatusChange(status){
        setIsOnline(status.isOnline);
    }

    useEffect(()=>{
        ChatAPI.subscribeToFriendStatus(props.friend.id,handleStatusChange);
        return ()=>{
            ChatAPI.unsubscribeFromFriendStatus(props.friend.id,handleStatusChange);
        };
    });

    if(isOnline===null){
        return 'Loading...';
    }
    return isOnline ? 'Online' : 'Offline';
};
/*
    React会在组件销毁时取消对ChatAPI的订阅，然后在后续的渲染是重新执行副作用函数
    通过使用Hook，可以把组件内相关的副作用组织在一起，而不要把它们拆分到不同的生命周期函数里
*/

/*
    Hook使用规则
    1. 只能在函数最外层调用Hook，不要在循环、条件判断或者子函数中调用
    2. 只能在React的函数组件中调用Hook，不要在其他JS函数中调用
*/

/*
    自定义Hook
    有时候想要在组件之间重用一些状态逻辑，可以通过：高阶组件和render props
    自定义Hook可以让在不增加组件的情况下同样可以实现
*/

// 将friendId作为参数，并返回好友是否在线
const useFriendStatus=function(friendId){
    const [isOnline,setIsOnline]=useState(null);

    function handleStatusChange(status){
        setIsOnline(status.isOnline);
    }

    useEffect(()=>{
        ChatAPI.subscribeToFriendStatus(friendId,handleStatusChange);
        return ()=>{
            ChatAPI.unsubscribeFromFriendStatus(friendId,handleStatusChange);
        }
    });
    return isOnline;
};
// 在两个组件中使用它
const FriendStatus=function(props){
    const isOnline=useFriendStatus(props.friend.id);

    if(isOnline===null){
        return 'Loading...';
    }

    return isOnline;
};

const FriendListItem=function(props){
    const isOnline=useFriendStatus(props.friend.id);

    return (
        <li style={{color:isOnline ? 'green' : 'black'}}>
            {props.friend.name}
        </li>
    );
};

/*
    这两个state完全独立，Hook是一种复用状态逻辑的方式，它不复用state本身
    事实上Hook的每次调用都有一个完全独立的state，因此可以在单个组件中多次调用同一个自定义Hook

    自定义Hook更像是一种约定而不是功能，如果函数名字以use开头并调用其他Hook，就说是一个自定义Hook
*/

/*
    其他Hook
*/

// useContext不使用组件嵌套就可以订阅Context
const Example=function(){
    const locale=useContext(LocaleContext);
    const theme=useContext(ThemeContext);
};

// useReducer通过reducer管理组件本地的复杂state
const Todos=function(){
    const [todos,dispatch]=useReducer(todosReducer);
};
