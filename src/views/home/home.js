import { useEffect, useState } from 'react';
import '../../static/css/home.css';
import HomeCarousel from './home-carousel';
import React from 'react'

const Home=function(props){
    const [count,setCount]=useState(0);
    const [timer,setTimer]=useState(null);

    useEffect(()=>{
        if(!timer){
            setTimer(setInterval(()=>{
                if(count===1)
                    setCount(0);
                else
                    setCount(1);
            },2000));
        }
        return ()=>{
            if(timer)
                clearInterval(timer);
        }
    })

    let carousels=['carousel-first','carousel-second'].map(item=>(
        <HomeCarousel carouselClass={item}></HomeCarousel>
    ));

    return (
        <div className="home-container">
            {carousels[count]}
        </div>
    )
};

export default Home;