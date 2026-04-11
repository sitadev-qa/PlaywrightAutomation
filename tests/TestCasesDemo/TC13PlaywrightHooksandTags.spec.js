import {test, expect} from "@playwright/test"

// after
// before
// afterEach
// beforeEach
// beforeall
// afterall

// Base URL - https://opensource-demo.orangehrmlive.com/web/index.php/auth/login

test.beforeEach(async({page})=>{
    
    console.log('I am in before Each')
    //page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
})

test('Demo Test - 1', async({page})=>{

    console.log('Hello 1')


})


test('Demo Test - 2', async({page})=>{

    console.log('Hello 2')
    
})

test('Demo Test - 1 @smoke', async({page})=>{

    console.log('Hello 1 - I am in Smoke')


})


test('Demo Test - 2 @regression', async({page})=>{

    console.log('Hello 2 - I am in Regression')
    
})

test('Demo Test - 2 @regression @smoke', async({page})=>{

    console.log('Hello 2 - I am in Regression and smoke')
    
})

test.afterEach(async({page})=>{

    console.log('I am after Each')
    //Steps after you are completed with your test cases
})