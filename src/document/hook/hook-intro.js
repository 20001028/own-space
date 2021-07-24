/*
    HOOK简介
*/  
import React,{useState} from 'react';
import {createElement} from '../../utils/common';

const Example=function(){
    const [count,setCount]=useState(0);

    return(
        <div>
            <p>You clicked {count} times</p>
            <button onClick={()=>setCount(count+1)}>
                Click me
            </button>
        </div>
    );
};

/*
    没有破坏性的改动
    Hook是完全可选的
    100%向后兼容的
    可用
*/

/*
    动机
*/