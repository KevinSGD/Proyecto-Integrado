
let transacciones = [
  {
    id: 1,
    fecha: "2023-11-01",
    tipo: "ingreso",
    categoria: "hospedaje",
    descripcion: "Reserva habitación 201 - Juan Pérez",
    metodoPago: "tarjeta",
    referencia: "Factura #001",
    monto: 1200.0,
    origen: "ventas",
    usuario: "Admin",
  },
  {
    id: 2,
    fecha: "2023-11-02",
    tipo: "ingreso",
    categoria: "restaurante",
    descripcion: "Consumo restaurante - María López",
    metodoPago: "efectivo",
    referencia: "Factura #002",
    monto: 350.0,
    origen: "ventas",
    usuario: "Admin",
  },
  {
    id: 3,
    fecha: "2023-11-03",
    tipo: "egreso",
    categoria: "compras",
    descripcion: "Compra de insumos para minibar",
    metodoPago: "transferencia",
    referencia: "Factura #A123",
    monto: 500.0,
    origen: "inventario",
    usuario: "Admin",
  },
  {
    id: 4,
    fecha: "2023-11-05",
    tipo: "egreso",
    categoria: "sueldos",
    descripcion: "Pago de nómina - Primera quincena",
    metodoPago: "transferencia",
    referencia: "Transferencia #45678",
    monto: 5000.0,
    origen: "contabilidad",
    usuario: "Admin",
  },
  {
    id: 5,
    fecha: "2023-11-07",
    tipo: "egreso",
    categoria: "servicios",
    descripcion: "Pago servicio de electricidad",
    metodoPago: "transferencia",
    referencia: "Recibo #E789",
    monto: 1200.0,
    origen: "contabilidad",
    usuario: "Admin",
  },
  {
    id: 6,
    fecha: "2023-11-10",
    tipo: "ingreso",
    categoria: "spa",
    descripcion: "Servicios de spa - Varios clientes",
    metodoPago: "tarjeta",
    referencia: "Factura #003",
    monto: 800.0,
    origen: "ventas",
    usuario: "Admin",
  },
  {
    id: 7,
    fecha: "2023-11-12",
    tipo: "egreso",
    categoria: "mantenimiento",
    descripcion: "Reparación aire acondicionado",
    metodoPago: "efectivo",
    referencia: "Recibo #M123",
    monto: 350.0,
    origen: "contabilidad",
    usuario: "Admin",
  },
  {
    id: 8,
    fecha: "2023-11-15",
    tipo: "ingreso",
    categoria: "eventos",
    descripcion: "Reserva salón para conferencia",
    metodoPago: "transferencia",
    referencia: "Factura #004",
    monto: 2500.0,
    origen: "ventas",
    usuario: "Admin",
  },
  {
    id: 9,
    fecha: "2023-11-18",
    tipo: "egreso",
    categoria: "impuestos",
    descripcion: "Pago de impuestos mensuales",
    metodoPago: "transferencia",
    referencia: "Declaración #T456",
    monto: 1800.0,
    origen: "contabilidad",
    usuario: "Admin",
  },
  {
    id: 10,
    fecha: "2023-11-20",
    tipo: "egreso",
    categoria: "marketing",
    descripcion: "Campaña publicitaria en redes sociales",
    metodoPago: "tarjeta",
    referencia: "Factura #P789",
    monto: 500.0,
    origen: "contabilidad",
    usuario: "Admin",
  },
]

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  // Mostrar fecha actual
  const fechaActual = new Date()
  document.getElementById("current-date").textContent = fechaActual.toLocaleDateString()

  // Establecer fecha actual en los campos de fecha
  const hoy = fechaActual.toISOString().split("T")[0]
  document.getElementById("ingreso-fecha").value = hoy
  document.getElementById("egreso-fecha").value = hoy

  // Inicializar navegación
  initNavigation()

  // Cargar datos iniciales
  cargarDashboard()
  cargarTablaIngresos()
  cargarTablaEgresos()
  cargarHistorialTransacciones()

  // Inicializar gráficos
  inicializarGraficos()

  // Verificar si hay transacciones pendientes de otros módulos
  verificarTransaccionesPendientes()

  // Configurar evento para mostrar/ocultar campos de fecha personalizada
  document.getElementById("reporte-periodo").addEventListener("change", function () {
    if (this.value === "personalizado") {
      document.getElementById("periodo-personalizado").classList.remove("hidden")
    } else {
      document.getElementById("periodo-personalizado").classList.add("hidden")
    }
  })
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
function cargarDashboard() {
  const periodo = document.getElementById("periodo-dashboard").value

  // Calcular fechas según el periodo seleccionado
  const fechaActual = new Date()
  const fechaInicio = new Date()

  if (periodo === "mes") {
    fechaInicio.setDate(1) // Primer día del mes actual
  } else if (periodo === "trimestre") {
    fechaInicio.setMonth(Math.floor(fechaInicio.getMonth() / 3) * 3, 1) // Primer día del trimestre actual
  } else if (periodo === "anio") {
    fechaInicio.setMonth(0, 1) // Primer día del año actual
  }

  // Filtrar transacciones por periodo
  const transaccionesPeriodo = transacciones.filter((t) => {
    const fechaTransaccion = new Date(t.fecha)
    return fechaTransaccion >= fechaInicio && fechaTransaccion <= fechaActual
  })

  // Calcular totales
  const ingresos = transaccionesPeriodo.filter((t) => t.tipo === "ingreso").reduce((total, t) => total + t.monto, 0)

  const egresos = transaccionesPeriodo.filter((t) => t.tipo === "egreso").reduce((total, t) => total + t.monto, 0)

  const balance = ingresos - egresos

  // Calcular saldo actual (todos los tiempos)
  const totalIngresos = transacciones.filter((t) => t.tipo === "ingreso").reduce((total, t) => total + t.monto, 0)

  const totalEgresos = transacciones.filter((t) => t.tipo === "egreso").reduce((total, t) => total + t.monto, 0)

  const saldoActual = totalIngresos - totalEgresos

  // Actualizar estadísticas en el dashboard
  document.getElementById("total-ingresos").textContent = formatCurrency(ingresos)
  document.getElementById("total-egresos").textContent = formatCurrency(egresos)
  document.getElementById("balance-total").textContent = formatCurrency(balance)
  document.getElementById("saldo-actual").textContent = formatCurrency(saldoActual)

  // Cargar transacciones recientes
  cargarTransaccionesRecientes()

  // Actualizar gráficos
  if (window.ingresosEgresosChart && window.egresosCategoriaChart) {
    actualizarGraficos(transaccionesPeriodo)
  }
}

function actualizarDashboard() {
  cargarDashboard()
}

function cargarTransaccionesRecientes() {
  const tablaBody = document.querySelector("#tabla-transacciones-recientes tbody")
  tablaBody.innerHTML = ""

  // Obtener las últimas 5 transacciones
  const transaccionesRecientes = [...transacciones].sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 5)

  transaccionesRecientes.forEach((transaccion) => {
    const tr = document.createElement("tr")
    tr.innerHTML = `
      <td>${formatDate(transaccion.fecha)}</td>
      <td>${
        transaccion.tipo === "ingreso"
          ? '<span class="badge ingreso">Ingreso</span>'
          : '<span class="badge egreso">Egreso</span>'
      }</td>
      <td>${transaccion.categoria}</td>
      <td>${transaccion.descripcion}</td>
      <td class="${transaccion.tipo === "ingreso" ? "text-success" : "text-danger"}">${formatCurrency(
        transaccion.monto,
      )}</td>
      <td>${transaccion.origen}</td>
    `

    tablaBody.appendChild(tr)
  })
}

// Gráficos
function inicializarGraficos() {
  try {
    // Crear gráficos vacíos que se actualizarán después
    const ctxIngresosEgresos = document.getElementById("ingresos-egresos-chart").getContext("2d")
    const ctxEgresosCategorias = document.getElementById("egresos-categoria-chart").getContext("2d")

    // Gráfico de Ingresos vs Egresos
    window.ingresosEgresosChart = new Chart(ctxIngresosEgresos, {
      type: "bar",
      data: {
        labels: [],
        datasets: [
          {
            label: "Ingresos",
            backgroundColor: "#4CAF50",
            data: [],
          },
          {
            label: "Egresos",
            backgroundColor: "#F44336",
            data: [],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => "$" + value.toLocaleString(),
            },
          },
        },
      },
    })

    // Gráfico de Distribución de Egresos
    window.egresosCategoriaChart = new Chart(ctxEgresosCategorias, {
      type: "doughnut",
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: ["#FF5722", "#9C27B0", "#3F51B5", "#009688", "#FFC107", "#795548", "#607D8B", "#E91E63"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
          },
        },
      },
    })

    // Actualizar gráficos con datos iniciales
    const periodo = document.getElementById("periodo-dashboard").value
    const fechaActual = new Date()
    const fechaInicio = new Date()

    if (periodo === "mes") {
      fechaInicio.setDate(1)
    } else if (periodo === "trimestre") {
      fechaInicio.setMonth(Math.floor(fechaInicio.getMonth() / 3) * 3, 1)
    } else if (periodo === "anio") {
      fechaInicio.setMonth(0, 1)
    }

    const transaccionesPeriodo = transacciones.filter((t) => {
      const fechaTransaccion = new Date(t.fecha)
      return fechaTransaccion >= fechaInicio && fechaTransaccion <= fechaActual
    })

    actualizarGraficos(transaccionesPeriodo)
    console.log("Gráficos inicializados correctamente")
  } catch (error) {
    console.error("Error al inicializar gráficos:", error)
  }
}

function actualizarGraficos(transaccionesFiltradas) {
  if (!window.ingresosEgresosChart || !window.egresosCategoriaChart) {
    console.warn("Los gráficos no están inicializados todavía")
    return
  }

  try {
    // Actualizar gráfico de Ingresos vs Egresos por mes
    const meses = {}

    // Inicializar datos por mes para los últimos 6 meses
    for (let i = 0; i < 6; i++) {
      const fecha = new Date()
      fecha.setMonth(fecha.getMonth() - i)
      const mesKey = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}`
      meses[mesKey] = { ingresos: 0, egresos: 0 }
    }

    // Agrupar transacciones por mes
    transaccionesFiltradas.forEach((t) => {
      const fecha = new Date(t.fecha)
      const mesKey = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}`

      if (meses[mesKey]) {
        if (t.tipo === "ingreso") {
          meses[mesKey].ingresos += t.monto
        } else {
          meses[mesKey].egresos += t.monto
        }
      }
    })

    // Preparar datos para el gráfico
    const labels = Object.keys(meses)
      .sort()
      .map((key) => {
        const [year, month] = key.split("-")
        return new Date(year, month - 1).toLocaleDateString(undefined, { month: "short", year: "numeric" })
      })

    const ingresos = Object.keys(meses)
      .sort()
      .map((key) => meses[key].ingresos)
    const egresos = Object.keys(meses)
      .sort()
      .map((key) => meses[key].egresos)

    // Actualizar gráfico de Ingresos vs Egresos
    window.ingresosEgresosChart.data.labels = labels
    window.ingresosEgresosChart.data.datasets[0].data = ingresos
    window.ingresosEgresosChart.data.datasets[1].data = egresos
    window.ingresosEgresosChart.update()

    // Actualizar gráfico de Distribución de Egresos por categoría
    const categorias = {}

    // Agrupar egresos por categoría
    transaccionesFiltradas
      .filter((t) => t.tipo === "egreso")
      .forEach((t) => {
        if (!categorias[t.categoria]) {
          categorias[t.categoria] = 0
        }
        categorias[t.categoria] += t.monto
      })

    // Preparar datos para el gráfico
    const categoriasLabels = Object.keys(categorias)
    const categoriasData = Object.values(categorias)

    // Actualizar gráfico de Distribución de Egresos
    window.egresosCategoriaChart.data.labels = categoriasLabels
    window.egresosCategoriaChart.data.datasets[0].data = categoriasData
    window.egresosCategoriaChart.update()

    console.log("Gráficos actualizados correctamente")
  } catch (error) {
    console.error("Error al actualizar gráficos:", error)
  }
}

// Funciones para Ingresos
function guardarIngreso() {
  // Obtener datos del formulario
  const fecha = document.getElementById("ingreso-fecha").value
  const categoria = document.getElementById("ingreso-categoria").value
  const descripcion = document.getElementById("ingreso-descripcion").value
  const metodoPago = document.getElementById("ingreso-metodo").value
  const referencia = document.getElementById("ingreso-referencia").value
  const monto = Number.parseFloat(document.getElementById("ingreso-monto").value)

  // Validar datos
  if (!fecha || !categoria || !descripcion || !metodoPago || isNaN(monto) || monto <= 0) {
    alert("Por favor complete todos los campos obligatorios correctamente")
    return
  }

  // Crear nueva transacción
  const nuevaTransaccion = {
    id: transacciones.length > 0 ? Math.max(...transacciones.map((t) => t.id)) + 1 : 1,
    fecha,
    tipo: "ingreso",
    categoria,
    descripcion,
    metodoPago,
    referencia,
    monto,
    origen: "contabilidad",
    usuario: "Admin",
  }

  // Guardar transacción
  transacciones.push(nuevaTransaccion)

  // Guardar en localStorage para compartir con otros módulos
  guardarDatosEnLocalStorage()

  // Mostrar mensaje de éxito
  alert("Ingreso registrado correctamente")

  // Limpiar formulario
  limpiarFormulario("ingreso-form")

  // Actualizar tablas y dashboard
  cargarDashboard()
  cargarTablaIngresos()
  cargarHistorialTransacciones()
}

function cargarTablaIngresos() {
  const tablaBody = document.querySelector("#tabla-ingresos tbody")
  tablaBody.innerHTML = ""

  // Filtrar solo ingresos y ordenar por fecha (más recientes primero)
  const ingresos = transacciones
    .filter((t) => t.tipo === "ingreso")
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))

  ingresos.forEach((ingreso) => {
    const tr = document.createElement("tr")
    tr.innerHTML = `
      <td>${formatDate(ingreso.fecha)}</td>
      <td>${ingreso.categoria}</td>
      <td>${ingreso.descripcion}</td>
      <td>${ingreso.metodoPago}</td>
      <td>${ingreso.referencia}</td>
      <td>${formatCurrency(ingreso.monto)}</td>
      <td>
        <button type="button" class="btn-secondary" onclick="verTransaccion(${ingreso.id})">
          <span class="material-symbols-outlined">visibility</span>
        </button>
        <button type="button" class="btn-secondary" onclick="eliminarTransaccion(${ingreso.id})">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </td>
    `

    tablaBody.appendChild(tr)
  })
}

function filtrarIngresos() {
  const fechaInicio = document.getElementById("ingreso-fecha-inicio").value
  const fechaFin = document.getElementById("ingreso-fecha-fin").value

  const tablaBody = document.querySelector("#tabla-ingresos tbody")
  tablaBody.innerHTML = ""

  // Filtrar ingresos por fecha
  let ingresosFiltrados = transacciones.filter((t) => t.tipo === "ingreso")

  if (fechaInicio) {
    ingresosFiltrados = ingresosFiltrados.filter((t) => t.fecha >= fechaInicio)
  }

  if (fechaFin) {
    ingresosFiltrados = ingresosFiltrados.filter((t) => t.fecha <= fechaFin)
  }

  // Ordenar por fecha (más recientes primero)
  ingresosFiltrados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))

  ingresosFiltrados.forEach((ingreso) => {
    const tr = document.createElement("tr")
    tr.innerHTML = `
      <td>${formatDate(ingreso.fecha)}</td>
      <td>${ingreso.categoria}</td>
      <td>${ingreso.descripcion}</td>
      <td>${ingreso.metodoPago}</td>
      <td>${ingreso.referencia}</td>
      <td>${formatCurrency(ingreso.monto)}</td>
      <td>
        <button type="button" class="btn-secondary" onclick="verTransaccion(${ingreso.id})">
          <span class="material-symbols-outlined">visibility</span>
        </button>
        <button type="button" class="btn-secondary" onclick="eliminarTransaccion(${ingreso.id})">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </td>
    `

    tablaBody.appendChild(tr)
  })
}

// Funciones para Egresos
function guardarEgreso() {
  // Obtener datos del formulario
  const fecha = document.getElementById("egreso-fecha").value
  const categoria = document.getElementById("egreso-categoria").value
  const descripcion = document.getElementById("egreso-descripcion").value
  const metodoPago = document.getElementById("egreso-metodo").value
  const referencia = document.getElementById("egreso-referencia").value
  const monto = Number.parseFloat(document.getElementById("egreso-monto").value)

  // Validar datos
  if (!fecha || !categoria || !descripcion || !metodoPago || isNaN(monto) || monto <= 0) {
    alert("Por favor complete todos los campos obligatorios correctamente")
    return
  }

  // Crear nueva transacción
  const nuevaTransaccion = {
    id: transacciones.length > 0 ? Math.max(...transacciones.map((t) => t.id)) + 1 : 1,
    fecha,
    tipo: "egreso",
    categoria,
    descripcion,
    metodoPago,
    referencia,
    monto,
    origen: "contabilidad",
    usuario: "Admin",
  }

  // Guardar transacción
  transacciones.push(nuevaTransaccion)

  // Guardar en localStorage para compartir con otros módulos
  guardarDatosEnLocalStorage()

  // Mostrar mensaje de éxito
  alert("Egreso registrado correctamente")

  // Limpiar formulario
  limpiarFormulario("egreso-form")

  // Actualizar tablas y dashboard
  cargarDashboard()
  cargarTablaEgresos()
  cargarHistorialTransacciones()
}

function cargarTablaEgresos() {
  const tablaBody = document.querySelector("#tabla-egresos tbody")
  tablaBody.innerHTML = ""

  // Filtrar solo egresos y ordenar por fecha (más recientes primero)
  const egresos = transacciones.filter((t) => t.tipo === "egreso").sort((a, b) => new Date(b.fecha) - new Date(a.fecha))

  egresos.forEach((egreso) => {
    const tr = document.createElement("tr")
    tr.innerHTML = `
      <td>${formatDate(egreso.fecha)}</td>
      <td>${egreso.categoria}</td>
      <td>${egreso.descripcion}</td>
      <td>${egreso.metodoPago}</td>
      <td>${egreso.referencia}</td>
      <td>${formatCurrency(egreso.monto)}</td>
      <td>
        <button type="button" class="btn-secondary" onclick="verTransaccion(${egreso.id})">
          <span class="material-symbols-outlined">visibility</span>
        </button>
        <button type="button" class="btn-secondary" onclick="eliminarTransaccion(${egreso.id})">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </td>
    `

    tablaBody.appendChild(tr)
  })
}

function filtrarEgresos() {
  const fechaInicio = document.getElementById("egreso-fecha-inicio").value
  const fechaFin = document.getElementById("egreso-fecha-fin").value

  const tablaBody = document.querySelector("#tabla-egresos tbody")
  tablaBody.innerHTML = ""

  // Filtrar egresos por fecha
  let egresosFiltrados = transacciones.filter((t) => t.tipo === "egreso")

  if (fechaInicio) {
    egresosFiltrados = egresosFiltrados.filter((t) => t.fecha >= fechaInicio)
  }

  if (fechaFin) {
    egresosFiltrados = egresosFiltrados.filter((t) => t.fecha <= fechaFin)
  }

  // Ordenar por fecha (más recientes primero)
  egresosFiltrados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))

  egresosFiltrados.forEach((egreso) => {
    const tr = document.createElement("tr")
    tr.innerHTML = `
      <td>${formatDate(egreso.fecha)}</td>
      <td>${egreso.categoria}</td>
      <td>${egreso.descripcion}</td>
      <td>${egreso.metodoPago}</td>
      <td>${egreso.referencia}</td>
      <td>${formatCurrency(egreso.monto)}</td>
      <td>
        <button type="button" class="btn-secondary" onclick="verTransaccion(${egreso.id})">
          <span class="material-symbols-outlined">visibility</span>
        </button>
        <button type="button" class="btn-secondary" onclick="eliminarTransaccion(${egreso.id})">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </td>
    `

    tablaBody.appendChild(tr)
  })
}

// Funciones para Historial
function cargarHistorialTransacciones() {
  const tablaBody = document.querySelector("#tabla-historial tbody")
  tablaBody.innerHTML = ""

  // Ordenar transacciones por fecha (más recientes primero)
  const transaccionesOrdenadas = [...transacciones].sort((a, b) => new Date(b.fecha) - new Date(a.fecha))

  transaccionesOrdenadas.forEach((transaccion) => {
    const tr = document.createElement("tr")
    tr.innerHTML = `
      <td>${formatDate(transaccion.fecha)}</td>
      <td>${
        transaccion.tipo === "ingreso"
          ? '<span class="badge ingreso">Ingreso</span>'
          : '<span class="badge egreso">Egreso</span>'
      }</td>
      <td>${transaccion.categoria}</td>
      <td>${transaccion.descripcion}</td>
      <td>${transaccion.metodoPago}</td>
      <td>${transaccion.referencia}</td>
      <td class="${transaccion.tipo === "ingreso" ? "text-success" : "text-danger"}">${formatCurrency(
        transaccion.monto,
      )}</td>
      <td>${transaccion.origen}</td>
      <td>
        <button type="button" class="btn-secondary" onclick="verTransaccion(${transaccion.id})">
          <span class="material-symbols-outlined">visibility</span>
        </button>
        <button type="button" class="btn-secondary" onclick="eliminarTransaccion(${transaccion.id})">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </td>
    `

    tablaBody.appendChild(tr)
  })

  // Calcular totales
  const ingresos = transacciones.filter((t) => t.tipo === "ingreso").reduce((total, t) => total + t.monto, 0)

  const egresos = transacciones.filter((t) => t.tipo === "egreso").reduce((total, t) => total + t.monto, 0)

  const balance = ingresos - egresos

  // Actualizar resumen
  document.getElementById("historial-total-ingresos").textContent = formatCurrency(ingresos)
  document.getElementById("historial-total-egresos").textContent = formatCurrency(egresos)
  document.getElementById("historial-balance").textContent = formatCurrency(balance)
}

function filtrarHistorial() {
  const tipo = document.getElementById("historial-tipo").value
  const categoria = document.getElementById("historial-categoria").value
  const fechaInicio = document.getElementById("historial-fecha-inicio").value
  const fechaFin = document.getElementById("historial-fecha-fin").value
  const busqueda = document.getElementById("historial-buscar").value.toLowerCase()

  const tablaBody = document.querySelector("#tabla-historial tbody")
  tablaBody.innerHTML = ""

  // Filtrar transacciones
  let transaccionesFiltradas = [...transacciones]

  if (tipo !== "todos") {
    transaccionesFiltradas = transaccionesFiltradas.filter((t) => t.tipo === tipo)
  }

  if (categoria !== "todas") {
    transaccionesFiltradas = transaccionesFiltradas.filter((t) => t.categoria === categoria)
  }

  if (fechaInicio) {
    transaccionesFiltradas = transaccionesFiltradas.filter((t) => t.fecha >= fechaInicio)
  }

  if (fechaFin) {
    transaccionesFiltradas = transaccionesFiltradas.filter((t) => t.fecha <= fechaFin)
  }

  if (busqueda) {
    transaccionesFiltradas = transaccionesFiltradas.filter(
      (t) => t.descripcion.toLowerCase().includes(busqueda) || t.referencia.toLowerCase().includes(busqueda),
    )
  }

  // Ordenar por fecha (más recientes primero)
  transaccionesFiltradas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))

  transaccionesFiltradas.forEach((transaccion) => {
    const tr = document.createElement("tr")
    tr.innerHTML = `
      <td>${formatDate(transaccion.fecha)}</td>
      <td>${
        transaccion.tipo === "ingreso"
          ? '<span class="badge ingreso">Ingreso</span>'
          : '<span class="badge egreso">Egreso</span>'
      }</td>
      <td>${transaccion.categoria}</td>
      <td>${transaccion.descripcion}</td>
      <td>${transaccion.metodoPago}</td>
      <td>${transaccion.referencia}</td>
      <td class="${transaccion.tipo === "ingreso" ? "text-success" : "text-danger"}">${formatCurrency(
        transaccion.monto,
      )}</td>
      <td>${transaccion.origen}</td>
      <td>
        <button type="button" class="btn-secondary" onclick="verTransaccion(${transaccion.id})">
          <span class="material-symbols-outlined">visibility</span>
        </button>
        <button type="button" class="btn-secondary" onclick="eliminarTransaccion(${transaccion.id})">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </td>
    `

    tablaBody.appendChild(tr)
  })

  // Calcular totales filtrados
  const ingresos = transaccionesFiltradas.filter((t) => t.tipo === "ingreso").reduce((total, t) => total + t.monto, 0)

  const egresos = transaccionesFiltradas.filter((t) => t.tipo === "egreso").reduce((total, t) => total + t.monto, 0)

  const balance = ingresos - egresos

  // Actualizar resumen
  document.getElementById("historial-total-ingresos").textContent = formatCurrency(ingresos)
  document.getElementById("historial-total-egresos").textContent = formatCurrency(egresos)
  document.getElementById("historial-balance").textContent = formatCurrency(balance)
}

// Funciones para ver y editar transacciones
function verTransaccion(id) {
  const transaccion = transacciones.find((t) => t.id === id)

  if (transaccion) {
    // Llenar modal con datos de la transacción
    document.getElementById("detalle-fecha").textContent = formatDate(transaccion.fecha)
    document.getElementById("detalle-tipo").textContent = transaccion.tipo === "ingreso" ? "Ingreso" : "Egreso"
    document.getElementById("detalle-categoria").textContent = transaccion.categoria
    document.getElementById("detalle-descripcion").textContent = transaccion.descripcion
    document.getElementById("detalle-monto").textContent = formatCurrency(transaccion.monto)
    document.getElementById("detalle-metodo").textContent = transaccion.metodoPago
    document.getElementById("detalle-referencia").textContent = transaccion.referencia
    document.getElementById("detalle-origen").textContent = transaccion.origen

    // Abrir modal
    document.getElementById("ver-transaccion-modal").style.display = "block"
  }
}

function editarTransaccion() {
  // Cerrar modal de detalles
  cerrarModal("ver-transaccion-modal")

  // Obtener datos de la transacción
  const fecha = document.getElementById("detalle-fecha").textContent
  const tipo = document.getElementById("detalle-tipo").textContent === "Ingreso" ? "ingreso" : "egreso"
  const categoria = document.getElementById("detalle-categoria").textContent
  const descripcion = document.getElementById("detalle-descripcion").textContent
  const monto = document.getElementById("detalle-monto").textContent
  const metodoPago = document.getElementById("detalle-metodo").textContent
  const referencia = document.getElementById("detalle-referencia").textContent

  // Buscar ID de la transacción
  const transaccion = transacciones.find(
    (t) => t.fecha === fecha.split("/").reverse().join("-") && t.descripcion === descripcion,
  )

  if (!transaccion) return

  // Llenar formulario de edición
  document.getElementById("editar-transaccion-id").value = transaccion.id
  document.getElementById("editar-transaccion-tipo").value = tipo
  document.getElementById("editar-fecha").value = transaccion.fecha
  document.getElementById("editar-descripcion").value = descripcion
  document.getElementById("editar-monto").value = transaccion.monto
  document.getElementById("editar-metodo").value = metodoPago.toLowerCase()
  document.getElementById("editar-referencia").value = referencia

  // Llenar categorías según el tipo
  const selectCategoria = document.getElementById("editar-categoria")
  selectCategoria.innerHTML = ""

  if (tipo === "ingreso") {
    const categorias = ["hospedaje", "restaurante", "spa", "eventos", "otros"]
    categorias.forEach((cat) => {
      const option = document.createElement("option")
      option.value = cat
      option.textContent = cat
      selectCategoria.appendChild(option)
    })
  } else {
    const categorias = [
      "sueldos",
      "compras",
      "servicios",
      "mantenimiento",
      "impuestos",
      "alquiler",
      "marketing",
      "otros",
    ]
    categorias.forEach((cat) => {
      const option = document.createElement("option")
      option.value = cat
      option.textContent = cat
      selectCategoria.appendChild(option)
    })
  }

  // Seleccionar la categoría actual
  selectCategoria.value = categoria

  // Abrir modal de edición
  document.getElementById("editar-transaccion-modal").style.display = "block"
}

function guardarEdicionTransaccion() {
  // Obtener datos del formulario
  const id = Number.parseInt(document.getElementById("editar-transaccion-id").value)
  const tipo = document.getElementById("editar-transaccion-tipo").value
  const fecha = document.getElementById("editar-fecha").value
  const categoria = document.getElementById("editar-categoria").value
  const descripcion = document.getElementById("editar-descripcion").value
  const metodoPago = document.getElementById("editar-metodo").value
  const referencia = document.getElementById("editar-referencia").value
  const monto = Number.parseFloat(document.getElementById("editar-monto").value)

  // Validar datos
  if (!fecha || !categoria || !descripcion || !metodoPago || isNaN(monto) || monto <= 0) {
    alert("Por favor complete todos los campos obligatorios correctamente")
    return
  }

  // Buscar índice de la transacción
  const index = transacciones.findIndex((t) => t.id === id)

  if (index >= 0) {
    // Guardar origen original
    const origen = transacciones[index].origen

    // Actualizar transacción
    transacciones[index] = {
      id,
      fecha,
      tipo,
      categoria,
      descripcion,
      metodoPago,
      referencia,
      monto,
      origen,
      usuario: "Admin",
    }

    // Guardar en localStorage para compartir con otros módulos
    guardarDatosEnLocalStorage()

    // Mostrar mensaje de éxito
    alert("Transacción actualizada correctamente")

    // Cerrar modal
    cerrarModal("editar-transaccion-modal")

    // Actualizar tablas y dashboard
    cargarDashboard()
    cargarTablaIngresos()
    cargarTablaEgresos()
    cargarHistorialTransacciones()
  }
}

function eliminarTransaccion(id) {
  // Confirmar eliminación
  if (confirm("¿Está seguro de que desea eliminar esta transacción?")) {
    // Buscar índice de la transacción
    const index = transacciones.findIndex((t) => t.id === id)

    if (index >= 0) {
      // Eliminar transacción
      transacciones.splice(index, 1)

      // Guardar en localStorage para compartir con otros módulos
      guardarDatosEnLocalStorage()

      // Mostrar mensaje de éxito
      alert("Transacción eliminada correctamente")

      // Actualizar tablas y dashboard
      cargarDashboard()
      cargarTablaIngresos()
      cargarTablaEgresos()
      cargarHistorialTransacciones()
    }
  }
}

// Funciones para modales
function cerrarModal(modalId) {
  document.getElementById(modalId).style.display = "none"
}

// Funciones para compartir datos entre módulos usando localStorage
function guardarDatosEnLocalStorage() {
  localStorage.setItem("contabilidad_transacciones", JSON.stringify(transacciones))
}

function cargarDatosDeLocalStorage() {
  const transaccionesGuardadas = localStorage.getItem("contabilidad_transacciones")

  if (transaccionesGuardadas) {
    transacciones = JSON.parse(transaccionesGuardadas)
  }
}

// Verificar si hay transacciones pendientes de otros módulos
function verificarTransaccionesPendientes() {
  // Verificar si hay ventas pendientes
  const ventasPendientes = JSON.parse(localStorage.getItem("ventas_pendientes") || "[]")

  if (ventasPendientes.length > 0) {
    // Notificar al usuario
    alert(`Hay ${ventasPendientes.length} ingresos pendientes de ventas por registrar.`)
  }

  // Verificar si hay compras pendientes
  const comprasPendientes = JSON.parse(localStorage.getItem("inventario_compras_pendientes") || "[]")

  if (comprasPendientes.length > 0) {
    // Notificar al usuario
    alert(`Hay ${comprasPendientes.length} egresos pendientes de inventario por registrar.`)
  }

  // Cargar datos actualizados
  cargarDatosDeLocalStorage()
}

// Funciones de utilidad
function formatCurrency(amount) {
  return "$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

// Funciones para limpiar formularios
function limpiarFormulario(formId) {
  document.getElementById(formId).reset()

  // Si es el formulario de ingreso o egreso, establecer la fecha actual
  if (formId === "ingreso-form" || formId === "egreso-form") {
    const hoy = new Date().toISOString().split("T")[0]
    document.getElementById(formId === "ingreso-form" ? "ingreso-fecha" : "egreso-fecha").value = hoy
  }
}

// Inicializar datos al cargar la página
window.addEventListener("load", () => {
  cargarDatosDeLocalStorage()
  guardarDatosEnLocalStorage() // Guardar datos iniciales si no existen
})
