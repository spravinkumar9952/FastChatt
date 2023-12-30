import Express  from "express";
import cors from "cors"
import User from "../UsersManger/UserController.js";

const app = Express();
app.use(cors());


app.get("/", (req, res) => {
    res.send("Hello");
});

app.post("/join", (req, res) => {
    User.addUser(req.id, req.name);
    res.status(200).send("USER_ADDED");
})

export default app;