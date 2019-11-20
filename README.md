
For your consideration, my approach to your technical assignment :).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## The Challenge 

The challenge was to build a simple 'hangman' game
- Time Expected: 4 hours

- Real Time: 8 hours divided between different days

### Acceptance Criteria


- Chooses a random word out of 6 words: [3dhubs, marvin, print, filament, order, layer]
- Display the spaces for the letters of the word (eg: '_ _ _ _ _' for 'order')
- The user can choose a letter and if that letter exists in the chosen word it should be
shown on the puzzle (eg: asks for 'r' and now it shows '_ r _ _ r' for 'order')
- The user can only ask 5 letters that don't exist in the word and then it's game overIf the
user wins, congratulate the user and save their high score (you are free to define what is
a “high score”)

Additional requirements:
- Provide a simple API for clients to play the game
- Provide an interface for users to play the game


## Some things that I could improve/add in the future
- Extract my current poor mock fetching api to a real one (json server or firebase)
- Definitely I will add more unit tests (I know shame of me :'( )
- Refactor Game component, extracting some of the functionalities in custom hooks, is not the best to read
- Improve design and UX, so far there is no 'man hanging' himself :P


## Available Scripts

In the project directory, you can run:

### `npm install`

Install all the dependencies

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.