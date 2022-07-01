const express = require('express')
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");


const app = express();
const routerProductos = express.Router()
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use('/productos', routerProductos)

routerProductos.use(express.json())
app.use(express.json())

routerProductos.use(express.urlencoded({extended: true}))
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))
app.set('views', './views');



app.get ('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
}
) 

app.set('view engine', 'ejs');


let productosID = [{id: 1, title: "Sillon", price: 1000}, {id: 2, title: "Cuadro", price: 200}, {id: 3, title:"Cama", price: 50}];

routerProductos.get('/api/productos/views', (req,res)=> {
    res.json({productos: productos})
    res.render('formulario', {productosID});

})

routerProductos.get('productos/api/productos');




// routerProductos.put("/api/producto/:id",(req,res)=> {
//     let productoID = parseInt(req.params.id);
//     let producto = req.body;
//     let productoEncontrado = productosID.find(producto => producto.id === productoID);
    
//     productoEncontrado.title = producto.title;
//     productoEncontrado.price = producto.price;
//     productoEncontrado.id = producto.id;

//     res.json({producto: productoEncontrado})

// })

routerProductos.post('/api/productos', (req,res)=> {
    personas.push(req.body)
        console.log(productosID)
        res.redirect('/')

        let producto = req.body;
         console.log(producto);
         productos.push(producto);
         res.json({
         result: 'obtuve un producto nuevo',
         producto: producto

    
    })
})


routerProductos.get('api/productos', (req, res) => {
   if(Object.entries(req.query).length > 0) {
        res.json ({
            result: 'obtuve un nuevo producto',
            query: req.query
         })
    }
    else{
        retturn(error)
         res.json({
            result: 'no obtuve un producto'
            
        })
     }
})

routerProductos.delete("/api/producto/:id",(req,res)=> {
    res.json({
        result: 'producto eliminado',
        id: req.params.id,
    })
})

const mensajes = [
    { author: "Juan", text: "Hola ¿como andas" },
    { author: "Pedro", text: "Muy bien ¿vos?" },
    { author: "Ana", text: "Genial" }
  ];
  
  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");
  
   
    socket.emit("mensajes", mensajes);
  
    socket.on('nuevoMensaje', mensaje =>{
      mensajes.push(mensaje);
      io.sockets.emit('mensajes', mensajes);
    })
    
  });




    const PORT = 8080;
    const server = app.listen(PORT, () => {
    console.log(`Server running on port ${server.address().port}`);
   })

