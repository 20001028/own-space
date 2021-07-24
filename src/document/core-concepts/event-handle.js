/*
    React元素的事件处理和DOM元素很相似
    React事件命名采用小驼峰式，不是纯小写
    使用JSX愈发时需要传入一个函数作为事件处理函数而不是一个字符串
*/

import { createElement } from "../utils/common";

const btn=(
    <button onClick={console.log}>

    </button>
);
// 在React中不能通过false的方式组织默认行为，必须显式的使用preventDefault
const ActionLink=function(){
    function handleClick(e){
        e.preventDefault();
        console.log('The link was clicked');
    }
    return (
        <a href="#" onClick={handleClick}>
            Click me
        </a>
    )
}

ReactDOM.render(
    <ActionLink />,
    createElement('div','dom')
);

// 在使用class愈发定义一个组件时，通常将事件处理函数声明为class中的方法
class Toggle extends React.Component{
    constructor(props){
        super(props);
        this.state={isToggleOn:true};

        // 将handleClick中的this绑定在组件实例上
        this.handleClick=this.handleClick.bind(this);
    }
    handleClick(){
        this.setState(state=>({
            isToggleOn:!state.isToggleOn
        }));
    }
    render(){
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}

ReactDOM.render(
    <Toggle />,
    createElement('div','toggle')
);

/*
    向事件处理程序传递参数
    在循环中，通常我们会为事件处理函数传递额外的参数
*/
// 箭头函数中的事件对象e需要被显式的传递
const btn1=(
    <button onClick={(e)=>console.log(id,e)}>
        Delete
    </button>
);
// 这里的事件对象e会被隐式的放入arguments对象中
const btn2=(
    <button onClick={console.log.bind(this,id)}>
        Delete
    </button>
);