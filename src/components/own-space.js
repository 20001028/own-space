'use strict';

// react的渲染函数createElement
const e = React.createElement;

// react中类即组件，继承Component
class LikeButton extends React.Component {
    // 使用props初始化组件
    constructor(props) {
        super(props);
        this.state = {
            liked: false
        };
    }

    render() {
        if (this.state.liked) {
            return 'You liked this.';
        }

        return e(
            'button', {
                onClick: () => this.setState({
                    liked: true
                })
            },
            'Like'
        );
    }
}

const domContainer = document.querySelector('#react-container');
// 渲染在dom节点上
ReactDOM.render(e(LikeButton), domContainer);