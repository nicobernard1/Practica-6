class Socio {

    constructor(nombre, apellido, dni, mail, cuota, vencimiento) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.mail = mail;
        this.cuota = cuota;
        this.vencimiento = vencimiento;
        this.cuotaPagada = false;
    }

    verDescuento() {

        if (this.cuotaPagada === true) {
            alert("La cuota ya está pagada.");
            }

        let formaPago = prompt(this.nombre + " ¿Cómo desea pagar?\n1. Efectivo\n2. Transferencia");
         if (formaPago === "1") {
            this.cuota = this.cuota * 0.90;
            this.cuotaPagada = true;
            alert("Pago realizado con éxito.");
            console.log(this.nombre +" El precio de la cuota es: $" + this.cuota);
            } else if (formaPago === "2") {
            this.cuotaPagada = true;
            alert("Pago realizado con éxito.");
            console.log(this.nombre +" El precio de la cuota es: $" + this.cuota);
            } else {
             alert("Forma de pago inválida.");
             this.cuotaPagada === false;
            }
    }

    mostrarDatos() {
        console.log("            ------- Datos del socio -------")
        console.log("Nombre: " + this.nombre);
        console.log("Apellido: " + this.apellido);
        console.log("DNI: " + this.dni);
        console.log("Mail: " + this.mail);
        console.log("Cuota: $" + this.cuota);
        console.log("Vencimiento: " + this.vencimiento);

        if (this.cuotaPagada === true) {
            console.log("Estado de cuota: PAGADA");
        } else {
            console.log("Estado de cuota: PENDIENTE");
        }
    }
}


const socios = [];

const socio1 = new Socio(
    "Nicolas",
    "Bernard",
    "47689974",
    "nnicobernard@gmail.com",
    50000,
    "30/09/2026"
);

socios.push(socio1);
socio1.verDescuento();

const socio2 = new Socio(
    "Marcelo",
    "Gallardo",
    "47912018",
    "muñeco@gmail.com",
    50000,
    "30/09/2026"
);

socios.push(socio2);
socio2.verDescuento();

const socio3 = new Socio(
    "Lionel",
    "Messi",
    "47123456",
    "leo@gmail.com",
    50000,
    "30/09/2026"
);

socios.push(socio3);
socio3.verDescuento();


let opcion = "";

while (opcion !== "5") {

    opcion = prompt(
        "SISTEMA DE GESTION DE SOCIOS\n\n" +
        "1. Mostrar socios\n" +
        "2. Buscar socio\n" +
        "3. Pagar cuota\n" +
        "4. Agregar socio\n" +
        "5. Salir"
    );

    switch (opcion) {

        case "1":

            for (let i = 0; i < socios.length; i++) {
                socios[i].mostrarDatos();
            }
        break;
        case "2": 
            let dniBuscado = prompt("Ingrese el DNI:");
                
            for (let i = 0; i < socios.length; i++) {
                if (socios[i].dni === dniBuscado) {
                    (socios[i].mostrarDatos());
                }
            }
        break;
        case "3": {
             let dniBuscado = prompt("Ingrese el DNI:");

            for (let i = 0; i < socios.length; i++) {
                if (socios[i].dni === dniBuscado) {
                    socios[i].verDescuento();
                }
            }
        }
        break;
        case "4": 

            let nombre = prompt("Ingrese el nombre:");
            let apellido = prompt("Ingrese el apellido:");
            let dni = prompt("Ingrese el DNI:");
            let mail = prompt("Ingrese el mail:");
            let vencimiento = prompt("Ingrese el vencimiento de la cuota:");

            let nuevoSocio = new Socio(
                nombre,
                apellido,
                dni,
                mail,
                50000,
                vencimiento
            );

            socios.push(nuevoSocio);
            nuevoSocio.verDescuento();
            alert("Socio agregado correctamente.");

            break;
            case "5":
                
            alert("Sistema de gestión finalizado.");
            break;
            default:

            alert("Opción no válida");
    }
}

//Ver cantidad de socios activos
const sociosActivos = socios.filter(socio => socio.cuotaPagada === true) 
console.log(sociosActivos);

//Ver el vencimiento de la cuota de cada socio.
socios.forEach(socio => {
    if (socio.cuotaPagada) {
    console.log(socio.dni + ": activo hasta " + socio.vencimiento)
    } else {
        console.log(socio.dni + ": su cuota esta vencida.")
    }
})

//Ver cantidad recaudada en este mes.
const totalMes = socios.reduce((total, socio) => total + socio.cuota, 0)
    console.log(totalMes)




