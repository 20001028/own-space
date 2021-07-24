/*
    组件允许你将UI拆分为独立可复用的代码片段，并对每个片段进行独立构思
    组件从概念上类似于JS函数，接受任意的入参，并返回用于描述页面展示内容的React元素
*/

import { createElement } from "../../utils/common";

/*
    定义组件最简单的方式就是JS函数
*/
function WelcomeComp(props){
    // props属性对象，并返回一个React元素
    return (
        <h1>
            Hello, {props.name}
        </h1>
    );
}

class WelcomeComp2 extends React.Component {
    render(){
        return (
            <h1>
                Hello, {this.props.name}
            </h1>
        )
    }
}

/*
    渲染组件
*/
// React元素也可以是用户自定义的组件，例如WelcomeComp
// 组件名必须大写开头，小写开头的组件都会被视为原生dom标签
const element=(
    <WelcomeComp name="Sara" />
);
// 当React元素为用户自定义组件时，会将JSX所接受的属性以及子组件转换为单个对象传递给组件，即props对象
ReactDOM.render(
    element,
    createElement('div','dom1')
);

/*
    组合组件
    组件可以在其输出中引用其他组件
    我们可以用同一个组件抽象出不同层次的细节
*/
const App=function(){
    return (
        <div>
            <WelcomeComp name="Sara"></WelcomeComp>
            <WelcomeComp name="Cahal"></WelcomeComp>
            <WelcomeComp name="Edite"></WelcomeComp>
        </div>
    );
};
ReactDOM.render(
    <App />,
    createElement('div','dom2')
);

/*
    提取组件
    将组件拆分为更小的组件
*/
const Comment=function(props){
    return (
        <div className="Comment">
            <div className="UserInfo">
                <img className="Avatar"
                    src={props.author.avatarUrl}
                    alt={props.author.name}
                ></img>
                <div className="UserInfo-name">
                    {props.author.name}
                </div>
                <div className="Comment-text">
                    {props.text}
                </div>
                <div className="Comment-date">
                    {formatDate(props.date)}
                </div>
            </div>
        </div>
    );
};
// 抽取Avatar组件
const Avatar=function(props){
    return (
        <img className="Avatar"
            src={props.user.avatarUrl}
            alt={props.user.name}
            />
    );
};
// 继续抽取UserInfo组件
const UserInfo=function(props){
    return (
        <div className="UserInfo">
            <Avatar user={props.user}></Avatar>
            <div className="UserInfo-name">
                {props.user.name}
            </div>
        </div>
    );
};
// 最后的Comment组件
const Comment2=function(props){
    return (
        <div className="Comment">
            <UserInfo user={props.author}></UserInfo>
            <div className="Comment-text">
                {props.text}
            </div>
            <div className="Comment-date">
                {formatDate(props.date)}
            </div>
        </div>
    );
};


/*
    Props的只读性
    组件无论是使用函数声明还是通过class声明，都绝不能修改自身的props
*/
// sum函数为纯函数，该函数不会更改入参，且多次调用相同的入参返回相同的结果
const sum=function(a,b){
    return a+b;
}
// withdraw函数就不是纯函数
const withdraw=function(account,amount){
    account.total+=amount;
}

/*
    所有React组件都必须像函数一样保护props对象不被更改
*/