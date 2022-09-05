// VARIABLES A TENER EN CUENTA
// SE APLICA OPERADOR TERNARIO / OR
//USO DE LIBRERIA

const alertaCarrito = () => { 
    Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'El Carrito esta vacio!',
  })
};

const carritoFinal = JSON.parse(localStorage.getItem('carrito')) || [];
carritoFinal != "" ? console.log(carritoFinal) : alertaCarrito();


//HTML PARA MOSTRAR EN EL RESUMEN DEL CARRITO
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

// MOSTRAR ELEMENTOS DEL CARRITO
const mostrarCarrito = () => {
    const carritoNodo = document.getElementById("carrito");
    const precioNodo = document.getElementById("precioTotal");
    let carritoHTML = "";
    let precio = 0;

    for (const producto of carritoFinal) {
        carritoHTML += productoCarritoHTML(producto);
        precio += producto.precio;
    }
    precioNodo.innerHTML = `<h6> Total $ </h6>` + precio;
    carritoNodo.innerHTML = carritoHTML;
    botonesCarrito();
};

//QUITAR ELEMENTOS DEL CARRITO
const botonesCarrito = () => {
    for (const producto of carritoFinal) {
        const botonId = `boton-carrito-${producto.idCompra}`;
        const botonNodo = document.getElementById(botonId);

        botonNodo.addEventListener("click", () => {
            const index = carritoFinal.findIndex((p) => p.idCompra == producto.idCompra);
            carritoFinal.splice(index, 1);
            mostrarCarrito();
        })
    }
};

// BOTON FINALIZAR DONDE SE PASARIA A NUEVO HTML DE PAGO O A LA SECCION DE CATALOGO
const finalizar = document.getElementById("finalizar");
finalizar.addEventListener("click", () => {
    localStorage.removeItem("carrito");
    const carritoNodo = document.getElementById("carrito");
    carritoNodo.innerHTML = `<a class="btn-1 btn-comprar" href="./productos.html"> Volver a productos</a>`
    const precioNodo = document.getElementById("precioTotal");
    precioNodo.innerHTML = ``;
});


mostrarCarrito();

