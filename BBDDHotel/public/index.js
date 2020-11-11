let mensaje = ""

mostrarClientes()
mostrarHabitaciones()
mostrarReservas()

function mostrarClientes() {
    fetch('/clientes/').then(function(res) {
        return res.json();
    }).then(function(data) {

        mensaje = ""

        for (let i = 0; i < data.length; i++) {

            mensaje += `
    <h1>Nombre: ${data[i].nombre}</h1>
    <p>Primer apellido: ${data[i].apellido1}</p>
    <p>Segundo apellido: ${data[i].apellido2}</p>
    <p>DNI: ${data[i].dni}</p>
    `
        }
        document.getElementById('clientes').innerHTML = mensaje;
    })
}

function mostrarReservas() {
    fetch('/reservas/').then(function(res) {
        return res.json();
    }).then(function(data) {

        mensaje = ""

        for (let i = 0; i < data.length; i++) {

            mensaje += `
    <h1>Nombre: ${data[i].nombre}</h1>
    <p>Primer apellido: ${data[i].apellido1}</p>
    <p>Segundo apellido: ${data[i].apellido2}</p>
    <p>DNI: ${data[i].dni}</p>
    <p>Habitación: ${data[i].habitacion}</p>
    <p>Fecha entrada: ${data[i].fechaIn}</p>
    <p>Fecha salida: ${data[i].fechaOut}</p>
    `
        }
        document.getElementById('reservas').innerHTML = mensaje;
    })
}


function mostrarHabitaciones() {
    fetch('/habitaciones/').then(function(res) {
        return res.json();
    }).then(function(data) {

        mensaje = ""

        for (let i = 0; i < data.length; i++) {

            mensaje += `
    <h3>Nº habitación: ${data[i].habitacion}</h3>
    <p>Estado: ${data[i].estado}</p>
    `
        }
        document.getElementById('habitaciones').innerHTML = mensaje;
    })
}


function registrar() {

    let dni = parseInt(document.getElementById("dniRegistro").value)
    let nombre = document.getElementById("nombre").value
    let apellido1 = document.getElementById("apellido1").value
    let apellido2 = document.getElementById("apellido2").value

    let cliente = {
        dni,
        nombre,
        apellido1,
        apellido2
    }

    fetch(`/clientes/registro`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cliente),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {

            mostrarClientes()
        });

}

function editar() {

    let dni = parseInt(document.getElementById("dniRegistro").value)
    let nombre = document.getElementById("nombre").value
    let apellido1 = document.getElementById("apellido1").value
    let apellido2 = document.getElementById("apellido2").value

    let cliente = {
        dni,
        nombre,
        apellido1,
        apellido2
    }

    fetch(`/clientes/editar`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cliente),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {

            mostrarClientes()
        });

}

function entrada() {
    let fechaIn = document.getElementById("fechaIn").value
    let dni = parseInt(document.getElementById("dniEntrada").value)
    let habitacion = parseInt(document.getElementById("numero").value)
    let reservaEntrada = {
        dni: dni,
        habitacion: habitacion,
        fechaIn: fechaIn
    }

    fetch(`/reservas/entrada`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reservaEntrada),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            if (data.error == true) {
                window.alert(data.mensaje)
            } else {
                mostrarReservas()
                mostrarHabitaciones()
                window.alert("Registro realizado, disfrute de su habitación")
            }
        });

}

function salida() {
    let fechaOut = document.getElementById("fechaOut").value
    let dni = parseInt(document.getElementById("dniSalida").value)
    let habitacion = parseInt(document.getElementById("numero"))
    let reservaSalida = {
        dni: dni,
        habitacion: habitacion,
        fechaOut: fechaOut
    }

    fetch(`/reservas/salida`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reservaSalida),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            if (data.error == true) {
                window.alert(data.mensaje)
            } else {

                mostrarReservas()
                mostrarHabitaciones()

                window.alert("Gracias por la visita, vuelva pronto.")
            }
        });

}