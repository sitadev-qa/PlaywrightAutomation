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