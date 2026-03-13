Playwright Automation Project – Team Workflow
Team Setup

A Playwright automation project is created with 3–4 QA team members.

Team Members:

QA A

QA B

QA C

QA D

Role of QA A (Automation Lead)

QA A has advanced knowledge of automation.

Step 1: Create Automation Project

Project Name:

PlaywrightAutomation
Step 2: Build Automation Framework

After 1 week, QA A prepares the complete automation framework.

Pushing Code to Git (SCM)

QA A pushes all local changes to Git Repository (SCM – Source Control Management).

Git Configuration
git config --global user.name "sitadev-qa"
git config --global user.email vikas@stockholmitacademy.org
Git Workflow
Check Local Changes
git status
Move Files to Staging
git add <filename>
Commit Changes
git commit -m "COMMIT MESSAGE"
Push Code to Repository
git push origin main

After this step, the complete automation code is available in the Git repository.

QA B Workflow
Step 1: Clone the Repository

QA B clones the Git repository to the local machine.

Step 2: Work on Test Cases

QA B works on 2 test cases.

Step 3: Create a Branch

Branch name based on JIRA ticket.

Example:

JIRA929
Step 4: Pull Request Process

Create Pull Request (PR)

Source Branch → JIRA929

Target Branch → main

Reviewer reviews the code

Reviewer adds review comments

QA B fixes review comments

QA B updates the PR

Code gets merged into main branch

QA C Workflow

Pull latest code from main branch

git pull origin main

Create a new branch

Start working on assigned tasks

Common Branch Names in Projects

master

main

develop

Git Platforms Used in Industry

Bitbucket

GitHub

GitLab

CircleCI

Azure Git

Assignment – 06 March 2026
1. Create a JavaScript function to print a random 5-digit number
2. Create a JavaScript function to print first 100 numbers
3. Create a JavaScript function to print random US format mobile number

Example format:

+1-XXX-XXX-XXXX
4. Create a JavaScript function to print first 20 Fibonacci numbers

Assignment - 13th March 2026
----------------------------

Number Pattern Problems

Write a JavaScript program to print numbers from 1 to 100, but:

Print "Fizz" if the number is divisible by 3

Print "Buzz" if divisible by 5

Print "FizzBuzz" if divisible by both.

Write a program to print all even numbers from 1 to 50 using a loop.

Write a program that prints numbers from 1 to N but skips numbers divisible by 4.

2. Sum and Average

Write a program to calculate the sum of numbers from 1 to N using a loop.

Write a program that calculates the average of numbers from 1 to 100.

Write a program that finds the sum of all even numbers between 1 and 100.

3. Conditional Logic with Loops

Write a program that checks whether a given number is prime or not.

Write a program that prints all prime numbers between 1 and 100.

Write a program to count how many numbers between 1 and 200 are divisible by 7.

4. Factorial and Mathematical Problems

Write a program to find the factorial of a given number using a loop.

Write a program to calculate the power of a number (base^exponent) using loops.

Write a program to generate the Fibonacci series up to N terms.

5. Digit-Based Problems

Write a program to count the number of digits in a given number.

Write a program to reverse a number using a loop.

Write a program to check whether a number is a palindrome or not.

6. Pattern Printing

Write a program to print the following pattern:

*
**
***
****
*****

Write a program to print the following pattern:

1
12
123
1234
12345

Write a program to print a reverse star pattern.

7. Array + Loop + Condition

Given an array of numbers, write a program to find the largest number using a loop.

Write a program to count how many numbers in an array are even and odd.

Write a program to find all numbers greater than 50 in an array.

8. Logical Practice

Write a program that prints numbers from 1 to 50, but replaces:

multiples of 2 with "Two"

multiples of 3 with "Three"

multiples of both with "TwoThree"

Write a program to check whether a number is an Armstrong number.

Write a program that counts how many vowels are present in a string using loops and conditions.