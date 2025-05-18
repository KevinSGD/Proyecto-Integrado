// Datos de ejemplo para el ERP
let clientes = [];
let consumos = [];
let habitaciones = [
    { numero: '101', tipo: 'Individual', tarifa: 100, disponible: true },
    { numero: '102', tipo: 'Individual', tarifa: 100, disponible: true },
    { numero: '201', tipo: 'Doble', tarifa: 150, disponible: true },
    { numero: '202', tipo: 'Doble', tarifa: 150, disponible: true },
    { numero: '301', tipo: 'Suite', tarifa: 250, disponible: true }
];

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos de localStorage si existen
    cargarDatos();
    
    // Inicializar navegación
    inicializarNavegacion();
    
    // Inicializar formularios y eventos
    inicializarFormularios();
    
    // Inicializar modales
    inicializarModales();
    
    // Actualizar dashboard
    actualizarDashboard();
    
    // Inicializar gráficos
    inicializarGraficos();
});

// Funciones de datos
function cargarDatos() {
    if (localStorage.getItem('hotel_clientes')) {
        clientes = JSON.parse(localStorage.getItem('hotel_clientes'));
    }
    
    if (localStorage.getItem('hotel_consumos')) {
        consumos = JSON.parse(localStorage.getItem('hotel_consumos'));
    }
    
    if (localStorage.getItem('hotel_habitaciones')) {
        habitaciones = JSON.parse(localStorage.getItem('hotel_habitaciones'));
    }
}

function guardarDatos() {
    localStorage.setItem('hotel_clientes', JSON.stringify(clientes));
    localStorage.setItem('hotel_consumos', JSON.stringify(consumos));
    localStorage.setItem('hotel_habitaciones', JSON.stringify(habitaciones));
}

// Navegación
function inicializarNavegacion() {
    const menuItems = document.querySelectorAll('.menu li');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const pagina = this.getAttribute('data-page');
            cambiarPagina(pagina);
            
            // Actualizar clase activa
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function cambiarPagina(pagina) {
    const paginas = document.querySelectorAll('.page');
    
    paginas.forEach(p => {
        p.style.display = 'none';
    });
    
    document.getElementById(pagina).style.display = 'block';
    
    // Actualizar datos específicos de la página
    if (pagina === 'dashboard') {
        actualizarDashboard();
    } else if (pagina === 'search') {
        actualizarTablaClientes('search-results', clientes.filter(c => c.estado !== 'Checkout'));
    } else if (pagina === 'history') {
        actualizarHistorial();
    } else if (pagina === 'reports') {
        actualizarReportes();
    }
}

// Dashboard
function actualizarDashboard() {
    // Actualizar estadísticas
    const totalClientes = clientes.length;
    const huespedActuales = clientes.filter(c => c.estado === 'Activo').length;
    
    const hoy = new Date();
    const primerDiaMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    
    const checkinsDelMes = clientes.filter(c => {
        const fechaCheckin = new Date(c.fechaCheckin);
        return fechaCheckin >= primerDiaMes && fechaCheckin <= hoy;
    }).length;
    
    const checkoutsDelMes = clientes.filter(c => {
        const fechaCheckout = new Date(c.fechaCheckout);
        return fechaCheckout >= primerDiaMes && fechaCheckout <= hoy && c.estado === 'Checkout';
    }).length;
    
    document.getElementById('total-clientes').textContent = totalClientes;
    document.getElementById('huespedes-actuales').textContent = huespedActuales;
    document.getElementById('checkins-mes').textContent = checkinsDelMes;
    document.getElementById('checkouts-mes').textContent = checkoutsDelMes;
    
    // Actualizar tabla de clientes recientes
    const clientesRecientes = [...clientes].sort((a, b) => {
        return new Date(b.fechaCheckin) - new Date(a.fechaCheckin);
    }).slice(0, 5);
    
    actualizarTablaClientes('clientes-recientes', clientesRecientes);
    
    // Actualizar tabla de consumos recientes
    const consumosRecientes = [...consumos].sort((a, b) => {
        return new Date(b.fecha) - new Date(a.fecha);
    }).slice(0, 5);
    
    actualizarTablaConsumos('consumos-recientes', consumosRecientes);
    
    // Actualizar gráfico de ocupación
    actualizarGraficoOcupacion();
}

function actualizarTablaClientes(tablaId, clientesData) {
    const tbody = document.querySelector(`#${tablaId} tbody`);
    tbody.innerHTML = '';
    
    if (clientesData.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="7" class="text-center">No hay clientes registrados</td>`;
        tbody.appendChild(tr);
        return;
    }
    
    clientesData.forEach(cliente => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${cliente.nombre}</td>
            <td>${cliente.documento}</td>
            <td>${cliente.habitacion || 'Sin asignar'}</td>
            <td>${formatearFecha(cliente.fechaCheckin) || 'N/A'}</td>
            <td>${formatearFecha(cliente.fechaCheckout) || 'N/A'}</td>
            <td>
                <span class="estado-badge ${cliente.estado.toLowerCase()}">${cliente.estado}</span>
            </td>
            <td>
                <button class="btn-action ver-cliente" data-id="${cliente.id}">
                    <i class="fas fa-eye"></i>
                </button>
                ${cliente.estado === 'Activo' ? `
                <button class="btn-action checkout-cliente" data-id="${cliente.id}">
                    <i class="fas fa-sign-out-alt"></i>
                </button>` : ''}
                <button class="btn-action editar-cliente" data-id="${cliente.id}">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
    
    // Agregar eventos a los botones
    document.querySelectorAll('.ver-cliente').forEach(btn => {
        btn.addEventListener('click', function() {
            const clienteId = this.getAttribute('data-id');
            abrirModalCliente(clienteId);
        });
    });
    
    document.querySelectorAll('.checkout-cliente').forEach(btn => {
        btn.addEventListener('click', function() {
            const clienteId = this.getAttribute('data-id');
            abrirModalCheckout(clienteId);
        });
    });
    
    document.querySelectorAll('.editar-cliente').forEach(btn => {
        btn.addEventListener('click', function() {
            const clienteId = this.getAttribute('data-id');
            editarCliente(clienteId);
        });
    });
}

function actualizarTablaConsumos(tablaId, consumosData) {
    const tbody = document.querySelector(`#${tablaId} tbody`);
    tbody.innerHTML = '';
    
    if (consumosData.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="5" class="text-center">No hay consumos registrados</td>`;
        tbody.appendChild(tr);
        return;
    }
    
    consumosData.forEach(consumo => {
        const cliente = clientes.find(c => c.id === consumo.clienteId);
        const nombreCliente = cliente ? cliente.nombre : 'Cliente desconocido';
        
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${formatearFecha(consumo.fecha)}</td>
            <td>${nombreCliente}</td>
            <td>${consumo.habitacion}</td>
            <td>${consumo.servicio}</td>
            <td>$${consumo.monto.toFixed(2)}</td>
        `;
        
        tbody.appendChild(tr);
    });
}

// Formularios
function inicializarFormularios() {
    // Formulario de check-in
    const formCheckin = document.getElementById('checkin-form');
    if (formCheckin) {
        formCheckin.addEventListener('submit', function(e) {
            e.preventDefault();
            realizarCheckin();
        });
        
        // Actualizar tipo de habitación al seleccionar habitación
        const selectHabitacion = document.getElementById('habitacion');
        const selectTipoHabitacion = document.getElementById('tipo-habitacion');
        const inputTarifa = document.getElementById('tarifa');
        
        selectHabitacion.addEventListener('change', function() {
            const habitacionNum = this.value;
            const habitacion = habitaciones.find(h => h.numero === habitacionNum);
            
            if (habitacion) {
                selectTipoHabitacion.value = habitacion.tipo.toLowerCase();
                inputTarifa.value = habitacion.tarifa;
                calcularTotalEstancia();
            } else {
                selectTipoHabitacion.value = '';
                inputTarifa.value = '';
            }
        });
        
        // Calcular total al cambiar fechas o tarifa
        const fechaCheckin = document.getElementById('fecha-checkin');
        const fechaCheckout = document.getElementById('fecha-checkout');
        
        fechaCheckin.addEventListener('change', calcularTotalEstancia);
        fechaCheckout.addEventListener('change', calcularTotalEstancia);
        
        // Mostrar campos de tarjeta según método de pago
        const metodoPago = document.getElementById('metodo-pago');
        const tarjetaContainer = document.getElementById('tarjeta-container');
        
        metodoPago.addEventListener('change', function() {
            if (this.value === 'tarjeta') {
                tarjetaContainer.style.display = 'block';
            } else {
                tarjetaContainer.style.display = 'none';
            }
        });
        
        // Botón cancelar
        document.getElementById('btn-cancelar-checkin').addEventListener('click', function() {
            formCheckin.reset();
            cambiarPagina('dashboard');
        });
        
        // Inicializar fecha de hoy
        const hoy = new Date().toISOString().split('T')[0];
        fechaCheckin.value = hoy;
        fechaCheckin.min = hoy;
        
        const manana = new Date();
        manana.setDate(manana.getDate() + 1);
        const mananaStr = manana.toISOString().split('T')[0];
        fechaCheckout.value = mananaStr;
        fechaCheckout.min = mananaStr;
    }
    
    // Formulario de búsqueda
    const btnSearch = document.getElementById('btn-search');
    if (btnSearch) {
        btnSearch.addEventListener('click', function() {
            buscarClientes();
        });
        
        // Filtros de búsqueda
        const filtros = document.querySelectorAll('.filter-options input');
        filtros.forEach(filtro => {
            filtro.addEventListener('change', buscarClientes);
        });
        
        // Búsqueda al presionar Enter
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                buscarClientes();
            }
        });
    }
    
    // Formulario de historial
    const btnFiltrarHistorial = document.getElementById('btn-filtrar-historial');
    if (btnFiltrarHistorial) {
        btnFiltrarHistorial.addEventListener('click', function() {
            actualizarHistorial();
        });
    }

    // Botón para agregar nuevo cliente
    const btnAddClient = document.getElementById('btn-add-client');
    if (btnAddClient) {
        btnAddClient.addEventListener('click', function() {
            abrirModalNuevoCliente();
        });
    }
    
    // Botones del modal de edición de cliente
    document.getElementById('btn-cancelar-edit-client').addEventListener('click', function() {
        document.getElementById('edit-client-modal').style.display = 'none';
    });
    
    document.getElementById('btn-guardar-edit-client').addEventListener('click', function() {
        guardarCliente();
    });
    
    // Cambiar estado en el formulario de edición
    const editEstado = document.getElementById('edit-estado');
    if (editEstado) {
        editEstado.addEventListener('change', function() {
            const fechasContainer = document.getElementById('edit-fechas-container');
            if (this.value === 'Registrado') {
                fechasContainer.style.display = 'none';
            } else {
                fechasContainer.style.display = 'flex';
            }
        });
    }
}

function calcularTotalEstancia() {
    const fechaCheckin = new Date(document.getElementById('fecha-checkin').value);
    const fechaCheckout = new Date(document.getElementById('fecha-checkout').value);
    const tarifa = parseFloat(document.getElementById('tarifa').value) || 0;
    
    if (fechaCheckin && fechaCheckout && tarifa) {
        const diffTime = Math.abs(fechaCheckout - fechaCheckin);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        const total = diffDays * tarifa;
        document.getElementById('total-estancia').value = `$${total.toFixed(2)}`;
    } else {
        document.getElementById('total-estancia').value = '';
    }
}

function realizarCheckin() {
    // Obtener datos del formulario
    const nombre = document.getElementById('nombre').value;
    const documento = document.getElementById('documento').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const nacionalidad = document.getElementById('nacionalidad').value;
    const direccion = document.getElementById('direccion').value;
    
    const habitacionNum = document.getElementById('habitacion').value;
    const fechaCheckin = document.getElementById('fecha-checkin').value;
    const fechaCheckout = document.getElementById('fecha-checkout').value;
    const numHuespedes = document.getElementById('num-huespedes').value;
    const tarifa = document.getElementById('tarifa').value;
    
    const metodoPago = document.getElementById('metodo-pago').value;
    const numTarjeta = document.getElementById('num-tarjeta').value;
    const deposito = parseFloat(document.getElementById('deposito').value);
    
    // Validar habitación disponible
    const habitacion = habitaciones.find(h => h.numero === habitacionNum);
    if (!habitacion.disponible) {
        alert('La habitación seleccionada no está disponible');
        return;
    }
    
    // Crear nuevo cliente
    const nuevoCliente = {
        id: Date.now().toString(),
        nombre,
        documento,
        telefono,
        email,
        nacionalidad,
        direccion,
        habitacion: habitacionNum,
        tipoHabitacion: habitacion.tipo,
        fechaCheckin,
        fechaCheckout,
        numHuespedes,
        tarifa: parseFloat(tarifa),
        metodoPago,
        numTarjeta: metodoPago === 'tarjeta' ? numTarjeta : '',
        deposito,
        pagado: deposito,
        estado: 'Activo',
        fechaRegistro: new Date().toISOString()
    };
    
    // Actualizar estado de la habitación
    habitacion.disponible = false;
    
    // Agregar cliente a la lista
    clientes.push(nuevoCliente);
    
    // Guardar datos
    guardarDatos();
    
    // Limpiar formulario y volver al dashboard
    document.getElementById('checkin-form').reset();
    cambiarPagina('dashboard');
    
    // Mostrar mensaje de éxito
    alert('Check-in realizado con éxito');
}

function buscarClientes() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filterActive = document.getElementById('filter-active').checked;
    const filterCheckout = document.getElementById('filter-checkout').checked;
    const filterAll = document.getElementById('filter-all').checked;
    
    let clientesFiltrados = [...clientes];
    
    // Filtrar por término de búsqueda
    if (searchTerm) {
        clientesFiltrados = clientesFiltrados.filter(cliente => 
            cliente.nombre.toLowerCase().includes(searchTerm) ||
            cliente.documento.toLowerCase().includes(searchTerm) ||
            cliente.habitacion.toLowerCase().includes(searchTerm)
        );
    }
    
    // Filtrar por estado
    if (!filterAll) {
        if (filterActive && !filterCheckout) {
            clientesFiltrados = clientesFiltrados.filter(cliente => cliente.estado === 'Activo');
        } else if (!filterActive && filterCheckout) {
            clientesFiltrados = clientesFiltrados.filter(cliente => cliente.estado === 'Checkout');
        } else if (filterActive && filterCheckout) {
            // Ambos filtros activos, no filtrar por estado
        } else {
            // Ningún filtro activo, mostrar todos
        }
    }
    
    // Actualizar tabla de resultados
    actualizarTablaClientes('search-results', clientesFiltrados);
}

function actualizarHistorial() {
    const fechaDesde = document.getElementById('history-fecha-desde').value;
    const fechaHasta = document.getElementById('history-fecha-hasta').value;
    
    let clientesFiltrados = [...clientes].filter(cliente => cliente.estado === 'Checkout');
    
    // Filtrar por fechas
    if (fechaDesde) {
        clientesFiltrados = clientesFiltrados.filter(cliente => 
            new Date(cliente.fechaCheckout) >= new Date(fechaDesde)
        );
    }
    
    if (fechaHasta) {
        clientesFiltrados = clientesFiltrados.filter(cliente => 
            new Date(cliente.fechaCheckout) <= new Date(fechaHasta)
        );
    }
    
    // Ordenar por fecha de checkout (más reciente primero)
    clientesFiltrados.sort((a, b) => new Date(b.fechaCheckout) - new Date(a.fechaCheckout));
    
    // Actualizar tabla de historial
    const tbody = document.querySelector('#historial-table tbody');
    tbody.innerHTML = '';
    
    if (clientesFiltrados.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="8" class="text-center">No hay registros en el historial</td>`;
        tbody.appendChild(tr);
        return;
    }
    
    clientesFiltrados.forEach(cliente => {
        const fechaCheckin = new Date(cliente.fechaCheckin);
        const fechaCheckout = new Date(cliente.fechaCheckout);
        const diffTime = Math.abs(fechaCheckout - fechaCheckin);
        const noches = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        // Calcular total (tarifa * noches + consumos)
        const consumosCliente = consumos.filter(c => c.clienteId === cliente.id);
        const totalConsumos = consumosCliente.reduce((sum, c) => sum + c.monto, 0);
        const totalEstancia = cliente.tarifa * noches;
        const total = totalEstancia + totalConsumos;
        
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${cliente.nombre}</td>
            <td>${cliente.documento}</td>
            <td>${cliente.habitacion}</td>
            <td>${formatearFecha(cliente.fechaCheckin)}</td>
            <td>${formatearFecha(cliente.fechaCheckout)}</td>
            <td>${noches}</td>
            <td>$${total.toFixed(2)}</td>
            <td>
                <button class="btn-action ver-cliente" data-id="${cliente.id}">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
    
    // Agregar eventos a los botones
    document.querySelectorAll('.ver-cliente').forEach(btn => {
        btn.addEventListener('click', function() {
            const clienteId = this.getAttribute('data-id');
            abrirModalCliente(clienteId);
        });
    });
}

// Modales
function inicializarModales() {
    // Cerrar modales al hacer clic en X
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
        });
    });
    
    // Cerrar modales al hacer clic fuera del contenido
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
    
    // Modal de cliente
    document.getElementById('btn-add-consumo').addEventListener('click', function() {
        const clienteId = this.getAttribute('data-cliente-id');
        abrirModalConsumo(clienteId);
    });
    
    document.getElementById('btn-checkout').addEventListener('click', function() {
        const clienteId = this.getAttribute('data-cliente-id');
        abrirModalCheckout(clienteId);
    });
    
    // Modal de consumo
    document.getElementById('btn-cancelar-consumo').addEventListener('click', function() {
        document.getElementById('consumo-modal').style.display = 'none';
    });
    
    document.getElementById('btn-guardar-consumo').addEventListener('click', function() {
        guardarConsumo();
    });
    
    // Modal de checkout
    document.getElementById('btn-cancelar-checkout').addEventListener('click', function() {
        document.getElementById('checkout-modal').style.display = 'none';
    });
    
    document.getElementById('btn-completar-checkout').addEventListener('click', function() {
        completarCheckout();
    });
    
    // Mostrar campos de tarjeta según método de pago en checkout
    const checkoutMetodoPago = document.getElementById('checkout-metodo-pago');
    const checkoutTarjetaContainer = document.getElementById('checkout-tarjeta-container');
    
    checkoutMetodoPago.addEventListener('change', function() {
        if (this.value === 'tarjeta') {
            checkoutTarjetaContainer.style.display = 'block';
        } else {
            checkoutTarjetaContainer.style.display = 'none';
        }
    });
}

function abrirModalCliente(clienteId) {
    const cliente = clientes.find(c => c.id === clienteId);
    if (!cliente) return;
    
    // Llenar datos del cliente en el modal
    document.getElementById('modal-nombre').textContent = cliente.nombre;
    document.getElementById('modal-documento').textContent = cliente.documento;
    document.getElementById('modal-telefono').textContent = cliente.telefono;
    document.getElementById('modal-email').textContent = cliente.email;
    document.getElementById('modal-nacionalidad').textContent = cliente.nacionalidad;
    document.getElementById('modal-direccion').textContent = cliente.direccion;
    
    document.getElementById('modal-habitacion').textContent = cliente.habitacion;
    document.getElementById('modal-tipo-habitacion').textContent = cliente.tipoHabitacion;
    document.getElementById('modal-checkin').textContent = formatearFecha(cliente.fechaCheckin);
    document.getElementById('modal-checkout').textContent = formatearFecha(cliente.fechaCheckout);
    document.getElementById('modal-huespedes').textContent = cliente.numHuespedes;
    document.getElementById('modal-estado').textContent = cliente.estado;
    
    document.getElementById('modal-tarifa').textContent = `$${cliente.tarifa.toFixed(2)}`;
    
    // Calcular total de estancia
    const fechaCheckin = new Date(cliente.fechaCheckin);
    const fechaCheckout = new Date(cliente.fechaCheckout);
    const diffTime = Math.abs(fechaCheckout - fechaCheckin);
    const noches = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const totalEstancia = cliente.tarifa * noches;
    
    // Obtener consumos del cliente
    const consumosCliente = consumos.filter(c => c.clienteId === cliente.id);
    const totalConsumos = consumosCliente.reduce((sum, c) => sum + c.monto, 0);
    
    const total = totalEstancia + totalConsumos;
    const pendiente = total - cliente.pagado;
    
    document.getElementById('modal-total').textContent = `$${total.toFixed(2)}`;
    document.getElementById('modal-pagado').textContent = `$${cliente.pagado.toFixed(2)}`;
    document.getElementById('modal-pendiente').textContent = `$${pendiente.toFixed(2)}`;
    
    // Llenar tabla de consumos
    const tbodyConsumos = document.querySelector('#modal-consumos tbody');
    tbodyConsumos.innerHTML = '';
    
    if (consumosCliente.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="3" class="text-center">No hay consumos registrados</td>`;
        tbodyConsumos.appendChild(tr);
    } else {
        consumosCliente.forEach(consumo => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${formatearFecha(consumo.fecha)}</td>
                <td>${consumo.servicio}</td>
                <td>$${consumo.monto.toFixed(2)}</td>
            `;
            tbodyConsumos.appendChild(tr);
        });
    }
    
    // Configurar botones según estado del cliente
    const btnCheckout = document.getElementById('btn-checkout');
    const btnAddConsumo = document.getElementById('btn-add-consumo');
    
    if (cliente.estado === 'Activo') {
        btnCheckout.style.display = 'block';
        btnAddConsumo.style.display = 'block';
    } else {
        btnCheckout.style.display = 'none';
        btnAddConsumo.style.display = 'none';
    }
    
    // Guardar ID del cliente en los botones
    btnCheckout.setAttribute('data-cliente-id', cliente.id);
    btnAddConsumo.setAttribute('data-cliente-id', cliente.id);
    
    // Mostrar modal
    document.getElementById('client-modal').style.display = 'block';
}

function abrirModalConsumo(clienteId) {
    const cliente = clientes.find(c => c.id === clienteId);
    if (!cliente) return;
    
    // Llenar datos del cliente en el modal
    document.getElementById('consumo-cliente').value = cliente.nombre;
    document.getElementById('consumo-cliente-id').value = cliente.id;
    document.getElementById('consumo-habitacion').value = cliente.habitacion;
    
    // Limpiar campos de consumo
    document.getElementById('consumo-servicio').value = '';
    document.getElementById('consumo-descripcion').value = '';
    document.getElementById('consumo-monto').value = '';
    
    // Mostrar modal
    document.getElementById('consumo-modal').style.display = 'block';
    
    // Cerrar modal de cliente
    document.getElementById('client-modal').style.display = 'none';
}

function guardarConsumo() {
    const clienteId = document.getElementById('consumo-cliente-id').value;
    const habitacion = document.getElementById('consumo-habitacion').value;
    const servicio = document.getElementById('consumo-servicio').value;
    const descripcion = document.getElementById('consumo-descripcion').value;
    const monto = parseFloat(document.getElementById('consumo-monto').value);
    
    // Validar campos
    if (!servicio || !descripcion || isNaN(monto) || monto <= 0) {
        alert('Por favor complete todos los campos correctamente');
        return;
    }
    
    // Crear nuevo consumo
    const nuevoConsumo = {
        id: Date.now().toString(),
        clienteId,
        habitacion,
        servicio,
        descripcion,
        monto,
        fecha: new Date().toISOString()
    };
    
    // Agregar consumo a la lista
    consumos.push(nuevoConsumo);
    
    // Guardar datos
    guardarDatos();
    
    // Cerrar modal
    document.getElementById('consumo-modal').style.display = 'none';
    
    // Actualizar dashboard
    actualizarDashboard();
    
    // Mostrar mensaje de éxito
    alert('Consumo registrado con éxito');
}

function abrirModalCheckout(clienteId) {
    const cliente = clientes.find(c => c.id === clienteId);
    if (!cliente) return;
    
    // Llenar datos del cliente en el modal
    document.getElementById('checkout-cliente').textContent = cliente.nombre;
    document.getElementById('checkout-habitacion').textContent = cliente.habitacion;
    document.getElementById('checkout-checkin').textContent = formatearFecha(cliente.fechaCheckin);
    document.getElementById('checkout-checkout').textContent = formatearFecha(cliente.fechaCheckout);
    
    // Calcular noches
    const fechaCheckin = new Date(cliente.fechaCheckin);
    const fechaCheckout = new Date(cliente.fechaCheckout);
    const diffTime = Math.abs(fechaCheckout - fechaCheckin);
    const noches = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    document.getElementById('checkout-noches').textContent = noches;
    document.getElementById('checkout-tarifa').textContent = `$${cliente.tarifa.toFixed(2)}`;
    
    // Calcular cargo por habitación
    const cargoHabitacion = cliente.tarifa * noches;
    document.querySelector('#cargo-habitacion .monto').textContent = `$${cargoHabitacion.toFixed(2)}`;
    
    // Obtener consumos del cliente
    const consumosCliente = consumos.filter(c => c.clienteId === cliente.id);
    
    // Llenar tabla de cargos
    const tbodyCargos = document.querySelector('#checkout-cargos tbody');
    
    // Limpiar filas de consumos anteriores
    const filasCargos = tbodyCargos.querySelectorAll('tr:not(#cargo-habitacion)');
    filasCargos.forEach(fila => fila.remove());
    
    // Agregar consumos a la tabla
    let totalConsumos = 0;
    
    consumosCliente.forEach(consumo => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${consumo.servicio} - ${consumo.descripcion}</td>
            <td class="monto">$${consumo.monto.toFixed(2)}</td>
        `;
        tbodyCargos.appendChild(tr);
        
        totalConsumos += consumo.monto;
    });
    
    // Calcular totales
    const total = cargoHabitacion + totalConsumos;
    const pagado = cliente.pagado;
    const pendiente = total - pagado;
    
    document.getElementById('checkout-total').textContent = `$${total.toFixed(2)}`;
    document.getElementById('checkout-pagado').textContent = `$${pagado.toFixed(2)}`;
    document.getElementById('checkout-pendiente').textContent = `$${pendiente.toFixed(2)}`;
    
    // Configurar monto a pagar
    document.getElementById('checkout-monto-pago').value = pendiente.toFixed(2);
    
    // Guardar ID del cliente en el botón de completar checkout
    document.getElementById('btn-completar-checkout').setAttribute('data-cliente-id', cliente.id);
    document.getElementById('btn-completar-checkout').setAttribute('data-total', total);
    
    // Mostrar modal
    document.getElementById('checkout-modal').style.display = 'block';
    
    // Cerrar modal de cliente si está abierto
    document.getElementById('client-modal').style.display = 'none';
}

function completarCheckout() {
    const clienteId = document.getElementById('btn-completar-checkout').getAttribute('data-cliente-id');
    const total = parseFloat(document.getElementById('btn-completar-checkout').getAttribute('data-total'));
    const metodoPago = document.getElementById('checkout-metodo-pago').value;
    const montoPago = parseFloat(document.getElementById('checkout-monto-pago').value);
    
    // Validar campos
    if (!metodoPago || isNaN(montoPago) || montoPago < 0) {
        alert('Por favor complete todos los campos correctamente');
        return;
    }
    
    // Buscar cliente
    const cliente = clientes.find(c => c.id === clienteId);
    if (!cliente) return;
    
    // Actualizar datos del cliente
    cliente.estado = 'Checkout';
    cliente.pagado += montoPago;
    cliente.fechaCheckoutReal = new Date().toISOString();
    
    // Liberar habitación
    const habitacion = habitaciones.find(h => h.numero === cliente.habitacion);
    if (habitacion) {
        habitacion.disponible = true;
    }
    
    // Guardar datos
    guardarDatos();
    
    // Cerrar modal
    document.getElementById('checkout-modal').style.display = 'none';
    
    // Actualizar dashboard
    actualizarDashboard();
    
    // Mostrar mensaje de éxito
    alert('Check-out realizado con éxito');
}

function editarCliente(clienteId) {
    const cliente = clientes.find(c => c.id === clienteId);
    if (!cliente) return;
    
    // Cambiar título del modal
    document.getElementById('edit-client-title').textContent = 'Editar Cliente';
    
    // Llenar formulario con datos del cliente
    document.getElementById('edit-client-id').value = cliente.id;
    document.getElementById('edit-nombre').value = cliente.nombre;
    document.getElementById('edit-documento').value = cliente.documento;
    document.getElementById('edit-telefono').value = cliente.telefono;
    document.getElementById('edit-email').value = cliente.email;
    document.getElementById('edit-nacionalidad').value = cliente.nacionalidad;
    document.getElementById('edit-direccion').value = cliente.direccion;
    
    // Cargar habitaciones disponibles
    cargarHabitacionesDisponibles('edit-habitacion', cliente.habitacion);
    
    // Establecer estado y fechas
    document.getElementById('edit-estado').value = cliente.estado;
    
    if (cliente.fechaCheckin) {
        document.getElementById('edit-fecha-checkin').value = cliente.fechaCheckin.split('T')[0];
    } else {
        document.getElementById('edit-fecha-checkin').value = '';
    }
    
    if (cliente.fechaCheckout) {
        document.getElementById('edit-fecha-checkout').value = cliente.fechaCheckout.split('T')[0];
    } else {
        document.getElementById('edit-fecha-checkout').value = '';
    }
    
    // Mostrar/ocultar fechas según estado
    const fechasContainer = document.getElementById('edit-fechas-container');
    if (cliente.estado === 'Registrado') {
        fechasContainer.style.display = 'none';
    } else {
        fechasContainer.style.display = 'flex';
    }
    
    // Mostrar modal
    document.getElementById('edit-client-modal').style.display = 'block';
}

// Función para abrir el modal de nuevo cliente
function abrirModalNuevoCliente() {
    // Cambiar título del modal
    document.getElementById('edit-client-title').textContent = 'Agregar Nuevo Cliente';
    
    // Limpiar formulario
    document.getElementById('edit-client-form').reset();
    document.getElementById('edit-client-id').value = '';
    
    // Cargar habitaciones disponibles
    cargarHabitacionesDisponibles('edit-habitacion');
    
    // Establecer estado por defecto
    document.getElementById('edit-estado').value = 'Registrado';
    
    // Ocultar fechas para cliente registrado
    document.getElementById('edit-fechas-container').style.display = 'none';
    
    // Mostrar modal
    document.getElementById('edit-client-modal').style.display = 'block';
}

// Función para cargar habitaciones disponibles en un select
function cargarHabitacionesDisponibles(selectId, habitacionActual = null) {
    const select = document.getElementById(selectId);
    
    // Limpiar opciones existentes excepto la primera
    while (select.options.length > 1) {
        select.remove(1);
    }
    
    // Filtrar habitaciones disponibles
    const habitacionesDisponibles = habitaciones.filter(h => 
        h.disponible || (habitacionActual && h.numero === habitacionActual)
    );
    
    // Agregar opciones al select
    habitacionesDisponibles.forEach(habitacion => {
        const option = document.createElement('option');
        option.value = habitacion.numero;
        option.textContent = `${habitacion.numero} - ${habitacion.tipo} ($${habitacion.tarifa})`;
        select.appendChild(option);
    });
    
    // Seleccionar habitación actual si existe
    if (habitacionActual) {
        select.value = habitacionActual;
    }
}

// Función para guardar cliente (nuevo o editado)
function guardarCliente() {
    // Obtener datos del formulario
    const clienteId = document.getElementById('edit-client-id').value;
    const nombre = document.getElementById('edit-nombre').value;
    const documento = document.getElementById('edit-documento').value;
    const telefono = document.getElementById('edit-telefono').value;
    const email = document.getElementById('edit-email').value;
    const nacionalidad = document.getElementById('edit-nacionalidad').value;
    const direccion = document.getElementById('edit-direccion').value;
    const habitacionNum = document.getElementById('edit-habitacion').value;
    const estado = document.getElementById('edit-estado').value;
    const fechaCheckin = document.getElementById('edit-fecha-checkin').value;
    const fechaCheckout = document.getElementById('edit-fecha-checkout').value;
    
    // Validar campos obligatorios
    if (!nombre || !documento || !telefono || !email || !nacionalidad || !direccion) {
        alert('Por favor complete todos los campos obligatorios');
        return;
    }
    
    // Validar fechas si el estado no es Registrado
    if (estado !== 'Registrado' && (!fechaCheckin || !fechaCheckout)) {
        alert('Las fechas de check-in y check-out son obligatorias para clientes activos o con checkout');
        return;
    }
    
    // Buscar habitación seleccionada
    const habitacion = habitacionNum ? habitaciones.find(h => h.numero === habitacionNum) : null;
    
    // Si es un cliente existente
    if (clienteId) {
        const cliente = clientes.find(c => c.id === clienteId);
        if (!cliente) return;
        
        // Guardar habitación anterior para actualizar disponibilidad
        const habitacionAnterior = cliente.habitacion;
        
        // Actualizar datos del cliente
        cliente.nombre = nombre;
        cliente.documento = documento;
        cliente.telefono = telefono;
        cliente.email = email;
        cliente.nacionalidad = nacionalidad;
        cliente.direccion = direccion;
        cliente.estado = estado;
        
        // Actualizar habitación si cambió
        if (habitacionNum !== cliente.habitacion) {
            // Liberar habitación anterior si tenía una
            if (habitacionAnterior) {
                const habAnterior = habitaciones.find(h => h.numero === habitacionAnterior);
                if (habAnterior) {
                    habAnterior.disponible = true;
                }
            }
            
            // Asignar nueva habitación
            cliente.habitacion = habitacionNum;
            
            // Actualizar disponibilidad de la nueva habitación
            if (habitacion && estado === 'Activo') {
                habitacion.disponible = false;
            }
        }
        
        // Actualizar fechas y datos de estancia si el estado lo requiere
        if (estado !== 'Registrado') {
            cliente.fechaCheckin = fechaCheckin ? new Date(fechaCheckin).toISOString() : null;
            cliente.fechaCheckout = fechaCheckout ? new Date(fechaCheckout).toISOString() : null;
            
            // Si tiene habitación asignada, actualizar tarifa
            if (habitacion) {
                cliente.tipoHabitacion = habitacion.tipo;
                cliente.tarifa = habitacion.tarifa;
            }
        }
    } else {
        // Es un cliente nuevo
        const nuevoCliente = {
            id: Date.now().toString(),
            nombre,
            documento,
            telefono,
            email,
            nacionalidad,
            direccion,
            estado,
            fechaRegistro: new Date().toISOString()
        };
        
        // Agregar datos de estancia si el estado lo requiere
        if (estado !== 'Registrado') {
            nuevoCliente.fechaCheckin = fechaCheckin ? new Date(fechaCheckin).toISOString() : null;
            nuevoCliente.fechaCheckout = fechaCheckout ? new Date(fechaCheckout).toISOString() : null;
            
            // Si tiene habitación asignada
            if (habitacion) {
                nuevoCliente.habitacion = habitacionNum;
                nuevoCliente.tipoHabitacion = habitacion.tipo;
                nuevoCliente.tarifa = habitacion.tarifa;
                
                // Actualizar disponibilidad de la habitación
                if (estado === 'Activo') {
                    habitacion.disponible = false;
                }
            }
            
            // Inicializar otros campos necesarios
            nuevoCliente.numHuespedes = 1;
            nuevoCliente.pagado = 0;
            nuevoCliente.deposito = 0;
        } else {
            // Cliente solo registrado
            nuevoCliente.habitacion = habitacionNum || '';
            
            // Si tiene habitación asignada
            if (habitacion) {
                nuevoCliente.tipoHabitacion = habitacion.tipo;
                nuevoCliente.tarifa = habitacion.tarifa;
            }
        }
        
        // Agregar cliente a la lista
        clientes.push(nuevoCliente);
    }
    
    // Guardar datos
    guardarDatos();
    
    // Cerrar modal
    document.getElementById('edit-client-modal').style.display = 'none';
    
    // Actualizar vista actual
    const paginaActual = document.querySelector('.menu li.active').getAttribute('data-page');
    cambiarPagina(paginaActual);
    
    // Mostrar mensaje de éxito
    alert('Cliente guardado con éxito');
}

// Gráficos
function inicializarGraficos() {
    actualizarGraficoOcupacion();
    
    // Si estamos en la página de reportes, inicializar los gráficos adicionales
    if (document.getElementById('reports').style.display !== 'none') {
        actualizarReportes();
    }
}

function actualizarGraficoOcupacion() {
    const ctx = document.getElementById('ocupacion-chart');
    
    // Contar habitaciones por tipo
    const tiposHabitacion = ['Individual', 'Doble', 'Suite'];
    const ocupadas = [0, 0, 0];
    const disponibles = [0, 0, 0];
    
    habitaciones.forEach(habitacion => {
        const index = tiposHabitacion.indexOf(habitacion.tipo);
        if (index !== -1) {
            if (habitacion.disponible) {
                disponibles[index]++;
            } else {
                ocupadas[index]++;
            }
        }
    });
    
    // Crear o actualizar gráfico
    if (window.ocupacionChart) {
        window.ocupacionChart.data.datasets[0].data = ocupadas;
        window.ocupacionChart.data.datasets[1].data = disponibles;
        window.ocupacionChart.update();
    } else {
        window.ocupacionChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: tiposHabitacion,
                datasets: [
                    {
                        label: 'Ocupadas',
                        data: ocupadas,
                        backgroundColor: '#1a237e',
                        borderColor: '#1a237e',
                        borderWidth: 1
                    },
                    {
                        label: 'Disponibles',
                        data: disponibles,
                        backgroundColor: '#90caf9',
                        borderColor: '#90caf9',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }
}

function actualizarReportes() {
    // Gráfico de ocupación mensual
    const ctxOcupacionMensual = document.getElementById('ocupacion-mensual-chart');
    
    // Obtener datos de los últimos 6 meses
    const meses = [];
    const ocupacionPorMes = [];
    
    const hoy = new Date();
    for (let i = 5; i >= 0; i--) {
        const mes = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
        const nombreMes = mes.toLocaleString('default', { month: 'short' });
        meses.push(nombreMes);
        
        // Contar clientes que estuvieron en el hotel ese mes
        const clientesEnMes = clientes.filter(cliente => {
            const fechaCheckin = new Date(cliente.fechaCheckin);
            const fechaCheckout = new Date(cliente.fechaCheckout);
            
            const inicioMes = new Date(mes.getFullYear(), mes.getMonth(), 1);
            const finMes = new Date(mes.getFullYear(), mes.getMonth() + 1, 0);
            
            return (fechaCheckin <= finMes && fechaCheckout >= inicioMes);
        });
        
        // Calcular porcentaje de ocupación
        const diasEnMes = new Date(mes.getFullYear(), mes.getMonth() + 1, 0).getDate();
        const habitacionesDias = habitaciones.length * diasEnMes;
        
        let diasOcupados = 0;
        clientesEnMes.forEach(cliente => {
            const fechaCheckin = new Date(cliente.fechaCheckin);
            const fechaCheckout = new Date(cliente.fechaCheckout);
            
            const inicioMes = new Date(mes.getFullYear(), mes.getMonth(), 1);
            const finMes = new Date(mes.getFullYear(), mes.getMonth() + 1, 0);
            
            const inicio = fechaCheckin < inicioMes ? inicioMes : fechaCheckin;
            const fin = fechaCheckout > finMes ? finMes : fechaCheckout;
            
            const diffTime = Math.abs(fin - inicio);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            diasOcupados += diffDays;
        });
        
        const porcentajeOcupacion = (diasOcupados / habitacionesDias) * 100;
        ocupacionPorMes.push(porcentajeOcupacion.toFixed(2));
    }
    
    new Chart(ctxOcupacionMensual, {
        type: 'line',
        data: {
            labels: meses,
            datasets: [{
                label: 'Ocupación (%)',
                data: ocupacionPorMes,
                backgroundColor: 'rgba(26, 35, 126, 0.2)',
                borderColor: '#1a237e',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
    
    // Gráfico de ingresos por tipo de habitación
    const ctxIngresosHabitacion = document.getElementById('ingresos-habitacion-chart');
    
    // Calcular ingresos por tipo de habitación
    const tiposHabitacion = ['Individual', 'Doble', 'Suite'];
    const ingresosPorTipo = [0, 0, 0];
    
    clientes.forEach(cliente => {
        const index = tiposHabitacion.indexOf(cliente.tipoHabitacion);
        if (index !== -1) {
            const fechaCheckin = new Date(cliente.fechaCheckin);
            const fechaCheckout = new Date(cliente.fechaCheckout);
            const diffTime = Math.abs(fechaCheckout - fechaCheckin);
            const noches = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            ingresosPorTipo[index] += cliente.tarifa * noches;
        }
    });
    
    new Chart(ctxIngresosHabitacion, {
        type: 'pie',
        data: {
            labels: tiposHabitacion,
            datasets: [{
                data: ingresosPorTipo,
                backgroundColor: [
                    '#1a237e',
                    '#303f9f',
                    '#3f51b5'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
    
    // Gráfico de consumos por categoría
    const ctxConsumosCategoria = document.getElementById('consumos-categoria-chart');
    
    // Calcular consumos por categoría
    const categorias = ['Restaurante', 'Bar', 'Spa', 'Lavandería', 'Minibar', 'Otro'];
    const consumosPorCategoria = [0, 0, 0, 0, 0, 0];
    
    consumos.forEach(consumo => {
        const index = categorias.indexOf(consumo.servicio);
        if (index !== -1) {
            consumosPorCategoria[index] += consumo.monto;
        } else {
            consumosPorCategoria[5] += consumo.monto; // Categoría "Otro"
        }
    });
    
    new Chart(ctxConsumosCategoria, {
        type: 'doughnut',
        data: {
            labels: categorias,
            datasets: [{
                data: consumosPorCategoria,
                backgroundColor: [
                    '#1a237e',
                    '#303f9f',
                    '#3f51b5',
                    '#5c6bc0',
                    '#7986cb',
                    '#9fa8da'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
    
    // Gráfico de estancia promedio
    const ctxEstanciaPromedio = document.getElementById('estancia-promedio-chart');
    
    // Calcular estancia promedio por mes
    const estanciaPromedioPorMes = [];
    
    for (let i = 5; i >= 0; i--) {
        const mes = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
        
        // Obtener clientes que hicieron checkout ese mes
        const clientesCheckoutMes = clientes.filter(cliente => {
            if (cliente.estado !== 'Checkout') return false;
            
            const fechaCheckout = new Date(cliente.fechaCheckout);
            return fechaCheckout.getMonth() === mes.getMonth() && 
                   fechaCheckout.getFullYear() === mes.getFullYear();
        });
        
        // Calcular estancia promedio
        let totalNoches = 0;
        clientesCheckoutMes.forEach(cliente => {
            const fechaCheckin = new Date(cliente.fechaCheckin);
            const fechaCheckout = new Date(cliente.fechaCheckout);
            const diffTime = Math.abs(fechaCheckout - fechaCheckin);
            const noches = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            totalNoches += noches;
        });
        
        const estanciaPromedio = clientesCheckoutMes.length > 0 ? 
            totalNoches / clientesCheckoutMes.length : 0;
        
        estanciaPromedioPorMes.push(estanciaPromedio.toFixed(1));
    }
    
    new Chart(ctxEstanciaPromedio, {
        type: 'bar',
        data: {
            labels: meses,
            datasets: [{
                label: 'Noches promedio',
                data: estanciaPromedioPorMes,
                backgroundColor: '#1a237e',
                borderColor: '#1a237e',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Configurar botones de exportación
    document.getElementById('btn-exportar-excel').addEventListener('click', function() {
        alert('Funcionalidad de exportación a Excel no implementada en esta versión');
    });
    
    document.getElementById('btn-exportar-pdf').addEventListener('click', function() {
        alert('Funcionalidad de exportación a PDF no implementada en esta versión');
    });
}

// Utilidades
function formatearFecha(fechaISO) {
    if (!fechaISO) return '';
    
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString();
}

// Inicializar la aplicación con algunos datos de ejemplo
function inicializarDatosEjemplo() {
    // Solo inicializar si no hay datos
    if (clientes.length === 0) {
        // Crear algunos clientes de ejemplo
        const hoy = new Date();
        const manana = new Date();
        manana.setDate(hoy.getDate() + 1);
        
        const pasadoManana = new Date();
        pasadoManana.setDate(hoy.getDate() + 2);
        
        const ayer = new Date();
        ayer.setDate(hoy.getDate() - 1);
        
        const cliente1 = {
            id: '1',
            nombre: 'Juan Pérez',
            documento: '12345678',
            telefono: '555-123-4567',
            email: 'juan@ejemplo.com',
            nacionalidad: 'Mexicana',
            direccion: 'Calle Principal 123',
            habitacion: '101',
            tipoHabitacion: 'Individual',
            fechaCheckin: ayer.toISOString(),
            fechaCheckout: pasadoManana.toISOString(),
            numHuespedes: 1,
            tarifa: 100,
            metodoPago: 'efectivo',
            numTarjeta: '',
            deposito: 100,
            pagado: 100,
            estado: 'Activo',
            fechaRegistro: ayer.toISOString()
        };
        
        const cliente2 = {
            id: '2',
            nombre: 'María González',
            documento: '87654321',
            telefono: '555-765-4321',
            email: 'maria@ejemplo.com',
            nacionalidad: 'Española',
            direccion: 'Avenida Central 456',
            habitacion: '201',
            tipoHabitacion: 'Doble',
            fechaCheckin: ayer.toISOString(),
            fechaCheckout: manana.toISOString(),
            numHuespedes: 2,
            tarifa: 150,
            metodoPago: 'tarjeta',
            numTarjeta: '1234-5678-9012-3456',
            deposito: 150,
            pagado: 150,
            estado: 'Activo',
            fechaRegistro: ayer.toISOString()
        };
        
        // Agregar clientes a la lista
        clientes.push(cliente1, cliente2);
        
        // Actualizar estado de las habitaciones
        habitaciones.find(h => h.numero === '101').disponible = false;
        habitaciones.find(h => h.numero === '201').disponible = false;
        
        // Crear algunos consumos de ejemplo
        const consumo1 = {
            id: '1',
            clienteId: '1',
            habitacion: '101',
            servicio: 'Restaurante',
            descripcion: 'Desayuno',
            monto: 15,
            fecha: hoy.toISOString()
        };
        
        const consumo2 = {
            id: '2',
            clienteId: '2',
            habitacion: '201',
            servicio: 'Bar',
            descripcion: 'Bebidas',
            monto: 25,
            fecha: hoy.toISOString()
        };
        
        // Agregar consumos a la lista
        consumos.push(consumo1, consumo2);
        
        // Guardar datos
        guardarDatos();
    }
}

// Inicializar datos de ejemplo al cargar la página
inicializarDatosEjemplo();