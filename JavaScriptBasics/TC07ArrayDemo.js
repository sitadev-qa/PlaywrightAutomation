let arrayDemo = [100, 200, 300, 400, 500];


// arrayDemo[0]
// arrayDemo[1]
// arrayDemo[2]
// arrayDemo[3]
// arrayDemo[4]

let arrayDemo1 = ["I am new to JS", "I am new to JAVA", "I am new to Playwright"];
let arrayDemo2 = [1, "I am new to JS", true, 3.14]
let browserList = ["chrome", "firefox", "edge", "safari"]
let oslist = ["windows", "mac", "linux", "android", "ios"]
let envlist = new Array("Staging", "QA", "Dev")

envlist.push("Prod") // Adds "Prod" to the end of the envlist array
console.log(envlist)
envlist.pop() // Removes the last element from the envlist array
console.log(envlist)
envlist.shift() // Removes the first element from the envlist array
console.log(envlist)
envlist.unshift("Unshiftlist") // Adds "Unshiftlist" to the beginning of the envlist array
console.log(envlist)
envlist.unshift()
console.log(envlist)
console.log(envlist.length)
if(envlist.includes("QAa"))
{
    console.log("Environment is Present")
}
else
{
    console.log("Environment is not Present")
}

browserList.forEach(function(bro){
    console.log(bro)
})

browserList.forEach((brows) => {
    console.log(brows)
})

for(let bro of browserList)
{
    console.log(bro)
}

for(let number in arrayDemo)
{
    console.log(arrayDemo[number]) // Output will be the values of the arrayDemo
}
//Array for key value pair
let empDetails = {
    name: "John Doe",
    age: 30,
    department: "IT",
    salary: 50000
}

console.log(empDetails.name);
console.log(empDetails.age);
empDetails.empCode = "E123"
console.log(empDetails)
delete empDetails.salary
console.log(empDetails)

for(let demo in empDetails)
{
    console.log("Key is :" + demo + "   Value - " + empDetails[demo])
}
//JSON - 15 Data
let userCreds = [
    {username:"user1", password:"pass1", role:"admin"},
    {username:"user2"},
    {username:"user3", password:"pass3", role:"superadmin"}
]

userCreds.forEach((cred) => {
    if(cred.username === "user2")
    {
        console.log("Execute the test cases")
    }
    else
    {
        console.log("==== ERROR ====")
    }
})






