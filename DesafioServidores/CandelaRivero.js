const express = require("express")
app = express()

const PORT = 8080
let counter = 0

const server = app.listen(PORT, ()=> {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error =>console.log(`Error en servidor ${error}`))

const { log } = require('console');
const fs = require('fs');
function leerTC() {
    fs.promises.readFile('/Backend/DesafioServidores?productos', 'utf-8')
    .then(contenido => {
        console.log(contendio);
    })
    .catch(err => {
        console.log("Error de lectura", err)
    })
}
leerTC()

async function leerAA() {
    try {
        const contendio = await fs.promises.readFile('/Backend/DesafioServidores?productos', 'utf-8')
        console.log(contenido)
    }
    catch(err) {
        console.log('Error de lectura', err);
    }
}
leerAA()

//rutas
app.get('/', (req, res) => {
    
    res.send({mensaje: "<h1>Bienvenidos al server express</h1>"})
})

app.get('/productos', (req, res) => {
    let productos = [
        {
            title: 'Licuadora',
            price: '$100',
            id: 1
       },
       {
        title: 'Tostadora',
        price: '$3000',
        id: 2
       },
      { title: 'Horno',
            price: '$500',
            id: 3
        }
        
    ]

    res.send("Productos:" + leerAA());
})

app.get('/productoRandom', (req, res) => {
    function getRandom(){
        return Math.random(productos);
    }
res.send({fyh: getRandom()});
})