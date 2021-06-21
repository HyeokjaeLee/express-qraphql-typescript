import express from "express";
import indexRouter from "./routes/index";
const graphqlHTTP = require("express-graphql").graphqlHTTP;
var { buildSchema } = require("graphql");
const exp = express();
var schema = buildSchema(`
  type Query {
    hello: String
    persons(name: String, age: Int): [Person]
  }

  type Person {
    name: String
    age: Int
  }
`);

var root = {
  hello: () => "Hello world!",
  persons: (args: any, context: any, info: any) => {
    console.log(context);
    console.log(args);
    const { name, age } = args;

    return [
      { name: "kim", age: 20 },
      { name: "lee", age: 30 },
      { name: "park", age: 40 },
    ].filter((person) => {
      if (!name && !age) {
        return true;
      }
      if (!age && name && person.name === name) {
        return true;
      }
      if (!name && age && person.age === age) {
        return true;
      }
      if (name && age && person.name === name && person.age === age) {
        return true;
      }
      return false;
    });
  },
};
exp.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
exp.listen(8080, () => {
  console.log("Server listening on port 3000");
});

exp.use("/", indexRouter);
