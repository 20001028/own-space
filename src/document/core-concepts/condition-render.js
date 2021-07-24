/*
    条件渲染
    在React中，条件渲染允许我们根据应用的不同状态只渲染部分内容
*/

import { createElement } from "../utils/common";

const UserGreeting=function(props){
    return (
        <h1>
            Welcome back!
        </h1>
    );
};

const GuestGreeting=function(props){
    return (
        <h1>
            Please sign up
        </h1>
    );
};

const Greeting=function(props){
    const isLoggedin=props.isLoggedin;
    if(isLoggedin){
        return <UserGreeting />
    }
    return <GuestGreeting />
};

ReactDOM.render(
    <Greeting isLoggedin={false}></Greeting>,
    createElement('div','greeting')
);

/*
    元素变量
    使用变量来储存元素，帮助我们有条件的渲染组件的一部分
*/
const LoginButton=function(props){
    return (
        <button onClick={props.onClick}>
            Login
        </button>
    );
};

const LogoutButton=function(props){
    return (
        <button onClick={props.onClick}>
            Logout
        </button>
    );
};

class LoginControl extends React.Component {
    constructor(props){
        super(props);
        this.handleLoginClick=this.handleLoginClick.bind(this);
        this.handleLogoutClick=this.handleLogoutClick.bind(this);
        this.state={isLoggedin:false};
    }
    handleLoginClick(){
        this.setState({isLoggedin:true});
    }
    handleLogoutClick(){
        this.setState({isLoggedin:false});
    }
    render(){
        const isLoggedin=this.state.isLoggedin;
        let button;
        if(isLoggedin){
            button=(
                <LogoutButton onClick={this.handleLogoutClick}>

                </LogoutButton>
            );
        }else{
            button=(
                <LoginButton onClick={this.handleLoginClick}>

                </LoginButton>
            );
        }
        return (
            <div>
                <Greeting isLoggedin={false}></Greeting>
                {button} 
            </div>
        );
    }
}
ReactDOM.render(
    <LoginControl />,
    createElement('div','control')
);

/*
    与运算符&&
    true && expression总是会返回expression
    false && expression总是会返回false
*/
const MailBox=function(props){
    const unreadMessages=props.unreadMessages;
    return (
        <div>
            <h1>Hello!</h1>
            {unreadMessages.length>0 && 
                <h2>
                    You have {unreadMessages.length} unread messages.
                </h2>
            }
        </div>
    );
};
const messages=['React','Re:React','Re:Re:React'];
ReactDOM.render(
    <MailBox unreadMessages={messages}></MailBox>,
    createElement('div','mail-box')
);

/*
    三目运算符
*/

/*
    阻止组件渲染
    在极少数情况下，会希望隐藏组件，即使它已经被其他组件渲染，可以让render方法返回null
*/
const WarningBanner=function(props){
    if(!props.warn){
        return null;
    }
    return (
        <div className="warning">
            Warning!
        </div>
    );
};

class Page extends React.Component {
    constructor(props){
        super(props);
        this.state={showWarning:true};
        this.handleToggleClick=this.handleToggleClick.bind(this);
    }

    handleToggleClick(){
        this.setState(state=>({
            showWarning:!state.showWarning
        }));
    }
    render(){
        return(
            <div>
                <WarningBanner warn={this.state.showWarning}></WarningBanner>
                <button onClick={this.handleToggleClick}>
                    {this.state.showWarning ? 'Hide' : 'Show'}
                </button>
            </div>
        );
    }
};
ReactDOM.render(
    <Page />,
    createElement('div','page')
)