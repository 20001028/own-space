/*
    表单
    在React中，HTML表单元素的工作方式和其他DOM元素不同
    表单元素通常会保持一些内部state
*/

import { createElement } from "../utils/common";

/*
    受控组件
    在HTML中，表单元素（input、textarea、select）之类的表单玉树通常自己维护state
    并根据用户输入进行更新
    在React中，可变状态state通常保存在组件的state属性中，并且只能使用setState来更新
    我们可以将两者结合，使React的state成为唯一数据源
    渲染表单的React组件还控制者用户输入过程中表单发生的操作
    被React这样控制取值的表单输入元素叫做受控组件
*/

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: "" };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert("提交的名字：" + this.state.value);
        event.preventDefault();
    }

    render() {
        // 在表单元素上设置来value属性，让其显示this.state.value，因此state会成为唯一数据源
        // handleChange会在每次按键时执行并更新state
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    名字：
                    <input
                        type="text"
                        value={this.state.value}
                        onChange={this.handleChange}
                    ></input>
                </label>
                <input type="submit" value="提交"></input>
            </form>
        );
    }
}
ReactDOM.render(<NameForm></NameForm>, createElement("div", "name-form"));

/*
    textarea标签
    在HTMl中，textarea通过子元素定义文本
    在React中，同样采用value属性
*/

class EssayForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: "this is a textarea element" };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert("提交的内容：" + this.state.value);
        event.preventDefault();
    }

    render() {
        // 在表单元素上设置来value属性，让其显示this.state.value，因此state会成为唯一数据源
        // handleChange会在每次按键时执行并更新state
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    文章：
                    <textarea
                        type="text"
                        value={this.state.value}
                        onChange={this.handleChange}
                    ></textarea>
                </label>
                <input type="submit" value="提交"></input>
            </form>
        );
    }
}
ReactDOM.render(<EssayForm></EssayForm>, createElement("div", "essay-form"));

/*
    select标签
    在HTMl中，select创建下拉列表标签
    React中并不会使用select属性，而是在select标签上使用value属性
    在受控组件中，只需要在根标签中更新它
*/

class FlavorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: ["lime",'mango'] };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target=event.target;
        const value=event.target.value;
        if(this.state.value.includes(value)){
            let index=this.state.value.findIndex(item=>item===value);
            this.setState(state=>{
                value:state.value.splice(index,1)
            })
        }else
            this.setState(state=>{
                value:state.value.push(value)
            });
    }

    handleSubmit(event) {
        alert("你喜欢的风味是：" + this.state.value);
        event.preventDefault();
    }

    render() {
        // 在表单元素上设置来value属性，让其显示this.state.value，因此state会成为唯一数据源
        // handleChange会在每次按键时执行并更新state
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    选择你喜欢的风味：
                    <select
                        multiple={true}
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        <option value="grapefruit">葡萄柚</option>
                        <option value="lime">酸橙</option>
                        <option value="coconut">椰子</option>
                        <option value="mango">芒果</option>
                    </select>
                </label>
                <input type="submit" value="提交"></input>
            </form>
        );
    }
}
ReactDOM.render(<FlavorForm></FlavorForm>, createElement("div", "flavor-form"));

/*
    文件input标签
    因为文件input(type="file")的value只读，所以它是非受控组件
*/

/*
    处理多个输入
    当需要处理多个input元素时，可以给每个元素添加name谁能给
    让处理函数根据event.target.name属性选择要执行的操作
*/
class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.name === "isGoing" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }
    render() {
        return (
            <form>
                <label>
                    参与:
                    <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange}
                    />
                </label>
                <br />
                <label>
                    来宾人数:
                    <input
                        name="numberOfGuests"
                        type="number"
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange}
                    />
                </label>
            </form>
        );
    }
}

ReactDOM.render(
    <Reservation></Reservation>,
    createElement('div','reserveation')
);

/*
    受控输入空值
    在受控组件上指定value的prop会阻止用户更改输入
    如果指定来value，但输入仍可编辑，可能是将value设置为undefined或null
*/
ReactDOM.render(
    <input value="hi"></input>,
    createElement('div','mount-node')
);

setTimeout(function(){
    ReactDOM.render(
        <input value={null}></input>,
        createElement('div','mount-node2')
    );
},1000);

/*
    受控组件的替代品
*/

/*
    成熟的解决方案
*/