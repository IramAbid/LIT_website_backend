import express from 'express';
import login from './login.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON data
app.use(express.json());

// Login endpoint
app.post('/login', login);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// import express from 'express';
// import bcrypt from "bcrypt";
// import session from "express-session";
// import flash from "express-flash";
// import loginRouter from './login.js';
// const app = express();

// const PORT= process.env.PORT || 4000;



// app.use(express.urlencoded({extended: false}));


// app.use('/api', loginRouter);

// app.get('/',(req,res)=>{
//   res.render("index");
// });

// app.get('/users/login', checkAuthenticated, (req,res)=>{
//   res.render("login");
// });

// app.get('/users/dashboard', checkNotAuthenticated, (req,res)=>{
//   res.render("dashboard", {user : req.user.name});
// });

// app.get('/users/logout',(req,res)=>{
//   req.logOut(function(err){
//     if(err){
//       return checkNotAuthenticated(err);
//     }
//     req.flash("success_msg", "You are logged out");
//     res.redirect("/users/login");
//   }); 
// });

// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }

//   res.redirect('/users/login');
// }

// function checkNotAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return res.redirect('/users/dashboard');
//   }

//   next();
// }
// app.listen(PORT,()=>{
//   console.log(`Server running on port ${PORT}`);
// });
