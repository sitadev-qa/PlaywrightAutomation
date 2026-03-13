const hello = "I am HELLO"
/*
RE-DECLARATION is NOT allowed
RE-ASSINMENT is NOT allowed
BLOCK SCOPE/FUNCTION SCOPE
*/
//Function in Javascripts
function demo() {
    console.log(hello)
    // let hello = "I am HELLO"
    // console.log(hello)
}
demo()

//DIFFERENT WAY TO CREATE FUNCTION IN JAVASCRIPT
let demo2 = function() {
    console.log(hello)
    // let hello = "I am HELLO"
    // console.log(hello)
} 
demo2() 

//3RD WAY TO CREATE FUNCTION IN JAVASCRIPT
let demo3 = () => {
    console.log(hello)
    // let hello = "I am HELLO"
    // console.log(hello)
}
demo3()



function getAreaOfRectangle1() //FUNCTION DECLARATION
{
    let l = 5
    let b = 10
    let area = l * b
    console.log(area);
    let perimeter = 2*(l+b)
    console.log(perimeter);
}
getAreaOfRectangle1() //FUNCTION CALLING

function getAreaOfRectangle(l,b) //FUNCTION DECLARATION
{
    let area = l * b
    console.log(area);
    
}
getAreaOfRectangle(5,10)//FUNCTION CALLING  

