const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const path = require('path');
const cookieParser = require('cookie-parser');
const uploader = require('express-fileupload');
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors()
);


app.use(express.json());
app.use(cookieParser());
app.use(uploader());
app.use(express.static(path.join(__dirname, 'public')));



app.use("/api/users", require("./routes/userRouter"));
app.use("/api/posts", require("./routes/postsRouter"));





if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


mongoose.connect(process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }, () => {
        console.log('MongoDB connected successfuly');
    }
);



app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
});



