# File Uploader

## Overview

- Part of The Odin Project's Node Section
- This project is a file uploader app where user can create folders & upload files.
- It supports most of the file type.
- The app also have a download functionality for uploaded files.
- Data is stored in a PostgreSQL database and can be accessed or modified through the application.

## Tech Stack

- Node.js
- Express.js
- EJS
- Prisma
- PostgreSQL
- Tailwind
- Flowbite

## Packages

- Express validator
- Express Session
- Passport
- Bcryptjs
- Supabase
- Connect-flash
- File-type
- Method-override
- Sanitize-filename
- Superagent

## Routes

- `GET /`: Shows the dashboard page if authenticated, otherwise shows the login homepage
- `GET /signup`: Shows sign up form page.
- `POST /signup`: Registers a new user and redirects to the dashboard page upon success
- `POST /login`: Authenticates the user and redirects to the dashboard page if successful
- `GET /log-out`: Logs out the user and redirects to the login homepage
- `POST /upload`: Upload a file in the root directory
- `POST /folder/new`: Create a folder in the root directory
- `GET /folder/:userId/:folderId/:folderName`: Shows files in a folder when it's being clicked from the main dashboard
- `POST /folder/:userId/:folderId/:folderName`: Upload file in the folder
- `DELETE /folder/:userId/:folderId/:folderName`: Delete folder from the root directory
- `GET /download/:userId/:id`: Download uploaded file from supabase
- `DELETE /deleteFile/:id`: Delete file from any directory

## File structure

- `controllers/`: Handles different parts of the file uploader app
- `config/`: Configuration for express prisma session, multer & passport
- `prisma/`: Prisma schema, queries & migration files
- `routes/`: Manages all routes
- `views/`: EJS templates for rendering pages
- `app.js`: Main server file
- `utils/`: Utility function for the app
- `supabase/`: Supabase config & queries

## Deployment

- Hosted on Neon (db) & Koyeb (server)

## Contact

Created by [@nabelk](https://www.linkedin.com/in/nabil-khalid-36791a241/) - feel free to contact me!
