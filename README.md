# IBM Watson Assistant GraphQL Endpoint Server

This is a GraphQL endpoint server which integrates with IBM Watson Assistant API. Create, list, update, delete intent and send message functions are implemented in this GraphQL endpoint server.


## Getting Started

#### Live Version

<https://chongct-watson-assistant.herokuapp.com/>

#### How to Use

* Fork and clone this repository.
* Run `yarn install` to install dependencies.
* Run `tsc` at root of project directory to compile project.
* Run `node dist/index.js` to start project. GraphQL playground server can be accessed locally at http://localhost:4000.


## Query and Mutation Operations

#### CRUD operations for intents

Query operation is used to **list intents**. GraphQL query to list intents is shown below.

```
query {
  listIntents {
    intent
    description
  }
}
```

Mutation operations are used to **create, update and delete intent**. GraphQL mutations to create, update and delete intent are shown below.
* To create, intent and examples are required fields. Intent should not contain any space between words. Any space will be replaced with underscores.
* To update, intent is a required field.
* To delete, intent is a required field.
* The required fields are configured in `schema.graphql` with an exclamation mark.

```
mutation {
  createIntent(
    intent: "General_Speech"
    description: "Testing custom intent"
    examples: [
      {
        text: "Have you eaten?"
      }
    ]
  )
}
```
```
mutation {
  updateIntent(
    intent: "General_Speech"
    newDescription: "Testing new custom intent"
  ) {
    intent
    description
  }
}
```
```
mutation {
  deleteIntent(
    intent: "test"
  )
}
```

Mutation operation is also used to **send message**. GraphQL mutation to send message is shown below. Input string is a required field.
```
mutation {
  sendMessage(
    input: "Have you eaten?"
  ) {
    text
  }
}
```


## Development Log

#### 23 October
* Final checks

#### 22 October
* Heroku deployment
* Documentation

#### 21 October
* Update and delete intents function
* Send message function
* Start conversion to typescript

#### 20 October
* Set up of Node.js and GraphQL endpoint server
* Set up of IBM Watson Assistant API call
* Create and list intents function


## Built With

* Node.js
* GraphQL
* IBM Watson Assistant API
* Typescript


## Areas to Improve On
* Database to store response related to intents
* Database to store user authentication details
