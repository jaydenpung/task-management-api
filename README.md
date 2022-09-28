# Task Management API

API endpoints for Task Management app. Currently hosted at <https://task-management-api-666.herokuapp.com/>

## About

This api endpoint is built with nest.js framework, connects to mysql database with TypeORM.

- To ensure the system will be performant even with huge volumes of tasks created, pagination is implemented to only show limited tasks per load.

- Due date and created at columns can be sorted by passing in parameters at list tasks endpoint like `?orderBy=-dueDate` where `-` indicates descending.

- Tasks can be searched based on name by passing in parameter at list tasks endpoint like `?name=seventeen`. Case insensitive wildcard search `like` will be performed. Additionally column `description` can be searched too.

## Setup

- Copy `.env.sample` to `.env` and fill in details
- Run `npm install`
- Run `npm run start`

## Documentation

- Postman documentation available at <https://documenter.getpostman.com/view/10698630/2s83YWnRMJ>

## TODO

- Implement Unit test
- Current query builder cannot support complex nested `where` conditions, need to look further in library for more customizeable solutions or switch to another ORM library
- Handle multiple search criteria, multiple sort columns
