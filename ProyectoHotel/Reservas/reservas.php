<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "horizon_prime";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta para obtener la última reserva
$sql = "SELECT nombre, email, telefono, fecha_entrada, fecha_salida, huespedes, tipo_habitacion FROM reservas ORDER BY created_at DESC LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo json_encode($result->fetch_assoc()); // Convertir el resultado a JSON
} else {
    echo json_encode(["error" => "No hay reservas"]);
}

$conn->close();
?>
