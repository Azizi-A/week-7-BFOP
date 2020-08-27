<p align="center">
  <a href="https://github.com/fac20/week-7-BFOP">Our repo link.</a>
  <a href="fun-facs-api.herokuapp.com">Our heroku link.</a>

  <h3 align="center">Fun FACs</h3>

  <p align="center">
    Week 7 REST API project
    <br />
    <a href="https://github.com/fac20/week-7-BFOP"><strong>Explore the docs »</strong></a>
    <br />
    ·
    <a href="https://github.com/fac20/week-7-BFOP/issues">Report Bug</a>
    ·
    <a href="https://github.com/fac20/week-7-BFOP/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Installation](#installation)
* [Usage Instructions](#usage)
* [Team](#team)
* [Acknowledgements](#acknowledgements)


## About The Project
This is a project created as part of the [Founders and Coders](https://www.foundersandcoders.com/) curriculum, week 7. The task was to build a REST API which returns JSON data. [The project requirements.](https://founders-and-coders.gitbook.io/coursebook/curriculum/rest-apis/project)

## User stories

- **As an API user, I want to**: get a list of all available resources
- **As an API user, I want to**: get all the information on a specific resource
- **As an API user, I want to**: create a new resource
- **As an API user, I want to**: update an existing resource
- **As an API user, I want to**: delete an existing resource
- **As an API user, I want to**: only be able to change an existing resource if I am authenticated to do so

Since this project is open-ended you'll need to write your own more specific user stories once you know what you want to build.

### Acceptance Criteria

- [x] An Express server that only returns JSON
- [x] A Postgres database to store the data
- [x] Endpoints for creating, reading, updating & deleting resources
- [x] Token-based authentication so only the owner of a resource can change it
- [x] Correct headers and response metadata
- [x] Error-handling to make it easy to use the API to build something
- [ ] Tests for server routes and database access (*server routes tests outstanding*)
- [x] Not process user input as SQL commands
- [x] Hidden environment variables (i.e. not on GitHub)

### Stretch criteria

- [x] GitHub Actions CI setup to run your tests when you push

## Getting Started

Our API is hosted on [Heroku](fun-facs-api.herokuapp.com/). Should you wish to get a local copy up and running, follow these simple steps in [Installation](#installation).

Here are some curls if you wish to test the Heroku version. 
- Get all cohort facts from the colection: 
curl --request GET \
  --url https://fun-facs-api.herokuapp.com/facts/
  
- Sign up to add your own facts
curl --request POST \
  --url https://fun-facs-api.herokuapp.com/signup \
  --header 'content-type: application/json' \
  --data '{
	"username": "YOU",
	"password": "PICK_ONE",
	"cohort": "FAC20"
}'
- Add a fact - you'll need your id and authorization token from the signin or login response
curl --request POST \
  --url https://fun-facs-api.herokuapp.com/facts/ \
  --header 'authorization: Bearer YOUR_TOKEN_HERE' \
  --header 'content-type: application/json' \
  --data '{	 
	"owner_id": YOUR_ID_NUMBER,
	"about_who": "COHORT_MEMBER",
  "text_content": "FACT"	
}'

- Edit your fact - you can only edit facts you've added
curl --request PUT \
  --url https://fun-facs-api.herokuapp.com/facts/FACT_ID_NUMBER \
  --header 'authorization: Bearer YOUR_TOKEN_HERE' \
  --header 'content-type: application/json' \
  --data '{
  "about_who": "NEW_COHORT_MEMBER",
  "text_content": "NEW_TEXT"
}'

- Delete your fact - you can only delete facts you've added
curl --request DELETE \
  --url https://fun-facs-api.herokuapp.com/facts/FACT_ID_NUMBER \
  --header 'authorization: Bearer YOUR_TOKEN_HERE'

### Installation

1. Clone the repo
```sh
git clone https://github.com/fac20/week-7-BFOP.git
```
2. Install NPM packages
```sh
npm install
```
3. Create a database and a test database
- `CREATE DATABASE test_bfop;`
- `CREATE DATABASE bfop;`
- `\connect bfop`
- `\include database/init.sql`
4. Create a .env file
- ensure this file is in your root folder
- it should contain 3 variables: 
  - DATABASE_URL=postgres://youruser:yourpassword@localhost:5432/bfop
  - TEST_DATABASE_URL=postgres://youruser:yourpassword@localhost:5432/test_bfop
  - SECRET=randomstring

## Usage Instructions

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.


## Team

Azizi - Scrum Facilitator
Lisa - Design
Terrence - Deployment
Aishah - Quality

## Acknowledgements

* All of our past workshops


