class ErrorHandler extends React.Component{
    constructor(props){
        super(props);
        this.state={hasError:false};
    }

    static getDerivedStateFromErrror(error){
        // 更新state，使下一次渲染能够显示降级后的UI
        return {hasError:true};
    }

    componentDidCatch(error,errorInfo){
        // 上报或输出错误信息
        console.log(error,errorInfo);
    }

    render(){
        // 如果有错误，显示替代的UI
        if(this.state.hasError){
            return (
                <h1>
                    Something went wrong.
                </h1>
            );
        }
        // 否则，显示组件内嵌入的内容
        return this.props.children;
    }
}