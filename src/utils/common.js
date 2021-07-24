const createElement=function(tag,id){
    if(document.getElementById(id)){
        alert('id exist');
        return null;
    }
    const dom=document.createElement(tag);
    dom.id=id;
    document.body.append(dom);
    return document.getElementById(id);
};

export {createElement};