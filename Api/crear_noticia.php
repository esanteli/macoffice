<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Manejar las solicitudes OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once('../db.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        $titulo = $_POST['titulo'] ?? '';
        $contenido = $_POST['contenido'] ?? '';
        $seccion = $_POST['seccion'] ?? '';
        $tag = $_POST['tag'] ?? '';
        
        // Manejar la imagen
        $imagen = '';
        
        // Si se subió un archivo
        if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
            $uploadDir = '../uploads/';
            if (!file_exists($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }

            $fileInfo = pathinfo($_FILES['imagen']['name']);
            $extension = strtolower($fileInfo['extension']);
            
            // Validar extensión
            $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
            if (!in_array($extension, $allowedExtensions)) {
                throw new Exception('Formato de imagen no permitido');
            }

            // Validar tamaño (2MB máximo)
            if ($_FILES['imagen']['size'] > 2 * 1024 * 1024) {
                throw new Exception('La imagen no debe superar los 2MB');
            }

            // Generar nombre único
            $fileName = uniqid() . '.' . $extension;
            $uploadFile = $uploadDir . $fileName;

            if (move_uploaded_file($_FILES['imagen']['tmp_name'], $uploadFile)) {
                $imagen = '/macoffice-master/uploads/' . $fileName;
            } else {
                throw new Exception('Error al subir la imagen');
            }
        } else {
            // Si se proporcionó una URL
            $imagen = $_POST['imagen'] ?? '';
        }

        $query = "INSERT INTO noticias (titulo, contenido, seccion, tag, imagen, fecha_creacion, estado) 
                 VALUES (:titulo, :contenido, :seccion, :tag, :imagen, NOW(), 1)";
        
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':titulo', $titulo);
        $stmt->bindParam(':contenido', $contenido);
        $stmt->bindParam(':seccion', $seccion);
        $stmt->bindParam(':tag', $tag);
        $stmt->bindParam(':imagen', $imagen);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Noticia creada correctamente']);
        } else {
            throw new Exception('Error al crear la noticia');
        }
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>