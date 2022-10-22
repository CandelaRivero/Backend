import express from 'express';
import pino from 'pino';

const PORT = parseInt(process.argv[2]) || 8080
const modoCluster = process.argv[3] == 'CLUSTER'

if (modoCluster && cluster.isPrimary) {
    const numCPUs = cpus().length
 
    console.log(`Número de procesadores: ${numCPUs}`)
    console.log(` MASTER ${process.pid}`)
 
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
 
    cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
        cluster.fork()
    })
 } else {
    const app = express()
 
    app.get('/', (req, res) => {
        const primes = []
        const max = Number(req.query.max) || 1000
        for (let i = 1; i <= max; i++) {
            if (isPrime(i)) primes.push(i)
        }
        res.json(primes)
    })
 
    app.listen(PORT, () => {
        console.log(`Servidor express escuchando en el puerto ${PORT}`)
        console.log(`PID WORKER ${process.pid}`)
    })
 }
 



const streams = [
    {level:'info',stream:process.stdout},
    {level:'error',stream:pino.destination('./pinoerrors.log')}
]

const logger = pino({},pino.multistream(streams))


app.get('/',(req,res)=>{
    req.logger.error("Hola");
    res.send("ok");
})

app.get('/suma/:num1/:num2',(req,res)=>{
    const {num1,num2} = req.params;
    if(!num1||!num2){
        req.logger.error('Insuficient params')
        return res.status(400).send('Insuficient params');
    }
    if(isNaN(num1)||isNaN(num2)){
        req.logger.error('Invalid types');
        return res.status(400).send('Invalid Types');
    }
    req.logger.verbose('Convirtiendo a number');
    let parsedNumber1 = parseInt(num1);
    let parsedNumber2 = parseInt(num2);
    req.logger.debug('Operando números');
    let result = parsedNumber1 + parsedNumber2;
    req.logger.info(`Operación realizada con resultado ${result}`)
    res.send(`El resultado es ${result}`)
 })

app.get('/',(req,res)=>{
    logger.error('error');
    logger.warn('warn');
    logger.info('info');
    logger.debug('debug');
    res.send("okey")
})
server.on("error", (error) => console.log(`Error en servidor: ${error}`));




app.get("/getUsers", (req, res) => {
    res.json({ users })
})
  
app.get("/newUser", (req, res) => {
    let username = req.query.username || "";
    const password = req.query.password || "";
  
    username = username.replace(/[!@#$%^&*]/g, "");
  
    if (!username || !password || users[username]) {
      return res.sendStatus(400);
    }

    if (!username || !password || !users[username]) {
        process.exit(1)
        // return res.sendStatus(400);
      }
      crypto.pbkdf2(password, users[username].salt, 10000, 512, 'sha512', (err, hash) => {
        if (users[username].hash.toString() === hash.toString()) {
          res.sendStatus(200);
        } else {
          process.exit(1)
          //res.sendStatus(401);
        }
  
    const salt = crypto.randomBytes(128).toString("base64");
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512");
  
    users[username] = { salt, hash };
  
    res.sendStatus(200);
  });

