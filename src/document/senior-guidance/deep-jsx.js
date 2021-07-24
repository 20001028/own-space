/*
    深入JSX
    实际上，JSX仅仅只是React.createElement(component.props....children)函数的语法糖
*/

// 
const MyButton = (
    <button color="blue" shadowSize={2}>
        Click me
    </button>
);

// 编译为
React.createElement('button', { color: 'blue', shadowSize: 2 }, 'Click me');

// 如果没有内容，可以用自闭合标签
const div = (
    <div className="sidebar" />
);
// 编译为
React.createElement('div', { className: 'sidebr' });

/*
    指定React元素类型
    JSX第一部分指定来元素类型，大写字母开头意味着是React组件
*/

/*
    React必须在作用域内
    由于JSX会编译为React.createElement调用形式，所以React库也必须包含在JSX代码作用域内
*/
import React from 'react';
import CustomButton from './CustomButton';

function WarningButton() {
    // return React.createElement(CustomButton, {color: 'red'}, null);
    return <CustomButton color="red" />;
}
// 如果不使用打包工具，而是直接通过script标签加载，则必须挂载React到全局变量中

/*
    在JSX类型中使用点语法
*/

import React from 'react';

const MyComponents = {
    DatePicker: function DatePicker(props) {
        return <div>Imagine a {props.color} datepicker here.</div>;
    }
}

function BlueDatePicker() {
    return <MyComponents.DatePicker color="blue" />;
}

/*
    用户定义的组件必须以大写字母开头
    小写字母开头的元素代表以恶搞HTML内置组件，比如div和span
    大写字母开头的元素对应着JS引入或自定义的组件
*/

/*
    在运行时选择类型
    你不能将通用表达式作为React元素类型，如果想通过表达式动态决定元素类型
    首先将它赋值给大写字母开头的变量
*/
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
    photo: PhotoStory,
    video: VideoStory
};

function Story(props) {
    // 正确！JSX 类型可以是大写字母开头的变量。
    const SpecificStory = components[props.storyType];
    return <SpecificStory story={props.story} />;
}

/*
    JSX中的props
*/

/*
    JS表达式作为props
    for循环和if语句不是JS表达式不能直接在JSX中使用
*/

function NumberDescriber(props) {
    let description;
    if (props.number % 2 == 0) {
        description = <strong>even</strong>;
    } else {
        description = <i>odd</i>;
    }
    return <div>{props.number} is an {description} number</div>;
}

/*
    字符串字面量
    字符串赋值给prop时，值是未转义的
*/

/*
    props默认值为true
    如果不给prop赋值，默认值是true
*/

/*
    属性展开
    使用展开运算符展开props对象
*/
const Button = props => {
    const { kind, ...other } = props;
    const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";
    return <button className={className} {...other} />;
};

const App = () => {
    return (
        <div>
            <Button kind="primary" onClick={() => console.log("clicked!")}>
                Hello World!
            </Button>
        </div>
    );
};

/*
    JSX中的子元素
    包含在开始和结束标签之间的JSX表达式内容作为特定属性props.children传递给外层组件
*/

/*
    字符串字面量
    将字符串放在开始和结束标签之间，此时props.children是该字符串
*/

/*
    JSX的子元素
    子元素允许由多个JSX元素组成，常用于嵌套组件
*/

/*
    JS表达式作为子元素
    JS表达式可以被包裹在{}中作为子元素
*/

/*
    函数作为子元素
    
*/
// 调用子元素回调 numTimes 次，来重复生成组件
function Repeat(props) {
    let items = [];
    for (let i = 0; i < props.numTimes; i++) {
        items.push(props.children(i));
    }
    return <div>{items}</div>;
}

function ListOfTenThings() {
    return (
        <Repeat numTimes={10}>
            {(index) => <div key={index}>This is item {index} in the list</div>}
        </Repeat>
    );
}

/*
    布尔类型、Null以及Undefined将会忽略
    false、null、undefined和true是合法的子元素，但不会被渲染
    但是一些falsy的值例如0会被渲染
*/