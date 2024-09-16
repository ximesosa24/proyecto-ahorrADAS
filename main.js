//Menú hamburguesa//
//Variables//
const iconoAbrir = document.getElementById ('icono-bars');
const iconoCerrar = document.getElementById('icono-close');
const menuNav = document.getElementById('menu');

const toggleBtn = document.getElementById('btn-reportes');
const card = document.getElementById('seccion-reportes');
const balance = document.getElementById('seccion-balance');
const operaciones = document.getElementById('seccion-operaciones');
const filtros = document.getElementById ('seccion-filtros');
const cardFiltros = document.getElementById ('card-filtros');
const resumenReportes = document.getElementById ('reporteResumen');
const reporteCategorías = document.getElementById ('reporteCategorías');
const reporteMes = document.getElementById ('reporteMes');

//Abrir menú//
iconoAbrir.addEventListener("click", function () {
    menuNav.classList.toggle("hidden");
    iconoAbrir.classList.add("hidden");
    iconoCerrar.classList.remove("hidden");
});

// Cerrar menú
iconoCerrar.addEventListener("click", function () {
    menuNav.classList.add("hidden");
    iconoAbrir.classList.remove("hidden");
    iconoCerrar.classList.add("hidden");
});





// Mostrar solo reportes //
toggleBtn.addEventListener('click', function () {
  card.classList.remove('hidden');
  balance.classList.add('hidden'); 
  operaciones.classList.add('hidden');
  filtros.classList.add('hidden');
  seccionCategorias.classList.add('hidden');
  operacion.classList.add('hidden');
  btnToggleFiltros.classList.add('hidden');
  cardFiltros.classList.add('hidden');
});

// //Reportes sin operaciones//
toggleBtn.addEventListener('click', function (){
    resumenReportes.classList.add('hidden');
    reporteCategorías.classList.add('hidden');
    reporteMes.classList.add('hidden');
});


// BTN NUEVA OPERACION - ENRUTADO - HIDDEN //
const operacion = document.getElementById('seccion-operacion');
const reportes = document.getElementById('seccion-reportes');
const nuevaOperacionBtn = document.getElementById('btn-nueva-operacion'); 
const seccionOperaciones = document.getElementById('seccion-operaciones'); 

//solo se muestra la card de nueva operacion//
nuevaOperacionBtn.addEventListener('click', function () {
    operacion.classList.remove('hidden'); 
    balance.classList.add('hidden');       
    reportes.classList.add('hidden');     
    filtros.classList.add('hidden');       
    seccionOperaciones.classList.add('hidden');  
    btnToggleFiltros.classList.add('hidden');
    cardFiltros.classList.add('hidden');
  });


operacion.addEventListener('click',function(){
    seccionCategorias.classList.add('hidden'); 
    balance.classList.add('hidden');
    operaciones.classList.add('hidden'); 
    filtros.classList.add('hidden'); 
    reportes.classList.add('hidden');
    btnToggleFiltros.classList.remove('hidden');
});
/*btn categorias*/
const toggleCategoriasBtn = document.getElementById('btn-categorias');
const seccionCategorias = document.getElementById('seccion-categorias');

/*btn que solo muestra categorias*/
toggleCategoriasBtn.addEventListener('click', function () {
  seccionCategorias.classList.remove('hidden'); 
  balance.classList.add('hidden');
  operaciones.classList.add('hidden'); 
  filtros.classList.add('hidden'); 
  reportes.classList.add('hidden'); 
  operacion.classList.add('hidden');
  btnToggleFiltros.classList.add('hidden');
  cardFiltros.classList.add('hidden');
});

/*BTN mostrar ocultar filtros*/
const btnToggleFiltros = document.getElementById('btn-toggle-filtros');


let filtrosOcultos = false;
btnToggleFiltros.addEventListener('click', function () {
    if (filtrosOcultos) {
        
        filtros.classList.remove('hidden');
        btnToggleFiltros.textContent = 'Ocultar filtros';
    } else {
       
        filtros.classList.add('hidden');
        btnToggleFiltros.textContent = 'Mostrar filtros';
    }
    filtrosOcultos = !filtrosOcultos;
});

//Variables//
const balanceBtn = document.getElementById ('btn-balance');
// Mostrar balance//
balanceBtn.addEventListener('click', function() {
  balance.classList.remove('hidden');
  operaciones.classList.remove('hidden');
  filtros.classList.remove('hidden'); 
  card.classList.add ('hidden');
  seccionCategorias.classList.add('hidden');
  operacion.classList.add('hidden');
  cardFiltros.classList.remove('hidden');
});

//LocalStorage Balance//
//Variables//
const gananciasElement = document.getElementById('ganancias');
const gastosElement = document.getElementById('gastos');
const totalElement = document.getElementById('total');

// Cargar los datos del balance desde localStorage
function loadBalance() {
    const savedGanancias = localStorage.getItem('ganancias');
    const savedGastos = localStorage.getItem('gastos');
    const savedTotal = localStorage.getItem('total');

    if (savedGanancias !== null) {
        gananciasElement.textContent = `+$${savedGanancias}`;
    } else {
        gananciasElement.textContent = `+$0`;
    };

    if (savedGastos !== null) {
        gastosElement.textContent = `-$${savedGastos}`;
    } else {
        gastosElement.textContent = `-$0`;
    };

    if (savedTotal !== null) {
        totalElement.textContent = `$${savedTotal}`;
    } else {
        totalElement.textContent = `$0`;
    };
};

// Función para guardar el balance en LocalStorage //
function saveBalance(ganancias, gastos, total) {
    localStorage.setItem('ganancias', ganancias);
    localStorage.setItem('gastos', gastos);
    localStorage.setItem('total', total);
};


//Comienzo funcionalidad CATEGORIAS //
// Obtener elementos del DOM
const listaCategorias = document.getElementById('lista-categorias');
const inputCategoriaNombre = document.getElementById('categoria-nombre');
const botonAgregarCategoria = document.getElementById('agregar-categoria');
const botonAgregarOperacion = document.getElementById('agregar-operacion');

let categorias = obtenerCategorias();
let categoriaEditando = null; 

// Función para obtener categorías del almacenamiento local
function obtenerCategorias() {
    const categoriasGuardadas = localStorage.getItem('categorias');
    return categoriasGuardadas ? JSON.parse(categoriasGuardadas) : [];
}

// Función para guardar categorías en el almacenamiento local
function guardarCategorias(categorias) {
    localStorage.setItem('categorias', JSON.stringify(categorias));
}

// Función para renderizar categorías
function renderizarCategorias() {
    listaCategorias.innerHTML = '';
    categorias.forEach((categoria) => {
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center mb-2';
        li.innerHTML = `
            <span class="bg-teal-200 text-gray-500 px-4 py-1 rounded-lg">${categoria.nombre}</span>
            <div>
                <a href="#" class="text-blue-500 mr-4" id="editar-categoria-${categoria.nombre}">Editar</a>
                <a href="#" class="text-red-500" id="eliminar-categoria-${categoria.nombre}">Eliminar</a>
            </div>
        `;
        listaCategorias.appendChild(li);
    });
}

// Función para mostrar el formulario de edición
function mostrarFormularioEdicion(categoria) {
    inputCategoriaNombre.value = categoria.nombre;
    categoriaEditando = categoria;
}

// Función para ocultar el formulario de edición
function ocultarFormularioEdicion() {
    inputCategoriaNombre.value = '';
    categoriaEditando = null;
}

// Función para manejar el clic en editar o eliminar
listaCategorias.addEventListener('click', (e) => {
    if (e.target.id.startsWith('editar-categoria-')) {
        const nombreCategoriaAntiguo = e.target.id.replace('editar-categoria-', '');
        const categoria = categorias.find(c => c.nombre === nombreCategoriaAntiguo);
        if (categoria) {
            mostrarFormularioEdicion(categoria);
        }
    } else if (e.target.id.startsWith('eliminar-categoria-')) {
        const nombreCategoria = e.target.id.replace('eliminar-categoria-', '');
        categorias = categorias.filter(categoria => categoria.nombre !== nombreCategoria);
        guardarCategorias(categorias);
        renderizarCategorias();
    }
});

// Función para agregar o actualizar categoría
botonAgregarCategoria.addEventListener('click', () => {
    const nombreCategoria = inputCategoriaNombre.value.trim();
    if (nombreCategoria) {
        if (categoriaEditando) {
            categoriaEditando.nombre = nombreCategoria;
            categoriaEditando = null;
        } else {
            categorias.push({ nombre: nombreCategoria });
        }
        inputCategoriaNombre.value = '';
        guardarCategorias(categorias);
        renderizarCategorias();
    }
});

// Renderizar categorías al inicio
renderizarCategorias();


// FUNCIONALIDAD DE LA CARD DE NUEVA OPERACION (FUNCIONA POR CONSOLA)//
// botonAgregarOperacion.addEventListener('click', function() {
//     let operaciones = []
//     if(localStorage.getItem('operaciones')) {
//         operaciones = JSON.parse(localStorage.getItem('operaciones'))
//         console.log('huehuehuehu')
//     }
  
//     const descripcion = document.querySelector('#descripcion-operacion').value
//     const monto = Number(document.querySelector('#monto-operacion').value)
//     const tipo = document.querySelector('#tipo-operacion').value
//     const categoria = document.querySelector('#categoria-operacion').value
//     const fecha = document.querySelector('#fecha-operacion').value
  
//     const nuevaOperacion = {
//         id: idAleatorio(),
//         descripcion,
//         tipo,
//         monto,
//         categoria,
//         fecha,
//      }
//     operaciones = [...operaciones,nuevaOperacion]
//     localStorage.setItem('operaciones',JSON.stringify(operaciones))
//   });


// // Función para agregar categoría
// botonAgregarCategoria.addEventListener('click', function() {
//   const nombreCategoria = inputCategoriaNombre.value.trim();
//   if (nombreCategoria) {
//     categorias.push({ nombre: nombreCategoria });
//     inputCategoriaNombre.value = '';
//     renderizarCategorias();
//     // Almacenar la lista de categorías en localStorage
//     localStorage.setItem('categorias', JSON.stringify(categorias));
//   }
// });

// function idAleatorio() {
//     return Math.floor(Math.random() * 10000);
//   }


// -------------------------------------------------------------------------------------------------------------------//
//FUNCIONALIDAD AGREGAR OPERACIONES - RESTA CORREGIR funcion de editar y recarga de pagina al ingresar nuevas operaciones //
document.addEventListener('DOMContentLoaded', () => {;

    const btnNuevaOperacion = document.getElementById('btn-nueva-operacion');
    const seccionOperacion = document.getElementById('seccion-operacion');
    const agregarOperacion = document.getElementById('agregar-operacion');
    const imagenSaving = document.getElementById('imagen-saving');
    const contenedorOperaciones = document.getElementById('conOperaciones');

    // Mostrar la sección de nueva operación al hacer clic en el botón
    btnNuevaOperacion.addEventListener('click', () => {
    seccionOperacion.classList.remove('hidden');
    });

    // Ocultar la sección de nueva operación al hacer clic en el botón de cancelar
    document.querySelector('.bg-gray-300').addEventListener('click', (event) => {
    event.preventDefault();
    seccionOperacion.classList.add('hidden');
    });

    // Función para agregar operación
    agregarOperacion.addEventListener('click', (event) => {
      event.preventDefault(); // Evita el envío del formulario

    const descripcion = document.getElementById('descripcion-operacion').value;
    const monto = document.getElementById('monto-operacion').value;
    const tipo = document.getElementById('tipo-operacion').value;
    const categoria = document.getElementById('categoria-operacion').value;
    const fecha = document.getElementById('fecha-operacion').value;
  
    console.log(descripcion, monto, tipo, categoria, fecha);

    if (descripcion && monto && tipo && categoria && fecha) {
        const operacion = {
        descripcion,
        monto,
        tipo,
        categoria,
        fecha
        };

        // Recuperar operaciones del Local Storage
        let operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];
        operaciones.push(operacion);
        localStorage.setItem('operaciones', JSON.stringify(operaciones));

        // Ocultar la sección de nueva operación
        seccionOperacion.classList.add('hidden');

        document.querySelector('form').reset();

        // Actualizar la vista
        mostrarOperaciones();
    } else {
        alert('Por favor, llená todos los campos.');
        }
    });

    // Función para mostrar operaciones desde Local Storage
    function mostrarOperaciones() {
        const operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];
      contenedorOperaciones.innerHTML = ''; // Limpiar el contenedor

    if (operaciones.length === 0) {
        imagenSaving.classList.remove('hidden');
    } else {
        imagenSaving.classList.add('hidden');
        operaciones.forEach((operacion, index) => {
        const operacionHTML = `
            <div class="flex flex-row gap-9 mb-4">
            <div class="flex flex-col">
                <h4 class="font-bold text-gray-700">Descripción</h4>
                <div>
                <span>${operacion.descripcion}</span>
                </div>
            </div>
            <div class="flex flex-col">
                <h4 class="font-bold text-gray-700">Categoría</h4>
                <div>
                <span>${operacion.categoria}</span>
                </div>
            </div>
            <div class="flex flex-col">
                <h4 class="font-bold text-gray-700">Fecha</h4>
                <div>
                <span>${operacion.fecha}</span>
                </div>
            </div>
            <div class="flex flex-col">
                <h4 class="font-bold text-gray-700">Monto</h4>
                <div>
                <span>${operacion.monto}</span>
                </div>
            </div>
            <div class="flex flex-col">
                <h4 class="font-bold text-gray-700">Acciones</h4>
                <div>
                <button class="editar" data-index="${index}">editar</button>
                <button class="borrar" data-index="${index}">borrar</button>
                </div>
            </div>
            </div>
        `;
        contenedorOperaciones.insertAdjacentHTML('beforeend', operacionHTML);
        });
        
        // Agregar funcionalidad para editar y borrar
        document.querySelectorAll('.editar').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            // corregir a input //
            alert("editar operación");
        });
        });

        document.querySelectorAll('.borrar').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            eliminarOperacion(index);
        });
        });
    }
    }

    // Función para eliminar una operación
    function eliminarOperacion(index) {
      let operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];
      operaciones.splice(index, 1);
      localStorage.setItem('operaciones', JSON.stringify(operaciones));
      mostrarOperaciones();
    }
  
    // Mostrar operaciones al cargar la página
    mostrarOperaciones();
  });
