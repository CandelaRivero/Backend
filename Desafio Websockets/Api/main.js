const socket = io.connect();

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

function addMessage(e) {
  const mensaje = {
    author: document.getElementById("email").value,
    date: document.getElementById("texto").value,
  };
  socket.emit("nuevoMensaje", mensaje);
  return false;
}