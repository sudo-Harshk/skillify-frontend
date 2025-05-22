# Skillify Frontend

Skillify Frontend is a web application designed to help users test and enhance their knowledge in various subjects, including Math, Physics, and Chemistry. Users can select a subject, choose a specific chapter, and then generate a quiz to practice. The application fetches questions from a backend service and provides an interactive quiz experience.

## Features
- Subject selection (Math, Physics, Chemistry)
- Chapter selection within subjects
- Dynamic question generation
- Interactive quiz interface with a timer
- Display of correct/wrong answers
- Detailed explanations for each question
- Final quiz report
- Mathematical equation rendering using MathJax

## Technologies Used
- React
- TypeScript
- Tailwind CSS
- Axios (for API communication)
- Better React MathJax (for math rendering)
- React Flip Clock Countdown (for the timer)

## Available Scripts
In the project directory, you can run:

### `npm start`
Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes.

### `npm test`
Launches the test runner in the interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run deploy`
Deploys the application to GitHub Pages. This script typically runs after `npm run build` (often via a `predeploy` script in `package.json`).

## Backend
This frontend application relies on the Skillify backend service for fetching subject chapters and generating quiz questions. The backend is hosted at:
[https://skillify-backend.vercel.app](https://skillify-backend.vercel.app)

## Live Demo
You can try out the live application here:
[https://sudo-Harshk.github.io/skillify-frontend/](https://sudo-Harshk.github.io/skillify-frontend/)

## Contributing
Contributions are welcome! If you have suggestions for improvements or want to fix a bug, please feel free to:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature` or `bugfix/YourBugfix`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/YourFeature`).
6. Open a Pull Request.
