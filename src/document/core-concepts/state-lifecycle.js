/*
    State & 生命周期
*/
import { createElement } from "../utils/common";
// 之前我们已经了解了ReactDOM.render来修改想要渲染的元素

const Clock = function (props) {
    return (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {props.date.toLocaleTimeString()}</h2>
        </div>
    );
};

const tick = function () {
    ReactDOM.render(
        <Clock date={new Date()}></Clock>,
        createElement("div", "dom1")
    );
};

// setInterval(tick,1000);

/*
    将函数组件转换为class组件
*/
// 1. 创建一个class继承于React.Component
class Clock2 extends React.Component {
    // 2. 添加以一个render方法，并添加函数体
    // 3. 在render方法中用this.props替代props
    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.props.date.toLocaleTimeString()}</h2>
            </div>
        );
    }
}

// setInterval(tick,1000)

/*
    向class组件中添加局部的state
*/
class Clock3 extends React.Component {
    constructor(props){
        // 将props对象传递给父类构造函数
        // class组件应该一直使用这种方法调用父类构造函数
        super(props);
        this.state={
            date:new Date()
        };
    }
    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}</h2>
            </div>
        );
    }
}

/*
    将生命周期添加到Class中
    对于具有很多组件的应用程序中，当组件被销毁时释放占用的资源非常重要
    当Clock组件第一次被渲染到DOM中时，就为其设置一个定时器，称为“挂载”
    当DOM中Clock组件被删除时，应该清除定时器，称为“卸载”
*/
class Clock4 extends React.Component{
    constructor(props){
        super(props);
        this.state={
            date:new Date()
        };
    }
    // 以下两个为生命周期方法，分别在组件挂载后和卸载前调用
    componentDidMount(){
        this.timer=setInterval(()=>
            this.tick()
            ,1000);
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }
    tick(){
        // 更新数据
        this.setState({
            date:new Date()
        });
    }
    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}</h2>
            </div>
        );
    }
}

ReactDOM.render(
    <Clock4 />,
    createElement('div','dom2')
);

/*
    不要直接修改State
    只有在构造函数中才可以直接给this.state赋值
*/
// wrong
// this.state.comment='Hello'

// correct
// this.setState({comment:'Hello'});

/*
    State的更新可能是异步的
    出于性能考虑，React会把多个setState调用合并成一个调用，这有点类似于Vue中对于watcher的处理
    因为this.props和this.state可能会异步更新，因此不能依赖它们的值来更新下一个状态
*/
// wrong
// this.setState({counter:this.state.counter+this.props.increment})

// 要解决这个问题，可以让setState接受一个函数而不是一个对象
// 这个函数用上一个state作为第一个参数，此次更新被用到的props作为第二个参数

//correct
// this.setState((state,props)=>{
//     counter:state.counter+props.increment
// });

/*
    State的更新可能会被合并
    当调用setState时，React会把提供的对象合并到当前的state
    这种合并类似于Vue中的mixin，只会对相同的属性名对应的值造成影响
*/
class Mixins extends React.Component {
    constructor(props){
        super(props);
        this.state={
            posts:[],
            comments:[]
        };
    }
    componentDidMount(){

    }
}

/*
    数据是向下流动的
    父组件和子组件都无法知道某个组件是有状态还是无状态的，并且同样不关心是函数组件还是class组件
    state被称为局部的或是封装的，就是因为除了拥有并设置它的组件，其他组件都无法访问
    组件可以选择把它的state作为props向下传递到子组件中

    任何的state总是所属于特定的组件，而且从该state派生的任何数据或UI只能影响到树中低于他们的组件

*/
const App=function(){
    return (
        <div>
            <Clock4></Clock4>
            <Clock4></Clock4>
            <Clock4></Clock4>
        </div>
    )
}
ReactDOM.render(
    <App />,
    createElement('div','app')
)