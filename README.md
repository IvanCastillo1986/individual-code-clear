# Project Code Clear: An app dedicated to progressing people to become better coders.

## Running the application
Link to the application https://pursuit-capstone-frontend.netlify.app/

- Go to the website
- Import/paste the code that needs to be analyzed
- Press the Submit button


## Description

Code Clear is an unique app that supports the user's growth as a coder by giving a detailed report of their bad coding habits. When code is imported and submitted, the code will be analyzed for code quailty and errors. The user will be displayed a list of errors, so that the user can correct them. Through continuous submissions of code, the app will be able to track the user's progress over time though an annual code quality chart, an linter error/warning breakdown chart, and an linter error/warning frequency chart. By doing this, the user is able to determine which types of errors occur frequently and focus on fixing those errors.

![Use](https://media.giphy.com/media/vt7FEIIDOcyeOZtlbp/giphy.gif)

## Technical Description

The user will import code that will be passed to the back-end, where the code is analyzed through an ESlinter function. This function will use the inputted code to obtain the errors results that will be send back to the front-end. When the user is logged into an account, the user's data will be stored in the back-end to produce multiple report charts for the front-end. 

![Reports](https://media.giphy.com/media/ni4JjNQBUUsdWMVixH/giphy.gif)

## Features
- A screen splash to engage the user while the home page loads
- A light/dark mode to accommodate the eyes of the user
- A severity level indicator for each linter issue 
- A scroll down feature for the results section to create a more user friendly display.
- A feature which lets you click on a Linting Error in the Results component to highlight the exact location of the problem in the Code Editor
- A star rating system to help users determine the holistic quality of the user's code, as well as providing them with a score that evaluates their code level
- A fix button that will display a second Editor with a corrected version of the user's code
- Report graphs to display the frequency of the type of severity level the user gets
- Firebase account display that is able to create, login, recover, update, delete accounts

## Our mission 
This project was created by our team's burning desire to become better coders. Many members of our team struggled with sloppy code, which hinder our understanding and growth in a collaborative setting. Code Clear is designed to help users identify the types of coding mistakes that they make and fix them. We want the user to also keep not just fix their code but to fix their bad coding habit. By keeping track of their progress, the user can prevent repeating specific types of coding mistakes. By writing more consistant code, programmers become more desireable especially when looking for jobs in tech.

## Challenges 
Most of the challenges come from reading and understanding documentations for developing and customizing our Integrated Development Environment, setting up firebase and Eslint. Other challenges include getting the report charts to use data coming from the backend as opposed to mock data in the front end.

## Future improvements
We want our application to support other languages besides javascript. 

## Acknowledgements
- Special thanks to our technical mentors Nathan Lehrer and Scott Kaplan.
- Special thanks to our design mentors Daniela Shuffler.
- Special thanks to our Pursuit Mentors Myra Smith and Tristain Angieri.
- Special thanks to the Pursuit organization for the mentorship and guidance in completing this project. 



