<?php
header('Content-Type: application/json');

include_once('../db.php');

try {
    $query = "SELECT * FROM noticias WHERE estado = 1";
    $stmt = $conn->query($query); 

    if (!$stmt) {
        throw new Exception("Error en la consulta: " . $conn->errorInfo()[2]);
    }

    $noticias = $stmt->fetchAll(); // Usar fetchAll() en el objeto PDOStatement

    echo json_encode($noticias);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>