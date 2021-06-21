import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { Router } from "express";
const router = Router();
const schema = buildSchema(`
  type Query {
    hello: String
    persons(name: String, age: Int): [Person]
  }

  type Person {
    name: String
    age: Int
  }
`);
const root = {
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
router.use(
  "/",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

export = router;
