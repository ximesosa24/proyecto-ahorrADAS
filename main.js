//----------------------------------------Variables------------------------------------------------------------------------//
//Menú hamburguesa//
const iconoAbrir = document.getElementById ('icono-bars');
const iconoCerrar = document.getElementById('icono-close');
const menuNav = document.getElementById('menu');

//Reportes//
const card = document.getElementById('seccion-reportes');
const reportes = document.getElementById('seccion-reportes');
const resumenReportes = document.getElementById ('reporteResumen');
const reporteCategorías = document.getElementById ('reporteCategorías');
const reporteMes = document.getElementById ('reporteMes');
const toggleBtn = document.getElementById('btn-reportes');

//Balance//
const balance = document.getElementById('seccion-balance');
const balanceBtn = document.getElementById ('btn-balance');
const gananciasElement = document.getElementById('ganancias');
const gastosElement = document.getElementById('gastos');
const totalElement = document.getElementById('total');

//Operaciones//
const operaciones = document.getElementById('seccion-operaciones');
const seccionOperaciones = document.getElementById('seccion-operaciones'); 
const operacion = document.getElementById('seccion-operacion');
const nuevaOperacionBtn = document.getElementById('btn-nueva-operacion'); 

//filtros//
const filtros = document.getElementById ('seccion-filtros');
const cardFiltros = document.getElementById ('card-filtros');
const btnToggleFiltros = document.getElementById('btn-toggle-filtros');
const filtroTipo = document.getElementById('filtro-tipo');
const filtroCategoria = document.getElementById('filtro-categoria');
const filtroFecha = document.getElementById('filtro-fecha');
const filtroOrdenar = document.getElementById('filtro-ordenar');




//-------------------------------- CATEGORIAS --------------------------------------------------------------------------------//

//categorías
const seccionCategorias = document.getElementById('seccion-categorias');
const toggleCategoriasBtn = document.getElementById('btn-categorias');
const listaCategorias = document.getElementById('lista-categorias');
const inputCategoriaNombre = document.getElementById('categoria-nombre');
const botonAgregarCategoria = document.getElementById('agregar-categoria');
const botonAgregarOperacion = document.getElementById('agregar-operacion');


//*btn que solo muestra categorias*/
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

let categorias = obtenerCategorias();
let categoriaEditando = null; 

 // Función para obtener categorías del almacenamiento local
function obtenerCategorias() {
    const categoriasGuardadas = localStorage.getItem('categorias');
    return categoriasGuardadas ? JSON.parse(categoriasGuardadas) : [];
}

// // Función para guardar categorías en el almacenamiento local
function guardarCategorias(categorias) {
    localStorage.setItem('categorias', JSON.stringify(categorias));
}

// // Función para renderizar categorías
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

 //Renderizar categorías al inicio
renderizarCategorias();
//-------------------------------- fin CATEGORIAS --------------------------------------------------------------------------------//



//-------------------------------- MENÚ HAMBURGUESA --------------------------------------------------------------------------------//

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
//--------------------------------fin MENÚ HAMBURGUESA --------------------------------------------------------------------------------//



//-------------------------------- REPORTES -----------------------------------------------------------------------------------------//

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


//-------------------------------- fin REPORTES --------------------------------------------------------------------------------//




//-------------------------------- BALANCE ------------------------------------------------------------------------------------//

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


// Cargar los datos del balance desde localStorage
 function updateBalance() {
  const operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];
  let ganancias = 0;
  let gastos = 0;

  operaciones.forEach((operacion) => {
    if (operacion.tipo === 'ganancia') {
      ganancias += parseFloat(operacion.monto);
    } else {
      gastos += parseFloat(operacion.monto);
    }
  });

  gananciasElement.textContent = `+$${ganancias.toFixed(2)}`;
  gastosElement.textContent = `-$${gastos.toFixed(2)}`;
  totalElement.textContent = `$${(ganancias - gastos).toFixed(2)}`;
};
updateBalance();
//-------------------------------- fin BALANCE --------------------------------------------------------------------------------//

//-------------------------------- OPERACIONES --------------------------------------------------------------------------------//

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


//FUNCIONALIDAD AGREGAR OPERACIONES - RESTA CORREGIR funcion de recarga de pagina al enviar formulario//
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
      updateBalance();

    const descripcion = document.getElementById('descripcion-operacion').value;
    const monto = document.getElementById('monto-operacion').value;
    const tipo = document.getElementById('tipo-operacion').value;
    const categoria = document.getElementById('categoria-operacion').value;
    const fecha = document.getElementById('fecha-operacion').value;


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
            seccionOperacion.classList.remove('hidden');
            contenedorOperaciones.classList.add('hidden');
            cardFiltros.classList.add('hidden');
            balance.classList.add('hidden');
            const sectoroperaciones=document.getElementById('seccion-operaciones').classList.add('hidden');
        
            const operacion = operaciones[index];
            document.getElementById('descripcion-operacion').value = operacion.descripcion;
            document.getElementById('monto-operacion').value = operacion.monto;
            document.getElementById('tipo-operacion').value = operacion.tipo;
            document.getElementById('categoria-operacion').value = operacion.categoria;
            document.getElementById('fecha-operacion').value = operacion.fecha;
    
            //Cambiar el texto del botón "Agregar" a "Actualizar"
            const agregarBtn = document.getElementById('agregar-operacion');
            agregarBtn.textContent = "Actualizar Operación";
            agregarBtn.onclick = () => actualizarOperacion(index);
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
//--------------------------------fin OPERACIONES --------------------------------------------------------------------------------//

//-------------------------------- FILTROS --------------------------------------------------------------------------------//

// Escuchar los cambios en los filtros
filtroCategoria.addEventListener("change", filtroDatos);
filtroTipo.addEventListener("change", filtroDatos);
filtroFecha.addEventListener("change", filtroDatos);
filtroOrdenar.addEventListener("change", filtroDatos);

/*FUNCIONALIDAD FILTRAR Y ORDENAR*/
const obtenerOperaciones = () => {
  return JSON.parse(localStorage.getItem("operaciones-matematicas")) || [];
};

let operation = obtenerOperaciones();

const filtroDatos = (e) => {
  const porCategoria = filtroCategoria.value;
  const porTipo = filtroTipo.value;
  const porFecha = filtroFecha.value ? new Date(filtroFecha.value) : null;
  
  let operaciones = obtenerOperaciones();

  // Filtrar por fecha si se ha seleccionado una
  if (porFecha) {
    operaciones = operaciones.filter(
      (operation) => new Date(operation.fecha) >= porFecha
    );
  }
  // Filtrar por tipo de operación
  if (porTipo !== "TODOS") {
    operaciones = operaciones.filter(
      (operation) => operation.tipo === porTipo
    );
  }
  // Filtrar por categoría
  if (porCategoria !== "TODOS") {
    operaciones = operaciones.filter(
      (operation) => operation.categoria === porCategoria
    );
  }
  // Ordenar las operaciones
  if (filtroOrdenar.value === "MENOR MONTO") {
    operaciones = operaciones.sort((a, b) => Number(a.monto) - Number(b.monto));
  }
  if (filtroOrdenar.value === "MAYOR MONTO") {
    operaciones = operaciones.sort((a, b) => Number(b.monto) - Number(a.monto));
  }
  if (filtroOrdenar.value === "A/Z") {
    operaciones = operaciones.sort((a, b) => a.descripcion.toLowerCase().localeCompare(b.descripcion.toLowerCase()));
  }
  if (filtroOrdenar.value === "Z/A") {
    operaciones = operaciones.sort((a, b) => b.descripcion.toLowerCase().localeCompare(a.descripcion.toLowerCase()));
  }
  if (filtroOrdenar.value === "MAS RECIENTES") {
    operaciones = operaciones.sort(
      (a, b) => new Date(b.fecha) - new Date(a.fecha)
    );
  }

  if (filtroOrdenar.value === "MENOS RECIENTES") {
    operaciones = operaciones.sort(
      (a, b) => new Date(a.fecha) - new Date(b.fecha)
    );
  }
};

//ocultar filtros//
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
//-------------------------------- fin FILTROS --------------------------------------------------------------------------------//


