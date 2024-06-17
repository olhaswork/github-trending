# GitHub Trending Repositories

This small project renders the list of last week trending repositories on the GitHub. You can start them and filter by programming language.

### **Demo link:** [Vercel Build](https://githubtrending.vercel.app/)

## Available Scripts to run

To start project locally, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload if you make edits.\

### `yarn format`

Runs Prettier to format all codes in the project directory. This helps in maintaining a consistent style across your codebase.

## Project structure

### Pure Components

- **RepoCard**: The `RepoCard` was made to act like a pure component. It receives all necessary data via props, such as `repo`, `isStarred`, and `onStarChange`etc., making it reusable.

### Utility Functions

- **LocalStorage**: Utility functions made to manage starred repositories using the localStorage.

### Hooks

- **useTrendingRepos**: A custom hook made to encapsulate the fetching logic for GitHub trending repositories.

### Responsive Design

- Adjusted the layout to be responsive using MUI Grid system, ensuring that the application is accessible and usable across various devices.

### Language Filtering Feature

- Added an option to filter repositories based on the programming language.

### Functionality Details

- **Star/UnStar Functionality**: Users can star or unStar repositories.
- **Navigation**: Clicking on a repository card opens the GitHub page for that repository in a new tab, allowing users to quickly access more details.
