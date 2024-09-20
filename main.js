//Elementos del DOM
//Menú hamburguesa
const btnAbrirMenu = document.getElementById('icono-abrir-menu');
const btnCerrarMenu = document.getElementById('icono-cerrar-menu');
const menuNav = document.getElementById('menu');

//Botones de navegacion
const hrefMainScreen = document.getElementById('href-main-screen');
const hrefBalance = document.getElementById('href-balance');
const hrefCategorias = document.getElementById('href-categorias');
const hrefReportes = document.getElementById('href-reportes');
const hrefNuevaOperacion = document.getElementById('href-nueva-operacion');

//balance (pantallla principal)
//card balance
const cardBalance = document.getElementById('card-balance');
const totalGanancias = document.getElementById('total-ganancias');
const totalGastos = document.getElementById('total-gastos');
const totalBalance = document.getElementById('total-balance');
//card operaciones
const cardOperaciones = document.getElementById('card-operaciones');
const sinOperaciones = document.getElementById('sin-operaciones');
const listaOperaciones = document.getElementById('lista-operaciones');
//card filtros
const cardFiltros = document.getElementById('card-filtros');
const toggleFiltros = document.getElementById('toggle-filtros');
const formFiltros = document.getElementById('form-filtros');
const filtroTipo = document.getElementById('filtro-tipo');
const filtroCategoria = document.getElementById('filtro-categoria');
const filtroDesde = document.getElementById('filtro-desde');
const filtroHasta = document.getElementById('filtro-hasta');
const ordenarPor = document.getElementById('ordenar');

//nueva operacion
const seccionNuevaOperacion = document.getElementById('seccion-nueva-op');
const descripcionNuevaOp = document.getElementById('descripcion-nueva-op');
const montoNuevaOp = document.getElementById('monto-nueva-op');
const tipoNuevaOp = document.getElementById('tipo-nueva-op');
const categoriaNuevaOp = document.getElementById('categoria-nueva-op');
const fechaNuevaOp = document.getElementById('fecha-nueva-op');
const botonAgregarOperacion = document.getElementById('agregar-nueva-op');
const botonCancelarOperacion = document.getElementById('cancelar-nueva-op');

//categorías
const seccionCategorias = document.getElementById('seccion-categorias');
const listaCategorias = document.getElementById('lista-categorias');
const inputNuevaCategoria = document.getElementById('nueva-categoria-nombre');
const botonAgregarCategoria = document.getElementById('agregar-categoria');

//reportes
const seccionReportes = document.getElementById('seccion-reportes');
const reportesSinOperaciones = document.getElementById('reportes-sin-operaciones');
const resumenReportes = document.getElementById('reporte-resumen');
const reporteCategorias = document.getElementById('reporte-categorias');
const reporteMes = document.getElementById('reporte-mes');
const categoriaMayorGananciaNombre = document.getElementById('categoria-mayor-ganancia-nombre');
const categoriaMayorGananciaMonto = document.getElementById('categoria-mayor-ganancia-monto');
const categoriaMayorGastoNombre = document.getElementById('categoria-mayor-gasto-nombre');
const categoriaMayorGastoMonto = document.getElementById('categoria-mayor-gasto-monto');
const categoriaMejorBalanceNombre = document.getElementById('categoria-mayor-balance-nombre');
const categoriaMejorBalanceMonto = document.getElementById('categoria-mayor-balance-monto');
const mesMayorGananciaFecha = document.getElementById('mes-mayor-ganancia-fecha');
const mesMayorGananciaMonto = document.getElementById('mes-mayor-ganancia-monto');
const mesMayorGastoFecha = document.getElementById('mes-mayor-gasto-fecha');
const mesMayorGastoMonto = document.getElementById('mes-mayor-gasto-monto');

//Variables
let ocultarFiltros = false;
let editandoCategoria = null;
let editandoOperacion = null;
renderizarOperaciones();
renderizarBalance();
categoriasPorDefecto();
renderizarCategorias();
renderizarReportes();

//funciones de navegacion
function mostrarBalance() {
  renderizarOperaciones();
  renderizarBalance();
  cardBalance.classList.remove('hidden');
  cardFiltros.classList.remove('hidden');
  cardOperaciones.classList.remove('hidden');
  esconderNuevaOperacion();
  esconderCategorias();
  esconderReportes();
}

function mostrarNuevaOperacion() {

  descripcionNuevaOp.value = '';
  montoNuevaOp.value = '';
  tipoNuevaOp.value = '';
  categoriaNuevaOp.value = '';
  fechaNuevaOp.value = '';

  seccionNuevaOperacion.classList.remove('hidden');
  esconderBalance();
  esconderCategorias();
  esconderReportes();
}

function mostrarCategorias() {
  renderizarCategorias();
  seccionCategorias.classList.remove('hidden');
  esconderBalance();
  esconderNuevaOperacion();
  esconderReportes();
}

function mostrarReportes() {
  renderizarReportes();
  seccionReportes.classList.remove('hidden');
  esconderBalance();
  esconderNuevaOperacion();
  esconderCategorias();
}

function esconderBalance() {
  cardBalance.classList.add('hidden');
  cardFiltros.classList.add('hidden');
  cardOperaciones.classList.add('hidden');
}

function esconderNuevaOperacion() {
  seccionNuevaOperacion.classList.add('hidden');
}

function esconderCategorias() {
  seccionCategorias.classList.add('hidden');
}

function esconderReportes() {
  seccionReportes.classList.add('hidden');
}

function abrirMenu() {
  menuNav.classList.toggle("hidden");
  btnAbrirMenu.classList.add("hidden");
  btnCerrarMenu.classList.remove("hidden");
}

function cerrarMenu() {
  menuNav.classList.add("hidden");
  btnAbrirMenu.classList.remove("hidden");
  btnCerrarMenu.classList.add("hidden");
}

//CRUD de operaciones y categorias
function obtenerOperaciones() {
  const operaciones = localStorage.getItem('operaciones');
  return operaciones? JSON.parse(operaciones) : [];
}

function obtenerCategorias() {
  const categorias = localStorage.getItem('categorias');
  return categorias? JSON.parse(categorias) : [];
}

function guardarOperaciones(operaciones) {
  localStorage.setItem('operaciones', JSON.stringify([...operaciones]));
  renderizarOperaciones();
  renderizarReportes();
}

function guardarCategorias(categorias) {
  localStorage.setItem('categorias', JSON.stringify([...categorias]));
  renderizarCategorias();
}

function agregarOperacion(operacion) {
  const operaciones = obtenerOperaciones();
  guardarOperaciones([...operaciones,operacion]);
}

function agregarCategoria(categoria) {
  const categorias = obtenerCategorias();
  guardarCategorias([...categorias,{nombre:categoria}]);
  
}

function actualizarOperacion(operacion) {
  borrarOperacion(operacion.id);
  agregarOperacion(operacion);
}

function actualizarCategoria(index, nuevaCategoria) {
  let categorias = obtenerCategorias();
  categorias[index].nombre = nuevaCategoria;
  guardarCategorias(categorias);
}

function borrarOperacion(id) {
  const operaciones = obtenerOperaciones();
  const operacionesFiltradas = operaciones.filter(operacion => operacion.id !== id);
  guardarOperaciones([...operacionesFiltradas]);
}

function borrarCategoria(nombreCategoria) {
  const categorias = obtenerCategorias();
  const categoriasFiltradas = categorias.filter(categoria => categoria.nombre !== nombreCategoria);
  guardarCategorias([...categoriasFiltradas]);
}

//Renderizar operaciones por parámetro o todas
function renderizarOperaciones(operaciones) {
  if(!operaciones) {
    operaciones = obtenerOperaciones();
  }
  
  listaOperaciones.innerHTML = ''; // Limpiar el contenedor

  if (operaciones.length === 0) {
    sinOperaciones.classList.remove('hidden');
    listaOperaciones.classList.add('hidden');
    return;
  }
  sinOperaciones.classList.add('hidden');
  listaOperaciones.classList.remove('hidden');
  operaciones.forEach((operacion, index) => {
    const operacionHTML = `
      <div class="flex flex-row justify-evenly">
        <div class="flex flex-col">
            <h4 class="font-bold text-gray-700">ID</h4>
            <div>
            <span>${operacion.id}</span>
            </div>
        </div>
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
            <span>$${operacion.monto}</span>
            </div>
        </div>
        <div class="flex flex-col">
            <h4 class="font-bold text-gray-700">Acciones</h4>
            <div>
            <button class="editar-op text-blue-500 m-1" data-index="${index}">Editar</button>
            <button class="borrar-op text-red-500 m-1" data-index="${index}">Borrar</button>
            </div>
        </div>
      </div>
    `;
    listaOperaciones.insertAdjacentHTML('beforeend', operacionHTML);
  });

  //Funcion editar operacion
  document.querySelectorAll('.editar-op').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');

      //Recicla pantalla de nueva operacion para editar operacion
      mostrarNuevaOperacion();

      editandoOperacion = operaciones[index];
      descripcionNuevaOp.value = editandoOperacion.descripcion;
      montoNuevaOp.value = editandoOperacion.monto;
      tipoNuevaOp.value = editandoOperacion.tipo;
      categoriaNuevaOp.value = editandoOperacion.categoria;
      fechaNuevaOp.value = editandoOperacion.fecha;

      botonAgregarOperacion.textContent = "Actualizar Operación";
    });
  });

  //Funcion borrar operacion
  document.querySelectorAll('.borrar-op').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      const operaciones = obtenerOperaciones();
      borrarOperacion(operaciones[index].id);
    });
  });
  
}

function categoriasPorDefecto() {
  localStorage.removeItem('categorias');
  ['Comida','Educacion','Salidas','Trabajo','Transporte'].forEach(categoria=>
    agregarCategoria(categoria));
}

function renderizarCategorias() {

  //Lista de categorias en sección Categorias
  listaCategorias.innerHTML = '';
  const categorias = obtenerCategorias();
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

  //Filtro de categorías en sección Balance
  filtroCategoria.innerHTML = '<option selected value="TODOS">Todas</option>';
  categorias.forEach((categoria) => {
    const option = document.createElement('option');
    option.className = 'flex justify-between items-center mb-2';
    option.innerHTML = `
      <option value="${categoria.nombre}">${categoria.nombre}</option>
    `;
    filtroCategoria.appendChild(option);
  });

  //Selector de categorias en sección Agregar/Actualizar operación
  categoriaNuevaOp.innerHTML = '<option value="" disabled selected>Seleccione un tipo</option>';
  categorias.forEach((categoria) => {
    const option = document.createElement('option');
    option.className = 'flex justify-between items-center mb-2';
    option.innerHTML = `
      <option value="${categoria.nombre}">${categoria.nombre}</option>
    `;
    categoriaNuevaOp.appendChild(option);
  });
}

function renderizarReportes() {
  
  const operaciones = obtenerOperaciones();
  
  if(operaciones.length === 0) {
    reportesSinOperaciones.classList.remove('hidden');
    reporteMes.classList.add('hidden');
    reporteCategorias.classList.add('hidden');
    resumenReportes.classList.add('hidden');
    return;
  }

  reportesSinOperaciones.classList.add('hidden');
  reporteMes.classList.remove('hidden');
  reporteCategorias.classList.remove('hidden');
  resumenReportes.classList.remove('hidden');

  const categoriaMasGanancia = operaciones
    //Filtro operaciones por ganancia
    .filter(op=>op.tipo == 'ganancia')
    //Convierto las operaciones en una tabla de categoria y ganancia acumulada
    .reduce((ganXCat,op)=>{
      //Si no tengo la categoria en la tabla la añado con el monto de la operacion
      if(!ganXCat.map(elm=>elm.categoria).includes(op.categoria)) {
        ganXCat.push({categoria:op.categoria,monto:op.monto});
      //Si ya tengo la categoria en la tabla le sumo el monto de esta operacion
      } else {
        const index = ganXCat.findIndex(elm=>elm.categoria == op.categoria);
        ganXCat[index].monto += op.monto;
      }
      return ganXCat;
    },[])
    //Luego comparo los elementos de esta tabla para sacar la de mayor monto
    .reduce((masGan, cat) => {
      if (masGan.monto < cat.monto) masGan = cat;
      return masGan;
    }, {categoria: '', monto: 0});


  const categoriaMasGasto = operaciones.filter(op=>op.tipo == 'gasto')
    .reduce((gastXCat,op)=>{
      if(!gastXCat.map(elm=>elm.categoria).includes(op.categoria)) {
        gastXCat.push({categoria:op.categoria,monto:op.monto});
      } else {
        const index = gastXCat.findIndex(elm=>elm.categoria == op.categoria);
        gastXCat[index].monto += op.monto;
      }
      return gastXCat;
    },[])
    .reduce((masGast, cat) => {
      if (masGast.monto < cat.monto) masGast = cat;
      return masGast;
    }, {categoria: '', monto: 0});
    

  //Mismo comportamiento que categoriaMasGanancia pero validando el tipo y sumando o restando segun corresponde
  const categoriaMejorBalance = operaciones.reduce((balXCat,op)=>{
    if(!balXCat.map(elm=>elm.categoria).includes(op.categoria)) {
      if(op.tipo=='ganancia'){
        balXCat.push({categoria:op.categoria,monto:op.monto});
      } else {
        balXCat.push({categoria:op.categoria,monto:-op.monto});
      }
    } else {
      const index = balXCat.findIndex(elm=>elm.categoria == op.categoria);
      if(op.tipo=='ganancia'){
        balXCat[index].monto += op.monto;
      } else {
        balXCat[index].monto -= op.monto;
      }
    }
    return balXCat;
  },[])
  .reduce((mejBal, cat) => {
    if (mejBal.monto < cat.monto) mejBal = cat;
    return mejBal;
  }, {categoria: '', monto: 0});

  categoriaMayorGananciaNombre.textContent = categoriaMasGanancia.categoria;
  categoriaMayorGananciaMonto.textContent = categoriaMasGanancia.monto;
  categoriaMayorGastoNombre.textContent = categoriaMasGasto.categoria;
  categoriaMayorGastoMonto.textContent = categoriaMasGasto.monto;
  categoriaMejorBalanceNombre.textContent = categoriaMejorBalance.categoria;
  categoriaMejorBalanceMonto.textContent = categoriaMejorBalance.monto;

}

//Editar categoria
function mostrarFormularioEdicion(categoria) {
  inputNuevaCategoria.value = categoria.nombre;
  editandoCategoria = categoria;
}

//Dejar de editar categoria
function ocultarFormularioEdicion() {
  inputNuevaCategoria.value = '';
  categoriaEditando = null;
}

function renderizarBalance() {
  const operaciones = obtenerOperaciones();
  let ganancias = 0;
  let gastos = 0;

  operaciones.forEach((operacion) => {
    if (operacion.tipo === 'ganancia') {
      ganancias += parseFloat(operacion.monto);
    } else {
      gastos += parseFloat(operacion.monto);
    }
  });

  totalGanancias.textContent = `+$${ganancias.toFixed(2)}`;
  totalGastos.textContent = `-$${gastos.toFixed(2)}`;
  totalBalance.textContent = `$${(ganancias - gastos).toFixed(2)}`;
};

const filtrarYOrdenar = (e) => {
  const porCategoria = filtroCategoria.value;
  const porTipo = filtroTipo.value;
  const porFechaInicio = filtroDesde.value ? new Date(filtroDesde.value) : null;
  const porFechaFin = filtroHasta.value ? new Date(filtroHasta.value) : null;

  let operaciones = obtenerOperaciones();

  // Filtrar por fecha desde si se ha seleccionado una
  if (porFechaInicio) {
    operaciones = operaciones.filter(
      (operation) => new Date(operation.fecha) >= porFechaInicio
    );
  }

  // Filtrar por fecha hasta si se ha seleccionado una
  if (porFechaFin) {
    operaciones = operaciones.filter(
      (operation) => new Date(operation.fecha) <= porFechaFin
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
  if (ordenarPor.value === "MENOR MONTO") {
    operaciones = operaciones.sort((a, b) => Number(a.monto) - Number(b.monto));
  }
  if (ordenarPor.value === "MAYOR MONTO") {
    operaciones = operaciones.sort((a, b) => Number(b.monto) - Number(a.monto));
  }
  if (ordenarPor.value === "A/Z") {
    operaciones = operaciones.sort();
  }
  if (ordenarPor.value === "Z/A") {
    operaciones = operaciones.sort((a, b) => b.descripcion.toLowerCase().localeCompare(a.descripcion.toLowerCase()));
  }
  if (ordenarPor.value === "MAS RECIENTES") {
    operaciones = operaciones.sort(
      (a, b) => new Date(b.fecha) - new Date(a.fecha)
    );
  }
  if (ordenarPor.value === "MENOS RECIENTES") {
    operaciones = operaciones.sort(
      (a, b) => new Date(a.fecha) - new Date(b.fecha)
    );
  }

  return operaciones;
};

//Listeners
document.addEventListener('DOMContentLoaded', () => {

  //Menu
  btnAbrirMenu.addEventListener("click", abrirMenu);
  btnCerrarMenu.addEventListener("click", cerrarMenu);

  //Navegacion
  hrefMainScreen.addEventListener('click', mostrarBalance);
  hrefBalance.addEventListener('click', mostrarBalance);
  hrefNuevaOperacion.addEventListener('click', mostrarNuevaOperacion);
  hrefCategorias.addEventListener('click', mostrarCategorias);
  hrefReportes.addEventListener('click', mostrarReportes);

  //Filtros
  toggleFiltros.addEventListener('click', function () {
    if (ocultarFiltros) {
  
      formFiltros.classList.remove('hidden');
      toggleFiltros.textContent = 'Ocultar filtros';
  
    } else {
      formFiltros.classList.add('hidden');
      toggleFiltros.textContent = 'Mostrar filtros';
    }
    ocultarFiltros = !ocultarFiltros;
  });
  filtroCategoria.addEventListener("change",()=>{const ops = filtrarYOrdenar(); renderizarOperaciones(ops)});
  filtroTipo.addEventListener("change",()=>{const ops = filtrarYOrdenar(); renderizarOperaciones(ops)});
  filtroDesde.addEventListener("change",()=>{const ops = filtrarYOrdenar(); renderizarOperaciones(ops)});
  filtroHasta.addEventListener("change",()=>{const ops = filtrarYOrdenar(); renderizarOperaciones(ops)});
  ordenarPor.addEventListener("change",()=>{const ops = filtrarYOrdenar(); renderizarOperaciones(ops)});

  //Agregar operacion
  botonAgregarOperacion.addEventListener('click', (event) => {
    event.preventDefault(); // Evita el envío del formulario

    const descripcion = descripcionNuevaOp.value;
    const monto = Number(montoNuevaOp.value);
    const tipo = tipoNuevaOp.value;
    const categoria = categoriaNuevaOp.value;
    const fecha = fechaNuevaOp.value;

    if (!descripcion || !monto || !tipo || !categoria || !fecha) {
      alert('Por favor, llená todos los campos.');
      return;
    }

    if(editandoOperacion) {
      editandoOperacion.descripcion = descripcion;
      editandoOperacion.monto = monto;
      editandoOperacion.tipo = tipo;
      editandoOperacion.categoria = categoria;
      editandoOperacion.fecha = fecha;
      actualizarOperacion(editandoOperacion);
    } else {

      const id = Math.floor(Math.random() * (10000) + 1);

      const operacion = {
        id,
        descripcion,
        monto,
        tipo,
        categoria,
        fecha
      };

      agregarOperacion(operacion);
    }

    mostrarBalance();
  });

  // Función para manejar el clic en editar o eliminar
  listaCategorias.addEventListener('click', (e) => {
    const categorias = obtenerCategorias();
    if (e.target.id.startsWith('editar-categoria-')) {
      const nombreCategoria = e.target.id.replace('editar-categoria-', '');
      const categoria = categorias.find(c => c.nombre === nombreCategoria);
      if (categoria) {
        mostrarFormularioEdicion(categoria);
      }
    } else if (e.target.id.startsWith('eliminar-categoria-')) {
      const nombreCategoria = e.target.id.replace('eliminar-categoria-', '');
      borrarCategoria(nombreCategoria);
    }
  });

  // Función para agregar o actualizar categoría
  botonAgregarCategoria.addEventListener('click', () => {
    const nombreCategoria = inputNuevaCategoria.value.trim();
    if (!nombreCategoria) {
      return;
    }

    if(editandoCategoria) {
      borrarCategoria(editandoCategoria.nombre);
      editandoCategoria = null;
    }

    inputNuevaCategoria.value = '';
    agregarCategoria(nombreCategoria);
  });
});
