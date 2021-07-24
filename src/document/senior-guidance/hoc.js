/*
    高阶组件
    HOC是React中用于复用组件逻辑的一种高级技巧，HOC自身不是React APi的一部分
    它是一种给予React的组合特性而形成的设计模式
*/

// 高阶组件是参数为组件，返回值为新组件的函数

// 组件是将props转换为UI，而高阶组件是将钻转换为另一个组件

// HOC在React的第三方库中非常常见，例如Redux的connect和Relay的createFragmentContainer

/*
    使用HOC解决横切关注点问题
    组件是React中代码复用的基本但愿，但某些模式并不适合传统组件
*/
class CommentList extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            // 假设 "DataSource" 是个全局范围内的数据源变量
            comments: DataSource.getComments()
        };
    }

    componentDidMount() {
        // 订阅更改
        DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
        // 清除订阅
        DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
        // 当数据源更新时，更新组件状态
        this.setState({
            comments: DataSource.getComments()
        });
    }

    render() {
        return (
            <div>
                {this.state.comments.map((comment) => (
                    <Comment comment={comment} key={comment.id} />
                ))}
            </div>
        );
    }
}

class BlogPost extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            blogPost: DataSource.getBlogPost(props.id)
        };
    }

    componentDidMount() {
        DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
        DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
        this.setState({
            blogPost: DataSource.getBlogPost(this.props.id)
        });
    }

    render() {
        return <TextBlock text={this.state.blogPost} />;
    }
}

// CommentList和BlogPost不同，它们在DataSource上调用不同但方法，且渲染不同的结果
// 但大部分实现都是一样的：
// 在挂载时，向DataSource添加一个更改侦听器
// 在侦听器内部，当数据源发生变化时，调用setState
// 在卸载时，删除侦听器

// 组件抽象
const CommentListWithSubscriptino = withSubscription(
    CommentList,
    (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
    BlogPost,
    (DataSource) => DataSource.getBlogPost(props.id)
);

// 第一个参数是被包装组件，第二个参数通过DataSource和当前的props返回需要的数据

// 当渲染两个组件时，CommetnList和BlogPost将传递一个data prop，其中包含从DataSource检索到的最新数据
// 接受一个组件
const withSubscription = function (WrappedComponent, selectData) {
    // 返回一个新的组件
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.state = {
                data: selectData(DataSource, props)
            };
        }

        componentDidMount() {
            DataSource.removeChangeListener(this.handleChange);
        }

        componentWillUnmount() {
            DataSource.removeChangeListener(this.handleChange);
        }

        handleChange() {
            this.setState({
                data: selectData(DataSource, this.props)
            });
        }

        render() {
            // 代理的思想，由新的组件去执行业务逻辑，渲染仍由原组件进行
            return (
                <WrappedComponent data={this.state.data} {...this.props}></WrappedComponent>
            );
        }
    }
}

// HOC不会修改传入的组件，也不会使用继承来复制行为
// HOC通过将组件包装在容器组件中来组成新组件
// HOC是纯函数，没有副作用

// 被包装组件接受来自容器组件的所有prop，同事接受一个新的用于render的data prop
// HOC不需要关心数据的使用方式或原因，而被包装组件也不需要数据是怎么来的

/*
    不要改变原始组件，使用组合
    不要试图在HOC中修改组件原型
*/

const logProps = function (InputComponent) {
    InputComponent.prototype.componentDidUpdate = function (prevProps) {
        console.log('Current props: ', this.props);
        console.log('Previous props: ', prevProps);
    };
    // 返回原始的 input 组件，暗示它已经被修改。
    return InputComponent;
}

// 每次调用 logProps 时，增强组件都会有 log 输出。
const EnhancedComponent = logProps(InputComponent);

// 修改组件后的不良后果：
// 输入组件无法再像HOC增强之前那样使用
// 如果用另一个同样会修改componentDidUpdate的HOC增强它，前面的HOC就会失效
// 这个HOC也无法应用于没有生命周期的函数组件（用function声明的组件）

// HOC不应该修改传入组件，而应该使用组合的方式，通过将组件包装在容器组件中实现
const logProps = function (WrappedComponent) {
    return class extends React.Component {
        componentDidUpdate(prevProps) {
            console.log('Current props: ', this.props);
            console.log('Previous props: ', prevProps);
        }
        render() {
            // 将 input 组件包装在容器中，而不对其进行修改。Good!
            return <WrappedComponent {...this.props} />;
        }
    }
}

// 该HOC与上文中修改传入组件的HOC功能相同，但避免了冲突
// 它适用于class组件和函数组件，可以和其他HOC组合或与自身组合


/*
    约定：包装显示名称以轻松调试
    HOC创建的容器组件会与任何其他组件一样，会显示在调试工具中
    最常见的方式是用HOC包住被包装组件的显示名称，比如withSubscription(CommentList)
*/

function withSubscription(WrappedComponent) {
    class WithSubscription extends React.Component {/* ... */ }
    WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
    return WithSubscription;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

/*
    注意事项
*/

/*
    不要在render方法中使用HOC
*/

/*
    React的diff算法使用组件标识来确定它是应该更新现有子树还是将其丢弃后挂载新的子树
    如果从render返回的组件与前一个渲染中的组件相同，则React通过将子树与新子树进行区分来递归更新子树、
    如果不相同，完全卸载前一个子树
*/

/*
    但是如果我们每次都在render方法中用HOC返回一个新的组件，会导致每次子树都会卸载和重新挂载
    重新挂载会导致组件和子组件的1状态丢失
*/

/*
    务必复制静态方法
    有时React组件上静态方法很有用
    但是当将HOC引用组件时，原始组件将使用容器组件进行包装，新组件没有原始组件的任何静态方法
*/
// 手动拷贝
function enhance(WrappedComponent) {
    class Enhance extends React.Component {/*...*/ }
    // 必须准确知道应该拷贝哪些方法 :(
    Enhance.staticMethod = WrappedComponent.staticMethod;
    return Enhance;
}

// 自动拷贝

import hoistNonReactStatic from 'hoist-non-react-statics';
function enhance(WrappedComponent) {
    class Enhance extends React.Component {/*...*/ }
    hoistNonReactStatic(Enhance, WrappedComponent);
    return Enhance;
}

// 或者在原组件中导出静态方法

/*
    额外导出静态方法
    虽然HOC的约定是将所有props传递给被包装组件，但这对于refs并不适用
    因为ref实际上并不是一个prop，就像key一样
    如果ref添加到HOC的返回组件中，则ref指向容器组件，而不是被包装组件
*/
