/*
    与浏览器的dom元素不同，React元素是创建开销极小的普通对象
    React DOM会负责更新DOM来与React元素保持一致
*/
const element=(
    <h1>
        Hello, world
    </h1>
);

/*
    将一个元素渲染为DOM
*/
import {createElement} from '../utils/common';

ReactDOM.render(element,createElement('div','dom1'))

/*
    更新已渲染的元素
    React元素是不可变对象，一旦被创建，就无法更改子元素或者属性
    更新UI唯一的方式就是创建一个全新的元素，并传入ReactDOM.render()
*/
const tick=function(){
    const element=(
        <div>
            <h1>Hello, world!</h1>
            <h2>
                It is {new Date().toLocaleTimeString()}
            </h2>
        </div>
    );
    ReactDOM.render(element,document.getElementById('dom1'));
}

setInterval(tick,1000);

/*
    React只更新它需要更新的部分
    React会将元素与它的子元素与它们之前的状态进行比较，并只会进行必要的更新
*/
