/* const fs = require('fs') */
import { promises as fs } from "fs"

class productManager {

  static id = 0;
  constructor(){
    this.path = "./productos.txt",
    this.productos = []
  }

  async writeProductos(producto){
    await fs.writeFile(this.path, JSON.stringify(producto))
  }

  async readProductos(){
    let respuesta = await fs.readFile(this.path, "utf-8")
    return JSON.parse(respuesta)
    
  }

  // crea el producto y el archivo productos.txt
  async addProductos( titulo, descripcion, precio, imagen, codigo, stock ){
    productManager.id++;
    let newProduct = {
      titulo,
      descripcion,
      precio,
      imagen,
      codigo,
      stock,
      id: productManager.id
    }
    
    this.productos.push(newProduct)

    this.writeProductos(this.productos) 
  }

  // Toma todos los productos dentro del archivo productos.txt
  async getProductos(){
    let respuesta = await fs.readFile(this.path, "utf-8")
    let fsProductos = await JSON.parse(respuesta)
    return console.log(fsProductos)
  }

  // Toma los porductos que concidan con el ID
  async getProductosId(id) {
    let respuesta = await fs.readFile(this.path, "utf-8")
    let fsProductos = await JSON.parse(respuesta)
    let idProducto = fsProductos.find(elem => elem.id === id )
    return idProducto ? console.log(idProducto) : console.log("Producto no encontrado") 
  }
  // elimina los porductos que concidan con el ID
  async eliminarProductosId(id){
    let respuesta = await fs.readFile(this.path, "utf-8")
    let fsProductos = await JSON.parse(respuesta)
    let idProducto = await fsProductos.filter((elem) => elem.id != id )
    this.writeProductos(idProducto);
    console.log('Producto eliminado')
  }
  // Actualiza los porductos que concidan con el ID del objeto pasado como argumento
  async updateProductos(obejeto) {
    let respuesta = await fs.readFile(this.path, "utf-8")
    let fsProductos = await JSON.parse(respuesta)
    fsProductos[fsProductos.findIndex(elem => elem.id === obejeto.id)] = {...obejeto};
    this.writeProductos(fsProductos);
  }
}

let producto = new productManager();
producto.addProductos("Titulo1", "Descripcion", 12000, "imagen", "abc123", 5);
producto.addProductos("Titulo2", "Descripcion", 12000, "imagen", "abc123", 10);


producto.getProductos()
producto.getProductosId(2)  
producto.eliminarProductosId(1)
producto.updateProductos({
  titulo: 'Titulo2',
  descripcion: 'se modifico con el metodo updateProductos de la clase productManager',
  precio: 15000,
  imagen: 'imagen',
  codigo: 'abc658',
  stock: 10,
  id: 2
})


