<?php
error_reporting(0);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once('../db.php');

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Método no permitido');
    }

    if (empty($_POST['id']) || empty($_POST['titulo']) || empty($_POST['contenido']) || empty($_POST['tag'])) {
        throw new Exception('Faltan datos requeridos');
    }

    $id = filter_var($_POST['id'], FILTER_VALIDATE_INT);
    $titulo = trim($_POST['titulo']);
    $contenido = trim($_POST['contenido']);
    $tag = trim($_POST['tag']);
    $imagen = $_POST['imagen'] ?? '';

    // Manejar la subida de nueva imagen
    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = '../uploads/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $fileInfo = pathinfo($_FILES['imagen']['name']);
        $extension = strtolower($fileInfo['extension']);
        
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        if (!in_array($extension, $allowedExtensions)) {
            throw new Exception('Formato de imagen no permitido');
        }

        if ($_FILES['imagen']['size'] > 2 * 1024 * 1024) {
            throw new Exception('La imagen no debe superar los 2MB');
        }

        $fileName = uniqid() . '.' . $extension;
        $uploadFile = $uploadDir . $fileName;

        if (move_uploaded_file($_FILES['imagen']['tmp_name'], $uploadFile)) {
            $imagen = '/macoffice-master/uploads/' . $fileName;
        } else {
            throw new Exception('Error al subir la imagen');
        }
    }

    $query = "UPDATE noticias SET 
              titulo = :titulo, 
              contenido = :contenido, 
              tag = :tag, 
              imagen = :imagen 
              WHERE id = :id";
    
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->bindParam(':titulo', $titulo);
    $stmt->bindParam(':contenido', $contenido);
    $stmt->bindParam(':tag', $tag);
    $stmt->bindParam(':imagen', $imagen);

    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'Noticia actualizada correctamente'
        ]);
    } else {
        throw new Exception('No se pudo actualizar la noticia');
    }

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>
