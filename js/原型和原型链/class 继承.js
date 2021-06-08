class Parent{
    constructor(age){
        this.age = age;
    }
    getAge(){
        console.log(this.age);
    }
}
class Student extends Parent{
    constructor(age,name){
        super(age);// 调用父类的constructor
        this.name = name;
    }
    getName(){
        console.log(this.name);
    }
}
const student = new Student(18,'dabing');
student.getAge();
student.getName();