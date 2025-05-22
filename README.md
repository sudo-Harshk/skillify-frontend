# Skillify

Skillify is a web application designed for interactive learning through quizzes. Users can select subjects like Math, Physics, and Chemistry, choose specific chapters, and test their knowledge with dynamically generated multiple-choice questions. The application features a timer, tracks scores, and provides detailed explanations for each answer, making it an effective tool for study and self-assessment.


## Features

*   **Subject Selection:** Choose from available subjects (Math, Physics, Chemistry).
*   **Chapter Selection:** Narrow down learning to specific chapters within a subject.
*   **Dynamic Question Generation:** Questions are fetched from a backend service.
*   **Multiple-Choice Questions:** Engage with questions in a familiar MCQ format.
*   **Quiz Timer:** A 7-minute timer adds a time-bound challenge to quizzes.
*   **Score Tracking:** Monitors correct and incorrect answers.
*   **Final Report:** View a summary of performance after completing a quiz.
*   **Detailed Explanations:** Understand the reasoning behind answers with comprehensive explanations.
*   **Mathematical Formula Rendering:** Displays mathematical notations correctly using MathJax.
*   **Responsive Design:** Adapts to different screen sizes for accessibility.

## Tech Stack

*   **Frontend:**
    *   React
    *   TypeScript
    *   Tailwind CSS
*   **HTTP Client:** Axios
*   **Countdown Timer:** `@leenguyen/react-flip-clock-countdown`
*   **Math Rendering:** `better-react-mathjax`
*   **Deployment:** GitHub Pages

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js and npm: Make sure you have Node.js and npm installed. You can download them from [nodejs.org](https://nodejs.org/).

### Installation

1.  Clone the repo:
    ```sh
    git clone https://github.com/sudo-Harshk/skillify-frontend.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd skillify-frontend
    ```
3.  Install NPM packages:
    ```sh
    npm install
    ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes. You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.
Your app is ready to be deployed!
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**
If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

### `npm run predeploy`
This script runs automatically before `deploy`. It ensures the project is built before deployment.
```sh
npm run build
```

### `npm run deploy`
Deploys the application to GitHub Pages.
```sh
gh-pages -d build
```

## Backend

Skillify utilizes an external backend service to fetch subject chapters and generate quiz questions.

*   **Backend API Endpoint:** `https://skillify-backend.vercel.app`

This service is responsible for providing the educational content that powers the quizzes.


## Contributing

Contributions are welcome! If you have suggestions for improvements or want to fix a bug, please feel free to:

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

Please ensure your code follows the project's coding style and that tests are updated or added as appropriate.

