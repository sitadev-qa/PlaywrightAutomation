//Looping Statements
//1. For Loop
//2. While Loop
//3. Do-While Loop
//4. For-In Loop
//5. for-Of Loop
//6. ForEach Loop
//7. Nested Loop

//1. For Loop
//Syntax
// for(initialization; condition; increment/decrement) {
//     //Code to be executed
// }


// for(let i=1; i<=5; i++) {
//     console.log(i)
// }


// for(let j = 1; j<=10; j++){

    
//     if(i===5)
//     {
//         break
//     }
// }


// for(let k=10;k<100;k++)
// {
//     for(let l=1;l<10;l++)
//     {
//         console.log(k + " " + l)
//         for(let z = 0; z<10; z++)
//         {
//             console.log(k + " " + l + " " + z)
//         }
//     }
// }


// Matrices
// Row and Column

// 89 * 9 * 10

//      1
//     1 1
//    1 1 1
//   1 1 1 1
//  1 1 1 1 1
// Make a christmas Tree
for(let i=1; i<=5; i++)
{
    let str = ""  // String value is blank here
    for(let j=1; j<=i; j++)
    {
        str += "* " 
    }
    console.log(str)
}

//row count = 10

let rowCount = 10

for(let i=1; i<=rowCount; i++)
{
    let str = ""  // String value is blank here
    //space
    for(let j=1; j<=rowCount-i; j++)
    {
        str += " " //str will be updated with 9 spaces // str = str + " "
    }
    //stars
    for(let k=1; k<=2*i-1; k++)
    {
        str += "5" //str will be update with 9 spaces then *
    }
    console.log(str)
}

/*
1
2 3
4 5 6
7 8 9 10
11 12 13 14 15
*/

let str = "29304890384jDJSOIJDS%^&*(*&^%^&*(";
// Output as - expStr = "%^&*(*&^%^&*(" 
let expStr = ""
for(let i=0; i<str.length; i++)
{
    let char = str.charAt(i)
    if(char >= '0' && char <= '9' || char >= 'A' && char <= 'Z' || char >= 'a' && char <= 'z')
    {
        continue
    }
    else
    {
        expStr += char
    }   
}
console.log(expStr)

// While Loop
//Syntax
// while(condition) {
//     //Code to be executed
// }

let demowhile = 10
while(demowhile <= 20)
{
    console.log(demowhile)
    demowhile++;
}

//Do While Loop
//Syntax
// do {
//     //Code to be executed
// } while(condition)

do {
console.log(" I am in DO Condition")
}while(false)