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

    pagar(formaPago) {
        if (formaPago === "efectivo") {
            this.cuota = this.cuota * 0.90;
        }
        this.cuotaPagada = true;
    }
}

const socios = [
    new Socio("Nicolas", "Bernard", "47689974", "nnicobernard@gmail.com", 50000, "30/09/2026"),
    new Socio("Marcelo", "Gallardo", "47912018", "muñeco@gmail.com", 50000, "30/09/2026"),
    new Socio("Lionel", "Messi", "47123456", "leo@gmail.com", 50000, "30/09/2026")
];

const formulario = document.querySelector("#formulario");
const inputNombre = document.querySelector(".nombre");
const inputApellido = document.querySelector(".apellido");
const inputDni = document.querySelector(".dni");
const inputMail = document.querySelector(".mail");
const buscador = document.querySelector(".buscador");
const mensaje = document.querySelector(".mensaje");
const listaSocios = document.querySelector(".lista-socios");
const totalSocios = document.querySelector(".total-socios");
const sociosActivos = document.querySelector(".socios-activos");
const totalRecaudado = document.querySelector(".total-recaudado");
const botonAgregar = document.querySelector(".btn-agregar");

//Agregar socio
botonAgregar.addEventListener("click", function () {
    const nombre = inputNombre.value;
    const apellido = inputApellido.value;
    const dni = inputDni.value;
    const mail = inputMail.value;

    const nuevoSocio = new Socio(nombre, apellido, dni, mail, 50000, "-");
    socios.push(nuevoSocio);

    mensaje.innerText = "Socio agregado";
    formulario.reset();
    actualizarResumen();
    mostrarSocios(socios);
});

//Resumen
function actualizarResumen() {
    let pagadas = 0;
    let recaudado = 0;

    socios.forEach(function (socio) {
        if (socio.cuotaPagada === true) {
            pagadas = pagadas + 1;
            recaudado = recaudado + socio.cuota;
        }
    });

    totalSocios.innerText = socios.length;
    sociosActivos.innerText = pagadas;
    totalRecaudado.innerText = `$${recaudado}`;
}

//Mostrar socios
function mostrarSocios(lista) {
    listaSocios.innerHTML = "";

    lista.forEach(function (socio) {
        let estado = "Pendiente";
        let pago = `
            <select class="forma${socio.dni}">
                <option value="efectivo">Efectivo</option>
                <option value="tarjeta">Tarjeta</option>
            </select>
            <button class="pagar${socio.dni}">Pagar cuota</button>
        `;

        if (socio.cuotaPagada === true) {
            estado = "Pagada";
            pago = "";
        }

        listaSocios.innerHTML += `
            <div class="socio">
                <h3>${socio.nombre} ${socio.apellido}</h3>
                <p>DNI: ${socio.dni}</p>
                <p>Mail: ${socio.mail}</p>
                <p>Cuota: $${socio.cuota}</p>
                <p>Vencimiento: ${socio.vencimiento}</p>
                <p>Estado: ${estado}</p>
                ${pago}
            </div>
        `;
    });

    lista.forEach(function (socio) {
        if (socio.cuotaPagada === false) {
            const botonPagar = document.querySelector(".pagar" + socio.dni);
            const selectForma = document.querySelector(".forma" + socio.dni);

            botonPagar.addEventListener("click", function () {
                socio.pagar(selectForma.value);
                socio.vencimiento = "30/10/2026";
                mensaje.innerText = `Cuota de ${socio.nombre} pagada`;
                mostrarSocios(socios);
                actualizarResumen();
            });
        }
    });
}

//Buscador
buscador.addEventListener("input", function () {
    const texto = buscador.value.toLowerCase();
    const encontrados = [];

    socios.forEach(function (socio) {
        const nombre = socio.nombre.toLowerCase();
        const apellido = socio.apellido.toLowerCase();

        if (nombre.includes(texto) || apellido.includes(texto) || socio.dni.includes(texto)) {
            encontrados.push(socio);
        }
    });

    mostrarSocios(encontrados);
});

actualizarResumen();
mostrarSocios(socios);