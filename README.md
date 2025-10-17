# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

<!--  my exzmplae -->

import React from 'react';
import PropTypes from 'prop-types';

const ErrorPage = ({ code = 500, message = "Something went wrong.", description, onBack }) => {
const defaultDescriptions = {
404: "The page you're looking for doesn't exist.",
500: "Internal server error. Please try again later.",
403: "You don't have permission to access this page.",
};

const handleBack = () => {
if (onBack) {
onBack();
} else {
window.history.back();
}
};

return (
<div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
<div className="text-center max-w-md">
<h1 className="text-7xl font-bold text-red-600">{code}</h1>
<h2 className="text-2xl font-semibold mt-4">{message}</h2>
<p className="mt-2 text-gray-600">
{description || defaultDescriptions[code] || "An unexpected error occurred."}
</p>
<button
          onClick={handleBack}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
Go Back
</button>
</div>
</div>
);
};

ErrorPage.propTypes = {
code: PropTypes.number,
message: PropTypes.string,
description: PropTypes.string,
onBack: PropTypes.func,
};

export default ErrorPage;

import ErrorPage from './components/ErrorPage';

function NotFound() {
return <ErrorPage code={404} message="Page Not Found" />;
}

function Forbidden() {
return <ErrorPage code={403} />;
}

function ServerError() {
return <ErrorPage code={500} description="We're working to fix this issue as soon as possible." />;
}

<!-- <img
  src="small.jpg"
  srcset="small.jpg 500w, medium.jpg 1000w, large.jpg 1500w"
  sizes="(max-width: 600px) 500px, 1000px"
  alt="Description"
/> -->


