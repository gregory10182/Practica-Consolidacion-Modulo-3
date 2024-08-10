// Tabla Carrito
let tablaCarrito = document.getElementById("carritoBody");
let total = document.getElementById("total");

const calcularTotal = (productos) => {
  return productos.reduce((acc, producto) => acc + producto.precio * producto.unidades, 0)
}

const actualizarCarrito = (productos) => {
  tablaCarrito.innerHTML = ""
  productos.forEach((producto, i) => {
    let tr = document.createElement('tr');
    let th = document.createElement("th");
    let nombre = document.createElement('td');
    let precio = document.createElement('td');
    let unidades = document.createElement('td');
  
    th.scope = "row";
    th.innerText = i + 1;
    
    nombre.textContent = producto.getNombre();
    precio.textContent = producto.getPrecio();
    unidades.textContent = producto.getUnidades();

    tr.appendChild(th)
    tr.appendChild(nombre)
    tr.appendChild(precio)
    tr.appendChild(unidades)
    tablaCarrito.appendChild(tr)
  })

  total.innerText = calcularTotal(productos)
}

class Producto {
  nombre = "";
  precio = 0;
  unidades = 0;
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }

  getNombre(){
    return this.nombre
  }
  
  getPrecio(){
    return this.precio
  }

  getUnidades(){
    return this.unidades
  }

  setUnidades(unidades){
    this.unidades = unidades
  }
}


class Carrito {
  constructor() {
    this.productos = [];
  }

  addProducto(Producto, unidades){
    if(this.productos.includes(Producto)){
      alert("Producto ya existe en el carrito, si desea agregar mas unidades, modifique el producto en el carrito")
    }else{
      Producto.setUnidades(unidades);
      this.productos.push(Producto);
      actualizarCarrito(this.productos);
    }
  }

  modProducto(idProducto, unidades){
    this.productos[idProducto].unidades = unidades;
    actualizarCarrito(this.productos);

  }

  removeProducto(idProducto){
    this.productos.splice(idProducto, 1);
    actualizarCarrito(this.productos);
  }

  mostrarProductos(){
    return this.productos
  }

  existeProducto(idProducto){
    return this.productos[idProducto]
  }
}

//Productos Disponibles
let listaProductos = [];

let panTajado = new Producto("Pan Tajado", 2000);
listaProductos.push(panTajado);

let mortadelaJamonada = new Producto("Mortadela Jamonada", 3000);
listaProductos.push(mortadelaJamonada);

let quesoChanco = new Producto("Queso Chanco", 4000);
listaProductos.push(quesoChanco);

let nescafe = new Producto("Cafe Instantaneo Nescafe", 1000);
listaProductos.push(nescafe);

let azucar = new Producto("Azucar", 1000);
listaProductos.push(azucar);


//Tabla Lista de Productos
let tablaProductos = document.getElementById("productosBody");

listaProductos.forEach((producto, i) => {
  let tr = document.createElement('tr');
  let th = document.createElement('th')
  let nombre = document.createElement('td');
  let precio = document.createElement('td');
  
  th.scope = "row";
  th.innerText = i + 1;

  nombre.textContent = producto.getNombre();
  precio.textContent = producto.getPrecio();

  tr.appendChild(th)
  tr.appendChild(nombre)
  tr.appendChild(precio)

  tablaProductos.appendChild(tr)
})

//Inicializando un objeto de la clase Carrito
let elCarrito = new Carrito()


//Funcionalidad Botones
let btnAgregar = document.getElementById("agregar")
let btnModificar = document.getElementById("modificar")
let btnEliminar = document.getElementById("eliminar")

btnAgregar.addEventListener("click", () => {
  let productoExiste = false;
  do{
    let idProducto = +prompt("Ingrese el ID del producto que desea agregar")
    if(listaProductos[idProducto - 1]){
      let unidades = +prompt("Ingrese la cantidad de unidades")
      elCarrito.addProducto(listaProductos[idProducto - 1], unidades)
      productoExiste = true;
    }else{
      alert("Producto no existe")
    }
  }while(!productoExiste)
})

btnModificar.addEventListener("click", () => {
  let productoExiste = false;
  do{
    let idProducto = +prompt("Ingrese el ID del producto que desea agregar")
    if(elCarrito.existeProducto(idProducto - 1)){
      let unidades = +prompt("Ingrese la cantidad de unidades")
      elCarrito.modProducto(idProducto - 1, unidades)
      productoExiste = true;
    }else{
      alert("Producto no existe")
    }
  }while(!productoExiste)
});

btnEliminar.addEventListener("click", () => {
  let productoExiste = false;
  do{
    let idProducto = +prompt("Ingrese el ID del producto que desea eliminar")
    if(elCarrito.existeProducto(idProducto - 1)){
      elCarrito.removeProducto(idProducto - 1)
      productoExiste = true;
    }else{
      alert("Producto no existe")
    }
  }while(!productoExiste)
});