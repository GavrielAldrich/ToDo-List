import express from "express"
import bodyParser from "body-parser";
const app = express()
const port = 3000;
let listArrayToday = [];
let listArrayWork = [];
app.use(express.static("views/styles"))


app.use(bodyParser.urlencoded({ extended: false }))

function getCurrentDateData() {
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date();
    const day = days[d.getDay()];
    const month = months[d.getMonth()];
    const thisYear = d.getFullYear();
    const dayNum = d.getDate();

    return {
        currentDate: day + ", " + dayNum + " " + month + " " + thisYear,
        currentYear: thisYear,
    };
}


// "/" area
app.get("/", (req, res) =>{
    const dateData = getCurrentDateData();
    const toDoListArray = {
        myItems : listArrayToday,
    }
    const data = { ...toDoListArray, ...dateData}; 
    res.render("today.ejs", data);
})
app.post("/", (req, res) => {
    if (listArrayToday.length === 20){
        listArrayToday.shift();
        listArrayToday.push(req.body.lists);
        console.log("listArray length is at 20");
    }else{
        listArrayToday.push(req.body.lists);
    }
    res.redirect("/");
});


// "/work" area
app.get("/work", (req, res) =>{
    const dateData = getCurrentDateData();
    const toDoListArray = {
        myItems : listArrayWork,
    }
    const data = { ...toDoListArray, ...dateData}; 
    res.render("work.ejs", data);
})
app.post("/work", (req, res) => {
    if(listArrayWork.length === 20){
        listArrayWork.shift();
        listArrayWork.push(req.body.lists);
        console.log("listArray length is at 20");
    }else{
        listArrayWork.push(req.body.lists);
    }
    res.redirect("/work");
})




// Port Checker
app.listen(port, () =>{
    console.log(`Listening to port ${port}`)
})