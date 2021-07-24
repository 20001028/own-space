/*
    Refs转发
    Ref转发是一项将ref自动的通过组件传递到子组件的技巧
    对于大多数应用中的组件，不是必需的。
    但对于某些组件，尤其是可重用的组件库是很有用的
*/

/*
    转发refs到DOM组件
*/
const FancyButton=function(props){
    return (
        <button className="FancyButton">
            {props.children}
        </button>
    );
};
// React组件隐藏其实现细节，包括渲染结果
// 其他使用FancyButton的组件通常不需要获取内部的DOM元素buttong的ref
// 这可以防止组件过度依赖其他组件的DOM结构

/*
    这种封装对类似FeedStory或Comment这样的应用级组件是理想的，但对FancyButton或MyTextInput这样的1高可用叶组件来说很不方便
    因为这些叶组件不可避免的需要访问其DOM节点，管理焦点、选中或动画
*/
// Ref转发是一个可选特性，允许某些组件接受ref并向下传递给子组件
const FancyButton2 =React.forwardRef((props,ref)=>(
    <button ref={ref} className="fancy-button">
        {props.children}
    </button>
));
const ref=React.createRef();
const fancyButton=(
    <FancyButton ref={ref}>Click me</FancyButton>
)
// 这样，使用Fancybutton的组件可以获取DOM节点button的ref并访问

/*
    1. 我们通过调用工React.createRef创建了一个React ref并将其赋值给ref变量
    2. 通过指定ref为JSX属性，向下传递给
    3. React传递ref给forwardRef内函数，作为第二个参数
    4. 向下转发ref参数到button，指定为JSX属性
    5. 当ref挂载完成，ref.current将指向button DOM节点
*/

/*  
    第二个参数ref只在使用React.forwardRef定义组件时存在，常规的函数和class组件不接受ref参数，且props叶不存在ref
    Ref转发不仅限于DOM组件，也可以转发到class组件实例中
*/

/*
    组件库维护者的注意事项

*/

/*
    在高阶组件中转发refs
    这个技巧对于HOC特别有用
*/
const logProps=function(WrappedComponent){
    class LogProps extends React.Component{
        componentDidUpdate(prevProps){
            console.log('old props:',prevProps);
            console.log('new props:',this.props);
        }

        render(){
            return (
                <WrappedComponent {...this.props}></WrappedComponent>
            )
        }
    }
    return LogProps;
};

/*
    在DevTools中显示自定义名称
    React.forwardRef接受一个渲染函数，React DevTools使用该函数决定为ref转发组件显示的内容
*/
