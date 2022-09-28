import ContenedorArchivo from "../src/contenedores/ContenedorArchivo"

class ProductosDaoArchivos extends ContenedorArchivo {

    constructor() {
        super('./ProductosDao.js')
    }

    async desconectar() {

    }
}

export default ProductosDaoArchivo

