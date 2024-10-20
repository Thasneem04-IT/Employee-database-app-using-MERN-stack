

# Todo Application with MERN Stack and Excel Integration

## Overview

This project is a full-stack **Todo Application** built using the **MERN stack** (MongoDB, Express, React, Node.js) with an additional feature for bulk importing tasks from an **Excel** file. Users can create, edit, delete, and manage their todo items via a user-friendly interface. The app also supports bulk deletion of todos and file upload to populate tasks directly from an Excel sheet.

## Features

- **Add Todo**: Add new todo items with a title and description.
- **Edit Todo**: Edit existing todo items directly from the list.
- **Delete Todo**: Delete individual todo items.
- **Bulk Delete**: Select multiple todo items and delete them at once.
- **Excel File Upload**: Upload an Excel file to bulk import todo items.
- **CRUD Operations**: Perform create, read, update, and delete operations on the todo list.

## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Excel Handling**: XLSX.js (for parsing and uploading Excel data)

## Prerequisites

- Node.js
- MongoDB (running locally or in the cloud)
- NPM (Node Package Manager)
- A text editor (like VSCode)

## Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/todo-app.git
   cd todo-app
   ```

2. **Install dependencies for the backend**:
   ```bash
   cd server
   npm install
   ```

3. **Install dependencies for the frontend**:
   ```bash
   cd client
   npm install
   ```

4. **Run MongoDB**:
   Make sure MongoDB is running locally or configure a connection string for a cloud MongoDB instance in your backend configuration.

5. **Start the backend server**:
   ```bash
   cd server
   npm start
   ```
   This will run the backend server on `http://localhost:8000`.

6. **Start the frontend server**:
   ```bash
   cd client
   npm start
   ```
   This will run the frontend React application on `http://localhost:3000`.

## API Endpoints

| Method | Endpoint        | Description            |
|--------|-----------------|------------------------|
| GET    | `/todos`         | Fetch all todo items   |
| POST   | `/todos`         | Create a new todo item |
| PUT    | `/todos/:id`     | Update a todo item     |
| DELETE | `/todos/:id`     | Delete a todo item     |

## File Upload

- **Supported Formats**: `.xlsx`, `.xls`
- You can upload an Excel file containing todo items. The file should have two columns: `title` and `description`.
- The application will parse and import the todo items into the MongoDB database automatically.

## Usage

1. **Add Todo**: Enter a title and description, then click on **Submit** to add a new todo.
2. **Edit Todo**: Click on **Edit** next to an item, modify the fields, and click **Update** to save changes.
3. **Delete Todo**: Click on **Delete** next to an item to remove it.
4. **Bulk Delete**: Select multiple todos using checkboxes and click **Delete Selected** to remove them.
5. **Upload Excel**: Click on the file input, choose an Excel file with your todos, and then upload it by clicking on **Upload Items from Excel**.

