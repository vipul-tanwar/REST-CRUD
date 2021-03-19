const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser")
const methodOverride = require("method-override");

const app = express()

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(methodOverride('_method'))

let comments = [
    {
        id:1,
        username: "Rahul",
        comment: "Hello my name is rahul"
    },
    {   
        id:2,
        username: "Hritik",
        comment: "Hello my name is hritik"
    },
    {
        id:3,
        username: "Akshey",
        comment: "Hello my name is akshey"
    },
    {
        id:4,
        username: "Ajay",
        comment: "Hello my name is ajay"
    }
]



app.get("/", (req, res) => {
    res.render("home");
    
})

app.get("/comments", (req, res) => {
    res.render("comments",{ comments })
})
app.get("/comments/new", (req, res) => {
    res.render("newcomment")
})
app.post("/comments", (req, res) => {
    // const { username, comment } = req.body;
    const username = req.body.username;
    const comment = req.body.comment;
    const id = 5
    comments.push({id, username, comment});
    res.redirect("/comments");
})
app.get("/comments/:id", (req, res) => {
    //const {id} =  req.params;
    const id =  req.params.id;
    const comment = comments.find(comm => comm.id === parseInt(id));
    res.render("idcomment", {com: comment})
})
app.get("/comments/:id/edit", (req, res) => {
    const id =  req.params.id;
    const comment = comments.find(comm => comm.id === parseInt(id));
    res.render("editcomment", {com: comment})
})
app.patch("/comments/:id", (req, res) => {
    const id =  req.params.id;
    const newComment = req.body.comment;
    const comment = comments.find(comm => comm.id === parseInt(id));
    const foundComment  = comment;
    foundComment.comment = newComment;
    res.render("idcomment",{com: foundComment})
})
app.delete("/comments/:id", (req, res) => {
    const id  = req.params.id;
    console.log(id);
    comments = comments.filter((comm) => comm.id !== parseInt(id));
    res.redirect("/comments");
})


app.listen(3000, () => {
    console.log("Server is running at port 3000!");
})