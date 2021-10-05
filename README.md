# Project Code Clear: An app dedicated to progressing people to become better coders.

## Running the application
Link to the application https://pursuit-capstone-frontend.netlify.app/

- Go to the website
- Import/paste the code that needs to be analyzed
- Press the Submit button


## Description

Code Clear is an app that imports code that will analyzed for code quailty and errors. Through continuous submission of code, the app will be able to track the user's progress over time though an Annual code quality chart, an Linter error/warning breakdown chart, and an Linter error/warning frequency chart. By doing this, the user is able to determine which types of errors are frequently repeated and specfically focus on fixing those errors.

![Alt Text](https://media.giphy.com/media/vt7FEIIDOcyeOZtlbp/giphy.gif)

## Technical Description

The user will import code that will be passed to the back-end, where the code is ran through an ESlinter function. This function will use the inputted code to obtain the errors results that will be send back to the front-end. When the user is logged into an account, the user's data will be stored in the back-end and produce mulitple report chart data that will be sent to the front-end. 

![Alt Text](https://media.giphy.com/media/ni4JjNQBUUsdWMVixH/giphy.gif)

## Features
- Screen splash with setTimeout()
- A light/dark mode to accommodate the eyes of the user
- The severity level for each linter issue to indicate to the user how important it is to correct this issue. 
- A scroll down feature for the results section to create a more user friendly display.
- A feature which lets you click on a Linting Error in the Results component, which highlights the exact location of the problem in the Code Editor.
- A star rating system to help users determine the holistic quality of their code, as well as providing them with a score that evaluates their code level.
- A display button that will show up a second Editor with the code fixed.
- A histogram graph to display the frequency of the type of severity level the user gets.
- Firebase accounts able to create an account, login with google/github account, recover password with email, update feature, delete feature
- A report page that shows the stats from data collected from the user.

## Our mission 
This project was created by our team's burning desire to become better coders. Many membersof our team struggled with sloppy code, which hinder our understanding and growth in a collaborative setting. Code Clear is designed to help users identify the types of coding mistakes that they make and fix them. We want the user to also keep not just fix their code but to fix their bad coding habit. By keeping track of their progress, the user focus on the type of coding mistakes they need to work on. 

## Challenges 
Most of the challenges come from reading and understanding documentations for developing and customizing our Integrated Development Environment, setting out firebase and Eslint. Other challenges include getting the charts to use data coming from the backend as opposed to mock data in the front end.


## Acknowledgements
- Special thanks to the Pursuit organization for the mentorship and guidance in completing this project. 
- Special thanks to our technical mentors Nathan Lehrer and Scott Kaplan.
- Special thanks to our Pursuit Mentors Myra Smith and Tristain Angieri.



