import express from "express";
export const app = express();

const port = process.env.PORT;
app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
})
