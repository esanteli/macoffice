<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once('../db.php');

// Obtener el método de la solicitud
$method = $_SERVER['REQUEST_METHOD'];

// Obtener el ID de la noticia
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($method === 'DELETE') {
    if ($id <= 0) {
        echo json_encode(['success' => false, 'message' => 'ID de noticia no válido']);
        exit;
    }

    try {
        // Usar consulta preparada para mayor seguridad
        $query = "DELETE FROM noticias WHERE id = :id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        
        if ($stmt->execute()) {
            if ($stmt->rowCount() > 0) {
                echo json_encode(['success' => true, 'message' => 'Noticia eliminada correctamente']);
            } else {
                echo json_encode(['success' => false, 'message' => 'No se encontró la noticia']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al eliminar la noticia']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error en la base de datos: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>
