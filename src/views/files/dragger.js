import { useEffect, useState } from "react";
import "../../static/css/files.css";
import React from "react";

const defaultProps = {
    limit: 2,
    onExceed: function (files, fileList) {
        console.log('exceed');
    },
    autoUpload:false,
    multiple:true,
    onStart:function(rawFile){

    },
};

const Dragger = function (props = { ...defaultProps }) {
    const [dragClass, setDragClass] = useState("file-dragger-container");
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        console.log(fileList)
    }, [fileList]);

    const dragEnter = function (e) {
        e.preventDefault();
        // console.log(e.dataTransfer.files);
        setDragClass(dragClass + " file-dragger-container-over");
    };
    const dragOver = function (e) {
        e.preventDefault();
    };
    const dragLeave = function (e) {
        e.preventDefault();
        setDragClass(dragClass.split(" ")[0]);
    };
    const drag = function (e) {
        e.preventDefault();
        // console.log(e.dataTransfer.files);
    };
    const post = function () {

    };
    const abort = function () {

    };
    const handleClick = function (e) {
        console.log('ceve')
        e.stopPropagation();
        /*
            暂时不考虑是否禁用
        */
        const fileInput = document.getElementById('file-input');
        fileInput.value = null;
        fileInput.click();
    };
    const handleChange = function (e) {
        /*
           setFileList不会立即生效，异步更新state
        */
        let files = [...e.target.files];
        if (files.length <= 0) {
            return;
        }
        uploadFiles(files);
    };
    const uploadFiles = function (files) {
        /*
            文件上传限制
        */
        if (props.limit && files.length + fileList.length > props.limit) {
            props.onExceed && props.onExceed(files, fileList);
        }
        // 浅拷贝
        let postFiles = Array.prototype.slice.call(files);
        /*
            对于普通的file input，如果不设置multiple属性，每次只允许选择一个文件；即使设置了multiple，后面的也会覆盖前面的
        */
        if (!props.multiple) { postFiles = postFiles.slice(0, 1); }

        postFiles.forEach(rawFile => {
            /*
                onStart作初步的处理
            */
            props.onStart(rawFile);
            /*  
                自动上传
            */
            if (props.autoUpload) upload(rawFile);
        });
    };
    const upload=function(rawFile){
        this.$refs.input.value = null;

      if (!this.beforeUpload) {
        return this.post(rawFile);
      }

      const before = this.beforeUpload(rawFile);
      if (before && before.then) {
        before.then(processedFile => {
          const fileType = Object.prototype.toString.call(processedFile);

          if (fileType === '[object File]' || fileType === '[object Blob]') {
            if (fileType === '[object Blob]') {
              processedFile = new File([processedFile], rawFile.name, {
                type: rawFile.type
              });
            }
            for (const p in rawFile) {
              if (rawFile.hasOwnProperty(p)) {
                processedFile[p] = rawFile[p];
              }
            }
            this.post(processedFile);
          } else {
            this.post(rawFile);
          }
        }, () => {
          this.onRemove(null, rawFile);
        });
      } else if (before !== false) {
        this.post(rawFile);
      } else {
        this.onRemove(null, rawFile);
      }
    };

    return (
        <div
            className={dragClass}
            onDragEnter={dragEnter}
            onDragOver={dragOver}
            onDragLeave={dragLeave}
            onDrag={drag}
        >
            <i className="iconfont icon-shangchuan icon-upload"></i>
            <div className="file-dragger-detail">
                <span>
                    <a>将文件拖到此处，或点击</a>
                    <a className="file-upload-text" onClick={handleClick}>
                        上传文件
                    </a>
                    <input
                        id="file-input"
                        className="file-uploader"
                        type="file"
                        onChange={handleChange}
                        multiple
                    ></input>
                </span>
            </div>
        </div>
    );
};

export default Dragger;
