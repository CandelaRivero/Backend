import passport from "passport";
import local from 'passport-local';
import usersService from './contenedores/Users.js';
import { createHash, isValidPassword } from "../utils/utils.js";


const LocalStrategy = local.Strategy; //local = username + password

const initializePassport = () => {

    passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, email, password, done) => {
        try {
            const { name } = req.body;
            if (!name || !email || !password) return done(null, false);
            let exists = await usersService.findOne({ email: email });
            if (exists) return done(null, false);
            let result = await usersService.create({
                name,
                email,
                password: createHash(password)
            })
            //SI TODO SALE BIEN
            return done(null, result)
        }
        catch (error) {
            return done(error);
        }
    }))

    passport.use('login',new LocalStrategy({usernameField:"email"},async(email,password,done)=>{
        try{
            if(!email||!password) return done(null,false);
            let user = await usersService.findOne({email:email});
            if(!user) return done(null,false);
            if(!isValidPassword(user,password)) return done(null,false);
            return done(null,user)
        }catch(error){
            console.log(error);
            return done(error);
        }
    }))

    passport.use('github', new GithubStrategy({
        clientID:'Iv1.87d0ff839caf04f8',
        clientSecret:'',
        callbackURL:''
    },async(accesToken,refreshToken,profile,done)=>{
        try{
            let user = await usersService.findOne({email:profile._json.email})
            if(!user){
                let newUser = {
                    name:profile._json.name,
                    email:profile._json.email,
                    password:''
                }
                let result = await usersService.create(newUser);
                return done(null,result);
            }
            else{
                return done(null,user);
            }
        }catch(error){
            console.log(error);
            done(error);
        }
    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })
    passport.deserializeUser(async(id,done)=>{
        let result = await usersService.findOne({_id:id})
        return done(null,result);
    })
}

export default initializePassport;