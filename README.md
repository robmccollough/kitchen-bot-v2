# kitchen-bot-v2
New and improved kitchen-bot back end featuring support for lateplates, bans, groupme-linked user accounts, kitchen requests, and more.
Author: Rob McCollough

## API Documentation

### Index 
The backend is running on a Heroku free dynos at https://kitchen-b0t-server.herokuapp.com
Currently the index endpoint does not offer functionality and will return a 404 error.

### Public Endpoints

#### /login
- *POST*
  - Use to log in 
  - Parameters
    - email : String (**required**)
    - password : String (**required**)
  - Response
    - Returns jwt token and user_id if successful, returns error if unsuccessful

#### /user
- *POST*
  - Use to create a new user
  - Parameters
    - email : String (**required**)
    - password : String (**required**)
  - Response 
    - Returns created_user object if successful, returns error if unsuccessful
- *user/check*
  - *POST*
    - Use to check if user exists
    - Parameters
      - email : String (**required**)
    - Response
      - Returns true or false if a user with that email exists in DB
### Private Endpoints *(Requires a valid jwt token to be sent in Authorization Header)* 
#### /user
- *GET*
  - Use to retrieve user data
  - Parameters
    - None
    - The user_id will be decoded from the jwt token
  - Response 
    - Returns user object if successful, returns error if unsuccessul
- *PUT*
  - Use to update the current user_data
  - Parameters
    - None
    - The user_id will be decoded from the jwt token
  - Response 
    - Returns created_user object if successful, returns error if unsuccessul
- *DELETE*
  - Use to delete the account of THE CURRENT USER
  - The user_id to delete is parsed from the jwt token, this should be used only for when a user is deleting their own account
  - Parameters
    - None
  - Response 
    - Returns deleted_user object if successful, returns error if unsuccessul
    
#### /menu
- *GET*
  - Use to retrieve most recent menu data
  - Parameters
    - None
  - Response 
    - Returns most recent menu object if successful, returns error if unsuccessul
- *POST*
  - Use to upload a menu 
  - Parameters
    - food : Object (**required**)
    - example food object 
```
  food: {
    monday: {
      main: {
        type: String,
        required: false
      },
      side:{
        type: String,
        required: false
      }
    },
    tuesday:{
      main: {
        type: String,
        required: false
      },
      side:{
        type: String,
        required: false
      }
    },
    wednesday: {
      main: {
        type: String,
        required: false
      },
      side:{
        type: String,
        required: false
      }
    },
    thursday: {
      main: {
        type: String,
        required: false
      },
      side:{
        type: String,
        required: false
      }
    },
    friday: {
      main: {
        type: String,
        required: false
      },
      side:{
        type: String,
        required: false
      }
    }
  }
```
  - Response 
    - Returns most recent menu object if successful, returns error if unsuccessul

- *PUT*
  - Use to update a specific menu 
  - Parameters
    - menu_id : String (**required**)
  - Response 
    - Returns menu object if successful, returns error if unsuccessul
- *DELETE*
  - Use to delete a menu 
  - Parameters
    - menu_id : String (**required**)
  - Response 
    - Returns menu object if successful, returns error if unsuccessul
- *menu/all*
  - Use to get more than one menu
  - Parameters 
    - limit : Number (**optional**) Defaults to 10
   - Response
    - Returns list of menus if successful
    
###/metric
- *GET*
  - Returns counts of all tracked metrics
    - menu
      - asks, total -> number of times someone has asked for the menu in the GroupMe, total number of menus
    - dinner
      - asks -> number of times someone asked for dinner
    - lateplate
      - asks, total -> number of lateplates asked for, number of lateplates completed
- *PUT*
  - Increments count of supplied metric by 1 
  - Parameters
    - metric : String (**required**)
    - stat: String
  - Response 
    - Success / Failure
    
    
###/request
- *GET*
  - Returns requests
  - Parameters
    - limit : Number (**optional**) Defaults to 10
  - Response 
    - Request Objects
- *POST*
  -Creates a request
  - Parameters
    - body : String (**required**)
    
    
###/lp
- *GET*
  - Returns lateplates from only the current day
  - Parameters
    - None
  - Response 
    - Lateplate Objects
- *POST*
  - Creates a lateplate
  - Parameters
    - recipient : String (**required**)
    - complete : Boolean (**optional**) Defaults to false
    - food : String (Used for lunch lateplates, optional)
  - Response
    - Success / False
- *PUT*
  - Used to mark lateplate as complete
  - Parameters
    - lp_id : String (**required**)
  - Response 
    - Success / False
    





  
