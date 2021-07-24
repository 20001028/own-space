/*
    列表 & key
*/

import { createElement } from "../utils/common";

/*
    渲染多个组件
    使用{}在JSX内构建一个元素集合
*/

const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => (
    <li key={number.toString()}>{number}</li>
));

ReactDOM.render(<ul>{listItems}</ul>, createElement("div", "numbers"));

/*
    基础列表组件

*/

const NumberList = function (props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) => (
        <li key={number.toString()}>{number}</li>
    ));
    return <ul>{listItems}</ul>;
};
ReactDOM.render(
    <NumberList numbers={numbers}></NumberList>,
    createElement("div", "numbers2")
);

/*
    key
    key帮助React识别哪些元素改变了，比如被添加或删除
    key最好是元素在列表中拥有的独一无二的字符串，因此我们通常使用数据的id
*/
// 当数据没有id时，我们退而求其次的使用index下标
// 不过使用下标会使性能变差
const todpItems = numbers.map((number, index) => <li key={index}>{number}</li>);

/*
    用key提取组件
    元素的key只有放在就近的数组中才有意义
    我们应该尽可能的关注map方法中的key
*/

const ListItem = function (props) {
    return <li>{props.value}</li>;
};

// const NumberList=function(props){
//     const numbers=props.numbers;
//     const listItems=numbers.map(number=>
//         <ListItem key={number.toString()}></ListItem>
//         );
//     return (
//         <ul>
//             {listItems}
//         </ul>
//     );
// };

ReactDOM.render(
    <NumberList numbers={numbers}></NumberList>,
    createElement("div", "numbers3")
);

/*
    key只是在兄弟节点中必须唯一
    数组元素中使用key在其兄弟节点之间应该是独一无二的，但它们不需要全局唯一
    当我们生成两个不同数组时，可以使用相同的key
*/
const Blog = function (props) {
    const sidebar = (
        <ul>
            {props.posts.map((post) => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    );
    const content = props.posts.map((post) => (
        <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
        </div>
    ));
    return (
        <div>
            {sidebar}
            <hr />
            {content}
        </div>
    );
};

const posts = [
    { id: 1, title: "Hello World", content: "Welcome to learning React!" },
    { id: 2, title: "Installation", content: "You can install React from npm." },
];
ReactDOM.render(<Blog posts={posts} />, createElement('div','blog'));

/*
    在JSX中嵌入map
    JSX允许在大括号中嵌入任何表达式，所以我们可以将listItems替换为生成它的表达式
*/