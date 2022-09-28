// const socket = io.connect();

import ClienteSql from './sql.js.js.js'
import { options } from './DB/mariaDB.js.js.js'
import {normalize, schema, denormalize} from ' normalizr';


const sql = new ClienteSql(options)


function makeHTML(mensajes) {
    const date = new Date()
  return mensajes
    .map((elem, index) => {
      return `<div>
            <strong style="color: blue;">${elem.author}</strong>:
            <em style="color:brown;" >${elem.date}</em> </div>`;
    })
    .join(" ");
}

function render(data) {
  const html = makeHTML(data);
  document.getElementById("mensajes").innerHTML = html;
}

socket.on("mensajes", (mensajes) => {
  render(mensajes);
});


  const mensaje = {
    author: {
      id: 'mail del ususario',
      nombre: 'nombre del ususario',
      apellido: 'apellido del usuario',
      edad: 'edad del ususario',
      alias: 'url del usuario'
    }, 
  text: 'mensaje del ususario',
  }
  


const authorSchema = new schema.Entity('author',{idAttribute: 'email'});
const commentSchema = new schema.Entity('comments', {
  author: authorSchema,
  comments: [commentSchema]
})
const normalizeObject = normalize(mensaje, commentSchema, authorSchema);
console.log(JSON.stringify(normalizeObject,null,'\t'));














// function addMessage(e) {
//   const mensaje = {
//     author: document.getElementById("email").value,
//     date: document.getElementById("texto").value,
//   };
//   socket.emit("nuevoMensaje", mensaje);
//   return false;
// }