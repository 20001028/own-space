import { useEffect, useState } from 'react';
import '../../static/css/files.css';
import Dragger from './dragger';
import LeftNavBar from '../../components/left-nav-bar';
import React from 'react'

const FileTransfer=function(props){
    const [fileList,setFileList]=useState([]);

    const handleFileList=function(fileList){

    }

    useEffect(()=>{

        return ()=>{

        }
    })

    return (
        <div className='file-transfer-container'>
            {/* <LeftNavBar></LeftNavBar> */}
            {props.children}
        </div>
    );
};

export default FileTransfer;