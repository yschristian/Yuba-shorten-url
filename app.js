const express =  require('express');
const connectDB =require('./config/db');
const app =  express();

      //db connection
connectDB();
app.use(express.json({extended:true}));

//router
app.use('/',require('./routes/index'));
app.use('api/url',require('./routes/index'));

const PORT=5000;
app.listen(PORT,()=> console.log(`server running on port ${PORT}`));
