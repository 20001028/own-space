/*
    首页
*/

import NavBar from '../../components/nav-bar';
import React from 'react';

const App=function(props){
    return (
        <div className="app-container">
            <NavBar></NavBar>
            {props.children}
        </div>
    );
};

export default App;