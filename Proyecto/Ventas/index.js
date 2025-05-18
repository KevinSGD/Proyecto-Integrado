// Datos de ejemplo (simulando una base de datos)
const reservas = []
  
  const consumos = []
  
  // Catálogo de productos y servicios
  const catalogo = {
    minibar: [
      { id: 1, nombre: "Agua mineral", precio: 20.0 },
      { id: 2, nombre: "Refresco", precio: 25.0 },
      { id: 3, nombre: "Cerveza", precio: 40.0 },
      { id: 4, nombre: "Snacks", precio: 35.0 },
    ],
    restaurante: [
      { id: 1, nombre: "Desayuno buffet", precio: 150.0 },
      { id: 2, nombre: "Comida buffet", precio: 250.0 },
      { id: 3, nombre: "Cena buffet", precio: 200.0 },
      { id: 4, nombre: "Servicio a la habitación", precio: 100.0 },
    ],
    lavanderia: [
      { id: 1, nombre: "Lavado de ropa", precio: 150.0 },
      { id: 2, nombre: "Planchado", precio: 100.0 },
      { id: 3, nombre: "Limpieza en seco", precio: 200.0 },
    ],
    spa: [
      { id: 1, nombre: "Masaje relajante", precio: 500.0 },
      { id: 2, nombre: "Tratamiento facial", precio: 400.0 },
      { id: 3, nombre: "Sauna", precio: 300.0 },
    ],
    otros: [
      { id: 1, nombre: "Estacionamiento", precio: 100.0 },
      { id: 2, nombre: "Llamadas telefónicas", precio: 50.0 },
      { id: 3, nombre: "Internet premium", precio: 150.0 },
    ],
  }
  
  // Catálogo de habitaciones
  const habitaciones = {
    individual: ["101", "102", "103", "104"],
    doble: ["201", "202", "203", "204"],
    suite: ["301", "302", "303"],
    familiar: ["401", "402"],
  }
  
  // Precios de habitaciones por noche
  const preciosHabitaciones = {
    individual: 800.0,
    doble: 1200.0,
    suite: 2000.0,
    familiar: 2500.0,
  }
  
  // Variables globales
  let consumosActuales = []
  let reservaSeleccionada = null
  let facturaActual = null
  
  // Inicialización
  document.addEventListener("DOMContentLoaded", () => {
    // Mostrar fecha actual
    const fechaActual = new Date()
    document.getElementById("current-date").textContent = fechaActual.toLocaleDateString()
  
    // Inicializar selectores de habitaciones
    document.getElementById("habitacion-tipo").addEventListener("change", () => {
      actualizarNumerosHabitacion("habitacion-tipo", "habitacion-numero")
    })
  
    document.getElementById("habitacion-tipo-edit").addEventListener("change", () => {
      actualizarNumerosHabitacion("habitacion-tipo-edit", "habitacion-numero-edit")
    })
  
    // Establecer fecha mínima como hoy
    const hoy = new Date().toISOString().split("T")[0]
    document.getElementById("fecha-entrada").min = hoy
    document.getElementById("fecha-salida").min = hoy
  
    // Inicializar navegación
    initNavigation()
  
    // Cargar datos iniciales
    cargarDatosDashboard()
    cargarHistorialVentas()
  })
  
  // Navegación
  function initNavigation() {
    const navItems = document.querySelectorAll(".nav-item")
  
    navItems.forEach((item) => {
      item.addEventListener("click", function () {
        // Remover clase active de todos los items
        navItems.forEach((i) => i.classList.remove("active"))
  
        // Agregar clase active al item seleccionado
        this.classList.add("active")
  
        // Obtener sección a mostrar
        const sectionId = this.getAttribute("data-section")
  
        // Ocultar todas las secciones
        document.querySelectorAll(".content-section").forEach((section) => {
          section.classList.remove("active")
        })
  
        // Mostrar sección seleccionada
        document.getElementById(sectionId).classList.add("active")
      })
    })
  }
  
  // Dashboard
  function cargarDatosDashboard() {
    // Cargar reservas recientes
    const tablaReservas = document.getElementById("recent-reservations-table")
    tablaReservas.innerHTML = ""
  
    // Mostrar últimas 5 reservas
    const reservasRecientes = [...reservas]
      .sort((a, b) => new Date(b.fechaEntrada) - new Date(a.fechaEntrada))
      .slice(0, 5)
  
    reservasRecientes.forEach((reserva) => {
      const tr = document.createElement("tr")
      tr.innerHTML = `
              <td>${reserva.cliente.nombre}</td>
              <td>${reserva.habitacion.numero} (${reserva.habitacion.tipo})</td>
              <td>${reserva.fechaEntrada}</td>
              <td>${reserva.fechaSalida}</td>
              <td><span class="status-badge ${reserva.estado}">${reserva.estado}</span></td>
          `
      tablaReservas.appendChild(tr)
    })
  
    // Cargar actividad reciente
    const actividadList = document.getElementById("recent-activity-list")
    actividadList.innerHTML = ""
  
    // Combinar reservas y consumos para actividad reciente
    const actividades = [
      ...reservas.map((r) => ({
        tipo: "reserva",
        fecha: r.fechaEntrada,
        cliente: r.cliente.nombre,
        descripcion: `Nueva reserva: Habitación ${r.habitacion.numero}`,
      })),
      ...consumos.map((c) => {
        const reserva = reservas.find((r) => r.id === c.reservaId)
        return {
          tipo: "consumo",
          fecha: c.fecha,
          cliente: reserva ? reserva.cliente.nombre : "Cliente desconocido",
          descripcion: `Consumo: ${c.producto} x${c.cantidad}`,
        }
      }),
    ]
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
      .slice(0, 5)
  
    actividades.forEach((actividad) => {
      const li = document.createElement("li")
      const iconName = actividad.tipo === "reserva" ? "hotel" : "room_service"
  
      li.innerHTML = `
              <div class="activity-icon">
                  <span class="material-symbols-outlined">${iconName}</span>
              </div>
              <div class="activity-details">
                  <div class="activity-title">${actividad.descripcion}</div>
                  <div class="activity-meta">
                      <span class="activity-client">${actividad.cliente}</span>
                      <span class="activity-time">${actividad.fecha}</span>
                  </div>
              </div>
          `
  
      actividadList.appendChild(li)
    })
  }
  
  // Funciones para modales
  function openModal(modalId) {
    document.getElementById(modalId).style.display = "block"
  
    // Inicializaciones específicas para cada modal
    if (modalId === "historial-modal") {
      cargarHistorialVentas()
    } else if (modalId === "nueva-reserva-modal") {
      // Establecer fecha mínima como hoy
      const hoy = new Date().toISOString().split("T")[0]
      document.getElementById("fecha-entrada").min = hoy
      document.getElementById("fecha-salida").min = hoy
    }
  }
  
  function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none"
  
    // Limpiar formularios al cerrar
    if (modalId === "nueva-reserva-modal") {
      document.getElementById("reserva-form").reset()
    } else if (modalId === "consumo-modal") {
      document.getElementById("consumo-form").reset()
      document.getElementById("reserva-info").classList.add("hidden")
      document.getElementById("consumo-options").classList.add("hidden")
      document.getElementById("consumos-lista").classList.add("hidden")
      document.getElementById("guardar-consumo-btn").classList.add("hidden")
      consumosActuales = []
    } else if (modalId === "modificar-modal") {
      document.getElementById("reservas-encontradas").classList.add("hidden")
      document.getElementById("editar-reserva-form").classList.add("hidden")
    } else if (modalId === "factura-modal") {
      document.getElementById("cliente-info-factura").classList.add("hidden")
      document.getElementById("reserva-info-factura").classList.add("hidden")
      document.getElementById("consumos-info-factura").classList.add("hidden")
      document.getElementById("generar-factura-btn").classList.add("hidden")
    }
  }
  
  // Funciones para Nueva Reserva
  function actualizarNumerosHabitacion(selectorTipo, selectorNumero) {
    const tipoHabitacion = document.getElementById(selectorTipo).value
    const selectorHabitacion = document.getElementById(selectorNumero)
  
    // Limpiar opciones actuales
    selectorHabitacion.innerHTML = '<option value="">Seleccionar...</option>'
  
    if (tipoHabitacion) {
      // Obtener habitaciones disponibles (no reservadas)
      const habitacionesReservadas = reservas
        .filter((r) => r.habitacion.tipo === tipoHabitacion && r.estado !== "cancelada")
        .map((r) => r.habitacion.numero)
  
      const habitacionesDisponibles = habitaciones[tipoHabitacion].filter((num) => !habitacionesReservadas.includes(num))
  
      // Agregar opciones al selector
      habitacionesDisponibles.forEach((num) => {
        const option = document.createElement("option")
        option.value = num
        option.textContent = num
        selectorHabitacion.appendChild(option)
      })
    }
  }
  
  function guardarReserva() {
    // Obtener datos del formulario
    const nombre = document.getElementById("cliente-nombre").value
    const email = document.getElementById("cliente-email").value
    const telefono = document.getElementById("cliente-telefono").value
    const tipoHabitacion = document.getElementById("habitacion-tipo").value
    const numeroHabitacion = document.getElementById("habitacion-numero").value
    const fechaEntrada = document.getElementById("fecha-entrada").value
    const fechaSalida = document.getElementById("fecha-salida").value
    const huespedes = document.getElementById("huespedes").value
    const observaciones = document.getElementById("observaciones").value
  
    // Validar datos
    if (
      !nombre ||
      !email ||
      !telefono ||
      !tipoHabitacion ||
      !numeroHabitacion ||
      !fechaEntrada ||
      !fechaSalida ||
      !huespedes
    ) {
      alert("Por favor complete todos los campos obligatorios")
      return
    }
  
    // Crear nueva reserva
    const nuevaReserva = {
      id: reservas.length > 0 ? Math.max(...reservas.map((r) => r.id)) + 1 : 1,
      cliente: {
        nombre,
        email,
        telefono,
      },
      habitacion: {
        tipo: tipoHabitacion,
        numero: numeroHabitacion,
      },
      fechaEntrada,
      fechaSalida,
      huespedes: Number.parseInt(huespedes),
      estado: "confirmada",
      observaciones,
    }
  
    // Guardar reserva
    reservas.push(nuevaReserva)
  
    // Mostrar mensaje de éxito
    alert("Reserva guardada correctamente")
  
    // Limpiar formulario
    limpiarFormulario("reserva-form")
  
    // Actualizar dashboard
    cargarDatosDashboard()
  }
  
  function limpiarFormulario(formId) {
    document.getElementById(formId).reset()
  }
  
  // Funciones para Registrar Consumo
  function buscarReserva() {
    const busqueda = document.getElementById("buscar-reserva").value.toLowerCase()
  
    if (!busqueda) {
      alert("Ingrese un término de búsqueda")
      return
    }
  
    // Buscar reserva por nombre de cliente o número de habitación
    const reservaEncontrada = reservas.find(
      (r) => r.cliente.nombre.toLowerCase().includes(busqueda) || r.habitacion.numero === busqueda,
    )
  
    if (reservaEncontrada && reservaEncontrada.estado === "confirmada") {
      // Mostrar información de la reserva
      document.getElementById("info-cliente").textContent = reservaEncontrada.cliente.nombre
      document.getElementById("info-habitacion").textContent =
        `${reservaEncontrada.habitacion.numero} (${reservaEncontrada.habitacion.tipo})`
      document.getElementById("info-fechas").textContent =
        `${reservaEncontrada.fechaEntrada} al ${reservaEncontrada.fechaSalida}`
  
      document.getElementById("reserva-info").classList.remove("hidden")
      document.getElementById("consumo-options").classList.remove("hidden")
  
      // Guardar referencia a la reserva seleccionada
      reservaSeleccionada = reservaEncontrada
  
      // Cargar consumos existentes
      cargarConsumosExistentes(reservaEncontrada.id)
    } else {
      alert("No se encontró una reserva activa con ese criterio")
    }
  }
  
  function actualizarProductos() {
    const categoria = document.getElementById("tipo-consumo").value
    const selectorProducto = document.getElementById("producto")
    const inputPrecio = document.getElementById("precio")
  
    // Limpiar selector y precio
    selectorProducto.innerHTML = '<option value="">Seleccionar...</option>'
    inputPrecio.value = ""
  
    if (categoria) {
      // Cargar productos de la categoría seleccionada
      catalogo[categoria].forEach((item) => {
        const option = document.createElement("option")
        option.value = item.id
        option.textContent = item.nombre
        option.dataset.precio = item.precio
        selectorProducto.appendChild(option)
      })
  
      // Agregar evento para actualizar precio
      selectorProducto.addEventListener("change", function () {
        const selectedOption = this.options[this.selectedIndex]
        if (selectedOption.value) {
          inputPrecio.value = selectedOption.dataset.precio
        } else {
          inputPrecio.value = ""
        }
      })
    }
  }
  
  function cargarConsumosExistentes(reservaId) {
    // Filtrar consumos de la reserva
    const consumosReserva = consumos.filter((c) => c.reservaId === reservaId)
  
    // Limpiar lista actual
    consumosActuales = []
  
    // Agregar consumos existentes a la lista actual
    consumosReserva.forEach((c) => {
      consumosActuales.push({
        id: c.id,
        categoria: c.categoria,
        producto: c.producto,
        cantidad: c.cantidad,
        precioUnitario: c.precioUnitario,
      })
    })
  
    // Actualizar tabla
    actualizarTablaConsumos()
  }
  
  function agregarConsumo() {
    const categoria = document.getElementById("tipo-consumo").value
    const productoSelect = document.getElementById("producto")
    const productoId = productoSelect.value
    const productoNombre = productoSelect.options[productoSelect.selectedIndex].textContent
    const cantidad = Number.parseInt(document.getElementById("cantidad").value)
    const precioUnitario = Number.parseFloat(document.getElementById("precio").value)
  
    // Validar datos
    if (!categoria || !productoId || !cantidad || !precioUnitario) {
      alert("Por favor complete todos los campos")
      return
    }
  
    // Agregar consumo a la lista
    consumosActuales.push({
      id: consumosActuales.length > 0 ? Math.max(...consumosActuales.map((c) => c.id)) + 1 : 1,
      categoria,
      producto: productoNombre,
      cantidad,
      precioUnitario,
    })
  
    // Actualizar tabla
    actualizarTablaConsumos()
  
    // Limpiar formulario
    document.getElementById("tipo-consumo").value = ""
    document.getElementById("producto").innerHTML = '<option value="">Seleccione primero una categoría</option>'
    document.getElementById("cantidad").value = "1"
    document.getElementById("precio").value = ""
  }
  
  function actualizarTablaConsumos() {
    const tablaBody = document.querySelector("#tabla-consumos tbody")
    const totalElement = document.getElementById("consumo-total")
  
    // Limpiar tabla
    tablaBody.innerHTML = ""
  
    // Verificar si hay consumos
    if (consumosActuales.length === 0) {
      document.getElementById("consumos-lista").classList.add("hidden")
      return
    }
  
    // Mostrar tabla
    document.getElementById("consumos-lista").classList.remove("hidden")
  
    // Calcular total
    let total = 0
  
    // Agregar filas a la tabla
    consumosActuales.forEach((consumo) => {
      const subtotal = consumo.cantidad * consumo.precioUnitario
      total += subtotal
  
      const tr = document.createElement("tr")
      tr.innerHTML = `
              <td>${consumo.categoria}</td>
              <td>${consumo.producto}</td>
              <td>${consumo.cantidad}</td>
              <td>${consumo.precioUnitario.toFixed(2)}</td>
              <td>${subtotal.toFixed(2)}</td>
              <td><button type="button" class="btn-secondary" onclick="eliminarConsumo(${consumo.id})">Eliminar</button></td>
          `
  
      tablaBody.appendChild(tr)
    })
  
    // Actualizar total
    totalElement.textContent = `$${total.toFixed(2)}`
  }
  
  function eliminarConsumo(id) {
    // Eliminar consumo de la lista
    consumosActuales = consumosActuales.filter((c) => c.id !== id)
  
    // Actualizar tabla
    actualizarTablaConsumos()
  }
  
  function guardarConsumos() {
    if (!reservaSeleccionada) {
      alert("No hay una reserva seleccionada")
      return
    }
  
    if (consumosActuales.length === 0) {
      alert("No hay consumos para guardar")
      return
    }
  
    // Obtener fecha actual
    const fechaActual = new Date().toISOString().split("T")[0]
  
    // Guardar consumos
    consumosActuales.forEach((consumo) => {
      // Verificar si el consumo ya existe (tiene un ID válido)
      const consumoExistente = consumos.findIndex((c) => c.id === consumo.id)
  
      if (consumoExistente >= 0) {
        // Actualizar consumo existente
        consumos[consumoExistente] = {
          ...consumo,
          reservaId: reservaSeleccionada.id,
          fecha: fechaActual,
        }
      } else {
        // Crear nuevo consumo
        const nuevoConsumo = {
          id: consumos.length > 0 ? Math.max(...consumos.map((c) => c.id)) + 1 : 1,
          reservaId: reservaSeleccionada.id,
          fecha: fechaActual,
          categoria: consumo.categoria,
          producto: consumo.producto,
          cantidad: consumo.cantidad,
          precioUnitario: consumo.precioUnitario,
        }
  
        consumos.push(nuevoConsumo)
      }
    })
  
    // Mostrar mensaje de éxito
    alert("Consumos guardados correctamente")
  
    // Limpiar formulario
    document.getElementById("consumo-form").reset()
    document.getElementById("reserva-info").classList.add("hidden")
    document.getElementById("consumo-options").classList.add("hidden")
    document.getElementById("consumos-lista").classList.add("hidden")
    consumosActuales = []
  
    // Actualizar dashboard
    cargarDatosDashboard()
  }
  
  // Función para cerrar sesión
  function cerrarSesion() {
    if (confirm("¿Está seguro que desea cerrar sesión?")) {
      alert("Sesión cerrada correctamente")
      // En una implementación real, aquí se redireccionaría a la página de login
      // window.location.href = "login.html";
    }
  }
  
  // Funciones para Historial de Ventas
  function cargarHistorialVentas() {
    const tablaBody = document.querySelector("#tabla-historial tbody")
  
    // Limpiar tabla
    tablaBody.innerHTML = ""
  
    // Crear entradas para reservas
    reservas.forEach((reserva) => {
      // Calcular monto de la reserva
      const fechaEntrada = new Date(reserva.fechaEntrada)
      const fechaSalida = new Date(reserva.fechaSalida)
      const noches = Math.ceil((fechaSalida - fechaEntrada) / (1000 * 60 * 60 * 24))
      const precioNoche = preciosHabitaciones[reserva.habitacion.tipo]
      const montoReserva = noches * precioNoche
  
      const tr = document.createElement("tr")
      tr.innerHTML = `
              <td>${reserva.fechaEntrada}</td>
              <td>Reserva</td>
              <td>${reserva.cliente.nombre}</td>
              <td>${reserva.habitacion.numero}</td>
              <td>${noches} noches, ${reserva.habitacion.tipo}</td>
              <td>$${montoReserva.toFixed(2)}</td>
              <td>
                  <button type="button" class="btn-secondary" onclick="verDetalleReserva(${reserva.id})">Ver</button>
              </td>
          `
  
      tablaBody.appendChild(tr)
    })
  
    // Crear entradas para consumos
    consumos.forEach((consumo) => {
      const reserva = reservas.find((r) => r.id === consumo.reservaId)
      if (!reserva) return
  
      const subtotal = consumo.cantidad * consumo.precioUnitario
  
      const tr = document.createElement("tr")
      tr.innerHTML = `
              <td>${consumo.fecha}</td>
              <td>Consumo</td>
              <td>${reserva.cliente.nombre}</td>
              <td>${reserva.habitacion.numero}</td>
              <td>${consumo.categoria}: ${consumo.producto} x${consumo.cantidad}</td>
              <td>$${subtotal.toFixed(2)}</td>
              <td>
                  <button type="button" class="btn-secondary" onclick="verDetalleConsumo(${consumo.id})">Ver</button>
              </td>
          `
  
      tablaBody.appendChild(tr)
    })
  
    // Calcular totales
    calcularTotalesHistorial()
  }
  
  function calcularTotalesHistorial() {
    let totalReservas = 0
    let totalConsumos = 0
  
    // Calcular total de reservas
    reservas.forEach((reserva) => {
      const fechaEntrada = new Date(reserva.fechaEntrada)
      const fechaSalida = new Date(reserva.fechaSalida)
      const noches = Math.ceil((fechaSalida - fechaEntrada) / (1000 * 60 * 60 * 24))
      const precioNoche = preciosHabitaciones[reserva.habitacion.tipo]
      totalReservas += noches * precioNoche
    })
  
    // Calcular total de consumos
    consumos.forEach((consumo) => {
      totalConsumos += consumo.cantidad * consumo.precioUnitario
    })
  
    // Actualizar elementos
    document.getElementById("total-reservas").textContent = `$${totalReservas.toFixed(2)}`
    document.getElementById("total-consumos").textContent = `$${totalConsumos.toFixed(2)}`
    document.getElementById("total-general").textContent = `$${(totalReservas + totalConsumos).toFixed(2)}`
  }
  
  function filtrarHistorial() {
    const fechaInicio = document.getElementById("filtro-fecha-inicio").value
    const fechaFin = document.getElementById("filtro-fecha-fin").value
    const tipo = document.getElementById("filtro-tipo").value
  
    const tablaBody = document.querySelector("#tabla-historial tbody")
  
    // Limpiar tabla
    tablaBody.innerHTML = ""
  
    // Filtrar reservas
    if (tipo === "todos" || tipo === "reserva") {
      reservas.forEach((reserva) => {
        // Verificar fechas
        if ((fechaInicio && reserva.fechaEntrada < fechaInicio) || (fechaFin && reserva.fechaEntrada > fechaFin)) {
          return
        }
  
        // Calcular monto de la reserva
        const fechaEntrada = new Date(reserva.fechaEntrada)
        const fechaSalida = new Date(reserva.fechaSalida)
        const noches = Math.ceil((fechaSalida - fechaEntrada) / (1000 * 60 * 60 * 24))
        const precioNoche = preciosHabitaciones[reserva.habitacion.tipo]
        const montoReserva = noches * precioNoche
  
        const tr = document.createElement("tr")
        tr.innerHTML = `
                  <td>${reserva.fechaEntrada}</td>
                  <td>Reserva</td>
                  <td>${reserva.cliente.nombre}</td>
                  <td>${reserva.habitacion.numero}</td>
                  <td>${noches} noches, ${reserva.habitacion.tipo}</td>
                  <td>$${montoReserva.toFixed(2)}</td>
                  <td>
                      <button type="button" class="btn-secondary" onclick="verDetalleReserva(${reserva.id})">Ver</button>
                  </td>
              `
  
        tablaBody.appendChild(tr)
      })
    }
  
    // Filtrar consumos
    if (tipo === "todos" || tipo === "consumo") {
      consumos.forEach((consumo) => {
        // Verificar fechas
        if ((fechaInicio && consumo.fecha < fechaInicio) || (fechaFin && consumo.fecha > fechaFin)) {
          return
        }
  
        const reserva = reservas.find((r) => r.id === consumo.reservaId)
        if (!reserva) return
  
        const subtotal = consumo.cantidad * consumo.precioUnitario
  
        const tr = document.createElement("tr")
        tr.innerHTML = `
                  <td>${consumo.fecha}</td>
                  <td>Consumo</td>
                  <td>${reserva.cliente.nombre}</td>
                  <td>${reserva.habitacion.numero}</td>
                  <td>${consumo.categoria}: ${consumo.producto} x${consumo.cantidad}</td>
                  <td>$${subtotal.toFixed(2)}</td>
                  <td>
                      <button type="button" class="btn-secondary" onclick="verDetalleConsumo(${consumo.id})">Ver</button>
                  </td>
              `
  
        tablaBody.appendChild(tr)
      })
    }
  
    // Recalcular totales
    calcularTotalesHistorial()
  }
  
  function verDetalleReserva(id) {
    // Implementar vista detallada de reserva
    alert(`Ver detalle de reserva ${id}`)
  }
  
  function verDetalleConsumo(id) {
    // Implementar vista detallada de consumo
    alert(`Ver detalle de consumo ${id}`)
  }
  
  function exportarHistorial() {
    // Simulación de exportación a Excel
    alert("Exportando historial a Excel...")
    // En una implementación real, se generaría un archivo Excel para descargar
  }
  
  // Funciones para Modificar/Cancelar Reservas
  function buscarReservaModificar() {
    const busqueda = document.getElementById("buscar-reserva-mod").value.toLowerCase()
  
    if (!busqueda) {
      alert("Ingrese un término de búsqueda")
      return
    }
  
    // Buscar reservas por nombre de cliente o número de habitación
    const reservasEncontradas = reservas.filter(
      (r) => r.cliente.nombre.toLowerCase().includes(busqueda) || r.habitacion.numero === busqueda,
    )
  
    if (reservasEncontradas.length > 0) {
      // Mostrar tabla de reservas encontradas
      const tablaBody = document.querySelector("#tabla-reservas tbody")
  
      // Limpiar tabla
      tablaBody.innerHTML = ""
  
      // Agregar filas a la tabla
      reservasEncontradas.forEach((reserva) => {
        const tr = document.createElement("tr")
        tr.innerHTML = `
                  <td>${reserva.cliente.nombre}</td>
                  <td>${reserva.habitacion.numero} (${reserva.habitacion.tipo})</td>
                  <td>${reserva.fechaEntrada}</td>
                  <td>${reserva.fechaSalida}</td>
                  <td>${reserva.estado}</td>
                  <td>
                      <button type="button" class="btn-primary" onclick="editarReserva(${reserva.id})">Editar</button>
                      <button type="button" class="btn-secondary" onclick="cancelarReserva(${reserva.id})">Cancelar</button>
                  </td>
              `
  
        tablaBody.appendChild(tr)
      })
  
      document.getElementById("reservas-encontradas").classList.remove("hidden")
      document.getElementById("editar-reserva-form").classList.add("hidden")
    } else {
      alert("No se encontraron reservas con ese criterio")
    }
  }
  
  function editarReserva(id) {
    // Buscar reserva por ID
    const reserva = reservas.find((r) => r.id === id)
  
    if (reserva) {
      // Ocultar lista de reservas
      document.getElementById("reservas-encontradas").classList.add("hidden")
  
      // Mostrar formulario de edición
      document.getElementById("editar-reserva-form").classList.remove("hidden")
  
      // Llenar formulario con datos de la reserva
      document.getElementById("reserva-id-edit").value = reserva.id
      document.getElementById("cliente-nombre-edit").value = reserva.cliente.nombre
      document.getElementById("cliente-email-edit").value = reserva.cliente.email
      document.getElementById("cliente-telefono-edit").value = reserva.cliente.telefono
      document.getElementById("habitacion-tipo-edit").value = reserva.habitacion.tipo
  
      // Cargar números de habitación
      actualizarNumerosHabitacion("habitacion-tipo-edit", "habitacion-numero-edit")
  
      // Seleccionar la habitación actual
      setTimeout(() => {
        document.getElementById("habitacion-numero-edit").value = reserva.habitacion.numero
      }, 100)
  
      document.getElementById("fecha-entrada-edit").value = reserva.fechaEntrada
      document.getElementById("fecha-salida-edit").value = reserva.fechaSalida
      document.getElementById("huespedes-edit").value = reserva.huespedes
      document.getElementById("estado-edit").value = reserva.estado
      document.getElementById("observaciones-edit").value = reserva.observaciones
    }
  }
  
  function volverAListaReservas() {
    document.getElementById("editar-reserva-form").classList.add("hidden")
    document.getElementById("reservas-encontradas").classList.remove("hidden")
  }
  
  function guardarCambiosReserva() {
    // Obtener datos del formulario
    const id = Number.parseInt(document.getElementById("reserva-id-edit").value)
    const nombre = document.getElementById("cliente-nombre-edit").value
    const email = document.getElementById("cliente-email-edit").value
    const telefono = document.getElementById("cliente-telefono-edit").value
    const tipoHabitacion = document.getElementById("habitacion-tipo-edit").value
    const numeroHabitacion = document.getElementById("habitacion-numero-edit").value
    const fechaEntrada = document.getElementById("fecha-entrada-edit").value
    const fechaSalida = document.getElementById("fecha-salida-edit").value
    const huespedes = document.getElementById("huespedes-edit").value
    const estado = document.getElementById("estado-edit").value
    const observaciones = document.getElementById("observaciones-edit").value
  
    // Validar datos
    if (
      !nombre ||
      !email ||
      !telefono ||
      !tipoHabitacion ||
      !numeroHabitacion ||
      !fechaEntrada ||
      !fechaSalida ||
      !huespedes ||
      !estado
    ) {
      alert("Por favor complete todos los campos obligatorios")
      return
    }
  
    // Buscar índice de la reserva
    const index = reservas.findIndex((r) => r.id === id)
  
    if (index >= 0) {
      // Actualizar reserva
      reservas[index] = {
        id,
        cliente: {
          nombre,
          email,
          telefono,
        },
        habitacion: {
          tipo: tipoHabitacion,
          numero: numeroHabitacion,
        },
        fechaEntrada,
        fechaSalida,
        huespedes: Number.parseInt(huespedes),
        estado,
        observaciones,
      }
  
      // Mostrar mensaje de éxito
      alert("Reserva actualizada correctamente")
  
      // Volver a la lista de reservas
      buscarReservaModificar()
  
      // Actualizar dashboard
      cargarDatosDashboard()
    }
  }
  
  function cancelarReserva(id) {
    // Confirmar cancelación
    if (confirm("¿Está seguro de que desea cancelar esta reserva?")) {
      // Buscar índice de la reserva
      const index = reservas.findIndex((r) => r.id === id)
  
      if (index >= 0) {
        // Cambiar estado a cancelada
        reservas[index].estado = "cancelada"
  
        // Mostrar mensaje de éxito
        alert("Reserva cancelada correctamente")
  
        // Actualizar lista de reservas
        buscarReservaModificar()
  
        // Actualizar dashboard
        cargarDatosDashboard()
      }
    }
  }
  
  // Funciones para Generar Factura
  function buscarClienteFactura() {
    const busqueda = document.getElementById("buscar-cliente-factura").value.toLowerCase()
  
    if (!busqueda) {
      alert("Ingrese un término de búsqueda")
      return
    }
  
    // Buscar reserva por nombre de cliente o número de habitación
    const reservaEncontrada = reservas.find(
      (r) => r.cliente.nombre.toLowerCase().includes(busqueda) || r.habitacion.numero === busqueda,
    )
  
    if (reservaEncontrada) {
      // Mostrar información del cliente
      document.getElementById("factura-cliente-nombre").textContent = reservaEncontrada.cliente.nombre
      document.getElementById("factura-cliente-email").textContent = reservaEncontrada.cliente.email
      document.getElementById("factura-cliente-telefono").textContent = reservaEncontrada.cliente.telefono
  
      document.getElementById("cliente-info-factura").classList.remove("hidden")
  
      // Cargar detalles de la reserva
      cargarDetallesReservaFactura(reservaEncontrada)
  
      // Cargar consumos
      cargarConsumosFactura(reservaEncontrada.id)
  
      // Mostrar botón para generar factura
      document.getElementById("generar-factura-btn").classList.remove("hidden")
  
      // Guardar referencia a la factura actual
      facturaActual = {
        reserva: reservaEncontrada,
        fecha: new Date().toLocaleDateString(),
        numero: Math.floor(Math.random() * 10000) + 1,
      }
    } else {
      alert("No se encontró ningún cliente con ese criterio")
    }
  }
  
  function cargarDetallesReservaFactura(reserva) {
    const tablaBody = document.querySelector("#tabla-reserva-factura tbody")
  
    // Limpiar tabla
    tablaBody.innerHTML = ""
  
    // Calcular noches y subtotal
    const fechaEntrada = new Date(reserva.fechaEntrada)
    const fechaSalida = new Date(reserva.fechaSalida)
    const noches = Math.ceil((fechaSalida - fechaEntrada) / (1000 * 60 * 60 * 24))
    const precioNoche = preciosHabitaciones[reserva.habitacion.tipo]
    const subtotal = noches * precioNoche
  
    // Crear fila
    const tr = document.createElement("tr")
    tr.innerHTML = `
          <td>${reserva.habitacion.numero} (${reserva.habitacion.tipo})</td>
          <td>${reserva.fechaEntrada}</td>
          <td>${reserva.fechaSalida}</td>
          <td>${noches}</td>
          <td>$${precioNoche.toFixed(2)}</td>
          <td>$${subtotal.toFixed(2)}</td>
      `
  
    tablaBody.appendChild(tr)
  
    // Mostrar sección
    document.getElementById("reserva-info-factura").classList.remove("hidden")
  }
  
  function cargarConsumosFactura(reservaId) {
    const tablaBody = document.querySelector("#tabla-consumos-factura tbody")
  
    // Limpiar tabla
    tablaBody.innerHTML = ""
  
    // Filtrar consumos de la reserva
    const consumosReserva = consumos.filter((c) => c.reservaId === reservaId)
  
    // Calcular subtotal
    let subtotal = 0
  
    // Verificar si hay consumos
    if (consumosReserva.length === 0) {
      const tr = document.createElement("tr")
      tr.innerHTML = `
              <td colspan="6" class="text-center">No hay consumos registrados</td>
          `
      tablaBody.appendChild(tr)
    } else {
      // Agregar filas a la tabla
      consumosReserva.forEach((consumo) => {
        const subtotalConsumo = consumo.cantidad * consumo.precioUnitario
        subtotal += subtotalConsumo
  
        const tr = document.createElement("tr")
        tr.innerHTML = `
                  <td>${consumo.fecha}</td>
                  <td>${consumo.categoria}</td>
                  <td>${consumo.producto}</td>
                  <td>${consumo.cantidad}</td>
                  <td>$${consumo.precioUnitario.toFixed(2)}</td>
                  <td>$${subtotalConsumo.toFixed(2)}</td>
              `
  
        tablaBody.appendChild(tr)
      })
    }
  
    // Calcular IVA y total
    const iva = subtotal * 0.16
    const total = subtotal + iva
  
    // Actualizar totales
    document.getElementById("factura-subtotal").textContent = `$${subtotal.toFixed(2)}`
    document.getElementById("factura-iva").textContent = `$${iva.toFixed(2)}`
    document.getElementById("factura-total").textContent = `$${total.toFixed(2)}`
  
    // Mostrar sección
    document.getElementById("consumos-info-factura").classList.remove("hidden")
  }
  
  function generarFacturaPDF() {
    if (!facturaActual) {
      alert("No hay datos para generar la factura")
      return
    }
  
    // Actualizar datos de la factura para imprimir
    document.getElementById("factura-numero").textContent = facturaActual.numero
    document.getElementById("factura-fecha").textContent = facturaActual.fecha
  
    document.getElementById("print-cliente-nombre").textContent = facturaActual.reserva.cliente.nombre
    document.getElementById("print-cliente-email").textContent = facturaActual.reserva.cliente.email
    document.getElementById("print-cliente-telefono").textContent = facturaActual.reserva.cliente.telefono
  
    // Copiar tablas
    document.getElementById("print-tabla-reserva").innerHTML = document.getElementById("tabla-reserva-factura").innerHTML
    document.getElementById("print-tabla-consumos").innerHTML =
      document.getElementById("tabla-consumos-factura").innerHTML
  
    // Copiar totales
    document.getElementById("print-subtotal").textContent = document.getElementById("factura-subtotal").textContent
    document.getElementById("print-iva").textContent = document.getElementById("factura-iva").textContent
    document.getElementById("print-total").textContent = document.getElementById("factura-total").textContent
  
    // En una implementación real, aquí se generaría un PDF
    // Para esta demostración, simulamos abriendo una ventana de impresión
    const contenidoOriginal = document.body.innerHTML
    const contenidoImprimir = document.getElementById("factura-preview").innerHTML
  
    document.body.innerHTML = contenidoImprimir
    window.print()
    document.body.innerHTML = contenidoOriginal
  
    // Recargar eventos después de restaurar el contenido
    document.addEventListener("DOMContentLoaded", () => {
      // Inicializar navegación
      initNavigation()
  
      // Mostrar fecha actual
      const fechaActual = new Date()
      document.getElementById("current-date").textContent = fechaActual.toLocaleDateString()
  
      // Inicializar selectores de habitaciones
      document.getElementById("habitacion-tipo").addEventListener("change", () => {
        actualizarNumerosHabitacion("habitacion-tipo", "habitacion-numero")
      })
  
      document.getElementById("habitacion-tipo-edit").addEventListener("change", () => {
        actualizarNumerosHabitacion("habitacion-tipo-edit", "habitacion-numero-edit")
      })
  
      // Cargar datos iniciales
      cargarDatosDashboard()
      cargarHistorialVentas()
    })
  }
  