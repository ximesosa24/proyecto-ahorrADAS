//Menú hamburguesa//
//Variables//
const iconoAbrir = document.getElementById ('icono-bars');
const iconoCerrar = document.getElementById('icono-close');
const menuNav = document.getElementById('menu');

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

// Variables
const toggleBtn = document.getElementById('btn-reportes');
const card = document.getElementById('seccion-reportes');
const balance = document.getElementById('seccion-balance');
const operaciones = document.getElementById('seccion-operaciones');
const filtros = document.getElementById ('seccion-filtros');
const cardFiltros = document.getElementById ('card-filtros');
const resumenReportes = document.getElementById ('reporteResumen');
const reporteCategorías = document.getElementById ('reporteCategorías');
const reporteMes = document.getElementById ('reporteMes');


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

// Evento para actualizar el balance //
updateBalanceButton.addEventListener('click', function() {
    let currentGanancias = parseFloat(gananciasElement.textContent.replace('+$', '')) || 0;
    let currentGastos = parseFloat(gastosElement.textContent.replace('-$', '')) || 0;
    let newGanancias = currentGanancias + 10;
    let newGastos = currentGastos + 5;
    let newTotal = newGanancias - newGastos; 

    gananciasElement.textContent = `+$${newGanancias}`;
    gastosElement.textContent = `-$${newGastos}`;
    totalElement.textContent = `$${newTotal}`;

    saveBalance(newGanancias, newGastos, newTotal);
});


