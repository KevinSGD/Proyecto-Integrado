// Definición de usuarios y sus permisos de acceso a módulos
const usuarios = [
    {
        email: "admin@erp.com",
        password: "admin123",
        nombre: "Administrador",
        modulos: ["contable", "ventas", "rh", "clientes", "inventario"],
        rol: "administrador"
    },
    {
        email: "contable@erp.com",
        password: "cont123",
        nombre: "Juan Pérez",
        modulos: ["contable"],
        rol: "contador"
    },
    {
        email: "ventas@erp.com",
        password: "vent123",
        nombre: "María López",
        modulos: ["ventas", "clientes"],
        rol: "vendedor"
    },
    {
        email: "rh@erp.com",
        password: "rrhh123",
        nombre: "Carlos Rodríguez",
        modulos: ["rh"],
        rol: "recursos_humanos"
    },
    {
        email: "inventario@erp.com",
        password: "inv123",
        nombre: "Ana Martínez",
        modulos: ["inventario"],
        rol: "almacenista"
    }
];

// Rutas a los diferentes módulos del sistema
const rutasModulos = {
    contable: href="../../Proyecto/Contabilidad General/CG.html",
    ventas: href="../../Proyecto/Ventas/Index.html",
    rh: href="../../Proyecto/RH/rrhh.html",
    clientes: href="../../Proyecto/Contabilidad General/CG.html",
    inventario: href="../../Proyecto/Contabilidad General/CG.html"
};

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let isValid = true;
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    
    // Reset error messages
    emailError.style.display = 'none';
    passwordError.style.display = 'none';
    
    // Validate email
    if (!email.value || !email.value.includes('@')) {
        emailError.style.display = 'block';
        isValid = false;
    }
    
    // Validate password
    if (!password.value) {
        passwordError.style.display = 'block';
        isValid = false;
    }
    
    if (isValid) {
        // Verificar credenciales
        const usuarioEncontrado = usuarios.find(
            usuario => usuario.email === email.value && usuario.password === password.value
        );
        
        if (usuarioEncontrado) {
            // Guardar información del usuario en sessionStorage
            sessionStorage.setItem('usuarioERP', JSON.stringify({
                email: usuarioEncontrado.email,
                nombre: usuarioEncontrado.nombre,
                modulos: usuarioEncontrado.modulos,
                rol: usuarioEncontrado.rol
            }));
            
            // Determinar a qué módulo redirigir (por defecto al primer módulo permitido)
            const moduloInicial = usuarioEncontrado.modulos[0];
            const rutaRedireccion = rutasModulos[moduloInicial];
            
            // Mostrar mensaje de éxito
            alert(`Bienvenido ${usuarioEncontrado.nombre}. Accediendo al sistema ERP...`);
            
            // Redirigir al módulo correspondiente
            setTimeout(() => {
                window.location.href = rutaRedireccion;
            }, 1000);
        } else {
            // Credenciales incorrectas
            alert('Credenciales incorrectas. Por favor, verifique su email y contraseña.');
        }
    }
});

// Función para verificar si un usuario tiene acceso a un módulo específico
// Esta función puede ser utilizada en las páginas de los módulos para verificar permisos
function verificarAccesoModulo(nombreModulo) {
    const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioERP'));
    
    if (!usuarioActual) {
        // No hay sesión activa, redirigir al login
        window.location.href = '../../index.html';
        return false;
    }
    
    if (!usuarioActual.modulos.includes(nombreModulo)) {
        // El usuario no tiene acceso a este módulo
        alert('No tiene permisos para acceder a este módulo');
        // Redirigir al primer módulo al que tenga acceso
        window.location.href = rutasModulos[usuarioActual.modulos[0]];
        return false;
    }
    
    return true;
}

// Función para cerrar sesión (puede ser llamada desde cualquier página)
function cerrarSesion() {
    sessionStorage.removeItem('usuarioERP');
    window.location.href = '../../index.html';
}