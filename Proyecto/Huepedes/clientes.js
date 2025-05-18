// Datos de ejemplo para clientes
let clientes = [
  {
      id: 1,
      nombre: "Juan Pérez",
      documento: "12345678",
      tipo: "Regular",
      ultimaVisita: "2023-11-15",
      estado: "Activo",
      email: "juan.perez@email.com",
      telefono: "555-1234",
      direccion: "Calle Principal 123"
  },
  {
      id: 2,
      nombre: "María González",
      documento: "87654321",
      tipo: "VIP",
      ultimaVisita: "2023-12-01",
      estado: "Activo",
      email: "maria.gonzalez@email.com",
      telefono: "555-5678",
      direccion: "Avenida Central 456"
  },
  {
      id: 3,
      nombre: "Carlos Rodríguez",
      documento: "23456789",
      tipo: "Corporativo",
      ultimaVisita: "2023-10-20",
      estado: "Inactivo",
      email: "carlos.rodriguez@empresa.com",
      telefono: "555-9012",
      direccion: "Plaza Empresarial 789"
  },
  {
      id: 4,
      nombre: "Ana Martínez",
      documento: "34567890",
      tipo: "Regular",
      ultimaVisita: "2023-11-28",
      estado: "Activo",
      email: "ana.martinez@email.com",
      telefono: "555-3456",
      direccion: "Calle Secundaria 234"
  },
  {
      id: 5,
      nombre: "Roberto Sánchez",
      documento: "45678901",
      tipo: "VIP",
      ultimaVisita: "2023-09-15",
      estado: "Pendiente",
      email: "roberto.sanchez@email.com",
      telefono: "555-7890",
      direccion: "Avenida Principal 567"
  }
];

// Datos de ejemplo para reservas
const reservas = [
  {
      clienteId: 1,
      fechaEntrada: "2023-11-15",
      fechaSalida: "2023-11-18",
      habitacion: "101",
      personas: 1,
      estado: "Completada",
      total: 450
  },
  {
      clienteId: 1,
      fechaEntrada: "2023-08-05",
      fechaSalida: "2023-08-10",
      habitacion: "201",
      personas: 2,
      estado: "Completada",
      total: 1250
  },
  {
      clienteId: 2,
      fechaEntrada: "2023-12-01",
      fechaSalida: "2023-12-05",
      habitacion: "202",
      personas: 3,
      estado: "En curso",
      total: 980
  },
  {
      clienteId: 2,
      fechaEntrada: "2023-10-15",
      fechaSalida: "2023-10-17",
      habitacion: "101",
      personas: 1,
      estado: "Completada",
      total: 350
  },
  {
      clienteId: 3,
      fechaEntrada: "2023-10-20",
      fechaSalida: "2023-10-25",
      habitacion: "201",
      personas: 2,
      estado: "Completada",
      total: 1100
  },
  {
      clienteId: 4,
      fechaEntrada: "2023-11-28",
      fechaSalida: "2023-11-30",
      habitacion: "102",
      personas: 2,
      estado: "Completada",
      total: 420
  },
  {
      clienteId: 5,
      fechaEntrada: "2023-09-15",
      fechaSalida: "2023-09-20",
      habitacion: "202",
      personas: 4,
      estado: "Cancelada",
      total: 0
  }
];

// Datos de ejemplo para consumos
const consumos = [
  {
      clienteId: 1,
      fecha: "2023-11-16",
      concepto: "Restaurante",
      cantidad: 1,
      precio: 45,
      total: 45
  },
  {
      clienteId: 1,
      fecha: "2023-11-17",
      concepto: "Minibar",
      cantidad: 2,
      precio: 12,
      total: 24
  },
  {
      clienteId: 2,
      fecha: "2023-12-02",
      concepto: "Spa",
      cantidad: 1,
      precio: 120,
      total: 120
  },
  {
      clienteId: 2,
      fecha: "2023-12-03",
      concepto: "Restaurante",
      cantidad: 2,
      precio: 65,
      total: 130
  },
  {
      clienteId: 3,
      fecha: "2023-10-22",
      concepto: "Servicio a la habitación",
      cantidad: 1,
      precio: 35,
      total: 35
  },
  {
      clienteId: 4,
      fecha: "2023-11-29",
      concepto: "Lavandería",
      cantidad: 1,
      precio: 25,
      total: 25
  }
];

// Función para cargar la tabla de clientes
function cargarTablaClientes(clientesFiltrados = null) {
  const tabla = document.getElementById('clients-table').getElementsByTagName('tbody')[0];
  const noResults = document.getElementById('no-results');
  
  // Limpiar tabla
  tabla.innerHTML = '';
  
  // Determinar qué datos mostrar
  const datosAMostrar = clientesFiltrados || clientes;
  
  if (datosAMostrar.length === 0) {
      noResults.classList.remove('hidden');
  } else {
      noResults.classList.add('hidden');
      
      // Agregar filas a la tabla
      datosAMostrar.forEach(cliente => {
          const fila = tabla.insertRow();
          
          // Nombre
          const celdaNombre = fila.insertCell();
          celdaNombre.textContent = cliente.nombre;
          
          // Documento
          const celdaDocumento = fila.insertCell();
          celdaDocumento.textContent = cliente.documento;
          
          // Tipo
          const celdaTipo = fila.insertCell();
          celdaTipo.textContent = cliente.tipo;
          
          // Última visita
          const celdaVisita = fila.insertCell();
          celdaVisita.textContent = formatearFecha(cliente.ultimaVisita);
          
          // Estado
          const celdaEstado = fila.insertCell();
          const spanEstado = document.createElement('span');
          spanEstado.textContent = cliente.estado;
          spanEstado.className = 'status';
          
          if (cliente.estado === 'Activo') {
              spanEstado.classList.add('active');
          } else if (cliente.estado === 'Inactivo') {
              spanEstado.classList.add('inactive');
          } else {
              spanEstado.classList.add('pending');
          }
          
          celdaEstado.appendChild(spanEstado);
          
          // Acciones
          const celdaAcciones = fila.insertCell();
          celdaAcciones.className = 'actions';
          
          // Botón de editar
          const btnEditar = document.createElement('button');
          btnEditar.innerHTML = '<i class="fas fa-edit"></i>';
          btnEditar.className = 'action-btn edit';
          btnEditar.title = 'Editar cliente';
          btnEditar.onclick = () => editarCliente(cliente.id);
          
          // Botón de historial
          const btnHistorial = document.createElement('button');
          btnHistorial.innerHTML = '<i class="fas fa-history"></i>';
          btnHistorial.className = 'action-btn history';
          btnHistorial.title = 'Ver historial';
          btnHistorial.onclick = () => verHistorial(cliente.id);
          
          // Botón de eliminar
          const btnEliminar = document.createElement('button');
          btnEliminar.innerHTML = '<i class="fas fa-trash-alt"></i>';
          btnEliminar.className = 'action-btn delete';
          btnEliminar.title = 'Eliminar cliente';
          btnEliminar.onclick = () => eliminarCliente(cliente.id);
          
          celdaAcciones.appendChild(btnEditar);
          celdaAcciones.appendChild(btnHistorial);
          celdaAcciones.appendChild(btnEliminar);
      });
  }
}

// Función para formatear fechas
function formatearFecha(fechaStr) {
  const fecha = new Date(fechaStr);
  return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
  });
}

// Función para buscar clientes
function buscarClientes() {
  const searchInput = document.getElementById('search-input').value.toLowerCase();
  const filterType = document.getElementById('filter-type').value;
  
  if (!searchInput) {
      cargarTablaClientes();
      return;
  }
  
  let clientesFiltrados;
  
  if (filterType === 'todos') {
      clientesFiltrados = clientes.filter(cliente => 
          cliente.nombre.toLowerCase().includes(searchInput) ||
          cliente.documento.toLowerCase().includes(searchInput) ||
          cliente.tipo.toLowerCase().includes(searchInput)
      );
  } else {
      clientesFiltrados = clientes.filter(cliente => 
          cliente[filterType].toLowerCase().includes(searchInput)
      );
  }
  
  cargarTablaClientes(clientesFiltrados);
}

// Función para abrir modal de registro
function abrirModalRegistro() {
  const modal = document.getElementById('register-modal');
  modal.style.display = 'block';
  
  // Limpiar formulario
  document.getElementById('register-form').reset();
  
  // Eliminar el ID del cliente en caso de que estuviera en modo edición
  document.getElementById('register-form').dataset.clienteId = '';
  
  // Cambiar el título del modal
  document.querySelector('#register-modal .modal-header h2').textContent = 'Registrar Nuevo Cliente';
}

// Función para abrir modal de check-in
function abrirModalCheckin() {
  const modal = document.getElementById('checkin-modal');
  modal.style.display = 'block';
  
  // Limpiar formulario
  document.getElementById('checkin-form').reset();
  
  // Cargar lista de clientes
  const selectCliente = document.getElementById('cliente-checkin');
  selectCliente.innerHTML = '<option value="">Seleccionar cliente...</option>';
  
  clientes.forEach(cliente => {
      const option = document.createElement('option');
      option.value = cliente.id;
      option.textContent = `${cliente.nombre} - ${cliente.documento}`;
      selectCliente.appendChild(option);
  });
  
  // Establecer fecha actual como predeterminada
  const hoy = new Date().toISOString().split('T')[0];
  document.getElementById('fecha-entrada').value = hoy;
  
  // Establecer fecha de salida predeterminada (día siguiente)
  const manana = new Date();
  manana.setDate(manana.getDate() + 1);
  document.getElementById('fecha-salida').value = manana.toISOString().split('T')[0];
}

// Función para ver historial de cliente
function verHistorial(clienteId) {
  const cliente = clientes.find(c => c.id === clienteId);
  if (!cliente) return;
  
  // Actualizar información del cliente en el modal
  document.getElementById('history-client-name').textContent = cliente.nombre;
  document.getElementById('history-client-doc').textContent = cliente.documento;
  document.getElementById('history-client-type').textContent = cliente.tipo;
  
  // Cargar reservas del cliente
  const reservasCliente = reservas.filter(r => r.clienteId === clienteId);
  const tablaReservas = document.getElementById('reservas-body');
  tablaReservas.innerHTML = '';
  
  if (reservasCliente.length === 0) {
      const fila = tablaReservas.insertRow();
      const celda = fila.insertCell();
      celda.colSpan = 6;
      celda.textContent = 'No hay reservas registradas';
      celda.style.textAlign = 'center';
  } else {
      reservasCliente.forEach(reserva => {
          const fila = tablaReservas.insertRow();
          
          fila.insertCell().textContent = formatearFecha(reserva.fechaEntrada);
          fila.insertCell().textContent = formatearFecha(reserva.fechaSalida);
          fila.insertCell().textContent = reserva.habitacion;
          fila.insertCell().textContent = reserva.personas;
          
          const celdaEstado = fila.insertCell();
          const spanEstado = document.createElement('span');
          spanEstado.textContent = reserva.estado;
          spanEstado.className = 'status';
          
          if (reserva.estado === 'Completada') {
              spanEstado.classList.add('active');
          } else if (reserva.estado === 'Cancelada') {
              spanEstado.classList.add('inactive');
          } else {
              spanEstado.classList.add('pending');
          }
          
          celdaEstado.appendChild(spanEstado);
          
          fila.insertCell().textContent = `$${reserva.total.toFixed(2)}`;
      });
  }
  
  // Cargar consumos del cliente
  const consumosCliente = consumos.filter(c => c.clienteId === clienteId);
  const tablaConsumos = document.getElementById('consumos-body');
  tablaConsumos.innerHTML = '';
  
  if (consumosCliente.length === 0) {
      const fila = tablaConsumos.insertRow();
      const celda = fila.insertCell();
      celda.colSpan = 5;
      celda.textContent = 'No hay consumos registrados';
      celda.style.textAlign = 'center';
  } else {
      consumosCliente.forEach(consumo => {
          const fila = tablaConsumos.insertRow();
          
          fila.insertCell().textContent = formatearFecha(consumo.fecha);
          fila.insertCell().textContent = consumo.concepto;
          fila.insertCell().textContent = consumo.cantidad;
          fila.insertCell().textContent = `$${consumo.precio.toFixed(2)}`;
          fila.insertCell().textContent = `$${consumo.total.toFixed(2)}`;
      });
  }
  
  // Mostrar modal
  document.getElementById('history-modal').style.display = 'block';
}

// Función para editar cliente
function editarCliente(clienteId) {
  const cliente = clientes.find(c => c.id === clienteId);
  if (!cliente) return;
  
  // Cambiar el título del modal
  document.querySelector('#register-modal .modal-header h2').textContent = 'Editar Cliente';
  
  // Llenar formulario con datos del cliente
  document.getElementById('nombre').value = cliente.nombre;
  document.getElementById('documento').value = cliente.documento;
  document.getElementById('tipo').value = cliente.tipo;
  document.getElementById('email').value = cliente.email;
  document.getElementById('telefono').value = cliente.telefono;
  document.getElementById('direccion').value = cliente.direccion;
  
  // Guardar ID del cliente para actualización
  document.getElementById('register-form').dataset.clienteId = clienteId;
  
  // Mostrar modal
  document.getElementById('register-modal').style.display = 'block';
}

// Función para eliminar cliente
function eliminarCliente(clienteId) {
  if (confirm('¿Está seguro de que desea eliminar este cliente? Esta acción no se puede deshacer.')) {
      clientes = clientes.filter(c => c.id !== clienteId);
      cargarTablaClientes();
  }
}

// Función para calcular el total de una reserva
function calcularTotal(fechaEntrada, fechaSalida, habitacion) {
  // Calcular días de estancia
  const entrada = new Date(fechaEntrada);
  const salida = new Date(fechaSalida);
  const dias = Math.max(1, Math.ceil((salida - entrada) / (1000 * 60 * 60 * 24)));
  
  // Precio por tipo de habitación
  let precioPorNoche;
  switch (habitacion) {
      case '101':
      case '102':
          precioPorNoche = 150;
          break;
      case '201':
          precioPorNoche = 250;
          break;
      case '202':
          precioPorNoche = 200;
          break;
      default:
          precioPorNoche = 150;
  }
  
  return dias * precioPorNoche;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Cargar tabla de clientes
  cargarTablaClientes();
  
  // Búsqueda y filtrado
  document.getElementById('search-btn').addEventListener('click', buscarClientes);
  document.getElementById('search-input').addEventListener('keyup', (e) => {
      if (e.key === 'Enter') buscarClientes();
  });
  document.getElementById('filter-type').addEventListener('change', buscarClientes);
  
  // Botón para agregar cliente
  document.getElementById('add-client-btn').addEventListener('click', abrirModalRegistro);
  
  // Enlace del menú para registrar cliente
  document.getElementById('registrar-cliente').addEventListener('click', (e) => {
      e.preventDefault();
      abrirModalRegistro();
  });
  
  // Botón para check-in
  document.getElementById('check-in').addEventListener('click', (e) => {
      e.preventDefault();
      abrirModalCheckin();
  });
  
  // Botón para historial
  document.getElementById('historial').addEventListener('click', (e) => {
      e.preventDefault();
      if (clientes.length > 0) {
          verHistorial(clientes[0].id);
      } else {
          alert('No hay clientes registrados');
      }
  });
  
  // Cerrar modales
  document.querySelectorAll('.close, .btn-secondary').forEach(element => {
      element.addEventListener('click', () => {
          document.querySelectorAll('.modal').forEach(modal => {
              modal.style.display = 'none';
          });
      });
  });
  
  // Botones específicos para cancelar en modales
  document.getElementById('cancel-register').addEventListener('click', () => {
      document.getElementById('register-modal').style.display = 'none';
  });
  
  document.getElementById('cancel-checkin').addEventListener('click', () => {
      document.getElementById('checkin-modal').style.display = 'none';
  });
  
  // Cambiar entre pestañas en el historial
  document.querySelectorAll('.tab-btn').forEach(tab => {
      tab.addEventListener('click', () => {
          // Desactivar todas las pestañas
          document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
          document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
          
          // Activar pestaña seleccionada
          tab.classList.add('active');
          document.getElementById(`${tab.dataset.tab}-tab`).classList.add('active');
      });
  });
  
  // Envío de formulario de registro
  document.getElementById('register-form').addEventListener('submit', (e) => {
      e.preventDefault();
      
      const clienteId = e.target.dataset.clienteId;
      const nuevoCliente = {
          nombre: document.getElementById('nombre').value,
          documento: document.getElementById('documento').value,
          tipo: document.getElementById('tipo').value,
          email: document.getElementById('email').value,
          telefono: document.getElementById('telefono').value,
          direccion: document.getElementById('direccion').value,
          ultimaVisita: new Date().toISOString().split('T')[0],
          estado: 'Activo'
      };
      
      if (clienteId) {
          // Actualizar cliente existente
          const index = clientes.findIndex(c => c.id === parseInt(clienteId));
          if (index !== -1) {
              nuevoCliente.id = parseInt(clienteId);
              nuevoCliente.ultimaVisita = clientes[index].ultimaVisita;
              nuevoCliente.estado = clientes[index].estado;
              clientes[index] = nuevoCliente;
              alert('Cliente actualizado correctamente');
          }
      } else {
          // Agregar nuevo cliente
          nuevoCliente.id = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;
          clientes.push(nuevoCliente);
          alert('Cliente registrado correctamente');
      }
      
      // Actualizar tabla y cerrar modal
      cargarTablaClientes();
      document.getElementById('register-modal').style.display = 'none';
  });
  
  // Envío de formulario de check-in
  document.getElementById('checkin-form').addEventListener('submit', (e) => {
      e.preventDefault();
      
      const clienteId = parseInt(document.getElementById('cliente-checkin').value);
      const habitacion = document.getElementById('habitacion').value;
      const fechaEntrada = document.getElementById('fecha-entrada').value;
      const fechaSalida = document.getElementById('fecha-salida').value;
      const numPersonas = parseInt(document.getElementById('num-personas').value);
      
      // Validar que se haya seleccionado un cliente
      if (!clienteId) {
          alert('Por favor seleccione un cliente');
          return;
      }
      
      // Crear nueva reserva
      const nuevaReserva = {
          clienteId,
          fechaEntrada,
          fechaSalida,
          habitacion,
          personas: numPersonas,
          estado: 'En curso',
          total: calcularTotal(fechaEntrada, fechaSalida, habitacion)
      };
      
      // Agregar reserva a la lista
      reservas.push(nuevaReserva);
      
      // Actualizar última visita del cliente
      const cliente = clientes.find(c => c.id === clienteId);
      if (cliente) {
          cliente.ultimaVisita = fechaEntrada;
          cliente.estado = 'Activo';
      }
      
      // Actualizar tabla y cerrar modal
      cargarTablaClientes();
      document.getElementById('checkin-modal').style.display = 'none';
      
      alert('Check-in completado con éxito');
  });
  
  // Cerrar modales al hacer clic fuera de ellos
  window.addEventListener('click', (e) => {
      document.querySelectorAll('.modal').forEach(modal => {
          if (e.target === modal) {
              modal.style.display = 'none';
          }
      });
  });
  
  // Prevenir comportamiento predeterminado en enlaces del menú
  document.querySelectorAll('.menu a').forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          
          // Remover clase active de todos los elementos del menú
          document.querySelectorAll('.menu li').forEach(item => {
              item.classList.remove('active');
          });
          
          // Agregar clase active al elemento padre del enlace clickeado
          link.parentElement.classList.add('active');
      });
  }); 
  
  // Botones de la parte inferior del menú
  document.querySelector('.btn-ventas').addEventListener('click', (e) => {
      e.preventDefault();
      alert('Redirigiendo al módulo de ventas...');
  });
  
  document.querySelector('.btn-cerrar').addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('¿Está seguro de que desea cerrar sesión?')) {
          alert('Sesión cerrada correctamente');
      }
  });
  
  // Enlace "Ver todos" en la tabla
  document.querySelector('.view-all').addEventListener('click', (e) => {
      e.preventDefault();
      alert('Mostrando todos los clientes...');
  });
});