let mensaje
let menuEleccion
let bebidaEleccion


function menu() {
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

function menuFin() {
    bebidaEleccion = document.getElementById("seleccionBebida").value

    fetch('/menu/').then(function(res) {
        return res.json();
    }).then(function(data) {
    
        let precioMenu

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
    <p>Precio: ${precioMenu}</p>
    </div>
    <div>
    <button id="pedir" onclick="" with="50" height="50">Pedir</button>
    <button id="pedir" onclick="location.reload()" with="50" height="50">Cancelar</button>
    </div>
    `
    document.getElementById("aceptarPedido").innerHTML = mensajePedido
    })

}

function hamburguesa() {
    fetch('/hamburguesa/').then(function(res) {
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

function bebida() {
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

function pedir() {

}