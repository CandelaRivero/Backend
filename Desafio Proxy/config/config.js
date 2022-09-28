import dotenv from 'dotenv';

console.log(process.argv.slice(2))
const mode = process.argv.slice(2);
dotenv.config({
    path:mode==="PRODUCTION"?'./.env.production':'./.env.development'
});
export default {
    PORT: process.env.PORT||8080,
    MONGO_URL:process.env.MONGO_URL||'mongodb://127.0.0.1/test',
    MODE: process.env.MODE || "production",
    DEBUG:process.env.DEBUG || false,
    PAPA : process.env.PAPA || "Jamón",
    FONDO : process.env.FONDO || "negro"
}


process.on('exit',evt=>{
    console.log("Saliendo...")
    console.log(evt);
})
process.on('uncaughtException',evt=>{
    console.log("evt",typeof evt);
    console.log("Excepción no controlada");
})

process.on('/info', evt=>{
    console.log(process.cwd());
console.log(process.pid); 
console.log(process.title);
console.log(process.version);  //nodejs
throw new Error("Hola");
})