// ==========================
// MÓDULO RECURSOS HUMANOS JS
// ==========================

let empleados = []
let asistencias = []

// Variables para los gráficos
let departamentosCanvas
let asistenciaCanvas
let departamentosCtx
let asistenciaCtx
let departamentosData = []
let departamentosLabels = []
const asistenciaData = {
  labels: [],
  datasets: [
    { label: "Asistencias", color: "#4CAF50", data: [] },
    { label: "Faltas", color: "#F44336", data: [] },
    { label: "Retardos", color: "#FFC107", data: [] },
  ],
}

// ===== NAVEGACIÓN ENTRE SECCIONES =====
document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((i) => i.classList.remove("active"))
    item.classList.add("active")
    const section = item.dataset.section
    document.querySelectorAll(".content-section").forEach((sec) => {
      sec.classList.remove("active")
      if (sec.id === section) sec.classList.add("active")
    })
  })
})

// ===== MODALES Y TABS =====
function cerrarModal(id) {
  document.getElementById(id).style.display = "none"
}

function abrirModalNuevoEmpleado() {
  document.getElementById("form-empleado").reset()
  document.getElementById("empleado-id").value = ""
  document.getElementById("modal-empleado").style.display = "block"
}

document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"))
    document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"))
    btn.classList.add("active")
    document.getElementById(btn.dataset.tab).classList.add("active")
  })
})

// ===== EMPLEADOS =====
function guardarEmpleado() {
  const id = document.getElementById("empleado-id").value || Date.now().toString()
  const empleado = {
    id,
    nombre: document.getElementById("empleado-nombre").value,
    apellidos: document.getElementById("empleado-apellidos").value,
    departamento: document.getElementById("empleado-departamento").value,
    puesto: document.getElementById("empleado-puesto").value,
    fechaIngreso: document.getElementById("empleado-fecha-ingreso").value,
    sueldo: Number.parseFloat(document.getElementById("empleado-sueldo").value || 0),
    estado: document.getElementById("empleado-estado").value,
  }
  const index = empleados.findIndex((e) => e.id === id)
  index >= 0 ? (empleados[index] = empleado) : empleados.push(empleado)
  cerrarModal("modal-empleado")
  renderizarEmpleados()
  actualizarDashboard()
}

function editarEmpleado(id) {
  const e = empleados.find((emp) => emp.id === id)
  if (!e) return
  document.getElementById("empleado-id").value = e.id
  document.getElementById("empleado-nombre").value = e.nombre
  document.getElementById("empleado-apellidos").value = e.apellidos
  document.getElementById("empleado-departamento").value = e.departamento
  document.getElementById("empleado-puesto").value = e.puesto
  document.getElementById("empleado-fecha-ingreso").value = e.fechaIngreso
  document.getElementById("empleado-sueldo").value = e.sueldo
  document.getElementById("empleado-estado").value = e.estado
  document.getElementById("modal-empleado").style.display = "block"
}

function eliminarEmpleado(id) {
  if (confirm("¿Estás seguro de eliminar este empleado?")) {
    empleados = empleados.filter((e) => e.id !== id)
    renderizarEmpleados()
    actualizarDashboard()
  }
}

function renderizarEmpleados() {
  const tbody = document.querySelector("#tabla-empleados tbody")
  tbody.innerHTML = ""
  empleados.forEach((e) => {
    const row = document.createElement("tr")
    row.innerHTML = `
      <td>${e.id}</td>
      <td>${e.nombre} ${e.apellidos}</td>
      <td>${e.departamento}</td>
      <td>${e.puesto}</td>
      <td>-</td>
      <td>${e.fechaIngreso}</td>
      <td>$${e.sueldo.toFixed(2)}</td>
      <td><span class="status-badge ${e.estado}">${e.estado}</span></td>
      <td>
        <button onclick="abrirModalAsistencia('${e.id}')">🕒</button>
        <button onclick="editarEmpleado('${e.id}')">✏️</button>
        <button onclick="eliminarEmpleado('${e.id}')">🗑️</button>
      </td>
    `
    tbody.appendChild(row)
  })
}

// ===== DASHBOARD =====
function actualizarDashboard() {
  const hoy = new Date().toISOString().split("T")[0]
  const presentes = asistencias.filter((a) => a.fecha === hoy && a.estado === "presente").length
  const porcentaje = empleados.length > 0 ? (presentes / empleados.length) * 100 : 0
  document.getElementById("total-empleados").textContent = empleados.length
  document.getElementById("asistencia-hoy").textContent = porcentaje.toFixed(0) + "%"
  document.getElementById("nomina-mensual").textContent = "$" + calcularNominaMensual().toFixed(2)
  document.getElementById("total-ausencias").textContent = contarAusenciasDelMes()

  // Inicializar gráficos si no se han inicializado
  inicializarGraficos()

  // Actualizar datos para los gráficos
  actualizarDatosGraficos()

  // Dibujar gráficos
  dibujarGraficos()
}

// ===== GRÁFICOS =====
function inicializarGraficos() {
  // Verificar si ya están inicializados
  if (departamentosCtx && asistenciaCtx) return

  // Obtener los elementos canvas
  departamentosCanvas = document.getElementById("grafico-departamentos")
  asistenciaCanvas = document.getElementById("grafico-asistencia")

  // Si no existen, crearlos
  if (!departamentosCanvas) {
    departamentosCanvas = crearCanvas("grafico-departamentos", "dashboard-graficos", "Distribución por Departamento")
  }

  if (!asistenciaCanvas) {
    asistenciaCanvas = crearCanvas("grafico-asistencia", "dashboard-graficos", "Asistencia Semanal")
  }

  // Obtener contextos 2D
  departamentosCtx = departamentosCanvas.getContext("2d")
  asistenciaCtx = asistenciaCanvas.getContext("2d")

  // Configurar tamaños de canvas
  ajustarTamanoCanvas()

  // Agregar listener para redimensionar los gráficos cuando cambie el tamaño de la ventana
  window.addEventListener("resize", () => {
    ajustarTamanoCanvas()
    dibujarGraficos()
  })
}

function crearCanvas(id, containerId, titulo) {
  // Buscar o crear el contenedor
  let container = document.getElementById(containerId)
  if (!container) {
    container = document.createElement("div")
    container.id = containerId
    container.style.display = "flex"
    container.style.flexWrap = "wrap"
    container.style.justifyContent = "space-around"
    container.style.marginTop = "20px"

    // Buscar donde insertar el contenedor
    const dashboard = document.querySelector("#dashboard") || document.body
    dashboard.appendChild(container)
  }

  // Crear div para el gráfico
  const chartDiv = document.createElement("div")
  chartDiv.className = "chart-container"
  chartDiv.style.width = "45%"
  chartDiv.style.minWidth = "300px"
  chartDiv.style.margin = "10px"

  // Crear título
  const tituloElement = document.createElement("h3")
  tituloElement.textContent = titulo
  tituloElement.style.textAlign = "center"
  chartDiv.appendChild(tituloElement)

  // Crear canvas
  const canvas = document.createElement("canvas")
  canvas.id = id
  canvas.width = 300
  canvas.height = 200
  chartDiv.appendChild(canvas)

  // Añadir al contenedor
  container.appendChild(chartDiv)

  return canvas
}

function ajustarTamanoCanvas() {
  if (departamentosCanvas) {
    const container = departamentosCanvas.parentElement
    departamentosCanvas.width = container.clientWidth - 20
    departamentosCanvas.height = 200
  }

  if (asistenciaCanvas) {
    const container = asistenciaCanvas.parentElement
    asistenciaCanvas.width = container.clientWidth - 20
    asistenciaCanvas.height = 200
  }
}

function actualizarDatosGraficos() {
  // Datos para el gráfico de departamentos
  const departamentos = {}
  empleados.forEach((empleado) => {
    if (!departamentos[empleado.departamento]) {
      departamentos[empleado.departamento] = 0
    }
    departamentos[empleado.departamento]++
  })

  departamentosLabels = Object.keys(departamentos)
  departamentosData = Object.values(departamentos)

  // Datos para el gráfico de asistencia
  const fechas = []
  const asistenciasData = []
  const faltasData = []
  const retardosData = []

  // Obtener los últimos 7 días
  for (let i = 6; i >= 0; i--) {
    const fecha = new Date()
    fecha.setDate(fecha.getDate() - i)
    const fechaStr = fecha.toISOString().split("T")[0]
    fechas.push(fechaStr)

    // Contar asistencias, faltas y retardos para esta fecha
    const asistenciasDia = asistencias.filter((a) => a.fecha === fechaStr && a.estado === "presente").length
    const faltasDia = asistencias.filter((a) => a.fecha === fechaStr && a.estado === "ausente").length
    const retardosDia = asistencias.filter((a) => a.fecha === fechaStr && a.estado === "retardo").length

    asistenciasData.push(asistenciasDia)
    faltasData.push(faltasDia)
    retardosData.push(retardosDia)
  }

  // Formatear fechas para mostrar solo día y mes
  const fechasFormateadas = fechas.map((f) => {
    const fecha = new Date(f)
    return `${fecha.getDate()}/${fecha.getMonth() + 1}`
  })

  asistenciaData.labels = fechasFormateadas
  asistenciaData.datasets[0].data = asistenciasData
  asistenciaData.datasets[1].data = faltasData
  asistenciaData.datasets[2].data = retardosData
}

function dibujarGraficos() {
  dibujarGraficoDepartamentos()
  dibujarGraficoAsistencia()
}

function dibujarGraficoDepartamentos() {
  if (!departamentosCtx) return

  // Limpiar el canvas
  departamentosCtx.clearRect(0, 0, departamentosCanvas.width, departamentosCanvas.height)

  // Si no hay datos, mostrar mensaje
  if (departamentosData.length === 0) {
    mostrarMensajeNoData(departamentosCtx, departamentosCanvas.width, departamentosCanvas.height)
    return
  }

  // Colores para las secciones del gráfico
  const colors = ["#4CAF50", "#2196F3", "#FFC107", "#9C27B0", "#FF5722", "#607D8B"]

  // Calcular el total
  const total = departamentosData.reduce((a, b) => a + b, 0)

  // Calcular el centro y radio del gráfico
  const centerX = departamentosCanvas.width / 2
  const centerY = departamentosCanvas.height / 2
  const radius = Math.min(departamentosCanvas.width, departamentosCanvas.height) * 0.4

  // Dibujar el gráfico circular
  let startAngle = 0

  for (let i = 0; i < departamentosData.length; i++) {
    const value = departamentosData[i]
    const sliceAngle = (value / total) * 2 * Math.PI

    // Dibujar sector
    departamentosCtx.beginPath()
    departamentosCtx.moveTo(centerX, centerY)
    departamentosCtx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
    departamentosCtx.closePath()

    // Aplicar color
    departamentosCtx.fillStyle = colors[i % colors.length]
    departamentosCtx.fill()

    // Dibujar borde
    departamentosCtx.strokeStyle = "#fff"
    departamentosCtx.lineWidth = 2
    departamentosCtx.stroke()

    startAngle += sliceAngle
  }

  // Dibujar leyenda
  const legendX = departamentosCanvas.width * 0.7
  const legendY = departamentosCanvas.height * 0.2
  const itemHeight = 20
  const boxSize = 15

  for (let i = 0; i < departamentosLabels.length; i++) {
    const y = legendY + i * itemHeight

    // Dibujar cuadro de color
    departamentosCtx.fillStyle = colors[i % colors.length]
    departamentosCtx.fillRect(legendX, y, boxSize, boxSize)

    // Dibujar borde
    departamentosCtx.strokeStyle = "#fff"
    departamentosCtx.lineWidth = 1
    departamentosCtx.strokeRect(legendX, y, boxSize, boxSize)

    // Dibujar texto
    departamentosCtx.fillStyle = "#333"
    departamentosCtx.font = "12px Arial"
    departamentosCtx.textAlign = "left"
    departamentosCtx.textBaseline = "middle"
    departamentosCtx.fillText(departamentosLabels[i], legendX + boxSize + 5, y + boxSize / 2)
  }
}

function dibujarGraficoAsistencia() {
  if (!asistenciaCtx) return

  // Limpiar el canvas
  asistenciaCtx.clearRect(0, 0, asistenciaCanvas.width, asistenciaCanvas.height)

  // Si no hay datos, mostrar mensaje
  if (asistenciaData.labels.length === 0) {
    mostrarMensajeNoData(asistenciaCtx, asistenciaCanvas.width, asistenciaCanvas.height)
    return
  }

  // Calcular dimensiones del área de gráfico
  const chartArea = {
    left: asistenciaCanvas.width * 0.1,
    right: asistenciaCanvas.width * 0.9,
    top: asistenciaCanvas.height * 0.1,
    bottom: asistenciaCanvas.height * 0.8,
  }

  // Ancho del área de gráfico
  const chartWidth = chartArea.right - chartArea.left
  const chartHeight = chartArea.bottom - chartArea.top

  // Número de grupos (fechas)
  const numGroups = asistenciaData.labels.length

  // Ancho de cada grupo
  const groupWidth = chartWidth / numGroups

  // Encontrar el valor máximo para escalar
  const maxValue = Math.max(
    ...asistenciaData.datasets.map(
      (dataset) => Math.max(...dataset.data, 1), // Mínimo 1 para evitar división por cero
    ),
  )

  // Dibujar ejes
  dibujarEjesAsistencia(asistenciaCtx, chartArea, maxValue, asistenciaData.labels)

  // Dibujar barras
  for (let groupIndex = 0; groupIndex < numGroups; groupIndex++) {
    const numDatasets = asistenciaData.datasets.length
    const barWidth = groupWidth / (numDatasets + 1) // +1 para espacio entre grupos

    for (let datasetIndex = 0; datasetIndex < numDatasets; datasetIndex++) {
      const dataset = asistenciaData.datasets[datasetIndex]
      const value = dataset.data[groupIndex]

      // Calcular altura de la barra
      const barHeight = (value / maxValue) * chartHeight

      // Calcular posición X de la barra
      const barX = chartArea.left + groupIndex * groupWidth + (datasetIndex + 0.5) * barWidth

      // Calcular posición Y de la barra (desde abajo)
      const barY = chartArea.bottom - barHeight

      // Dibujar barra
      asistenciaCtx.fillStyle = dataset.color
      asistenciaCtx.fillRect(barX, barY, barWidth, barHeight)

      // Dibujar borde
      asistenciaCtx.strokeStyle = "#fff"
      asistenciaCtx.lineWidth = 1
      asistenciaCtx.strokeRect(barX, barY, barWidth, barHeight)

      // Dibujar valor encima de la barra si es mayor que cero
      if (value > 0) {
        asistenciaCtx.fillStyle = "#333"
        asistenciaCtx.font = "10px Arial"
        asistenciaCtx.textAlign = "center"
        asistenciaCtx.textBaseline = "bottom"
        asistenciaCtx.fillText(value.toString(), barX + barWidth / 2, barY - 2)
      }
    }
  }

  // Dibujar leyenda
  const legendX = asistenciaCanvas.width * 0.1
  const legendY = asistenciaCanvas.height * 0.05
  const itemWidth = 100
  const boxSize = 15

  for (let i = 0; i < asistenciaData.datasets.length; i++) {
    const dataset = asistenciaData.datasets[i]
    const x = legendX + i * itemWidth

    // Dibujar cuadro de color
    asistenciaCtx.fillStyle = dataset.color
    asistenciaCtx.fillRect(x, legendY, boxSize, boxSize)

    // Dibujar borde
    asistenciaCtx.strokeStyle = "#fff"
    asistenciaCtx.lineWidth = 1
    asistenciaCtx.strokeRect(x, legendY, boxSize, boxSize)

    // Dibujar texto
    asistenciaCtx.fillStyle = "#333"
    asistenciaCtx.font = "12px Arial"
    asistenciaCtx.textAlign = "left"
    asistenciaCtx.textBaseline = "middle"
    asistenciaCtx.fillText(dataset.label, x + boxSize + 5, legendY + boxSize / 2)
  }
}

function dibujarEjesAsistencia(ctx, chartArea, maxValue, labels) {
  // Dibujar eje Y
  ctx.beginPath()
  ctx.moveTo(chartArea.left, chartArea.top)
  ctx.lineTo(chartArea.left, chartArea.bottom)
  ctx.strokeStyle = "#999"
  ctx.lineWidth = 1
  ctx.stroke()

  // Dibujar eje X
  ctx.beginPath()
  ctx.moveTo(chartArea.left, chartArea.bottom)
  ctx.lineTo(chartArea.right, chartArea.bottom)
  ctx.strokeStyle = "#999"
  ctx.lineWidth = 1
  ctx.stroke()

  // Dibujar líneas horizontales y etiquetas del eje Y
  const numLines = 5
  for (let i = 0; i <= numLines; i++) {
    const y = chartArea.bottom - (i / numLines) * (chartArea.bottom - chartArea.top)
    const value = Math.round((i / numLines) * maxValue)

    // Dibujar línea
    ctx.beginPath()
    ctx.moveTo(chartArea.left, y)
    ctx.lineTo(chartArea.right, y)
    ctx.strokeStyle = "#eee"
    ctx.lineWidth = 1
    ctx.stroke()

    // Dibujar etiqueta
    ctx.fillStyle = "#666"
    ctx.font = "10px Arial"
    ctx.textAlign = "right"
    ctx.textBaseline = "middle"
    ctx.fillText(value.toString(), chartArea.left - 5, y)
  }

  // Dibujar etiquetas del eje X
  for (let i = 0; i < labels.length; i++) {
    const x = chartArea.left + (i + 0.5) * ((chartArea.right - chartArea.left) / labels.length)

    ctx.fillStyle = "#666"
    ctx.font = "10px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    ctx.fillText(labels[i], x, chartArea.bottom + 5)
  }
}

function mostrarMensajeNoData(ctx, width, height) {
  ctx.fillStyle = "#999"
  ctx.font = "14px Arial"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText("No hay datos disponibles", width / 2, height / 2)
}

// ===== ASISTENCIA =====
function abrirModalAsistencia(id) {
  const empleado = empleados.find((e) => e.id === id)
  if (!empleado) return
  document.getElementById("asistencia-empleado-id").value = empleado.id
  document.getElementById("asistencia-empleado-nombre").value = `${empleado.nombre} ${empleados.apellidos}`
  document.getElementById("asistencia-fecha").value = new Date().toISOString().split("T")[0]
  document.getElementById("asistencia-entrada").value = ""
  document.getElementById("asistencia-salida").value = ""
  document.getElementById("asistencia-observaciones").value = ""
  document.getElementById("modal-asistencia").style.display = "block"
}

function guardarAsistencia() {
  const asistencia = {
    id: document.getElementById("asistencia-empleado-id").value,
    fecha: document.getElementById("asistencia-fecha").value,
    entrada: document.getElementById("asistencia-entrada").value,
    salida: document.getElementById("asistencia-salida").value,
    estado: document.getElementById("asistencia-estado").value,
    observaciones: document.getElementById("asistencia-observaciones").value,
  }
  asistencias.push(asistencia)
  cerrarModal("modal-asistencia")
  cargarAsistenciasPorFecha()
  actualizarDashboard()
}

function cargarAsistenciasPorFecha() {
  const fecha = document.getElementById("fecha-asistencia").value || new Date().toISOString().split("T")[0]
  const tbody = document.querySelector("#tabla-registro-asistencia tbody")
  tbody.innerHTML = ""
  asistencias
    .filter((a) => a.fecha === fecha)
    .forEach((a) => {
      const emp = empleados.find((e) => e.id === a.id) || {}
      const row = document.createElement("tr")
      row.innerHTML = `
      <td>${a.id}</td>
      <td>${emp.nombre || ""} ${emp.apellidos || ""}</td>
      <td>${emp.departamento || ""}</td>
      <td>${a.entrada}</td>
      <td>${a.salida}</td>
      <td><span class="status-badge ${a.estado}">${a.estado}</span></td>
      <td>${a.observaciones}</td>
      <td>-</td>
    `
      tbody.appendChild(row)
    })
}

// ===== NÓMINA =====
function calcularNomina() {
  const tbody = document.querySelector("#tabla-nomina tbody")
  tbody.innerHTML = ""
  let totalSueldos = 0

  empleados.forEach((e) => {
    const asistenciasEmpleado = asistencias.filter((a) => a.id === e.id)
    const diasPresente = asistenciasEmpleado.filter((a) => a.estado === "presente").length
    const diasFaltas = asistenciasEmpleado.filter((a) => a.estado === "ausente").length
    const bono = diasPresente >= 20 ? 200 : 0
    const descuento = diasFaltas * 10
    const total = e.sueldo + bono - descuento
    totalSueldos += total

    const row = document.createElement("tr")
    row.innerHTML = `
      <td>${e.id}</td>
      <td>${e.nombre} ${e.apellidos}</td>
      <td>${e.departamento}</td>
      <td>$${e.sueldo.toFixed(2)}</td>
      <td>${diasPresente}</td>
      <td>$${bono.toFixed(2)}</td>
      <td>$${descuento.toFixed(2)}</td>
      <td>$${total.toFixed(2)}</td>
      <td><button onclick="verHistorialEmpleado('${e.id}')">📄</button></td>
    `
    tbody.appendChild(row)
  })

  document.getElementById("total-sueldos").textContent = "$" + totalSueldos.toFixed(2)
  document.getElementById("total-nomina").textContent = "$" + totalSueldos.toFixed(2)
  document.getElementById("resultado-nomina").classList.remove("hidden")
}

function calcularNominaMensual() {
  return empleados.reduce((acc, e) => acc + e.sueldo, 0)
}

function contarAusenciasDelMes() {
  const mes = new Date().getMonth() + 1
  return asistencias.filter((a) => a.estado === "ausente" && new Date(a.fecha).getMonth() + 1 === mes).length
}

// ===== UTILIDADES =====
function cerrarSesion() {
  alert("Sesión cerrada.")
}

// ===== INICIALIZACIÓN =====
function inicializar() {
  // Cargar datos de ejemplo si no hay empleados
  if (empleados.length === 0) {
    cargarDatosEjemplo()
  }

  // Establecer fecha actual en los campos de fecha
  document.getElementById("fecha-asistencia").value = new Date().toISOString().split("T")[0]

  // Actualizar dashboard y tablas
  actualizarDashboard()
  cargarAsistenciasPorFecha()
}

function cargarDatosEjemplo() {
  // Datos de ejemplo para empleados
  empleados = [
    {
      id: "1",
      nombre: "Juan",
      apellidos: "Pérez",
      departamento: "Ventas",
      puesto: "Vendedor",
      fechaIngreso: "2023-01-15",
      sueldo: 1500,
      estado: "activo",
    },
    {
      id: "2",
      nombre: "María",
      apellidos: "González",
      departamento: "Administración",
      puesto: "Asistente",
      fechaIngreso: "2023-02-20",
      sueldo: 1200,
      estado: "activo",
    },
    {
      id: "3",
      nombre: "Carlos",
      apellidos: "Rodríguez",
      departamento: "TI",
      puesto: "Programador",
      fechaIngreso: "2023-03-10",
      sueldo: 2000,
      estado: "activo",
    },
    {
      id: "4",
      nombre: "Ana",
      apellidos: "Martínez",
      departamento: "Ventas",
      puesto: "Gerente",
      fechaIngreso: "2023-01-05",
      sueldo: 2500,
      estado: "activo",
    },
  ]

  // Datos de ejemplo para asistencias
  const hoy = new Date().toISOString().split("T")[0]
  const ayer = new Date(Date.now() - 86400000).toISOString().split("T")[0]

  asistencias = [
    { id: "1", fecha: hoy, entrada: "08:00", salida: "17:00", estado: "presente", observaciones: "" },
    { id: "2", fecha: hoy, entrada: "08:30", salida: "17:30", estado: "presente", observaciones: "" },
    { id: "3", fecha: hoy, entrada: "09:15", salida: "18:00", estado: "retardo", observaciones: "Llegó tarde" },
    { id: "4", fecha: hoy, entrada: "", salida: "", estado: "ausente", observaciones: "No se presentó" },
    { id: "1", fecha: ayer, entrada: "08:00", salida: "17:00", estado: "presente", observaciones: "" },
    { id: "2", fecha: ayer, entrada: "08:00", salida: "17:00", estado: "presente", observaciones: "" },
    { id: "3", fecha: ayer, entrada: "08:00", salida: "17:00", estado: "presente", observaciones: "" },
    { id: "4", fecha: ayer, entrada: "08:00", salida: "17:00", estado: "presente", observaciones: "" },
  ]
}

// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", inicializar)

// Agregar evento para redimensionar gráficos cuando cambia el tamaño de la ventana
window.addEventListener("resize", () => {
  ajustarTamanoCanvas()
  dibujarGraficos()
})
