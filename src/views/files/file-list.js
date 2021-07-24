import { FILE_CONTROLS } from "../../utils/const";
import React from "react";

const FileList=function(props){

    const fileControls=FILE_CONTROLS.map(item=>(
        <div className="file-control-item">
            {item.name}
        </div>
    ));
    
    return (
        <div className="file-list-container">
            <div className='file-control'>
                {fileControls}
            </div>
            <div className='file-breadcrumb'>

            </div>
            <div className="file-list">
                
            </div>
        </div>
    );
}

export default FileList;