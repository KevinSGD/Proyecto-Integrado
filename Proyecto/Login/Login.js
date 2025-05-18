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
    contable: "../../Proyecto/Contabilidad General/CG.html",
    ventas: "../../Proyecto/Ventas/Index.html",
    rh: "../../Proyecto/RH/rrhh.html",
    clientes: "../../Proyecto/Contabilidad General/CG.html",
    inventario: "../../Proyecto/Contabilidad General/CG.html"
};

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del modal de login
    const accessButton = document.getElementById('accessButton');
    const loginModal = document.getElementById('loginModal');
    const closeLoginModal = document.getElementById('closeLoginModal');
    
    // Elementos del chat
    const toggleChat = document.getElementById('toggleChat');
    const chatContainer = document.getElementById('chatContainer');
    const userInput = document.getElementById('userInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    
    // Mostrar modal de login
    accessButton.addEventListener('click', function() {
        loginModal.classList.add('active');
        // Enfocar el campo de email después de una breve pausa para permitir que la animación termine
        setTimeout(() => {
            document.getElementById('email').focus();
        }, 300);
    });
    
    // Cerrar modal de login
    closeLoginModal.addEventListener('click', function() {
        loginModal.classList.remove('active');
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    loginModal.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
    });
    
    // Configuración del formulario de login
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
                
                // Cerrar el modal con animación
                loginModal.classList.remove('active');
                
                // Mostrar mensaje de éxito
                setTimeout(() => {
                    alert(`Bienvenido ${usuarioEncontrado.nombre}. Accediendo al sistema ERP...`);
                    
                    // Redirigir al módulo correspondiente
                    setTimeout(() => {
                        window.location.href = rutaRedireccion;
                    }, 500);
                }, 300);
            } else {
                // Credenciales incorrectas
                alert('Credenciales incorrectas. Por favor, verifique su email y contraseña.');
            }
        }
    });
    
    // Función para verificar si un usuario tiene acceso a un módulo específico
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
    
    // Función para cerrar sesión
    function cerrarSesion() {
        sessionStorage.removeItem('usuarioERP');
        window.location.href = '../../index.html';
    }
    
    // Función para mostrar/ocultar el chat
    toggleChat.addEventListener('click', function() {
        chatContainer.classList.toggle('hidden');
        if (!chatContainer.classList.contains('hidden')) {
            userInput.focus();
        }
    });
    
    // Base de conocimientos para el asistente virtual
    const knowledgeBase = {
        "acceso": [
            "Para acceder al sistema, haz clic en el botón 'Acceder' en la parte superior e ingresa tu correo electrónico y contraseña.",
            "Si olvidaste tu contraseña, contacta al administrador del sistema."
        ],
        "modulos": [
            "El ERP cuenta con los siguientes módulos: Contabilidad, Ventas, Recursos Humanos, Clientes e Inventario.",
            "El acceso a los módulos depende de los permisos asignados a tu usuario."
        ],
        "contabilidad": [
            "El módulo de contabilidad permite gestionar facturas, pagos, reportes financieros y más.",
            "Para acceder al módulo de contabilidad, necesitas tener permisos de contador o administrador."
        ],
        "ventas": [
            "El módulo de ventas permite gestionar reservaciones, facturación y reportes de ventas.",
            "Para acceder al módulo de ventas, necesitas tener permisos de vendedor o administrador."
        ],
        "recursos humanos": [
            "El módulo de recursos humanos permite gestionar empleados, nóminas, horarios y más.",
            "Para acceder al módulo de recursos humanos, necesitas tener permisos de recursos humanos o administrador."
        ],
        "inventario": [
            "El módulo de inventario permite gestionar productos, stock, proveedores y más.",
            "Para acceder al módulo de inventario, necesitas tener permisos de almacenista o administrador."
        ],
        "permisos": [
            "Los permisos son asignados por el administrador del sistema.",
            "Cada usuario tiene acceso solo a los módulos necesarios para su trabajo."
        ],
        "problemas": [
            "Si tienes problemas para acceder al sistema, verifica que estés ingresando correctamente tu correo y contraseña.",
            "Si el problema persiste, contacta al administrador del sistema."
        ],
        "ayuda": [
            "Estoy aquí para ayudarte con cualquier duda sobre el sistema ERP.",
            "Puedes preguntarme sobre acceso, módulos, permisos y más."
        ],
        "usuarios": [
            "Para fines de demostración, puedes usar las siguientes credenciales:",
            "- Admin: admin@erp.com / admin123",
            "- Contabilidad: contable@erp.com / cont123",
            "- Ventas: ventas@erp.com / vent123",
            "- RRHH: rh@erp.com / rrhh123",
            "- Inventario: inventario@erp.com / inv123"
        ]
    };
    
    // Función para enviar mensaje
    function sendUserMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        // Añadir mensaje del usuario al chat
        addMessage(message, 'user');
        
        // Procesar respuesta
        setTimeout(() => {
            const response = getResponse(message);
            addMessage(response, 'assistant');
        }, 500);
        
        // Limpiar input
        userInput.value = '';
    }
    
    // Event listeners para enviar mensaje
    sendMessage.addEventListener('click', sendUserMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });
    
    // Función para añadir mensaje al chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = `<p>${text}</p>`;
        
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
        
        // Scroll al final del chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Función para obtener respuesta del asistente
    function getResponse(message) {
        message = message.toLowerCase();
        
        // Buscar palabras clave en el mensaje
        for (const [keyword, responses] of Object.entries(knowledgeBase)) {
            if (message.includes(keyword)) {
                return responses.join(' ');
            }
        }
        
        // Si no se encuentra una respuesta específica
        if (message.includes('hola') || message.includes('saludos') || message.includes('buenos días') || message.includes('buenas tardes')) {
            return '¡Hola! ¿En qué puedo ayudarte hoy?';
        }
        
        if (message.includes('gracias') || message.includes('muchas gracias')) {
            return '¡De nada! Estoy aquí para ayudarte.';
        }
        
        if (message.includes('login') || message.includes('iniciar sesión') || message.includes('entrar')) {
            return 'Para iniciar sesión, haz clic en el botón "Acceder" en la parte superior de la página e ingresa tus credenciales.';
        }
        
        // Respuesta por defecto
        return 'Lo siento, no tengo información sobre eso. Puedes preguntarme sobre acceso al sistema, módulos disponibles, permisos de usuario o problemas comunes.';
    }
});