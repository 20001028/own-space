/*
    Fragments
    React中的一个常见模式是一个组件返回多个元素，Fragments允许将子列表分组，无需向DOM添加额外节点
*/

/*
    动机
*/
class Table extends React.Component {
    render() {
        return (
            <table>
                <tr>
                    <Columns></Columns>
                </tr>
            </table>
        );
    }
};
// Columns组件需要返回多个td元素才能渲染，但是如果在Columns的render中使用了div包裹，就会失效
class Columns extends React.Component {
    render() {
        return (
            <div>
                <td>hello</td>
                <td>world</td>
            </div>
        );
    }
};

// 用Fragments解决这个问题
class Columns2 extends React.Component {
    render() {
        return (
            <React.Fragment>
                <td>hello</td>
                <td>world</td>
            </React.Fragment>
        );
    }
};

/*
    短语法
*/
class Columns3 extends React.Component {
    render() {
        return (
            <>
                <td>hello</td>
                <td>world</td>
            </>
        );
    }
};

/*
    带key的Fragments
    使用显式React.Fragment语法声明的片段可能具有key
*/

const Glossary = function (props) {
    // key是唯一可以传递给Fragment的属性
    return (
        <dl>
            {props.items.map(item => (
                // 没有`key`，React 会发出一个关键警告
                <React.Fragment key={item.id}>
                    <dt>{item.term}</dt>
                    <dd>{item.description}</dd>
                </React.Fragment>
            ))}
        </dl>
    )
}