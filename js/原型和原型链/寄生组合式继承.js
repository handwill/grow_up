function object(){
    function F(){}
    f.prototype = o;
    return new F()
}
function prototype(child,parent){
    let prototype = object(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}
function Parent(){}
function Child(){
   Parent.call(this);
}
// 间接指向 Parent 的 prototype
prototype(Child, Parent);