'use strict';

import { createElement } from "../utils/common";
/*
    React认为渲染逻辑本质上与其他UI逻辑内在耦合，比如，在UI中需要绑定处理事件（我们常常在html中为按钮绑定点击事件）
    在某些时刻状态发生变化时需要通知到UI（我们在请求得到响应数据后需要改变UI），以及需要在UI中展示准备好的数据（
    重新渲染数据）
    React没有将标记与逻辑分离到不同的文件，而是将二者共同存放在组件中实现关注点分离。不同的是，在Vue中
    我们可以将Html、css和JS都进行分离
*/

const element1=<h1>this is a h1 element declared by jsx</h1>

/*
    在JSX中嵌入表达式
*/
const name='Josh Perez';
const element2=<h1>Hello,{name}</h1>

createElement('div','dom2')

ReactDOM.render(element2,document.getElementById('dom2'));

// 同理，我们可以在在jsx中嵌入任何js表达式
function formatName(user){
    return user.firstName+' '+user.lastName;
}

const user={
    firstName:'zhiguo',
    lastName:'zhan'
};

const element3=(
    <h1>
        Hello,{formatName(user)}
    </h1>
);
createElement('div','dom3')

ReactDOM.render(
    element3,
    document.getElementById('dom3')
);

/*
    JSX也是一个表达式
    在编译后，Jsx表达式会被转为js调用
    可以在if语句和for循环中使用JSX，将JSX赋值给变量或当作参数传入或从函数中返回
*/
function getGreeting(user){
    if(user){
        return (
            <h1>
                Hello,{formatName(user)}!
            </h1>
        )
    }
    return (
        <h1>
            Hello, Stranger!
        </h1>
    )
}

/*
    JSX特定属性
*/
// 使用引号将属性值指定为字符串字面量
const element4=(
    <div tabIndex="0">

    </div>
);
const avatarUrl='https://p.ssl.qhimg.com/sdm/420_627_/t01f23fc63a8a833188.jpg';
// 使用大括号在属性值中插入一个JS表达式
const element5=(
    <img src={avatarUrl}></img>
)
// 在JSX中，class属性变为className，tabindex属性变为tabIndex

/*
    使用JSX指定子元素
*/
// 如果标签中没有内容，可以用/>闭合标签
const element6=(
    <img src={avatarUrl} />
);

const element7=(
    <div>
        <h1>Hello</h1>
        <h2>Good to see you here.</h2>
    </div>
);

/*
    JSX防止注入攻击
    ReactDOM在渲染所有输入内容前，默认会进行转义
    所有内容在被渲染之前都会被转为字符串，这样可以防止XSS攻击
*/

/*
    JSX表示对象
    Babel会把JSX转义为一个名为React.createElement函数调用
*/

const element8=(
    <h1 className="greeting">
        Hello, world!
    </h1>
);
// 等同于
const element=React.createElement(
    'h1',
    {
        className:'greeting'
    },
    'Hello, world'
);
//React.createElement会预先执行一些检查，帮助编写无错误代码