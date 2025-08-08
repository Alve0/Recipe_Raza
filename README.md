# Recipe_Raza

## Project Overview

Recipe_Raza is a user-friendly web application for food enthusiasts. It allows users to discover, manage, and share recipes. The platform provides a space for users to add their own culinary creations, explore recipes from a community of fellow cooks, and engage with content by liking their favorite dishes.

## Live Site

[https://recipe-raza.web.app/](https://recipe-raza.web.app/)

## Key Features

* **User Authentication**: Secure user registration and login are handled with Firebase. Users can sign up with an email and password, or use their Google account for quick access. Password validation is implemented to ensure strong credentials.
* **Recipe Management**: Authenticated users can create, view, update, and delete their own recipes. The "Add Recipe" page is a private route, ensuring only logged-in users can contribute.
* **Dynamic Content**: The homepage features a "Top Recipes" section that dynamically displays the six most-liked recipes, sorted and limited using MongoDB. This section is updated in real-time as users engage with the content.
* **Interactive Details**: The "Recipe Details" page is a private route that shows comprehensive information about a recipe. Users can like recipes, and a like counter dynamically updates on the page and in the database. Users cannot like their own recipes.
* **Responsive Design**: The website is fully responsive, providing an optimal viewing experience on various devices, including desktops, tablets, and mobile phones.
* **Theming**: The application includes a dark/light theme toggle, allowing users to customize their viewing experience.
* **Filtering and Search**: The "All Recipes" page includes a dropdown filter that allows users to find recipes by cuisine type.

## Technologies Used

### Frontend
* **React**: For building a dynamic and responsive user interface.
* **React Router Dom**: For handling client-side routing.
* **Firebase**: For user authentication.
* **Lottie React**: For adding engaging animations.
* **React Awesome Reveal**: For scroll-based animations.
* **React Tooltip**: For creating interactive tooltips.
* **Tailwind CSS**: For a utility-first styling approach.
* **Axios**: For making HTTP requests to the backend API.
* **React Toastify / SweetAlert2**: For displaying success, error, and information messages.

### Backend
* **Node.js**: The server-side runtime environment.
* **Express.js**: A minimalist web framework for handling API endpoints.
* **MongoDB**: A NoSQL database used to store all recipe and user data.
* **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
* **JSON Web Tokens (JWT)**: For securing private routes and user authorization.
* **CORS**: To enable cross-origin requests between the client and server.

### Other Tools
* **Vercel**: For server-side deployment.
* **Firebase Hosting**: For client-side deployment.
