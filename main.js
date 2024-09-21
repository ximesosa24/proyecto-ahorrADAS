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
const categoriaMejorBalanceNombre = document.getElementById('categoria-mejor-balance-nombre');
const categoriaMejorBalanceMonto = document.getElementById('categoria-mejor-balance-monto');
const mesMayorGananciaFecha = document.getElementById('mes-mayor-ganancia-fecha');
const mesMayorGananciaMonto = document.getElementById('mes-mayor-ganancia-monto');
const mesMayorGastoFecha = document.getElementById('mes-mayor-gasto-fecha');
const mesMayorGastoMonto = document.getElementById('mes-mayor-gasto-monto');
const columnaTotalCategoriasNombre = document.getElementById('total-categorias-nombres');
const columnaTotalCategoriasGanancia = document.getElementById('total-categorias-ganancias');
const columnaTotalCategoriasGasto = document.getElementById('total-categorias-gastos');
const columnaTotalCategoriasBalance = document.getElementById('total-categorias-balances');
const columnaTotalMesPeriodo = document.getElementById('total-mes-periodo');
const columnaTotalMesGanancias = document.getElementById('total-mes-ganancias');
const columnaTotalMesGastos = document.getElementById('total-mes-gastos');
const columnaTotalMesBalance = document.getElementById('total-mes-balance');

//Variables
let ocultarFiltros = false;
let editandoCategoria = null;
let editandoOperacion = null;
let totalesPorCategoria = [];
let totalesPorMes = [];
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
      <div class="flex flex-col sm:flex sm:flex-row justify-evenly md:gap-2">
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

  totalesPorCategoria = [];
  totalesPorMes = [];

  //Creo listado de {categoria, ganancia, gasto, balance} y lo completo con las operaciones
  totalesPorCategoria = operaciones.reduce((listadoBalances,op)=>{

    //Si no tengo la categoria en el listado, añado el elemento con esta operacion como valor inicial
    if(!listadoBalances.map(elm=>elm.categoria).includes(op.categoria)) {
      if(op.tipo=='ganancia'){
        listadoBalances.push({categoria:op.categoria,ganancia:op.monto,gasto:0,balance:op.monto});
      } else {
        //Tipo gasto
        listadoBalances.push({categoria:op.categoria,ganancia:0,gasto:op.monto,balance:-op.monto});
      }

    //Si tengo la categoria en el listado, sumo su monto a los totales según corresponde
    } else {
      const index = listadoBalances.findIndex(elm=>elm.categoria == op.categoria);
      if(op.tipo=='ganancia'){
        listadoBalances[index].ganancia += op.monto;
        listadoBalances[index].balance += op.monto;
      } else {
        //Tipo gasto
        listadoBalances[index].gasto += op.monto;
        listadoBalances[index].balance -= op.monto;
      }
    }
    return listadoBalances;
  },[]);

  //Creo listado de {periodo (mm/yyyy), ganancia, gasto, balance} y lo completo con las operaciones
  totalesPorMes = operaciones.reduce((listadoBalances,op)=>{

    /*
      Para obtener una fecha mm/yyyy convierto la fecha en ISOString (2023-05-30T00:00:00.000Z)
      convierto en un arreglo usando el guión como separador y luego traigo los elementos que me interesan
    */
    const periodo =
      new Date(op.fecha).toISOString().split('-')[1] +
      '/' +
      new Date(op.fecha).toISOString().split('-')[0];

    //Si no tengo el mes en el listado, añado el elemento con esta operacion como valor inicial
    if(!listadoBalances.map(elm=>elm.periodo).includes(periodo)) {
      if(op.tipo=='ganancia'){
        listadoBalances.push({periodo:periodo,ganancia:op.monto,gasto:0,balance:op.monto});
      } else {
        //Tipo gasto
        listadoBalances.push({periodo:periodo,ganancia:0,gasto:op.monto,balance:-op.monto});
      }

    //Si tengo el mes en el listado, sumo su monto a los totales según corresponde
    } else {
      const index = listadoBalances.findIndex(elm=>elm.periodo == periodo);
      if(op.tipo=='ganancia'){
        listadoBalances[index].ganancia += op.monto;
        listadoBalances[index].balance += op.monto;
      } else {
        //Tipo gasto
        listadoBalances[index].gasto += op.monto;
        listadoBalances[index].balance -= op.monto;
      }
    }
    return listadoBalances;
  },[]);

  //Busco la categoria con mas ganancia iterando con un reduce
  const categoriaMasGanancia = totalesPorCategoria.reduce((masGanancia,categoria)=>{
    //Si la categoria actual tiene mayor ganancia que la del acumulador, devuelvo la categoria actual
    if(categoria.ganancia >= masGanancia.ganancia){
      return categoria;
    }
    return masGanancia;
  },{categoria:'',ganancia:0,gasto:0,balance:0});

  const categoriaMasGasto = totalesPorCategoria.reduce((masGasto,categoria)=>{
    if(categoria.gasto >= masGasto.gasto){
      return categoria;
    }
    return masGasto;
  },{categoria:'',ganancia:0,gasto:0,balance:0});

  const categoriaMejorBalance = totalesPorCategoria.reduce((mejorBalance,categoria)=>{
    if(categoria.balance >= mejorBalance.balance){
      return categoria;
    }
    return mejorBalance;
  },{categoria:'',ganancia:0,gasto:0,balance:0});

  const mesMasGanancia = totalesPorMes.reduce((masGanancia,mes)=>{
    //Si la categoria actual tiene mayor ganancia que la del acumulador, devuelvo la categoria actual
    if(mes.ganancia >= masGanancia.ganancia){
      return mes;
    }
    return masGanancia;
  },{periodo:'',ganancia:0,gasto:0,balance:0});

  const mesMasGasto = totalesPorMes.reduce((masGasto,mes)=>{
    if(mes.gasto >= masGasto.gasto){
      return mes;
    }
    return masGasto;
  },{periodo:'',ganancia:0,gasto:0,balance:0});

  categoriaMayorGananciaNombre.textContent = categoriaMasGanancia.categoria;
  categoriaMayorGananciaMonto.textContent = categoriaMasGanancia.ganancia;
  categoriaMayorGastoNombre.textContent = categoriaMasGasto.categoria;
  categoriaMayorGastoMonto.textContent = categoriaMasGasto.gasto;
  categoriaMejorBalanceNombre.textContent = categoriaMejorBalance.categoria;
  categoriaMejorBalanceMonto.textContent = categoriaMejorBalance.balance;
  mesMayorGananciaFecha.textContent = mesMasGanancia.periodo;
  mesMayorGananciaMonto.textContent = mesMasGanancia.ganancia;
  mesMayorGastoFecha.textContent = mesMasGasto.periodo;
  mesMayorGastoMonto.textContent = mesMasGasto.gasto;

  columnaTotalCategoriasNombre.innerHTML = '';
  columnaTotalCategoriasGanancia.innerHTML = '';
  columnaTotalCategoriasGasto.innerHTML = '';
  columnaTotalCategoriasBalance.innerHTML = '';
  columnaTotalMesPeriodo.innerHTML = '';
  columnaTotalMesGanancias.innerHTML = '';
  columnaTotalMesGastos.innerHTML = '';
  columnaTotalMesBalance.innerHTML = '';

  //Renderizando totales por categoría
  totalesPorCategoria.forEach(categoria=>{

    let spanCategoria = document.createElement('span');
    spanCategoria.textContent = categoria.categoria
    columnaTotalCategoriasNombre.appendChild(spanCategoria);
    
    let spanGanancia = document.createElement('span');
    spanGanancia.textContent = categoria.ganancia
    columnaTotalCategoriasGanancia.appendChild(spanGanancia);

    let spanGasto = document.createElement('span');
    spanGasto.textContent = categoria.gasto
    columnaTotalCategoriasGasto.appendChild(spanGasto);

    let spanBalance = document.createElement('span');
    spanBalance.textContent = categoria.balance
    columnaTotalCategoriasBalance.appendChild(spanBalance);
  });

  //Renderizado totales por mes
  totalesPorMes.forEach(periodo=>{

    let spanPeriodo = document.createElement('span');
    spanPeriodo.textContent = periodo.periodo
    columnaTotalMesPeriodo.appendChild(spanPeriodo);
    
    let spanGanancia = document.createElement('span');
    spanGanancia.textContent = periodo.ganancia
    columnaTotalMesGanancias.appendChild(spanGanancia);

    let spanGasto = document.createElement('span');
    spanGasto.textContent = periodo.gasto
    columnaTotalMesGastos.appendChild(spanGasto);

    let spanBalance = document.createElement('span');
    spanBalance.textContent = periodo.balance
    columnaTotalMesBalance.appendChild(spanBalance);
  });

}

//Editar categoria
function editarCategoria(categoria) {
  inputNuevaCategoria.value = categoria.nombre;
  editandoCategoria = categoria;
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
        editarCategoria(categoria);
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
