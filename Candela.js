const { log } = require('console');
const fs = require('fs');
function leerTC() {
    fs.promises.readFile('/Backend/Tarea?productos', 'utf-8')
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
        const contendio = await fs.promises.readFile('/Backend/Tarea?productos', 'utf-8')
        console.log(contenido)
    }
    catch(err) {
        console.log('Error de lectura', err);
    }
}
leerAA()


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

const elementId = productos.getElementById(id)
console.log(elementId);

FormData.getAll('title')

elementId?.remove();

function deleteAll() {
    console.log("Eliminat todos");
}

function deleteHistory() {
    var deleting = productos.history.deleteAll();
    deleting.then(deleteAll);
}
deleteHistory();