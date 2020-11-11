let mensaje
let menuEleccion
let bebidaEleccion


function menu() {
    document.getElementById("aceptarPedido").innerHTML = ""
    fetch('/menu/').then(function(res) {
        return res.json();
    }).then(function(data) {

        mensaje = ""
        let i
        for (i = 0; i < data.length; i++) {

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
    <div>
    <button id="cestaMenu" onclick="cestaMenu()" with="50" height="50">Pedir</button>
    <button id="cancelar" onclick="location.reload()" with="50" height="50">Cancelar</button>
    </div>
    `
        document.getElementById("aceptarPedido").innerHTML = mensajePedido
    })

}

function cestaMenu() {
    let pedidoMenu = {
        tipo: "menu",
        hamburguesa: menuEleccion,
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

            window.alert("Pedido guardado. Pendiente aceptación")
            document.getElementById("aceptarPedido").innerHTML = ""
            location.reload()

        });

}

function hamburguesa() {
    document.getElementById("aceptarPedido").innerHTML = ""
    fetch('/hamburguesa/').then(function(res) {
        return res.json();
    }).then(function(data) {

        mensaje = ""
        let i
        for (i = 0; i < data.length; i++) {

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
    document.getElementById("aceptarPedido").innerHTML = `
    <div>
    <h2>¿Quieres añadir unas patatas "BootFries" por 1€?</h2>
    </div>
    <div>
    <button id="finHamburguesa(1)" onclick="cestaMenu()" with="50" height="50">SI</button>
    <button id="finHamburguesa(0)" onclick="location.reload()" with="50" height="50">NO</button>
    </div>
    `
}

let precioHamburguesa

function finHamburguesa(variable) {

    if (variable == 1) {
        let patatasHamburguesa = "BootFries"
    } else if (variable == 0) {
        let patatasHamburguesa = "-"
    }

    fetch(`/hamburguesas/`).then(function(res) {
        return res.json();
    }).then(function(data) {

        for (let j = 0; j < data.length; j++) {
            if (hamburguesaEleccion == data[j].nombre) {
                precioHamburguesa = parseInt(data[j].precio) + parseInt(variable)
            }
        }

        mensajePedido = `
        <div>
        <h3>Su hamburguesa:</h3>
        <p>Hamburguesa: ${hamburguesaEleccion}</p>
        <p>Patatas: ${patatasHamburguesa}</p>
        <p>Precio: ${precioHamburguesa} €</p>
        </div>
        <div>
        <button id="cestaHamburguesa" onclick="cestaHamburguesa()" with="50" height="50">Pedir</button>
        <button id="cancelar" onclick="location.reload()" with="50" height="50">Cancelar</button>
        </div>
        `
        document.getElementById("aceptarPedido").innerHTML = mensajePedido


    });

}

function cestaHamburguesa() {
    let pedidoHamburguesa = {
        tipo: "hamburguesa",
        hamburguesa: hamburguesaEleccion,
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

            window.alert("Pedido guardado. Pendiente aceptación")
            document.getElementById("aceptarPedido").innerHTML = ""
            location.reload()

        });

}


function bebida() {
    document.getElementById("aceptarPedido").innerHTML = ""
    fetch('/bebida/').then(function(res) {
        return res.json();
    }).then(function(data) {
        console.log(data)
        mensaje = ""

        for (let i = 0; i < data.length; i++) {

            mensaje += `
                <option value="${data[i].nombre}">${data[i].nombre}</option>            
            `
        }
        document.getElementById('resultado').innerHTML = `
        <div id="select">
        <select name="producto" class="producto">
        <option value="-">Elige un menú</option>
        ${mensaje}
        </select>
        </div>
        <div id="botonPedido">
        <button id="pedir" onclick="pedir()" with="50" height="50">Pedir</button>
        </div>
        `;
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


        for (let j = 0; j < data.length; j++) {
            if (data.tipo == "menu") {
                menuConfirmacion += `
                <div>
                <h3>Su menú: ${data[j].hamburguesa}</h3>
                <p>Hamburguesa: ${data[j].hamburguesa}</p>
                <p>Bebida: ${data[j].bebida}</p>
                <p>Patatas: ${data[j].patatas}</p>
                <p>Precio: ${data[j].precio} €</p>
                </div>`
            } else if (data.tipo = "hamburguesa") {
                menuConfirmacion += `
                <div>
                <h3>Su Hamburguesa: ${data[j].hamburguesa}</h3>
                <p>Patatas: ${data[j].patatas}</p>
                <p>Precio: ${data[j].precio} €</p>
                </div>
                `
            }
        }

        document.getElementById("aceptarPedido").innerHTML = menuConfirmacion

    })

}