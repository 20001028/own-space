import '../../static/css/home.css';
import React, { useEffect, useState } from 'react';

// class HomeCarousel extends React.Component{
//     constructor(){
//         super();
//         this.state={
//             count: 0,
//         };
//         console.log('constructor');
//     }
//     componentWillMount(){
//         this.setState({
//             state:1
//         });
//     }
//     /**
//      * @name: 
//      * @param {*} nextProps
//      * @param {*} prevState
//      * @return {*}
//      * render之前调用，每次更新调用
//      */    
//     static getDerivedStateFromProps(nextProps,prevState){
//         console.log('getDerivedStateFromProps');
//         return null;
//     }
//     /**
//      * @name: 
//      * @param {*}
//      * @return {*}
//      * 组件挂载后调用
//      */    
//     componentDidMount(){
//         this.setState((state,props)=>(
//             {
//                 count: ++state.count,
//             }
//         ));
//         console.log('componentDidMount');
//     }
//     /**
//      * @name: 
//      * @param {*}
//      * @return {*}
//      * 组件更新前
//      */    
//     shouldComponentUpdate(){
//         console.log('shouldComponentUpdate');
//         return true;
//     }
//     /**
//      * @name: 
//      * @param {*}
//      * @return {*}
//      * render之后，组件挂载之前
//      */    
//     getSnapshotBeforeUpdate(){
//         console.log('getSnapshotBeforeUpdate');
//         return null;
//     }
//     /**
//      * @name: 
//      * @param {*}
//      * @return {*}
//      * 组件更新后
//      */    
//     componentDidUpdate(){
//         console.log('componentDidUpdate');
//     }
//     /**
//      * @name: 
//      * @param {*}
//      * @return {*}
//      * 组件即将卸载或销毁
//      */    
//     componentWillUnmount(){
//         console.log('componentWillUnmount');
//     }
//     /**
//      * @name: 
//      * @param {*}
//      * @return {*}
//      * 每次更新调用
//      */    
//     render(){
//         console.log('render');
//         return (
//             <div>{this.state.count}</div>
//         )
//     }
// }

const useUpdate=(fn,n)=>{
    const [count,setCount]=useState(0);
    useEffect(()=>{
        setCount(n+1);
    });

    useEffect(()=>{
        fn();
    },[count,fn]);
};

const HomeCarousel=function(props){
    //  const carousels=CAROUSEL_IMAGES.map(item=>(
    //      <img src={item.url}></img>
    //  ));
    // let classes=['home-carousel-container',props.carouselClass].join(' ');

    // return (
    //     <div className={classes}>
            
    //     </div>
    // );
    const [n,setN]=useState(0);
    useUpdate(()=>{
        console.log('updated');
    },n);
    return (
        <div>
            {n}
        </div>
    )
};


export default HomeCarousel;