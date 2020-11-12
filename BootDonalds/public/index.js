let mensaje
let menuEleccion
let bebidaEleccion

let array = []

footer()

function menu() {
    document.getElementById("aceptarPedido").innerHTML = ""
    fetch('/menu/').then(function(res) {
        return res.json();
    }).then(function(data) {

        mensaje = ""

        for (let i = 0; i < data.length; i++) {

            mensaje += `
                <option value="${data[i].nombre}">${data[i].nombre}</option>            
            `
        }

        document.getElementById('resultado').innerHTML = `
        <div id="select">
        <select onchange="menuBebida()" id="seleccionMenu" name="producto" class="producto">
        <option value="-">Elige un menú</option>
        ${mensaje}
        </select>
        </div>
        `;
    })
}

function menuBebida() {

    menuEleccion = document.getElementById("seleccionMenu").value

    fetch('/bebida/').then(function(res) {
        return res.json();
    }).then(function(data) {

        mensaje = ""

        for (let i = 0; i < data.length; i++) {

            mensaje += `
                <option value="${data[i].nombre}">${data[i].nombre}</option>            
            `
        }
        document.getElementById('resultado').innerHTML = `
        <div id="select">
        <select onchange="menuFin()" id="seleccionBebida" name="producto" class="producto">
        <option value="-">Elige una bebida</option>
        ${mensaje}
        </select>
        </div>
        `;
    })
}

let mensajePedido
let precioMenu

function menuFin() {
    bebidaEleccion = document.getElementById("seleccionBebida").value
    document.getElementById("resultado").innerHTML = ""

    fetch('/menu/').then(function(res) {
        return res.json();
    }).then(function(data) {


        for (let j = 0; j < data.length; j++) {
            if (menuEleccion == data[j].nombre) {
                precioMenu = data[j].precio
            }
        }

        mensajePedido = `
    <div>
    <h3>Su menú:</h3>
    <p>Hamburguesa: ${menuEleccion}</p>
    <p>Bebida: ${bebidaEleccion}</p>
    <p>Patatas: BootFries</p>
    <p>Precio: ${precioMenu} €</p>
    </div>
    <div class="botones">
    <button id="botonOpcion" onclick="cestaMenu()" with="50" height="50">Pedir</button>
    <button id="botonOpcion" onclick="location.reload()" with="50" height="50">Cancelar</button>
    </div>
    `
        document.getElementById("aceptarPedido").innerHTML = mensajePedido
    })

}

function cestaMenu() {
    let pedidoMenu = {
        tipo: "menu",
        nombre: menuEleccion,
        bebida: bebidaEleccion,
        patatas: "BootFries",
        precio: precioMenu
    }

    fetch(`/pedido/menu`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pedidoMenu),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {

            window.alert("Pedido guardado. Pendiente confirmación")
            document.getElementById("aceptarPedido").innerHTML = ""
            location.reload()
            footer()
        });

}

function hamburguesa() {
    document.getElementById("aceptarPedido").innerHTML = ""
    fetch('/hamburguesa/').then(function(res) {
        return res.json();
    }).then(function(data) {

        mensaje = ""

        for (let i = 0; i < data.length; i++) {

            mensaje += `
                <option value="${data[i].nombre}">${data[i].nombre}</option>            
            `
        }

        document.getElementById('resultado').innerHTML = `
        <div id="select">
        <select onchange="hamburguesaPatatas()" id="seleccionMenu" name="producto" class="producto">
        <option value="-">Elige una hamburguesa</option>
        ${mensaje}
        </select>
        </div>
        `;

    })
}

function hamburguesaPatatas() {

    hamburguesaEleccion = document.getElementById("seleccionMenu").value
    document.getElementById("resultado").innerHTML = ""
    document.getElementById("aceptarPedido").innerHTML = `
    <div>
    <h2>¿Quieres añadir unas patatas "BootFries" por 1€?</h2>
    </div>
    <div class="botones">
    <button id="botonOpcion" onclick="finHamburguesa(1)" with="50" height="50">SI</button>
    <button id="botonOpcion" onclick="finHamburguesa(0)" with="50" height="50">NO</button>
    </div>
    `
}

let precioHamburguesa
let patatasHamburguesa

function finHamburguesa(variable) {

    if (variable == 1) {
        patatasHamburguesa = "BootFries"
    } else if (variable == 0) {
        patatasHamburguesa = "-"
    }

    fetch(`/hamburguesa/`).then(function(res) {
        return res.json();
    }).then(function(data) {

        for (let j = 0; j < data.length; j++) {
            if (hamburguesaEleccion == data[j].nombre) {
                precioHamburguesa = parseFloat(data[j].precio) + parseFloat(variable)
            }
        }

        mensajePedido = `
        <div>
        <h3>Su hamburguesa:</h3>
        <p>Hamburguesa: ${hamburguesaEleccion}</p>
        <p>Patatas: ${patatasHamburguesa}</p>
        <p>Precio: ${precioHamburguesa} €</p>
        </div>
        <div class="botones">
        <button id="botonOpcion" onclick="cestaHamburguesa()" with="50" height="50">Pedir</button>
        <button id="botonOpcion" onclick="location.reload()" with="50" height="50">Cancelar</button>
        </div>
        `
        document.getElementById("aceptarPedido").innerHTML = mensajePedido


    });

}

function cestaHamburguesa() {
    let pedidoHamburguesa = {
        tipo: "hamburguesa",
        nombre: hamburguesaEleccion,
        patatas: patatasHamburguesa,
        precio: precioHamburguesa
    }

    fetch(`/pedido/hamburguesa`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pedidoHamburguesa),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {

            window.alert("Pedido guardado. Pendiente confirmación")
            document.getElementById("aceptarPedido").innerHTML = ""
            location.reload()
            footer()
        });

}


function bebida() {
    document.getElementById("aceptarPedido").innerHTML = ""
    fetch('/bebida/').then(function(res) {
        return res.json();
    }).then(function(data) {

        mensaje = ""

        for (let i = 0; i < data.length; i++) {

            mensaje += `
                <option value="${data[i].nombre}">${data[i].nombre}</option>            
            `
        }
        document.getElementById('resultado').innerHTML = `
        <div id="select">
        <select name="producto" id="seleccionBebida" class="producto">
        <option value="-">Elige una bebida</option>
        ${mensaje}
        </select>
        </div>
        <div id="botonPedido" class="botones">
        <button id="botonOpcion" onclick="cestaBebida()" with="50" height="50">Pedir</button>
        </div>
        `;
    })
}

let bebidaEleccion2
let precioBebida

function cestaBebida() {

    bebidaEleccion2 = document.getElementById("seleccionBebida").value
    document.getElementById("aceptarPedido").innerHTML = ""

    fetch('/bebida/').then(function(res) {
        return res.json();
    }).then(function(data) {

        for (let i = 0; i < data.length; i++) {
            if (bebidaEleccion2 == data[i].nombre) {
                precioBebida = parseFloat(data[i].precio)
            }
        }

        let pedidoBebida = {
            tipo: "bebida",
            nombre: bebidaEleccion2,
            precio: precioBebida
        }

        fetch("/pedido/bebida", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pedidoBebida),
            })
            .then(function(res) {
                return res.json();
            })
            .then(function(data) {
                window.alert("Pedido guardado. Pendiente confirmación")
                document.getElementById("aceptarPedido").innerHTML = ""
                location.reload()
                footer()
            })
    })





}

let menuConfirmacion = ""

function pedido() {

    document.getElementById("resultado").innerHTML = ""
    document.getElementById("aceptarPedido").innerHTML = ""
    menuConfirmacion = ""

    fetch('/pedido/').then(function(res) {
        return res.json();
    }).then(function(data) {
        array = data

        for (let j = 0; j < data.length; j++) {
            if (data[j].tipo == "menu") {
                menuConfirmacion += `
                <div>
                <h3>Su menu: ${data[j].nombre}</h3>
                <p>Hamburguesa: ${data[j].carne}</p>
                <p>Bebida: ${data[j].bebida}</p>
                <p>Patatas: ${data[j].patatas}</p>
                <p>Precio: ${data[j].precio} €</p>
               
                <button id="botonOpcion2" onclick=editar("${j}") with="50" height="50">EDITAR</button>
                <button id="botonOpcion2" onclick=borrarProducto("${j}") with="50" height="50">BORRAR</button>
                </div>
                `
            } else if (data[j].tipo == "hamburguesa") {
                menuConfirmacion += `
                <div>
                <h3>Su hamburguesa: ${data[j].nombre}</h3>
                <p>Patatas: ${data[j].patatas}</p>
                <p>Precio: ${data[j].precio} €</p>
               
                <button id="botonOpcion2" onclick=editar("${j}") with="50" height="50">EDITAR</button>
                <button id="botonOpcion2" onclick=borrarProducto("${j}") with="50" height="50">BORRAR</button>
                </div>
                `
            } else if (data[j].tipo == "bebida") {
                menuConfirmacion += `
                <div>
                <h3>Su bebida: ${data[j].nombre}</h3>
                <p>Precio: ${data[j].precio} €</p>
               
                <button id="botonOpcion2" onclick=editar("${j}") with="50" height="50">EDITAR</button>
                <button id="botonOpcion2" onclick=borrarProducto("${j}") with="50" height="50">BORRAR</button>
                </div>
                `
            }
        }

        let compra = 0

        for (let i = 0; i < data.length; i++) {
            compra += parseFloat(data[i].precio)
            localStorage.setItem("total", compra)
        }

        document.getElementById("aceptarPedido").innerHTML = `<div class="ajuste">${menuConfirmacion}</div>
        <div>
        <h3>Precio total: ${compra} €</h3>
        </div>
        <div>
    <h2>¿Acepta este pedido, quiere editarlo o ya no lo desea?</h2>
    </div>
        <div class="botones">
    <button id="botonOpcion" onclick="aceptar()" with="50" height="50">ACEPTAR</button>
    <button id="botonOpcion" onclick="borrar()" with="50" height="50">ELIMINAR</button>
    </div>`

    })

}

let totalCompra = 0

function aceptar() {

    fetch('/pedido/').then(function(res) {
        return res.json();
    }).then(function(data) {

        for (let i = 0; i < data.length; i++) {
            totalCompra += parseFloat(data[i].precio)
        }

        window.alert(`Su pedido estará listo en 30 minutos, son ${totalCompra} €. Gracias`)

        fetch(`/pedido/borrar`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
            })
            .then(function(res) {
                return res.json();
            })
            .then(function(data) {

                location.reload()
                footer()
            });
    })


}

let mensajeEditar = ""

function editar(indice) {
    let tipo
    let nombre
    console.log(array)
    console.log(indice)
    for (let i = 0; i < array.length; i++) {
        if (i == indice) {
            tipo = array[i].tipo
            nombre = array[i].nombre
        }
    }

    let editarProducto = { tipo: tipo, nombre: nombre }
    console.log(editarProducto)

    fetch('/pedido/').then(function(res) {
        return res.json();
    }).then(function(data) {

        if (tipo == "menu") {
            for (let i = 0; i < data.length; i++) {
                if (tipo === data[i].tipo && nombre === data[i].nombre) {
                    fetch(`/pedido/borrarProducto`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ tipo: tipo, nombre: nombre }),
                        })
                        .then(function(res) {
                            return res.json();
                        })
                        .then(function(data) {

                            menu()
                            footer()
                        });
                }
            }
        }
        if (tipo == "hamburguesa") {
            for (let i = 0; i < data.length; i++) {
                if (tipo === data[i].tipo && nombre === data[i].nombre) {
                    fetch(`/pedido/borrarProducto`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ tipo: tipo, nombre: nombre }),
                        })
                        .then(function(res) {
                            return res.json();
                        })
                        .then(function(data) {

                            hamburguesa()
                            footer()
                        });
                }
            }
        }
        if (tipo == "bebida") {
            for (let i = 0; i < data.length; i++) {
                if (tipo === data[i].tipo && nombre === data[i].nombre) {

                    fetch(`/pedido/borrarProducto`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ tipo: tipo, nombre: nombre }),
                        })
                        .then(function(res) {
                            return res.json();
                        })
                        .then(function(data) {

                            bebida()
                            footer()

                        });

                }
            }
        }
        fetch(`/pedido/editar`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editarProducto),
            })
            .then(function(res) {
                return res.json();
            })
            .then(function(data) {

                /*  location.reload() */
                footer()
            });

    });



}

function borrar() {

    window.alert(`Su pedido ha sido eliminado. Gracias`)

    fetch(`/pedido/borrar`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {

            location.reload()
            footer()
        });


}

function borrarProducto(indice) {

    let tipo
    let nombre
    console.log(array)
    console.log(indice)
    for (let i = 0; i < array.length; i++) {
        if (i == indice) {
            tipo = array[i].tipo
            nombre = array[i].nombre
        }
    }

    let editarProducto = { tipo: tipo, nombre: nombre }
    console.log(editarProducto)
    fetch('/pedido/').then(function(res) {
        return res.json();
    }).then(function(data) {


        if (tipo == "menu") {
            for (let i = 0; i < data.length; i++) {
                if (tipo === data[i].tipo && nombre === data[i].nombre) {
                    fetch(`/pedido/borrarProducto`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ tipo: tipo, nombre: nombre }),
                        })
                        .then(function(res) {
                            return res.json();
                        })
                        .then(function(data) {

                            location.reload()
                            footer()
                        });
                }
            }
        }
        if (tipo == "hamburguesa") {
            for (let i = 0; i < data.length; i++) {
                if (tipo === data[i].tipo && nombre === data[i].nombre) {
                    fetch(`/pedido/borrarProducto`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ tipo: tipo, nombre: nombre }),
                        })
                        .then(function(res) {
                            return res.json();
                        })
                        .then(function(data) {

                            location.reload()
                            footer()
                        });
                }
            }
        }
        if (tipo == "bebida") {
            for (let i = 0; i < data.length; i++) {
                if (tipo === data[i].tipo && nombre === data[i].nombre) {

                    fetch(`/pedido/borrarProducto`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ tipo: tipo, nombre: nombre }),
                        })
                        .then(function(res) {
                            return res.json();
                        })
                        .then(function(data) {

                            location.reload()
                            footer()
                        });

                }
            }
        }

        fetch(`/pedido/editar`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editarProducto),
            })
            .then(function(res) {
                return res.json();
            })
            .then(function(data) {

                /* location.reload() */
                footer()
            });

    });
}

function footer() {
    let footer = localStorage.getItem("total")

    if (footer == null) {
        footer = 0;
        document.getElementById("footer").innerHTML = `Lleva acumulado de pedido: ${footer} €.`
    } else {


        document.getElementById("footer").innerHTML = `Lleva acumulado de pedido: ${footer} €.`
    }
}