//3. Comparison Operators
//TRUE or FALSE
/*
== - Equality Operator - Compares two values for equality, after converting both values to a common type (Type Coercion)
=== - Strict Equality Operator - Compares two values for equality, without performing type conversion (No Type Coercion)
!= - Inequality Operator - Compares two values for inequality, after converting both values to a common type (Type Coercion)    
=== - Strict Inequality Operator - Compares two values for inequality, without performing type conversion (No Type Coercion)
!= - Inequality Operator - Compares two values for inequality, after converting both values to a common type (Type Coercion)
!== - Strict Inequality Operator - Compares two values for inequality, without performing type conversion (No Type Coercion)
> - Greater Than Operator - Compares if the value on the left is greater than the value on the right
< - Less Than Operator - Compares if the value on the left is less than the value on the right
>= - Greater Than or Equal To Operator - Compares if the value on the left is greater than or equal to the value on the right
<= - Less Than or Equal To Operator - Compares if the value on the left is less than or equal to the value on the right
*/
let a = 10; //Number
let b = "10"; //String
let c = 10; //Number
console.log(a==b)  //TRUE
console.log(a===b) //FALSE
console.log(a===c) //TRUE
let phone = "981383890"
let phone1 = "981383890"
console.log(phone==phone1)  //TRUE
console.log(phone===phone1) //TRUE
let address = "Kathmandu"
let addressline1 = "1 Street View"
let addressline2 = 12
let finaladdress = address  + addressline1 + " " + addressline2
console.log(finaladdress) //Kathmandu1 Street View 12
if(finaladdress ==="Kathmandu1 Street View 12") {
    console.log("Address is correct")
} else {
    console.log("Address is incorrect")
}


// let add = 10
// let add1 = "10000"
// let add3 = 100
// let add2 = add  + add3 + add1
// console.log(add2)
let am = 100
let pm = 100
console.log(am > pm) //FALSE
console.log(am < pm) //FALSE
console.log(am >= pm) //TRUE
console.log(am <= pm) //TRUE
const age = 10
if(age >= 18) {
    console.log("You are eligible to vote")
} else {
    console.log("You are not eligible to vote")
}
//!=
console.log(am!=pm) //FALSE
console.log(am!==pm) //FALSE

let am1 = 100
let pm1 = 150
console.log(am1!=pm1) //FALSE - Type Coercion happens and both values are converted to a common type before comparison
console.log(am1!==pm1) //TRUE - No Type Coercion happens and both values are compared without conversion

if(am != pm) {
    console.log("AM and PM are not equal")
} else {
    console.log("AM and PM are equal")
}

let a1= 10
let b1 ="10"
if(a1===b1)
{
    console.log("This is true")
}

//Logical Operator
//AND (&&) - Returns true if both operands are true
//OR (||) - Returns true if at least one of the operands is true
//NOT (!) - Returns true if the operand is false, and false if the operand is true