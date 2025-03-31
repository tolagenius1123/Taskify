# Taskify
## Senior React Developer Assessment

### Getting Started
Follow these steps to set up and run the application:

#### 1. Clone the Repository
Run the following command in your terminal:
```sh
git clone https://github.com/tolagenius1123/Taskify.git
```

#### 2. Open in a Code Editor
Use Visual Studio Code or any preferred code editor/IDE. Navigate to the project directory.

#### 3. Install Dependencies
Open the terminal inside the project folder and run:
```sh
npm i
```

#### 4. Start the Application
After installation, run the following command to start the app:
```sh
npm run dev
```

#### 5. Start the Server
Once the app opens in your browser, return to the code editor, open a new terminal, and run:
```sh
npm run server
```

#### 6. Login to the Application
Go back to the application and log in using any email. Use a random password with more than 6 characters.

### Technologies Used

- **Styling**: I used CSS Modules for styling, including components like the Sidebar and Modals, instead of downloading Material UI or ShadCN UI. This helps keep the React application lightweight.
- **State Management**: Redux was used to handle loading states and user login data instead of Context API because Redux provides a more structured way of handling state and dispatching actions.
- **API Calls**: The Axios library was used for making API calls.
- **Testing**: Vitest was used for testing since the React app was created using Vite, making it integrate well and work seamlessly.

### Running Tests
To run tests, open a new terminal and enter the command:
```sh
npx vitest
```

### Enjoy!



