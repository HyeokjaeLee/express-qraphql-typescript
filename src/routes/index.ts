import express from "express";
const exp = express(),
  router = express.Router();

router.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("tests");
  }
);

export = router;
