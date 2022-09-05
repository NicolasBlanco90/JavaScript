import { productos, copiaProductos } from './catalogo.js';


//HTML DE LOS PRODUCTOS DEL CATALAGO 

const productoCatalogoHTML = (producto) => {
    const texto = `
        <div class="col">
            <div class="card" style="width: 18rem;">
                <img src="${producto.imagen}"
                    class="card-img-top zoom" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">$ ${producto.precio}</p>
                        <button href="#" class="btn-1 btn-comprar">COMPRAR</button>
                        <button href="#" id="boton-catalogo-${producto.id}" class="btn-1 btn-comprar" data-bs-toggle="modal" data-bs-target="#exampleModal">Agregar al carrito </button>
                    </div>
            </div>
        </div>
        `;
    return texto;

};

// HTML DE LOS PRODUCTOS DEL CARRITO
const productoCarritoHTML = (producto) => {
    return `
    <div class = "row">
        <div>
            <img src="${producto.imagen}"
                style="width: 25%;" alt="...">
                <div class="card-body">
                    <h6 class="card-title">${producto.nombre}</h6>
                    <p class="card-text">$ ${producto.precio}</p>
                    <p class="card-text">Cantidad: ${producto.cantidad}</p>
                    <button href="#" id="boton-carrito-${producto.idCompra}" class="btn-1 btn-comprar">Quitar</button>
                </div>
        </div>
    </div>
    `;
};

//VARIABLES CARRITO DE COMPRAS
let contadorCarrito = 0;
const carrito = [];
let cantidadCarrito = 0;


// MOSTRAR HTML CATALOGO 
const mostrarCatalogo = () => {
    const catalogoNodo = document.getElementById("catalogo");
    let catalogoHTML = "";
    for (const producto of productos) {
        catalogoHTML += productoCatalogoHTML(producto);
    }
    catalogoNodo.innerHTML = catalogoHTML;
    botonesCatalogo();
};

// AGREGAR ELEMETOS DEL CATALAGO AL CARRITO Y AGREGARLOS A LOCAL STORAGE
// 
const botonesCatalogo = () => {
    for (const producto of productos) {
        const bontonId = `boton-catalogo-${producto.id}`;
        const botonNodo = document.getElementById(bontonId);

        botonNodo.addEventListener("click", () => {
            const productoCarrito = {
                imagen: producto.imagen,
                nombre: producto.nombre, 
                precio: producto.precio,
                idCompra: contadorCarrito,
                cantidad: cantidadCarrito,
            };
            contadorCarrito += 1;
            carrito.push(productoCarrito);
            carrito.forEach(object => {
                if (object.nombre == productoCarrito.nombre) {
                    object.cantidad++;
                    object.precio = productoCarrito.precio * object.cantidad;
                };
            });
            /*
             for (let i = 0; i < carrito.length; i++){
 
                 if(carrito[i].nombre == productoCarrito.nombre && carrito[i].precio < producto.precio)
                 carrito.splice(i,1)
             }
             console.log(carrito)
             */
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
        })
    }
};


//MOSTRAR ELEMENTOS SELECCIONADOS DEL CATALAGO EN EL CARRITO
const mostrarCarrito = () => {
    const carritoNodo = document.getElementById("carrito");
    const precioNodo = document.getElementById("precioTotal");
    let carritoHTML = "";
    let precio = 0;

    for (const producto of carrito) {
        carritoHTML += productoCarritoHTML(producto);
        precio += producto.precio;
    }
    precioNodo.innerHTML = `Total $` + precio;
    carritoNodo.innerHTML = carritoHTML;
    botonesCarrito();
};

// QUITAR ELEMENTOS DE CARRITO Y LOCAL STORAGE
const botonesCarrito = () => {
    for (const producto of carrito) {
        const botonId = `boton-carrito-${producto.idCompra}`;
        const botonNodo = document.getElementById(botonId);

        botonNodo.addEventListener("click", () => {
            const index = carrito.findIndex((p) => p.idCompra == producto.idCompra);
            carrito.splice(index, 1);
            mostrarCarrito();
            localStorage.setItem("carrito", JSON.stringify(carrito));
        })
    }
};


mostrarCatalogo();

// DESESTRUCTURACION DE OBJETOS DENTRO DE ARRAY PRODUCTOS 
// PERMITE VER SOLO NOMBRE Y PRECIO DE LOS PRODUCTOS 

for (const { nombre = 'nombre', precio = 'precio' } of productos) {
    console.log(nombre, precio);
}

// SE APLICA OPERADOR TERNARIO 
carrito != "" ? console.log(carrito) : console.log("el carrito esta vacio");

// SE MUESTRA UNA COPIA DE LOS PRODUCTOS USANDO SPREAD 
console.log("copiaProductos");
console.log(copiaProductos);
