/*
    代码分割
*/

/*
    打包
    大多数React应员工都会使员工Webpack、Rollup或Browserify等构建工具来打包文件
    打包是将一个将文件引入并合并到一个单独文件的过程，最终形成一个bundle
    最后在页面上引入bundle。一次性加载
*/

/*
    代码分割
    懒加载
*/

/*
    import()
    动态import()语法
*/
import('../examples/code-split-example').then(math=>{
    console.log(math.add(16,20));
});