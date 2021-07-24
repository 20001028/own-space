/*  
    Hook 规则
    Hook本质就是JS函数，但是使用时需要遵循两条规则
    只在最顶层使用Hook
*/

/*  
    只在最顶层使用Hook
    不要在循环，条件或嵌套函数中调用Hook，确保总是在React函数的最顶层调用
    遵守这条规则可以确保Hook在每一次渲染中都按照同样的顺序调用工
    React保证在多次的useState和useEffect调用之间保持hook状态的正确
*/

/*
    只在React函数中调用Hook
    不要在普通的JS函数中调用Hook
    在React的函数组件中调用Hook
    在自定义Hook中调用其他Hook
*/  

/*  
    ESLint插件
    cnpm i eslint-plugin-reat-hooks --save-dev
*/

/*  
    说明
    正如之前说的，我们可以声明多个State Hook和Effect Hook
    
    React怎么知道哪个state对应哪个useState
    React靠的是调用的顺序，Hook的调用顺序在每次渲染中都是相同的

    只要Hook的调用顺序在多次渲染之间保持一致，React就能正确的将内部state和对应的Hook进行关联

    如果将Hook放在条件语句中，无法保证每次渲染hook都被执行，自然无法保证所有hook的执行顺序

    如果想要有条件的执行以恶搞effect，可以把判断放到Hook内部
*/