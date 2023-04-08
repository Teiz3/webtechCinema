// const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcrypt');

// function passportInit(passportModule){

// console.log("passportInit");

//     const authenticateUser = async (username, password, finished) => {
//         console.log("autenticateuser");
//         const user = getUserbyUsername(username);
//         if (user == null){
//             return finished(null, false, { message: "Invalid username"});
//         }

//         try{
//             if(await bcrypt.compare(password, user.password)){
//                 return finished(null, user);
//             }else{
//                 return finished(null, false, { message: "Passport incorrect"});
//             }
//         }catch(err){
//             return finished(err);
//         }
//     }

//     passportModule.use(new LocalStrategy({usernameField: 'username', passwordField: 'passport'}, authenticateUser));

//     passportModule.serializeUser((user, finished) => {})
//     passportModule.deserializeUser((id, finished) => {})
// }

// module.exports = {passportInit}