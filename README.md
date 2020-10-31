# Uploader
This app is a simple SPA file uploader that provides a Three.js render across the background of the webpage depending on the uploaded file type.

## Table of Contents
- [Features](#features)
- [Structure](#structure)
- [Installation](#installation)

## Features
- Full CRUD operability
- Inputs are created with a name and are classified based on their file type
- If the file type is not known, it will be classified as "other"
- All data is persistant across the application

## Structure
### Database
The database of Uploader uses MySQL.
### Server
The server is written using Express.
### Front End
The front end is written using the Three.js framework of GraphQL.

## Installation
- Install required preset JS applications:
`$ npm install`
- Bundle the webpack for service to html file:
`$ npm run build`
- Start the local server:
`$ npm run server:start`
