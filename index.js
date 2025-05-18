const dotenv = require('dotenv')
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {sendNotifications}  =  require("./notifications");
const { getUserNotifications } = require('./notifications');
const PORT = process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());


app.listen(5000,()=>{
    console.log(`Server is running on port ${PORT}`)
})

app.post("/notifications",async(req,res)=>{
    try{
        const id = await sendNotifications(req.body);
        res.status(200).json({ success: true, message: 'Notification sent', id });

    }
    catch(e){
        res.status(500).json({error:e.message});
    }
})  

app.get('/users/:id/notifications', (req, res) => {
    const userId = req.params.id;
    const notifications = getUserNotifications(userId);
    res.json(notifications);
});