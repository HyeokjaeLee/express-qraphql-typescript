import express from "express";
import indexRouter from "./routes/index";
import graphqlRouter from "./routes/graphql";
const exp = express();

exp.listen(8080, () => {
  console.log("Server listening on port 8080");
});

exp.use("/", indexRouter);
exp.use("/graphql", graphqlRouter);
