class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }
  
  get getFullName(){
    return console.log(this.nombre,' ',this.apellido)
  }
  
  addMascota(name){
    this.mascotas.push(name)
  }
  
  countMascotas(){
    return this.mascotas.length;
  }
  
  addBook(name, author){
    this.libros.push({
      nombre: name,
      autor: author
    })
  }
  
  get getBookNames(){
    let nlibros=[];
    for(const elem of this.libros){
      nlibros.push(elem.nombre)
    }
    return console.log(nlibros)
  }
}

const usuario = new Usuario('Pepito','Vargas',[], ['Perro']);
usuario.getFullName
usuario.addMascota('Gata')
usuario.addMascota('Zorro')
usuario.countMascotas()
usuario.addBook('El señor de las mascotas','William Golding')
usuario.addBook('Fundacion','Isaac Asimov')
usuario.getBookNames
console.log(usuario)