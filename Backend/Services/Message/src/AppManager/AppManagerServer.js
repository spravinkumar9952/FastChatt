import Express  from "express";
import cors from "cors"
import {getUsers} from "../DBManager/Users.js"

const app = Express();
app.use(cors());


app.get("/", (req, res) => {
    res.send("Hello");
});

app.post("/join", (req, res) => {
    res.status(200).send("USER_ADDED");
});

app.get("/active/users", (req, res) => {
    Promise.resolve(getUsers()).then((value) => {
        let list = value.rows;
        console.log("inside user",list);
        res.status(200).send(list);
    });
});


export default app;