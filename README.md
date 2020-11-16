# Uploader
This app is a single page application file uploader that is a data visualization tool providing a model of files found in a persistent MySQL database. Using the Three.js framework that expands upon GraphQL, a dynamic model organizes files into five categories represented by complex geometries that grow and rotate as files are uploaded and saved to the database.

## Table of Contents
- [Features](#features)
- [Structure](#structure)
- [Installation](#installation)

## Features
- CRUD operability
- Inputs are created with a name and are classified based on their file type
- If the file type is not known, it is classified as "other."
- All data is persistant across the application

## Structure
### Database
The database of Uploader uses MySQL.
### Server
The server is written using Express.
### Front End
The front end is written using the Three.js framework of GraphQL and React.

## Installation
- Install required preset JS applications:
`$ npm install`
- Bundle the webpack for service to html file:
`$ npm run build`
- Start the local server:
`$ npm run server:start`
- Open connection to MySQL:
`$ npm run sql:start`
