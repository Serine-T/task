# React Dashboard Application
This dashboard application showcases advanced React features and best practices, including state management with Redux, routing with react-router, and fetching data from a mock API using json-server.

# Features
1. **Dashboard Layout**: A responsive layout with a sidebar and a main content area.
2. **Users Page**: Displays a list of users with infinite scrolling and detailed view on selection.
3. **Reports Page**: Lists reports with CRUD operations and filters by user.
4. **Analytics Page**: Shows visual data with charts displaying monthly report counts and a user breakdown.

# Prerequisites
Make sure you have node.js and npm installed on your machine. If not, download and install them from [Node.js official website](https://nodejs.org/en)

# Setup
1. Clone the repository:
git clone https://github.com/Serine-T/task.git
2. Change into the directory:
cd task
3. Install the dependencies:
npm install
4. Create a .env file and add the following:
REACT_APP_API_URL=http://localhost:5000
5. Start the mock API (ensure json-server is installed):
npm run start:mockapi

# Available Scripts
`npm start`
Run the app in development mode. Open http://localhost:3000 in your browser. The page will auto-reload upon saving changes. Lint errors will be displayed in the console.

`npm run start:mockapi`
Starts the mock API server for the app. Once running, the API will listen for requests on [http://localhost:5000](http://localhost:5000). This will serve mock data for development purposes without needing to connect to a live backend. Ensure this is running alongside your main app for full functionality during development.

`npm test`
Initiate the test runner in interactive watch mode. Refer to running tests for more details.

`npm run build`
Build the app for production in the build directory. The app will be optimized for the best performance with minified files.

`npm run eject`
If unsatisfied with the build tool/configuration choices, use this command to eject. Be cautious: this is irreversible! After ejecting, the project setup can be customized. This tool is recommended for advanced users only.

# Error Handling & Loading
This app has proper error handling for any API failures and will display a loading spinner while fetching data.

# Testing
Tests are written using jest and react-testing-library. Ensure to run tests to check for app integrity.

# Styling & Responsiveness
The design is made responsive using styled-components. Ensure to test the application on various screen sizes for the best experience.

# Further Information
Create React App documentation
React documentation