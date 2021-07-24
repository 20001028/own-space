Function.prototype.a=()=>alert(1);
Object.prototype.b=()=>alert(2);

function A(){}

var a=new A();
console.log(a)

//a.a();
//a.b();
// a.__proto__===A.prototype===
console.log(a.__proto__===A.prototype)// true
console.log(A.prototype.__proto__===Object.prototype)// true

console.log(a instanceof A); // true
console.log(a instanceof Function);// false
console.log(a instanceof Object);// true