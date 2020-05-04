### Overview

This is the GraphQL Server application for the web application at https://github.com/smiley168/elder-scroll-legends

#### PUBLIC API from Elder Scroll Legends

#### Endpoint: 

https://api.elderscrollslegends.io/v1/cards

##### Documentation: 

https://docs.elderscrollslegends.io/

https://docs.elderscrollslegends.io/#api_v1cards_list


### Getting Started 

#### Clone the repository

```git clone git@github.com:smiley168/elder-scroll-legends-gql.git```

#### Install the dependencies

```npm install```

#### Start the GraphQL server locally

1. ```npm run start```

1. Open http://localhost:4000 to view the GraphQL playground in the browser. 
    1. A GraphQL playground is similar to an API console where you can play around with the supported GraphQL API endpoints.
    1. You can click on the 'Doc' and 'Schema' tabs on the right hand side of the GraphQL playground to checkout the supported query and input types.

1. When you make changes to the code running in development mode, you need to restart the server to see your changes.
    1. `Ctrl+C` to exit
    1. ```npm run start```


#### Currently supported Queries

Return all the cards from the https://api.elderscrollslegends.io/v1/cards endpoint

```
    query {
        cards {
            name
            type
            setName
            text
            imageUrl
        } 
    }
```

Search by name

```
    query {
        cards(name: "alduin") {
            name
            type
            setName
            text
            imageUrl
        } 
    }
```

Set a limit of results per result page to support pagination

Example: request page 2 for 20 cards per page

```
    query {
        cards(pageSize: 20, pageNumber: 2) {
            name
            type
            setName
            text
            imageUrl
        } 
    }
```

```
    query {
        cards(name: "dragon", pageSize: 20, pageNumber: 1) {
            name
            type
            setName
            text
            imageUrl
        } 
    }
```


#### How to deploy to Heroku

1. Sign in / Sign up to Heroku
1. (for first time only) Choose the Github option to connect to the Github repository
1. After connecting Heroku to this Github repository, use the Heroku web UI to deploy the master branch of this repository.

### Deployed Demo in Heroku

https://elder-scroll-legends-gql.herokuapp.com/
