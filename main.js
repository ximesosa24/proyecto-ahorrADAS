//Menú hamburguesa//
//Variables//
const iconoAbrir = document.getElementById ('icono-bars');
const iconoCerrar = document.getElementById('icono-close');
const menuNav = document.getElementById('menu');


const card = document.getElementById('seccion-reportes');
const reportes = document.getElementById('seccion-reportes');
const resumenReportes = document.getElementById ('reporteResumen');
const reporteCategorías = document.getElementById ('reporteCategorías');
const reporteMes = document.getElementById ('reporteMes');
const toggleBtn = document.getElementById('btn-reportes');


const balance = document.getElementById('seccion-balance');
const balanceBtn = document.getElementById ('btn-balance');


const operaciones = document.getElementById('seccion-operaciones');
const seccionOperaciones = document.getElementById('seccion-operaciones'); 
const operacion = document.getElementById('seccion-operacion');
const nuevaOperacionBtn = document.getElementById('btn-nueva-operacion'); 


const filtros = document.getElementById ('seccion-filtros');
const cardFiltros = document.getElementById ('card-filtros');
const btnToggleFiltros = document.getElementById('btn-toggle-filtros');
const filtroTipo = document.getElementById('filtro-tipo');
const filtroCategoria = document.getElementById('filtro-categoria');
const filtroFecha = document.getElementById('filtro-fecha');
const filtroOrdenar = document.getElementById('filtro-ordenar');



const seccionCategorias = document.getElementById('seccion-categorias');
const toggleCategoriasBtn = document.getElementById('btn-categorias');


const gananciasElement = document.getElementById('ganancias');
const gastosElement = document.getElementById('gastos');
const totalElement = document.getElementById('total');




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
  
  // Escuchar los cambios en los filtros
  filtroCategoria.addEventListener("change", filtroDatos);
  filtroTipo.addEventListener("change", filtroDatos);
  filtroFecha.addEventListener("change", filtroDatos);
  filtroOrdenar.addEventListener("change", filtroDatos);
  





//LocalStorage Balance//
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
botonAgregarOperacion.addEventListener('click', function() {
    let operaciones = []
    if(localStorage.getItem('operaciones')) {
        operaciones = JSON.parse(localStorage.getItem('operaciones'))
        console.log('huehuehuehu')
    }
  
    const descripcion = document.querySelector('#descripcion-operacion').value
    const monto = Number(document.querySelector('#monto-operacion').value)
    const tipo = document.querySelector('#tipo-operacion').value
    const categoria = document.querySelector('#categoria-operacion').value
    const fecha = document.querySelector('#fecha-operacion').value
  
    const nuevaOperacion = {
        id: idAleatorio(),
        descripcion,
        tipo,
        monto,
        categoria,
        fecha,
     }
    operaciones = [...operaciones,nuevaOperacion]
    localStorage.setItem('operaciones',JSON.stringify(operaciones))
  });


// Función para agregar categoría
botonAgregarCategoria.addEventListener('click', function() {
  const nombreCategoria = inputCategoriaNombre.value.trim();
  if (nombreCategoria) {
    categorias.push({ nombre: nombreCategoria });
    inputCategoriaNombre.value = '';
    renderizarCategorias();
    // Almacenar la lista de categorías en localStorage
    localStorage.setItem('categorias', JSON.stringify(categorias));
  }
});

function idAleatorio() {
    return Math.floor(Math.random() * 10000);
  }


// --