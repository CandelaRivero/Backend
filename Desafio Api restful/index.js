const express = require('express')

const app = express();
const routerProductos = express.Router()

app.use('/productos', routerProductos)

routerProductos.use(express.json())

app.use(express.json())

app.use(express.static('public'))



app.get ('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
}
) 

let productosID = [{id: 1, title: "Sillon", price: 1000}, {id: 2, title: "Cuadro", price: 200}, {id: 3, title:"Cama", price: 50}];

routerProductos.get('/api/productos', (req,res)=> {
    res.json({productos: productos})
})

routerProductos.put("/api/producto/:id",(req,res)=> {
    let productoID = parseInt(req.params.id);
    let producto = req.body;
    let productoEncontrado = productosID.find(producto => producto.id === productoID);
    
    productoEncontrado.title = producto.title;
    productoEncontrado.price = producto.price;

    res.json({producto: productoEncontrado})

})

routerProductos.post('/api/productos', (req,res)=> {
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
        result: 'oproducto eliminado',
        id: req.params.id,
    })
})


    const PORT = 8080;
    const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
   })

    

