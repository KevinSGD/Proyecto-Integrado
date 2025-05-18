// Datos de ejemplo para el inventario
let productos = [
    {
      id: 1,
      nombre: "Agua mineral",
      sku: "MB-001",
      categoria: "minibar",
      descripcion: "Botella de agua mineral de 500ml",
      precio: 20.0,
      unidad: "unidad",
      stock: 48,
      stockMinimo: 10,
      ubicacion: "Almacén principal, Estante A1",
    },
    {
      id: 2,
      nombre: "Refresco",
      sku: "MB-002",
      categoria: "minibar",
      descripcion: "Lata de refresco de 355ml",
      precio: 25.0,
      unidad: "unidad",
      stock: 36,
      stockMinimo: 15,
      ubicacion: "Almacén principal, Estante A1",
    },
    {
      id: 3,
      nombre: "Cerveza",
      sku: "MB-003",
      categoria: "minibar",
      descripcion: "Cerveza nacional en botella de 355ml",
      precio: 40.0,
      unidad: "unidad",
      stock: 24,
      stockMinimo: 12,
      ubicacion: "Almacén principal, Estante A2",
    },
    {
      id: 4,
      nombre: "Snacks",
      sku: "MB-004",
      categoria: "minibar",
      descripcion: "Bolsa de papas fritas 45g",
      precio: 35.0,
      unidad: "unidad",
      stock: 30,
      stockMinimo: 10,
      ubicacion: "Almacén principal, Estante A3",
    },
    {
      id: 5,
      nombre: "Café",
      sku: "RS-001",
      categoria: "restaurante",
      descripcion: "Café en grano premium, 1kg",
      precio: 250.0,
      unidad: "kg",
      stock: 5,
      stockMinimo: 2,
      ubicacion: "Almacén cocina, Estante B1",
    },
    {
      id: 6,
      nombre: "Azúcar",
      sku: "RS-002",
      categoria: "restaurante",
      descripcion: "Azúcar refinada, 1kg",
      precio: 30.0,
      unidad: "kg",
      stock: 8,
      stockMinimo: 5,
      ubicacion: "Almacén cocina, Estante B1",
    },
    {
      id: 7,
      nombre: "Aceite de oliva",
      sku: "RS-003",
      categoria: "restaurante",
      descripcion: "Aceite de oliva extra virgen, 1lt",
      precio: 180.0,
      unidad: "lt",
      stock: 3,
      stockMinimo: 2,
      ubicacion: "Almacén cocina, Estante B2",
    },
    {
      id: 8,
      nombre: "Detergente para ropa",
      sku: "LV-001",
      categoria: "lavanderia",
      descripcion: "Detergente líquido para ropa, 5lt",
      precio: 120.0,
      unidad: "lt",
      stock: 4,
      stockMinimo: 2,
      ubicacion: "Almacén lavandería, Estante C1",
    },
    {
      id: 9,
      nombre: "Suavizante",
      sku: "LV-002",
      categoria: "lavanderia",
      descripcion: "Suavizante de telas, 5lt",
      precio: 100.0,
      unidad: "lt",
      stock: 3,
      stockMinimo: 2,
      ubicacion: "Almacén lavandería, Estante C1",
    },
    {
      id: 10,
      nombre: "Aceite esencial",
      sku: "SP-001",
      categoria: "spa",
      descripcion: "Aceite esencial de lavanda, 100ml",
      precio: 150.0,
      unidad: "unidad",
      stock: 8,
      stockMinimo: 3,
      ubicacion: "Almacén spa, Estante D1",
    },
    {
      id: 11,
      nombre: "Toallas",
      sku: "SP-002",
      categoria: "spa",
      descripcion: "Toallas de algodón premium",
      precio: 80.0,
      unidad: "unidad",
      stock: 25,
      stockMinimo: 10,
      ubicacion: "Almacén spa, Estante D2",
    },
    {
      id: 12,
      nombre: "Limpiador multiusos",
      sku: "LM-001",
      categoria: "limpieza",
      descripcion: "Limpiador multiusos, 5lt",
      precio: 90.0,
      unidad: "lt",
      stock: 6,
      stockMinimo: 3,
      ubicacion: "Almacén limpieza, Estante E1",
    },
    {
      id: 13,
      nombre: "Papel higiénico",
      sku: "LM-002",
      categoria: "limpieza",
      descripcion: "Papel higiénico, paquete de 24 rollos",
      precio: 120.0,
      unidad: "paquete",
      stock: 10,
      stockMinimo: 5,
      ubicacion: "Almacén limpieza, Estante E2",
    },
    {
      id: 14,
      nombre: "Bombillas LED",
      sku: "MT-001",
      categoria: "mantenimiento",
      descripcion: "Bombillas LED 9W, caja de 10 unidades",
      precio: 200.0,
      unidad: "caja",
      stock: 4,
      stockMinimo: 2,
      ubicacion: "Almacén mantenimiento, Estante F1",
    },
    {
      id: 15,
      nombre: "Pilas AA",
      sku: "MT-002",
      categoria: "mantenimiento",
      descripcion: "Pilas alcalinas AA, paquete de 12",
      precio: 60.0,
      unidad: "paquete",
      stock: 6,
      stockMinimo: 3,
      ubicacion: "Almacén mantenimiento, Estante F2",
    },
  ]
  
  // Datos de ejemplo para movimientos de inventario
  let movimientos = [
    {
      id: 1,
      fecha: "2023-11-01",
      tipo: "entrada",
      productoId: 1,
      cantidad: 50,
      motivo: "compra",
      referencia: "Factura #12345",
      origen: "inventario",
      usuario: "Admin",
      notas: "Compra inicial",
    },
    {
      id: 2,
      fecha: "2023-11-05",
      tipo: "salida",
      productoId: 1,
      cantidad: 2,
      motivo: "venta",
      referencia: "Reserva #1",
      origen: "ventas",
      usuario: "Admin",
      notas: "Consumo de minibar",
    },
    {
      id: 3,
      fecha: "2023-11-02",
      tipo: "entrada",
      productoId: 2,
      cantidad: 40,
      motivo: "compra",
      referencia: "Factura #12345",
      origen: "inventario",
      usuario: "Admin",
      notas: "Compra inicial",
    },
    {
      id: 4,
      fecha: "2023-11-06",
      tipo: "salida",
      productoId: 2,
      cantidad: 4,
      motivo: "venta",
      referencia: "Reserva #2",
      origen: "ventas",
      usuario: "Admin",
      notas: "Consumo de minibar",
    },
    {
      id: 5,
      fecha: "2023-11-03",
      tipo: "entrada",
      productoId: 5,
      cantidad: 6,
      motivo: "compra",
      referencia: "Factura #12346",
      origen: "inventario",
      usuario: "Admin",
      notas: "Compra semanal",
    },
    {
      id: 6,
      fecha: "2023-11-07",
      tipo: "salida",
      productoId: 5,
      cantidad: 1,
      motivo: "consumo",
      referencia: "Cocina",
      origen: "inventario",
      usuario: "Admin",
      notas: "Uso en restaurante",
    },
    {
      id: 7,
      fecha: "2023-11-04",
      tipo: "entrada",
      productoId: 8,
      cantidad: 5,
      motivo: "compra",
      referencia: "Factura #12347",
      origen: "inventario",
      usuario: "Admin",
      notas: "Compra mensual",
    },
    {
      id: 8,
      fecha: "2023-11-08",
      tipo: "salida",
      productoId: 8,
      cantidad: 1,
      motivo: "consumo",
      referencia: "Lavandería",
      origen: "inventario",
      usuario: "Admin",
      notas: "Uso diario",
    },
    {
      id: 9,
      fecha: "2023-11-10",
      tipo: "entrada",
      productoId: 10,
      cantidad: 10,
      motivo: "compra",
      referencia: "Factura #12348",
      origen: "inventario",
      usuario: "Admin",
      notas: "Compra mensual",
    },
    {
      id: 10,
      tipo: "salida",
      fecha: "2023-11-12",
      productoId: 10,
      cantidad: 2,
      motivo: "venta",
      referencia: "Spa",
      origen: "ventas",
      usuario: "Admin",
      notas: "Uso en tratamiento",
    },
  ]
  
  // Inicialización
  document.addEventListener("DOMContentLoaded", () => {
    // Mostrar fecha actual
    //const fechaActual = new Date()
    //document.getElementById("current-date").textContent = fechaActual.toLocaleDateString()
  
    // Establecer fecha actual en el campo de fecha de movimiento
    //document.getElementById("movimiento-fecha").value = fechaActual.toISOString().split("T")[0]
  
    // Inicializar navegación
    initNavigation()
  
    // Cargar datos iniciales
    cargarDashboardInventario()
    cargarTablaExistencias()
    cargarTablaMovimientos()
  
    // Inicializar gráfico de categorías
    inicializarGraficoCategorias()
  
    // Verificar si hay movimientos pendientes del módulo de ventas
    verificarMovimientosPendientes()
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
  
  // Dashboard de Inventario
  function cargarDashboardInventario() {
    // Calcular estadísticas
    const totalProductos = productos.length
    const stockBajo = productos.filter((p) => p.stock <= p.stockMinimo).length
  
    // Calcular entradas y salidas del mes actual
    const fechaActual = new Date()
    const primerDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1)
  
    const entradasMes = movimientos.filter((m) => m.tipo === "entrada" && new Date(m.fecha) >= primerDiaMes).length
  
    const salidasMes = movimientos.filter((m) => m.tipo === "salida" && new Date(m.fecha) >= primerDiaMes).length
  
    // Actualizar estadísticas en el dashboard
    document.getElementById("total-productos").textContent = totalProductos
    document.getElementById("stock-bajo").textContent = stockBajo
    document.getElementById("total-entradas").textContent = entradasMes
    document.getElementById("total-salidas").textContent = salidasMes
  
    // Cargar alertas de stock bajo
    cargarAlertasStockBajo()
  
    // Cargar movimientos recientes
    cargarMovimientosRecientes()
  
    // Actualizar resumen por categoría
    actualizarResumenCategorias()
  }
  
  function cargarAlertasStockBajo() {
    const tablaBody = document.querySelector("#tabla-alertas tbody")
    tablaBody.innerHTML = ""
  
    // Filtrar productos con stock bajo
    const productosStockBajo = productos
      .filter((p) => p.stock <= p.stockMinimo)
      .sort((a, b) => a.stock / a.stockMinimo - b.stock / b.stockMinimo)
  
    // Mostrar solo los primeros 5 productos con stock más crítico
    const productosAMostrar = productosStockBajo.slice(0, 5)
  
    if (productosAMostrar.length === 0) {
      const tr = document.createElement("tr")
      tr.innerHTML = `
              <td colspan="6" class="text-center">No hay productos con stock bajo</td>
          `
      tablaBody.appendChild(tr)
      return
    }
  
    productosAMostrar.forEach((producto) => {
      const porcentaje = (producto.stock / producto.stockMinimo) * 100
      let estado, claseEstado
  
      if (producto.stock === 0) {
        estado = "Agotado"
        claseEstado = "status-agotado"
      } else if (porcentaje <= 50) {
        estado = "Crítico"
        claseEstado = "status-critico"
      } else {
        estado = "Bajo"
        claseEstado = "status-bajo"
      }
  
      const tr = document.createElement("tr")
      tr.innerHTML = `
              <td>${producto.nombre}</td>
              <td>${producto.categoria}</td>
              <td>${producto.stock} ${producto.unidad}</td>
              <td>${producto.stockMinimo} ${producto.unidad}</td>
              <td><span class="stock-status ${claseEstado}">${estado}</span></td>
              <td>
                  <button type="button" class="btn-primary" onclick="abrirRegistroEntrada(${producto.id})">
                      <span class="material-symbols-outlined">add_circle</span> Registrar Entrada
                  </button>
              </td>
          `
  
      tablaBody.appendChild(tr)
    })
  }
  
  function cargarMovimientosRecientes() {
    const tablaBody = document.getElementById("recent-movements-table")
    tablaBody.innerHTML = ""
  
    // Obtener los últimos 5 movimientos
    const movimientosRecientes = [...movimientos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 5)
  
    movimientosRecientes.forEach((movimiento) => {
      const producto = productos.find((p) => p.id === movimiento.productoId)
      if (!producto) return
  
      const tr = document.createElement("tr")
      tr.innerHTML = `
              <td>${movimiento.fecha}</td>
              <td>${movimiento.tipo === "entrada" ? "Entrada" : "Salida"}</td>
              <td>${producto.nombre}</td>
              <td>${movimiento.cantidad} ${producto.unidad}</td>
              <td>${movimiento.origen === "ventas" ? "Módulo Ventas" : "Módulo Inventario"}</td>
              <td>${movimiento.usuario}</td>
          `
  
      tablaBody.appendChild(tr)
    })
  }
  
  function inicializarGraficoCategorias() {
    const ctx = document.getElementById("category-chart").getContext("2d")
  
    // Contar productos por categoría
    const categorias = {}
    productos.forEach((producto) => {
      if (!categorias[producto.categoria]) {
        categorias[producto.categoria] = 0
      }
      categorias[producto.categoria]++
    })
  
    // Colores para las categorías
    const colores = {
      minibar: "#4CAF50",
      restaurante: "#2196F3",
      lavanderia: "#FFC107",
      spa: "#9C27B0",
      limpieza: "#FF5722",
      mantenimiento: "#607D8B",
      otros: "#795548",
    }
  
    // Preparar datos para el gráfico
    const labels = Object.keys(categorias)
    const data = Object.values(categorias)
    const backgroundColor = labels.map((label) => colores[label] || "#999")
  
    // Crear gráfico
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: backgroundColor,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    })
  
    // Actualizar lista de categorías
    const categoriasList = document.getElementById("category-summary")
    categoriasList.innerHTML = ""
  
    labels.forEach((categoria, index) => {
      const div = document.createElement("div")
      div.className = "category-item"
      div.innerHTML = `
              <div class="category-color" style="background-color: ${backgroundColor[index]}"></div>
              <div class="category-name">${categoria}</div>
              <div class="category-count">${data[index]}</div>
          `
  
      categoriasList.appendChild(div)
    })
  }
  
  function actualizarResumenCategorias() {
    // Esta función se llama cuando cambia el inventario
    // Reinicializa el gráfico de categorías
    inicializarGraficoCategorias()
  }
  
  // Funciones para Agregar Producto
  function guardarProducto() {
    // Obtener datos del formulario
    const nombre = document.getElementById("producto-nombre").value
    const categoria = document.getElementById("producto-categoria").value
    const descripcion = document.getElementById("producto-descripcion").value
    const sku = document.getElementById("producto-sku").value
    const precio = Number.parseFloat(document.getElementById("producto-precio").value)
    const unidad = document.getElementById("producto-unidad").value
    const stock = Number.parseInt(document.getElementById("producto-stock").value)
    const stockMinimo = Number.parseInt(document.getElementById("producto-minimo").value)
    const ubicacion = document.getElementById("producto-ubicacion").value
  
    // Validar datos
    if (!nombre || !categoria || !sku || isNaN(precio) || isNaN(stock) || isNaN(stockMinimo)) {
      alert("Por favor complete todos los campos obligatorios correctamente")
      return
    }
  
    // Verificar si el SKU ya existe
    if (productos.some((p) => p.sku === sku)) {
      alert("El SKU ingresado ya existe. Por favor use un SKU único.")
      return
    }
  
    // Crear nuevo producto
    const nuevoProducto = {
      id: productos.length > 0 ? Math.max(...productos.map((p) => p.id)) + 1 : 1,
      nombre,
      categoria,
      descripcion,
      sku,
      precio,
      unidad,
      stock,
      stockMinimo,
      ubicacion,
    }
  
    // Guardar producto
    productos.push(nuevoProducto)
  
    // Si hay stock inicial, registrar movimiento de entrada
    if (stock > 0) {
      const nuevoMovimiento = {
        id: movimientos.length > 0 ? Math.max(...movimientos.map((m) => m.id)) + 1 : 1,
        fecha: new Date().toISOString().split("T")[0],
        tipo: "entrada",
        productoId: nuevoProducto.id,
        cantidad: stock,
        motivo: "compra",
        referencia: "Stock inicial",
        origen: "inventario",
        usuario: "Admin",
        notas: "Registro inicial de producto",
      }
  
      movimientos.push(nuevoMovimiento)
    }
  
    // Guardar en localStorage para compartir con el módulo de ventas
    guardarDatosEnLocalStorage()
  
    // Mostrar mensaje de éxito
    alert("Producto guardado correctamente")
  
    // Limpiar formulario
    limpiarFormulario("producto-form")
  
    // Actualizar tablas y dashboard
    cargarDashboardInventario()
    cargarTablaExistencias()
    cargarTablaMovimientos()
  }
  
  function limpiarFormulario(formId) {
    document.getElementById(formId).reset()
  
    // Si es el formulario de movimiento, ocultar información del producto
    if (formId === "movimiento-form") {
      document.getElementById("producto-info").classList.add("hidden")
      document.getElementById("guardar-movimiento-btn").disabled = true
    }
  }
  
  // Funciones para Entradas/Salidas
  function buscarProductoMovimiento() {
    const busqueda = document.getElementById("movimiento-producto-buscar").value.toLowerCase()
  
    if (!busqueda) {
      alert("Ingrese un término de búsqueda")
      return
    }
  
    // Buscar producto por nombre o SKU
    const productoEncontrado = productos.find(
      (p) => p.nombre.toLowerCase().includes(busqueda) || p.sku.toLowerCase() === busqueda.toLowerCase(),
    )
  
    if (productoEncontrado) {
      // Mostrar información del producto
      document.getElementById("info-producto-nombre").textContent = productoEncontrado.nombre
      document.getElementById("info-producto-sku").textContent = productoEncontrado.sku
      document.getElementById("info-producto-stock").textContent =
        `${productoEncontrado.stock} ${productoEncontrado.unidad}`
      document.getElementById("movimiento-producto-id").value = productoEncontrado.id
  
      document.getElementById("producto-info").classList.remove("hidden")
      document.getElementById("guardar-movimiento-btn").disabled = false
    } else {
      alert("No se encontró ningún producto con ese criterio")
    }
  }
  
  function guardarMovimiento() {
    // Obtener datos del formulario
    const tipo = document.getElementById("movimiento-tipo").value
    const fecha = document.getElementById("movimiento-fecha").value
    const motivo = document.getElementById("movimiento-motivo").value
    const referencia = document.getElementById("movimiento-referencia").value
    const productoId = Number.parseInt(document.getElementById("movimiento-producto-id").value)
    const cantidad = Number.parseInt(document.getElementById("movimiento-cantidad").value)
    const notas = document.getElementById("movimiento-notas").value
  
    // Validar datos
    if (!tipo || !fecha || !motivo || !productoId || isNaN(cantidad) || cantidad <= 0) {
      alert("Por favor complete todos los campos obligatorios correctamente")
      return
    }
  
    // Obtener producto
    const producto = productos.find((p) => p.id === productoId)
    if (!producto) {
      alert("Producto no encontrado")
      return
    }
  
    // Validar stock suficiente para salidas
    if (tipo === "salida" && cantidad > producto.stock) {
      alert(`Stock insuficiente. Stock actual: ${producto.stock} ${producto.unidad}`)
      return
    }
  
    // Crear nuevo movimiento
    const nuevoMovimiento = {
      id: movimientos.length > 0 ? Math.max(...movimientos.map((m) => m.id)) + 1 : 1,
      fecha,
      tipo,
      productoId,
      cantidad,
      motivo,
      referencia,
      origen: "inventario",
      usuario: "Admin",
      notas,
    }
  
    // Guardar movimiento
    movimientos.push(nuevoMovimiento)
  
    // Actualizar stock del producto
    if (tipo === "entrada") {
      producto.stock += cantidad
    } else {
      producto.stock -= cantidad
    }
  
    // Guardar en localStorage para compartir con el módulo de ventas
    guardarDatosEnLocalStorage()
  
    // Mostrar mensaje de éxito
    alert("Movimiento registrado correctamente")
  
    // Limpiar formulario
    limpiarFormulario("movimiento-form")
  
    // Actualizar tablas y dashboard
    cargarDashboardInventario()
    cargarTablaExistencias()
    cargarTablaMovimientos()
  }
  
  function cargarTablaMovimientos() {
    const tablaBody = document.querySelector("#tabla-movimientos tbody")
    tablaBody.innerHTML = ""
  
    // Ordenar movimientos por fecha (más recientes primero)
    const movimientosOrdenados = [...movimientos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
  
    movimientosOrdenados.forEach((movimiento) => {
      const producto = productos.find((p) => p.id === movimiento.productoId)
      if (!producto) return
  
      const tr = document.createElement("tr")
      tr.innerHTML = `
              <td>${movimiento.fecha}</td>
              <td>${movimiento.tipo === "entrada" ? "Entrada" : "Salida"}</td>
              <td>${producto.nombre}</td>
              <td>${movimiento.cantidad} ${producto.unidad}</td>
              <td>${movimiento.motivo}</td>
              <td>${movimiento.referencia}</td>
              <td>${movimiento.origen === "ventas" ? "Módulo Ventas" : "Módulo Inventario"}</td>
              <td>${movimiento.usuario}</td>
          `
  
      tablaBody.appendChild(tr)
    })
  }
  
  function filtrarMovimientos() {
    const filtroTipo = document.getElementById("filtro-movimiento-tipo").value
    const filtroOrigen = document.getElementById("filtro-movimiento-origen").value
    const tablaBody = document.querySelector("#tabla-movimientos tbody")
    tablaBody.innerHTML = ""
  
    // Filtrar movimientos por tipo y origen
    let movimientosFiltrados = [...movimientos]
  
    if (filtroTipo !== "todos") {
      movimientosFiltrados = movimientosFiltrados.filter((m) => m.tipo === filtroTipo)
    }
  
    if (filtroOrigen !== "todos") {
      movimientosFiltrados = movimientosFiltrados.filter((m) => m.origen === filtroOrigen)
    }
  
    // Ordenar por fecha (más recientes primero)
    movimientosFiltrados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
  
    movimientosFiltrados.forEach((movimiento) => {
      const producto = productos.find((p) => p.id === movimiento.productoId)
      if (!producto) return
  
      const tr = document.createElement("tr")
      tr.innerHTML = `
              <td>${movimiento.fecha}</td>
              <td>${movimiento.tipo === "entrada" ? "Entrada" : "Salida"}</td>
              <td>${producto.nombre}</td>
              <td>${movimiento.cantidad} ${producto.unidad}</td>
              <td>${movimiento.motivo}</td>
              <td>${movimiento.referencia}</td>
              <td>${movimiento.origen === "ventas" ? "Módulo Ventas" : "Módulo Inventario"}</td>
              <td>${movimiento.usuario}</td>
          `
  
      tablaBody.appendChild(tr)
    })
  }
  
  // Funciones para Existencias
  function cargarTablaExistencias() {
    const tablaBody = document.querySelector("#tabla-existencias tbody")
    tablaBody.innerHTML = ""
  
    // Ordenar productos por categoría y nombre
    const productosOrdenados = [...productos].sort((a, b) => {
      if (a.categoria !== b.categoria) {
        return a.categoria.localeCompare(b.categoria)
      }
      return a.nombre.localeCompare(b.nombre)
    })
  
    productosOrdenados.forEach((producto) => {
      // Determinar estado del stock
      let estado, claseEstado
  
      if (producto.stock === 0) {
        estado = "Agotado"
        claseEstado = "status-agotado"
      } else if (producto.stock <= producto.stockMinimo * 0.5) {
        estado = "Crítico"
        claseEstado = "status-critico"
      } else if (producto.stock <= producto.stockMinimo) {
        estado = "Bajo"
        claseEstado = "status-bajo"
      } else {
        estado = "Normal"
        claseEstado = "status-normal"
      }
  
      // Calcular valor total
      const valorTotal = producto.stock * producto.precio
  
      const tr = document.createElement("tr")
      tr.innerHTML = `
              <td>${producto.sku}</td>
              <td>${producto.nombre}</td>
              <td>${producto.categoria}</td>
              <td>${producto.stock}</td>
              <td>${producto.unidad}</td>
              <td>${producto.precio.toFixed(2)}</td>
              <td>${valorTotal.toFixed(2)}</td>
              <td><span class="stock-status ${claseEstado}">${estado}</span></td>
              <td>
                  <button type="button" class="btn-secondary" onclick="editarProducto(${producto.id})">
                      <span class="material-symbols-outlined">edit</span>
                  </button>
                  <button type="button" class="btn-secondary" onclick="verMovimientosProducto(${producto.id})">
                      <span class="material-symbols-outlined">history</span>
                  </button>
              </td>
          `
  
      tablaBody.appendChild(tr)
    })
  }
  
  function filtrarExistencias() {
    const filtroCategoria = document.getElementById("filtro-categoria").value
    const filtroStock = document.getElementById("filtro-stock").value
    const busqueda = document.getElementById("buscar-producto").value.toLowerCase()
  
    const tablaBody = document.querySelector("#tabla-existencias tbody")
    tablaBody.innerHTML = ""
  
    // Filtrar productos
    let productosFiltrados = [...productos]
  
    if (filtroCategoria !== "todas") {
      productosFiltrados = productosFiltrados.filter((p) => p.categoria === filtroCategoria)
    }
  
    if (filtroStock !== "todos") {
      if (filtroStock === "bajo") {
        productosFiltrados = productosFiltrados.filter((p) => p.stock <= p.stockMinimo && p.stock > 0)
      } else if (filtroStock === "normal") {
        productosFiltrados = productosFiltrados.filter((p) => p.stock > p.stockMinimo)
      } else if (filtroStock === "agotado") {
        productosFiltrados = productosFiltrados.filter((p) => p.stock === 0)
      }
    }
  
    if (busqueda) {
      productosFiltrados = productosFiltrados.filter(
        (p) => p.nombre.toLowerCase().includes(busqueda) || p.sku.toLowerCase().includes(busqueda),
      )
    }
  
    // Ordenar productos por categoría y nombre
    productosFiltrados.sort((a, b) => {
      if (a.categoria !== b.categoria) {
        return a.categoria.localeCompare(b.categoria)
      }
      return a.nombre.localeCompare(b.nombre)
    })
  
    productosFiltrados.forEach((producto) => {
      // Determinar estado del stock
      let estado, claseEstado
  
      if (producto.stock === 0) {
        estado = "Agotado"
        claseEstado = "status-agotado"
      } else if (producto.stock <= producto.stockMinimo * 0.5) {
        estado = "Crítico"
        claseEstado = "status-critico"
      } else if (producto.stock <= producto.stockMinimo) {
        estado = "Bajo"
        claseEstado = "status-bajo"
      } else {
        estado = "Normal"
        claseEstado = "status-normal"
      }
  
      // Calcular valor total
      const valorTotal = producto.stock * producto.precio
  
      const tr = document.createElement("tr")
      tr.innerHTML = `
              <td>${producto.sku}</td>
              <td>${producto.nombre}</td>
              <td>${producto.categoria}</td>
              <td>${producto.stock}</td>
              <td>${producto.unidad}</td>
              <td>${producto.precio.toFixed(2)}</td>
              <td>${valorTotal.toFixed(2)}</td>
              <td><span class="stock-status ${claseEstado}">${estado}</span></td>
              <td>
                  <button type="button" class="btn-secondary" onclick="editarProducto(${producto.id})">
                      <span class="material-symbols-outlined">edit</span>
                  </button>
                  <button type="button" class="btn-secondary" onclick="verMovimientosProducto(${producto.id})">
                      <span class="material-symbols-outlined">history</span>
                  </button>
              </td>
          `
  
      tablaBody.appendChild(tr)
    })
  }
  
  // Funciones para modales
  function editarProducto(id) {
    // Buscar producto por ID
    const producto = productos.find((p) => p.id === id)
  
    if (producto) {
      // Llenar formulario con datos del producto
      document.getElementById("editar-producto-id").value = producto.id
      document.getElementById("editar-producto-nombre").value = producto.nombre
      document.getElementById("editar-producto-categoria").value = producto.categoria
      document.getElementById("editar-producto-sku").value = producto.sku
      document.getElementById("editar-producto-descripcion").value = producto.descripcion
      document.getElementById("editar-producto-precio").value = producto.precio
      document.getElementById("editar-producto-unidad").value = producto.unidad
      document.getElementById("editar-producto-stock").value = producto.stock
      document.getElementById("editar-producto-minimo").value = producto.stockMinimo
      document.getElementById("editar-producto-ubicacion").value = producto.ubicacion
  
      // Abrir modal
      document.getElementById("editar-producto-modal").style.display = "block"
    }
  }
  
  function actualizarProducto() {
    // Obtener datos del formulario
    const id = Number.parseInt(document.getElementById("editar-producto-id").value)
    const nombre = document.getElementById("editar-producto-nombre").value
    const categoria = document.getElementById("editar-producto-categoria").value
    const sku = document.getElementById("editar-producto-sku").value
    const descripcion = document.getElementById("editar-producto-descripcion").value
    const precio = Number.parseFloat(document.getElementById("editar-producto-precio").value)
    const unidad = document.getElementById("editar-producto-unidad").value
    const stock = Number.parseInt(document.getElementById("editar-producto-stock").value)
    const stockMinimo = Number.parseInt(document.getElementById("editar-producto-minimo").value)
    const ubicacion = document.getElementById("editar-producto-ubicacion").value
  
    // Validar datos
    if (!nombre || !categoria || !sku || isNaN(precio) || isNaN(stock) || isNaN(stockMinimo)) {
      alert("Por favor complete todos los campos obligatorios correctamente")
      return
    }
  
    // Verificar si el SKU ya existe en otro producto
    const productoExistente = productos.find((p) => p.sku === sku && p.id !== id)
    if (productoExistente) {
      alert("El SKU ingresado ya existe en otro producto. Por favor use un SKU único.")
      return
    }
  
    // Buscar índice del producto
    const index = productos.findIndex((p) => p.id === id)
  
    if (index >= 0) {
      // Guardar stock anterior para registrar ajuste si es necesario
      const stockAnterior = productos[index].stock
  
      // Actualizar producto
      productos[index] = {
        id,
        nombre,
        categoria,
        descripcion,
        sku,
        precio,
        unidad,
        stock,
        stockMinimo,
        ubicacion,
      }
  
      // Si el stock cambió, registrar un movimiento de ajuste
      if (stock !== stockAnterior) {
        const tipo = stock > stockAnterior ? "entrada" : "salida"
        const cantidad = Math.abs(stock - stockAnterior)
  
        const nuevoMovimiento = {
          id: movimientos.length > 0 ? Math.max(...movimientos.map((m) => m.id)) + 1 : 1,
          fecha: new Date().toISOString().split("T")[0],
          tipo,
          productoId: id,
          cantidad,
          motivo: "ajuste",
          referencia: "Ajuste de inventario",
          origen: "inventario",
          usuario: "Admin",
          notas: "Ajuste manual desde edición de producto",
        }
  
        movimientos.push(nuevoMovimiento)
      }
  
      // Guardar en localStorage para compartir con el módulo de ventas
      guardarDatosEnLocalStorage()
  
      // Mostrar mensaje de éxito
      alert("Producto actualizado correctamente")
  
      // Cerrar modal
      cerrarModal("editar-producto-modal")
  
      // Actualizar tablas y dashboard
      cargarDashboardInventario()
      cargarTablaExistencias()
      cargarTablaMovimientos()
    }
  }
  
  function verMovimientosProducto(id) {
    // Buscar producto por ID
    const producto = productos.find((p) => p.id === id)
  
    if (producto) {
      // Mostrar información del producto
      document.getElementById("movimiento-info-nombre").textContent = producto.nombre
      document.getElementById("movimiento-info-sku").textContent = producto.sku
      document.getElementById("movimiento-info-stock").textContent = `${producto.stock} ${producto.unidad}`
  
      // Cargar movimientos del producto
      const tablaBody = document.querySelector("#tabla-producto-movimientos tbody")
      tablaBody.innerHTML = ""
  
      // Filtrar movimientos del producto y ordenar por fecha (más recientes primero)
      const movimientosProducto = movimientos
        .filter((m) => m.productoId === id)
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
  
      if (movimientosProducto.length === 0) {
        const tr = document.createElement("tr")
        tr.innerHTML = `
                  <td colspan="8" class="text-center">No hay movimientos registrados para este producto</td>
              `
        tablaBody.appendChild(tr)
      } else {
        movimientosProducto.forEach((movimiento) => {
          const tr = document.createElement("tr")
          tr.innerHTML = `
                      <td>${movimiento.fecha}</td>
                      <td>${movimiento.tipo === "entrada" ? "Entrada" : "Salida"}</td>
                      <td>${movimiento.cantidad} ${producto.unidad}</td>
                      <td>${movimiento.motivo}</td>
                      <td>${movimiento.referencia}</td>
                      <td>${movimiento.origen === "ventas" ? "Módulo Ventas" : "Módulo Inventario"}</td>
                      <td>${movimiento.usuario}</td>
                      <td>${movimiento.notas}</td>
                  `
  
          tablaBody.appendChild(tr)
        })
      }
  
      // Abrir modal
      document.getElementById("ver-movimientos-modal").style.display = "block"
    }
  }
  
  function cerrarModal(modalId) {
    document.getElementById(modalId).style.display = "none"
  }
  
  // Funciones para Reportes
  function generarReporteStock() {
    // Mostrar sección de reporte
    document.getElementById("reporte-generado").classList.remove("hidden")
    document.getElementById("reporte-titulo").textContent = "Reporte de Stock Actual"
  
    // Generar contenido del reporte
    const contenidoReporte = document.getElementById("reporte-contenido")
  
    // Calcular estadísticas generales
    const totalProductos = productos.length
    const valorTotal = productos.reduce((total, p) => total + p.stock * p.precio, 0)
    const stockBajo = productos.filter((p) => p.stock <= p.stockMinimo).length
    const agotados = productos.filter((p) => p.stock === 0).length
  
    // Crear HTML del reporte
    let html = `
          <div class="report-header">
              <div class="report-meta">
                  <p><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</p>
                  <p><strong>Generado por:</strong> Admin</p>
              </div>
              <div class="report-summary">
                  <div class="summary-stats">
                      <div class="stat-item">
                          <span class="stat-label">Total Productos:</span>
                          <span class="stat-value">${totalProductos}</span>
                      </div>
                      <div class="stat-item">
                          <span class="stat-label">Valor Total:</span>
                          <span class="stat-value">${valorTotal.toFixed(2)}</span>
                      </div>
                      <div class="stat-item">
                          <span class="stat-label">Stock Bajo:</span>
                          <span class="stat-value">${stockBajo}</span>
                      </div>
                      <div class="stat-item">
                          <span class="stat-label">Agotados:</span>
                          <span class="stat-value">${agotados}</span>
                      </div>
                  </div>
              </div>
          </div>
          
          <h4>Detalle de Inventario</h4>
          <div class="table-container">
              <table>
                  <thead>
                      <tr>
                          <th>SKU</th>
                          <th>Producto</th>
                          <th>Categoría</th>
                          <th>Stock</th>
                          <th>Unidad</th>
                          <th>Precio Unit.</th>
                          <th>Valor Total</th>
                          <th>Estado</th>
                      </tr>
                  </thead>
                  <tbody>
      `
  
    // Ordenar productos por categoría y nombre
    const productosOrdenados = [...productos].sort((a, b) => {
      if (a.categoria !== b.categoria) {
        return a.categoria.localeCompare(b.categoria)
      }
      return a.nombre.localeCompare(b.nombre)
    })
  
    // Agregar filas de productos
    productosOrdenados.forEach((producto) => {
      // Determinar estado del stock
      let estado, claseEstado
  
      if (producto.stock === 0) {
        estado = "Agotado"
        claseEstado = "status-agotado"
      } else if (producto.stock <= producto.stockMinimo * 0.5) {
        estado = "Crítico"
        claseEstado = "status-critico"
      } else if (producto.stock <= producto.stockMinimo) {
        estado = "Bajo"
        claseEstado = "status-bajo"
      } else {
        estado = "Normal"
        claseEstado = "status-normal"
      }
  
      // Calcular valor total
      const valorTotal = producto.stock * producto.precio
  
      html += `
                      <tr>
                          <td>${producto.sku}</td>
                          <td>${producto.nombre}</td>
                          <td>${producto.categoria}</td>
                          <td>${producto.stock}</td>
                          <td>${producto.unidad}</td>
                          <td>${producto.precio.toFixed(2)}</td>
                          <td>${valorTotal.toFixed(2)}</td>
                          <td><span class="stock-status ${claseEstado}">${estado}</span></td>
                      </tr>
          `
    })
  
    html += `
                  </tbody>
              </table>
          </div>
      `
  
    contenidoReporte.innerHTML = html
  }
  
  function generarReporteMovimientos() {
    // Mostrar sección de reporte
    document.getElementById("reporte-generado").classList.remove("hidden")
    document.getElementById("reporte-titulo").textContent = "Reporte de Movimientos"
  
    // Generar contenido del reporte
    const contenidoReporte = document.getElementById("reporte-contenido")
  
    // Calcular estadísticas de movimientos
    const totalMovimientos = movimientos.length
    const totalEntradas = movimientos.filter((m) => m.tipo === "entrada").length
    const totalSalidas = movimientos.filter((m) => m.tipo === "salida").length
  
    // Crear HTML del reporte
    let html = `
          <div class="report-header">
              <div class="report-meta">
                  <p><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</p>
                  <p><strong>Generado por:</strong> Admin</p>
              </div>
              <div class="report-summary">
                  <div class="summary-stats">
                      <div class="stat-item">
                          <span class="stat-label">Total Movimientos:</span>
                          <span class="stat-value">${totalMovimientos}</span>
                      </div>
                      <div class="stat-item">
                          <span class="stat-label">Entradas:</span>
                          <span class="stat-value">${totalEntradas}</span>
                      </div>
                      <div class="stat-item">
                          <span class="stat-label">Salidas:</span>
                          <span class="stat-value">${totalSalidas}</span>
                      </div>
                  </div>
              </div>
          </div>
          
          <h4>Detalle de Movimientos</h4>
          <div class="table-container">
              <table>
                  <thead>
                      <tr>
                          <th>Fecha</th>
                          <th>Tipo</th>
                          <th>Producto</th>
                          <th>Cantidad</th>
                          <th>Motivo</th>
                          <th>Referencia</th>
                          <th>Origen</th>
                          <th>Usuario</th>
                      </tr>
                  </thead>
                  <tbody>
      `
  
    // Ordenar movimientos por fecha (más recientes primero)
    const movimientosOrdenados = [...movimientos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
  
    // Agregar filas de movimientos
    movimientosOrdenados.forEach((movimiento) => {
      const producto = productos.find((p) => p.id === movimiento.productoId)
      if (!producto) return
  
      html += `
                      <tr>
                          <td>${movimiento.fecha}</td>
                          <td>${movimiento.tipo === "entrada" ? "Entrada" : "Salida"}</td>
                          <td>${producto.nombre}</td>
                          <td>${movimiento.cantidad} ${producto.unidad}</td>
                          <td>${movimiento.motivo}</td>
                          <td>${movimiento.referencia}</td>
                          <td>${movimiento.origen === "ventas" ? "Módulo Ventas" : "Módulo Inventario"}</td>
                          <td>${movimiento.usuario}</td>
                      </tr>
          `
    })
  
    html += `
                  </tbody>
              </table>
          </div>
      `
  
    contenidoReporte.innerHTML = html
  }
  
  function generarReporteValoracion() {
    // Mostrar sección de reporte
    document.getElementById("reporte-generado").classList.remove("hidden")
    document.getElementById("reporte-titulo").textContent = "Valoración de Inventario"
  
    // Generar contenido del reporte
    const contenidoReporte = document.getElementById("reporte-contenido")
  
    // Calcular valor total del inventario
    const valorTotal = productos.reduce((total, p) => total + p.stock * p.precio, 0)
  
    // Calcular valor por categoría
    const valorPorCategoria = {}
    productos.forEach((producto) => {
      const valor = producto.stock * producto.precio
      if (!valorPorCategoria[producto.categoria]) {
        valorPorCategoria[producto.categoria] = 0
      }
      valorPorCategoria[producto.categoria] += valor
    })
  
    // Crear HTML del reporte
    let html = `
          <div class="report-header">
              <div class="report-meta">
                  <p><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</p>
                  <p><strong>Generado por:</strong> Admin</p>
              </div>
              <div class="report-summary">
                  <div class="summary-stats">
                      <div class="stat-item">
                          <span class="stat-label">Valor Total del Inventario:</span>
                          <span class="stat-value">${valorTotal.toFixed(2)}</span>
                      </div>
                  </div>
              </div>
          </div>
          
          <h4>Valor por Categoría</h4>
          <div class="table-container">
              <table>
                  <thead>
                      <tr>
                          <th>Categoría</th>
                          <th>Valor</th>
                          <th>Porcentaje</th>
                      </tr>
                  </thead>
                  <tbody>
      `
  
    // Agregar filas de categorías
    Object.entries(valorPorCategoria).forEach(([categoria, valor]) => {
      const porcentaje = (valor / valorTotal) * 100
  
      html += `
                      <tr>
                          <td>${categoria}</td>
                          <td>${valor.toFixed(2)}</td>
                          <td>${porcentaje.toFixed(2)}%</td>
                      </tr>
          `
    })
  
    html += `
                  </tbody>
              </table>
          </div>
          
          <h4>Detalle por Producto</h4>
          <div class="table-container">
              <table>
                  <thead>
                      <tr>
                          <th>SKU</th>
                          <th>Producto</th>
                          <th>Categoría</th>
                          <th>Stock</th>
                          <th>Precio Unit.</th>
                          <th>Valor Total</th>
                      </tr>
                  </thead>
                  <tbody>
      `
  
    // Ordenar productos por valor total (mayor a menor)
    const productosOrdenados = [...productos].sort((a, b) => b.stock * b.precio - a.stock * a.precio)
  
    // Agregar filas de productos
    productosOrdenados.forEach((producto) => {
      const valorProducto = producto.stock * producto.precio
  
      html += `
                      <tr>
                          <td>${producto.sku}</td>
                          <td>${producto.nombre}</td>
                          <td>${producto.categoria}</td>
                          <td>${producto.stock} ${producto.unidad}</td>
                          <td>${producto.precio.toFixed(2)}</td>
                          <td>${valorProducto.toFixed(2)}</td>
                      </tr>
          `
    })
  
    html += `
                  </tbody>
              </table>
          </div>
      `
  
    contenidoReporte.innerHTML = html
  }
  
  function generarReporteRotacion() {
    // Mostrar sección de reporte
    document.getElementById("reporte-generado").classList.remove("hidden")
    document.getElementById("reporte-titulo").textContent = "Rotación de Productos"
  
    // Generar contenido del reporte
    const contenidoReporte = document.getElementById("reporte-contenido")
  
    // Calcular rotación de productos (salidas por producto)
    const rotacionProductos = {}
  
    // Filtrar solo movimientos de salida
    const salidasProductos = movimientos.filter((m) => m.tipo === "salida")
  
    // Contar salidas por producto
    salidasProductos.forEach((movimiento) => {
      if (!rotacionProductos[movimiento.productoId]) {
        rotacionProductos[movimiento.productoId] = {
          cantidad: 0,
          movimientos: 0,
        }
      }
      rotacionProductos[movimiento.productoId].cantidad += movimiento.cantidad
      rotacionProductos[movimiento.productoId].movimientos += 1
    })
  
    // Crear HTML del reporte
    let html = `
          <div class="report-header">
              <div class="report-meta">
                  <p><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</p>
                  <p><strong>Generado por:</strong> Admin</p>
              </div>
              <div class="report-summary">
                  <div class="summary-stats">
                      <div class="stat-item">
                          <span class="stat-label">Total Salidas:</span>
                          <span class="stat-value">${salidasProductos.length}</span>
                      </div>
                  </div>
              </div>
          </div>
          
          <h4>Rotación de Productos</h4>
          <div class="table-container">
              <table>
                  <thead>
                      <tr>
                          <th>Producto</th>
                          <th>Categoría</th>
                          <th>Cantidad Total Salidas</th>
                          <th>Número de Movimientos</th>
                          <th>Stock Actual</th>
                          <th>Índice de Rotación</th>
                      </tr>
                  </thead>
                  <tbody>
      `
  
    // Crear array de productos con rotación
    const productosConRotacion = []
  
    Object.entries(rotacionProductos).forEach(([productoId, datos]) => {
      const producto = productos.find((p) => p.id === Number.parseInt(productoId))
      if (!producto) return
  
      // Calcular índice de rotación (salidas / stock promedio)
      // Para simplificar, usamos stock actual + salidas como aproximación del stock inicial
      const stockPromedio = (producto.stock + datos.cantidad) / 2
      const indiceRotacion = stockPromedio > 0 ? datos.cantidad / stockPromedio : 0
  
      productosConRotacion.push({
        ...producto,
        cantidadSalidas: datos.cantidad,
        movimientos: datos.movimientos,
        indiceRotacion,
      })
    })
  
    // Ordenar productos por índice de rotación (mayor a menor)
    productosConRotacion.sort((a, b) => b.indiceRotacion - a.indiceRotacion)
  
    // Agregar filas de productos
    productosConRotacion.forEach((producto) => {
      html += `
                      <tr>
                          <td>${producto.nombre}</td>
                          <td>${producto.categoria}</td>
                          <td>${producto.cantidadSalidas} ${producto.unidad}</td>
                          <td>${producto.movimientos}</td>
                          <td>${producto.stock} ${producto.unidad}</td>
                          <td>${producto.indiceRotacion.toFixed(2)}</td>
                      </tr>
          `
    })
  
    // Agregar productos sin rotación
    const productosIdConRotacion = Object.keys(rotacionProductos).map((id) => Number.parseInt(id))
    const productosSinRotacion = productos.filter((p) => !productosIdConRotacion.includes(p.id))
  
    productosSinRotacion.forEach((producto) => {
      html += `
                      <tr>
                          <td>${producto.nombre}</td>
                          <td>${producto.categoria}</td>
                          <td>0 ${producto.unidad}</td>
                          <td>0</td>
                          <td>${producto.stock} ${producto.unidad}</td>
                          <td>0.00</td>
                      </tr>
          `
    })
  
    html += `
                  </tbody>
              </table>
          </div>
      `
  
    contenidoReporte.innerHTML = html
  }
  
  function imprimirReporte() {
    window.print()
  }
  
  function exportarReporteExcel() {
    alert("Exportando reporte a Excel...")
    // En una implementación real, se generaría un archivo Excel para descargar
  }
  
  function exportarExistencias() {
    alert("Exportando existencias a Excel...")
    // En una implementación real, se generaría un archivo Excel para descargar
  }
  
  function exportarMovimientos() {
    alert("Exportando movimientos a Excel...")
    // En una implementación real, se generaría un archivo Excel para descargar
  }
  
  // Funciones para ver todas las alertas y movimientos
  function verTodasAlertas() {
    // Cambiar a la sección de existencias y filtrar por stock bajo
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.remove("active")
    })
  
    document.querySelectorAll(".content-section").forEach((section) => {
      section.classList.remove("active")
    })
  
    // Activar sección de existencias
    document.querySelector('[data-section="existencias"]').classList.add("active")
    document.getElementById("existencias").classList.add("active")
  
    // Aplicar filtro de stock bajo
    document.getElementById("filtro-stock").value = "bajo"
    filtrarExistencias()
  }
  
  function verTodosMovimientos() {
    // Cambiar a la sección de movimientos
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.remove("active")
    })
  
    document.querySelectorAll(".content-section").forEach((section) => {
      section.classList.remove("active")
    })
  
    // Activar sección de movimientos
    document.querySelector('[data-section="movimientos"]').classList.add("active")
    document.getElementById("movimientos").classList.add("active")
  
    // Mostrar todos los movimientos
    document.getElementById("filtro-movimiento-tipo").value = "todos"
    filtrarMovimientos()
  }
  
  // Función para abrir registro de entrada desde alertas
  function abrirRegistroEntrada(productoId) {
    // Cambiar a la sección de movimientos
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.remove("active")
    })
  
    document.querySelectorAll(".content-section").forEach((section) => {
      section.classList.remove("active")
    })
  
    // Activar sección de movimientos
    document.querySelector('[data-section="movimientos"]').classList.add("active")
    document.getElementById("movimientos").classList.add("active")
  
    // Buscar producto
    const producto = productos.find((p) => p.id === productoId)
    if (producto) {
      // Preseleccionar tipo de movimiento como entrada
      document.getElementById("movimiento-tipo").value = "entrada"
      document.getElementById("movimiento-motivo").value = "compra"
  
      // Mostrar información del producto
      document.getElementById("movimiento-producto-buscar").value = producto.nombre
      document.getElementById("info-producto-nombre").textContent = producto.nombre
      document.getElementById("info-producto-sku").textContent = producto.sku
      document.getElementById("info-producto-stock").textContent = `${producto.stock} ${producto.unidad}`
      document.getElementById("movimiento-producto-id").value = producto.id
  
      document.getElementById("producto-info").classList.remove("hidden")
      document.getElementById("guardar-movimiento-btn").disabled = false
    }
  }
  
  // Función para cerrar sesión
  function cerrarSesion() {
    if (confirm("¿Está seguro que desea cerrar sesión?")) {
      alert("Sesión cerrada correctamente")
      // En una implementación real, aquí se redireccionaría a la página de login
      // window.location.href = "login.html";
    }
  }
  
  // Integración con el módulo de ventas
  // Funciones para compartir datos entre módulos usando localStorage
  function guardarDatosEnLocalStorage() {
    localStorage.setItem("inventario_productos", JSON.stringify(productos))
    localStorage.setItem("inventario_movimientos", JSON.stringify(movimientos))
  }
  
  function cargarDatosDeLocalStorage() {
    const productosGuardados = localStorage.getItem("inventario_productos")
    const movimientosGuardados = localStorage.getItem("inventario_movimientos")
  
    if (productosGuardados) {
      productos = JSON.parse(productosGuardados)
    }
  
    if (movimientosGuardados) {
      movimientos = JSON.parse(movimientosGuardados)
    }
  }
  
  // Verificar si hay movimientos pendientes del módulo de ventas
  function verificarMovimientosPendientes() {
    const movimientosPendientes = localStorage.getItem("ventas_movimientos_pendientes")
    
    if (movimientosPendientes) {
      const movimientosNuevos = JSON.parse(movimientosPendientes)
      
      if (movimientosNuevos.length > 0) {
        // Procesar cada movimiento pendiente
        movimientosNuevos.forEach(movimientoPendiente => {
          // Buscar el producto por nombre
          const producto = productos.find(p => p.nombre === movimientoPendiente.productoNombre)
          
          if (producto) {
            // Crear un nuevo movimiento
            const nuevoMovimiento = {
              id: movimientos.length > 0 ? Math.max(...movimientos.map(m => m.id)) + 1 : 1,
              fecha: movimientoPendiente.fecha || new Date().toISOString().split("T")[0],
              tipo: "salida",
              productoId: producto.id,
              cantidad: movimientoPendiente.cantidad,
              motivo: "venta",
              referencia: movimientoPendiente.referencia || "Consumo cliente",
              origen: "ventas",
              usuario: movimientoPendiente.usuario || "Admin",
              notas: movimientoPendiente.notas || "Registrado desde módulo de ventas"
            }
            
            // Agregar el movimiento
            movimientos.push(nuevoMovimiento)
            
            // Actualizar el stock del producto
            producto.stock -= movimientoPendiente.cantidad
          }
        })
        
        // Limpiar los movimientos pendientes
        localStorage.removeItem("ventas_movimientos_pendientes")
        
        // Guardar los datos actualizados
        guardarDatosEnLocalStorage()
        
        // Actualizar la interfaz
        cargarDashboardInventario()
        cargarTablaExistencias()
        cargarTablaMovimientos()
        
        // Notificar al usuario
        alert(`Se han procesado ${movimientosNuevos.length} movimientos pendientes del módulo de ventas.`)
      }
    }
    
    // Cargar datos actualizados
    cargarDatosDeLocalStorage()
  }
  
  // Inicializar datos al cargar la página
  window.addEventListener("load", () => {
    cargarDatosDeLocalStorage()
    guardarDatosEnLocalStorage() // Guardar datos iniciales si no existen
  })
  