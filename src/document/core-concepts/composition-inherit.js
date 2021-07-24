/*
    组合 VS 继承
*/

import { createElement } from "../utils/common";

/*
    包含关系
    有些组件无法提前知晓子组件的具体内容，在SideBar和Dialog等这些通用容器的组件中很常见
    可以使用一个特殊的children prop将子组件传递到渲染结果中
*/

const FancyBorder=function(props){
    return (
        <div className={'FancyBorder FancyBorder-'+props.color}>
            {props.children}
        </div>
    );
};

const Welcomedialog=function(props){
    // FancyBorder JSX标签中的所有内容都会作为一个props.children属性传递给FancyBorder组件
    // 而FancyBorder会将{props.children}渲染在一个div中
    return (
        <FancyBorder color="blue">
            <h1 className="dialog-title">
                Welcome
            </h1>
            <p className="dialog-message">
                Thank you for visiting our spacecraft
            </p>
        </FancyBorder>
    );
};

ReactDOM.render(
    <Welcomedialog></Welcomedialog>,
    createElement('div','welcome')
);
// 类似于Vue中的slot，我们可以为即将填充的内容预留空位
const SplitPane=function(props){
    return (
        <div className="split-pane">
            <div className="split-pane-left">
                {props.left}
            </div>
            <div className="split-pane-right">
                {props.right}
            </div>
        </div>
    );
};

const App=function(props){
    return (
        <SplitPane left={<Welcomedialog></Welcomedialog>} right={<Welcomedialog></Welcomedialog>}>

        </SplitPane>
    )
};

/*
    特例关系
    有时候可以把一些组件看作是其他组件的特殊实例
*/
const Dialog=function(props){
    return (
        <FancyBorder color="blue">
            <h1 className="dialog-title">
                {props.title}
            </h1>
            <p className="dialog-message">
                {props.message}
            </p>
        </FancyBorder>
    );
};

const WelcomeDialog=function(props){
    return (
        <Dialog
            title="Welcome"
            message="Thank you for visiting our spacecraft!"
            ></Dialog>
    );
};