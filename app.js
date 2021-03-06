const express = require("express");
const bodyParser = require("body-parser");
const graphQlHttp = require("express-graphql");
const mongoose = require("mongoose");
const graphQlSchema = require("./graphql/schema");
const graphQlResolver = require("./graphql/resolver");
const isAuth = require('./middleware/is-auth');

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if(req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(isAuth);

app.use(
  "/graphql",
  graphQlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolver,
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-62tbx.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(8000);
  })
  .catch(err => {
    console.log(err);
  });

/*
mutation {
  createEvent(eventInput: {
    description: "Study React",
    price: 34.44
    title: "Technical"
    date: "2019-06-27T03:39:48.820Z"
  }) {
    _id
    description
  }
}
query{
  events {
    description
    creator {
      password
      email
      createdEvents{
      	description
      }
    }
  }
}
*/
