# DevFinder

## basic initializations

- created a VITE + React Project
- created one git repo and pushed my code to main branch
- removed unneccesary code and made it clean for to start
- installed tailwind css using -- npm install tailwindcss @tailwindcss/vite
- installed daisyUI @ npm i -D daisyui@latest and changed the config files accordingly.
- installed react-router using @ npm i react-router-dom

## Day 2

- Building LoginPage
- installed axios @ npm i axios
- read more about the cors error and for now overcomed with cors middleware, npm package given and suggested by express.js
- installed cors npm package @ npm i cors and called it at root level file (app.js) in Backend code
- installed redux toolkit which is standardized and simplified way to write redux logic. Using npm install @reduxjs/toolkit react-redux
- designed the component to update dynamically using useSelector (from redux) and redirecting to feed page using useNavigate(from react-router-dom)
- made login button, when clicked it will take me to login page
- when logged in, login will turn to welcome with name message with profile

## Day 3 (12/03)

- you should not access other routes if you are not logged in!
- if token is not present, redirect the user to login page!
- logout feature and error handling
- when we logged out, redirecting back to home page, developed using navigate("/") hook.
- built user profile card which would be visible to others
- built user profile details updation
- toast message when updates are saved

## Day 4 (13/03)
