// const express = require('express')
import knexLib from 'knex'
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const { options } = require("./options/mysql.js.js")
const knex = require("knex")(options)

const sql = new ClienteSql(options)

// const app = express();
const routerProductos = express.Router()
// const httpServer = new HttpServer(app);
// const io = new IOServer(httpServer);

const admin = true;

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

sql.crearTabla()
  .then('/api/productos/id?', () => {
    console.log("tabla creada")

    
    /* insertar articulos en la tabla   */
   
    const articulos = [
      { title: 'Sillon', id: 1, price: 1000, stock: 3, url:"https://res.cloudinary.com/dvyoczetf/image/upload/v1657296466/Productos/sillon_pgxsxe.jpg", timeStamp: {timestamp}, codigo: "0011"  },
      { title: 'Cuadro', id: 2, price: 200},
      { title: 'Cama', id: 3 , price: 50}
      
    ]
    return sql.insertarArticulos(articulos)
    const timestamp = Date.now()

    let Carrito = [{id: 10, timeStamp:{timestamp}, productos: {id , timestamp, title, codigo, url, stock}, }]
  })
  .then(() => {
    console.log("productos insertados")
    
    /*   listar tabla  */
    
    return sql.listarArticulos()
  })
  .then(productosID => {
    console.log("productos listado")
    console.table(productosID)
    
    /* borrar art con id  */
    
    return sql.borrarArticuloPorId(0)
  })
  .then(() => {
    console.log("producto borrado")
    
    /*   actualizar el stock   */
   
    return sql.actualizarStockPorId(0, 3)
  })
  .then(() => {
    console.log("stock actualizado")

   
    /*    resultado total    */
   
    return sql.listarArticulos()
  })
  .then(productosID => {
    console.log("resultado total")
    console.table(productosID)
  })
  .catch((err) => { console.log(err); throw err })
  .finally(() => {
    sql.close()
  })



  class ClienteSql {
    constructor(config) {
      this.knex = knexLib(config)
    }
  
    crearTabla() {
      return this.knex.schema.dropTableIfExists('productos')
        .finally(() => {
          return this.knex.schema.createTable('productos', table => {
            table.increments('id').primary();
            table.string('title', 50).notNullable();
            table.string('codigo', 10).notNullable();
            table.float('price');
            table.integer('stock');
          })
        })
    }
  
    insertarArticulos(productosID) {
      return this.knex('productos').insert(productosID)
    }
  
    listarArticulos() {
      return this.knex('productos').select('*')
    }
  
    borrarArticuloPorId(id) {
      return this.knex.from('productos').where('id', id).del()
    }
  
    actualizarStockPorId(stock, id) {
      return this.knex.from('productos').where('id', id).update({ stock: stock })
    }
  
    close() {
      this.knex.destroy();
    }
  }


  export default ClienteSql


  const PORT = 8080;
  const server = app.listen(PORT, () => {
  console.log(`Server running on port ${server.address().port}`);
  if(Object.server === -2) {
      console.log("Ruta y metodo no implementada");
  }
 })

















// const productosID = [{id: 1, title: Sillon, price: 1000, stock: 3, url:"https://res.cloudinary.com/dvyoczetf/image/upload/v1657296466/Productos/sillon_pgxsxe.jpg", timeStamp: {timestamp}, codigo: "0011" }, 
// {id: 2, title: "Cuadro", price: 200}, 
// {id: 3, title:"Cama", price: 50}
// ]
// return sql.insertarArticulos(productosID)


// const timestamp = Date.now()

// let Carrito = [{id: 10, timeStamp:{timestamp}, productos: {id , timestamp, title, codigo, url, stock}, }]

// //listar productos
// routerProductos.get('api/productos', (req, res) => {
//    if(Object.entries(req.query).length > 0) {
//         res.json ({
//             result: 'obtuve un nuevo producto',
//             query: req.query
//          })
//     }
//     else{
//         return(error)
//          res.json({
//             result: 'no obtuve un producto'
            
//         })
//      }
// })
// routerProductos.get('/api/productos/id?', (req,res)=> {
//     res.json({productos: productos})
//     res.render('formulario', {productosID});

// })
// routerProductos.get('productos/api/productos');

// routerProductos.get('api/productos', (req, res) => {
//     if(Object.entries(req.query).length > 0) {
//          res.json ({
//              result: 'obtuve un nuevo producto',
//              query: req.query
//           })
//      }
//      else{
//          return(error)
//           res.json({
//              result: 'no obtuve un producto'
             
//          })
//       }
//  })

// // incorporar productos
// routerProductos.post('/api/productos/', (req,res)=> {
//     personas.push(req.body)
//         console.log(productosID)
//         res.redirect('/')

//         let producto = req.body;
//          console.log(producto);
//          productos.push(producto);
//          res.json({
//          result: 'obtuve un producto nuevo',
//          producto: producto

    
//     })
// })

// //actualiza producto
// routerProductos.put('/api/productos/:id', (req,res)=> {
//     res.render( {productosID});
// })

// // borra producto
// routerProductos.delete("/api/producto/:id",(req,res)=> {
//     res.json({
//         result: 'producto eliminado',
//         id: req.params.id,
//     })
// })

// //CARRITO
// routerProductos.post('/api/carrito', (res,req) => {
//     res.render({productosID})
//     params.post(req.body)
// })

// routerProductos.delete('/api/carrito:id', (res,req) => {
//     // if (productosID === -1) return res.status(404).json({})
//     req.productos.removeItem(req.params.id, productosID(res))
//     res.json({
//         result: 'carrito eliminado',
//         id: req.params.id,
//     })
      
// })

// routerProductos.get('api/carrito/:id/productos', (req,res)=> {
//     if(Object.entries(req.query).length > 0) {
//         res.json ({
//             result: req.body
            
//          })
//     }
//     else{
//         return(error)
//          res.json({
//             result: 'no hay productos en el carrito'
            
//         })
//      }

// })

// routerProductos.delete('/api/carrito/:id/productos/:id_prod', (req,res)=> {
//     Product.remove({_id: req.params.id},function(err,producto) {
//         console.log("Deleting Product " + req.params.id);
//         res.json(producto);
// })
// })

// const mensajes = [
//     { author: "Juan", text: "Hola ¿como andas" },
//     { author: "Pedro", text: "Muy bien ¿vos?" },
//     { author: "Ana", text: "Genial" }
//   ];
  
//   io.on("connection", (socket) => {
//     console.log("Nuevo cliente conectado");
  
   
//     socket.emit("mensajes", mensajes);
  
//     socket.on('nuevoMensaje', mensaje =>{
//       mensajes.push(mensaje);
//       io.sockets.emit('mensajes', mensajes);
//     })
    
//   });




 

