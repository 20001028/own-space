/*
    无障碍辅助功能
*/

/*
    为什么我们需要无障碍辅助功能
    网络无障碍辅助功能（Accessibility，a11y）是一种可以帮助虽由人获得服务的设计和创造
*/

/*
    标准和指南
    WCAG：网络内容无障碍指南
    WAI-ARIA：网络无障碍倡议 - 无障碍互联网应用
    JSX支持所有aria-* HTML属性。虽然大多数React的DOM变量和属性名都使用驼峰命名
    但aria-* 应该像其在HTML中一样使用带连字符但命名法
*/
const input = (
    <input
        type="text"
        aria-label={true}
        aria-required={true}
        onChange={true}
        value={true}
        name="name"
    ></input>
);

/*
    语义化的HTML
    在JSX中使用div元素来实现React代码功能时，或者在使用列表ol、ul、dl和table时，都会破坏语义化
    推荐使用React Fragments组合各个组件
*/
// import React, { Fragment } from 'react';
import { createElement } from '../../utils/common';
const ListItem = function (props) {
    return (
        <Fragment>
            <dt>{props.item.term}</dt>
            <dt>{props.item.description}</dt>
        </Fragment>
    );
};

const Glossary = function (props) {
    return (
        <dl>
            {props.items.map(item => (
                <ListItem item={item} key={item.id}></ListItem>
            ))}
        </dl>
    );
};

const Glossary2 = function (props) {
    return (
        <dl>
            {props.items.map(item => (
                <Fragment key={item.id}>
                    <dt>{props.item.term}</dt>
                    <dt>{props.item.description}</dt>
                </Fragment>
            ))}
        </dl>
    );
};

// 短语法
const ListItem2 = function (props) {
    return (
        <>
            <dt>{item.term}</dt>
            <dt>{item.description}</dt>
        </>
    );
};

/*
    无障碍表单
*/

/*
    标记
    所有的HTML表单控制，例如input和textarea，都需要被标注来实现无障碍辅助功能
*/
const labelInput = (
    <>
        <label htmlFor="namedInput">Name:</label>
        <input id="namedInput" type="text" name="name"></input>
    </>
);

/*
    出错时提醒用户
*/

/*
    控制焦点
    确保网络应用在即使只有键盘的环境下正常运作
*/

/*
    键盘焦点及焦点轮廓
    在DOM中，当前被选中来接受键盘信息的元素，可以在各处看到键盘焦点，它会被焦点轮廓包围
*/

/*
    跳过内容机制
*/

/*
    使用程序管理焦点
    用DOM元素的Refs在React中设置焦点
*/

class CustomTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }
    render() {
        return (
            <input
                type="text"
                ref={this.textInput}
            ></input>
        );
    }
};
// 然后我们可以使用原始的DOM API显示的聚焦在textInput上
const focus = function () {
    // 通过访问current获得DOM节点
    this.textInput.current.focus();
}

// 又是父组件需要把焦点设置在其子组件的一个元素上
// 可以通过在子组件上设置一个特殊的prop来对父组件暴露DOM refs从而把父组件的ref传向子节点的DOM节点
const CustomTextInput2 = function (props) {
    return (
        <div>
            <input ref={props.inputRef}></input>
        </div>
    );
};

class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.inputElement = React.createRef();
    }
    render() {
        return (
            <CustomTextInput2 inputRef={this.inputElement}></CustomTextInput2>
        );
    }
};

// 当使用HOC来扩展组件时，建议使员工React的forwardRef函数来向被包裹的组件转发ref

/*
    鼠标和指针事件
    确保任何可以使用鼠标和指针完成的功能也可以只通过键盘完成
*/
class OuterClickExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
        this.toggleContainer = React.createRef();

        this.onClickHandler = this.onClickHandler.bind(this);
        this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
    }
    componentDidMount() {
        window.addEventListener('click', this.onClickHandler);
    }
    componentWillUnmount() {
        window.removeEventListener('click', this.onClickOutsideHandler);
    }

    onClickHandler() {
        this.setState(state => ({
            isOpen: !state.isOpen
        }));
    }

    onClickOutsideHandler(event) {
        if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
            this.setState({ isOpen: false });
        }
    }

    render() {
        return (
            <div ref={this.toggleContainer}>
                <button onClick={this.onClickHandler}>Select an option</button>
                {this.state.isOpen && (
                    <ul>
                        <li>Option 1</li>
                        <li>Option 2</li>
                        <li>Option 3</li>
                    </ul>
                )}
            </div>
        );
    }
}

ReactDOM.render(
    <OuterClickExample></OuterClickExample>,
    createElement('div','outer-click')
);

class BlurExample extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = { isOpen: false };
      this.timeOutId = null;
  
      this.onClickHandler = this.onClickHandler.bind(this);
      this.onBlurHandler = this.onBlurHandler.bind(this);
      this.onFocusHandler = this.onFocusHandler.bind(this);
    }
  
    onClickHandler() {
      this.setState(currentState => ({
        isOpen: !currentState.isOpen
      }));
    }
  
    // 我们在下一个时间点使用 setTimeout 关闭弹窗。
    // 这是必要的，因为失去焦点事件会在新的焦点事件前被触发，
    // 我们需要通过这个步骤确认这个元素的一个子节点
    // 是否得到了焦点。
    onBlurHandler() {
      this.timeOutId = setTimeout(() => {
        this.setState({
          isOpen: false
        });
      });
    }
  
    // 如果一个子节点获得了焦点，不要关闭弹窗。
    onFocusHandler() {
      clearTimeout(this.timeOutId);
    }
  
    render() {
      // React 通过把失去焦点和获得焦点事件传输给父节点
      // 来帮助我们。
      return (
        <div onBlur={this.onBlurHandler}
             onFocus={this.onFocusHandler}>
          <button onClick={this.onClickHandler}
                  aria-haspopup="true"
                  aria-expanded={this.state.isOpen}>
            Select an option
          </button>
          {this.state.isOpen && (
            <ul>
              <li>Option 1</li>
              <li>Option 2</li>
              <li>Option 3</li>
            </ul>
          )}
        </div>
      );
    }
  }