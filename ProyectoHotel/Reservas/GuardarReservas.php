<?php
// Configuración de la base de datos
$servername = "localhost"; // XAMPP usa localhost
$username = "root"; // Usuario por defecto de MySQL en XAMPP
$password = ""; // Contraseña por defecto está vacía
$dbname = "horizon_prime"; // Nombre de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Conexión fallida: " . $conn->connect_error]));
}

// Verificar si se envió el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener datos del formulario
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $fecha_entrada = $_POST['fecha-entrada'];
    $fecha_salida = $_POST['fecha-salida'];
    $huespedes = $_POST['huespedes'];
    $tipo_habitacion = $_POST['tipo-habitacion'];

    // Preparar y ejecutar la consulta de inserción
    $stmt = $conn->prepare("INSERT INTO reservas (nombre, email, telefono, fecha_entrada, fecha_salida, huespedes, tipo_habitacion) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssis", $nombre, $email, $telefono, $fecha_entrada, $fecha_salida, $huespedes, $tipo_habitacion);

    if ($stmt->execute()) {
        // Redirigir a otra interfaz después de un registro exitoso
        header("Location: Loader.html"); // Cambia 'success.php' por la ruta de tu interfaz de éxito
        exit(); // Asegúrate de llamar a exit() después de header()
    } else {
        echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
    }

    // Cerrar la declaración
    $stmt->close();
}

// Cerrar conexión
$conn->close();
?>