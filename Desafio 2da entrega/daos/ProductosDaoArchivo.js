import ContenedorArchivo from "../src/contenedores/ContenedorArchivo"

class ProductosDaoArchivos extends ContenedorArchivo {

    constructor() {
        super('./ProductosDao.ejs')
    }

    async desconectar() {

    }
}

export default ProductosDaoArchivo

