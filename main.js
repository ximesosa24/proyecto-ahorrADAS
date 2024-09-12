// Variables
const toggleBtn = document.getElementById('btn-reportes');
const card = document.getElementById('seccion-reportes');
const balance = document.getElementById('seccion-balance');
const operaciones = document.getElementById('seccion-operaciones');
const filtros = document.getElementById ('seccion-filtros');
const resumenReportes = document.getElementById ('reporteResumen');
const reporteCategorías = document.getElementById ('reporteCategorías');
const reporteMes = document.getElementById ('reporteMes');


// Mostrar solo reportes //
toggleBtn.addEventListener('click', function () {
  card.classList.remove('hidden');
  balance.classList.add('hidden'); 
  operaciones.classList.add('hidden');
  filtros.classList.add('hidden');
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
const seccionOperacion = document.getElementById('seccion-operacion'); 
const seccionOperaciones = document.getElementById('seccion-operaciones'); 

nuevaOperacionBtn.addEventListener('click', function () {
    operacion.classList.remove('hidden'); 
    balance.classList.add('hidden');       
    reportes.classList.add('hidden');     
    filtros.classList.add('hidden');       
    seccionOperacion.classList.remove('hidden'); 
    seccionOperaciones.classList.add('hidden');  
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
});

//Variables//
const balanceBtn = document.getElementById ('btn-balance');
const filtrosCard = document.getElementById ('seccion-filtros');
// Mostrar balance//
balanceBtn.addEventListener('click', function() {
  balance.classList.remove('hidden');
  operaciones.classList.remove('hidden');
  filtrosCard.classList.remove('hidden'); 
  card.classList.add ('hidden');
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

