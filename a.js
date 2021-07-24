// ./a.js
let count = 1;

setCount = () => {
    count++;
}

setTimeout(() => {
    console.log('a', count)// a 2
}, 1000);

module.exports = {
    count,
    setCount
}