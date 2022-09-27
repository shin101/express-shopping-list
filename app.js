const express = require('express');
const app = express();
const itemsRoutes = require("./routes/items")
const ExpressError = require('./expressError')

app.use(express.json());
app.use("/items",itemsRoutes);

// error handling 
app.use((req,res,next)=>{
    return new ExpressError("Not Found", 404);
})

// general error
app.use((error,req,res,next)=>{
    res.status(error.status||500)
    return res.json(
        {
            error:error.message
        }
    )
});

module.exports = app;