<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verificar el token de reCAPTCHA
    $recaptchaSecret = "6LdwXYgqAAAAANYHg2JFaxIbybVNoOKJYDdt53V5"; // Clave secreta de reCAPTCHA
    $recaptchaResponse = $_POST['g-recaptcha-response'];

    // Enviar solicitud a la API de reCAPTCHA
    $url = "https://www.google.com/recaptcha/api/siteverify";
    $data = [
        'secret' => $recaptchaSecret,
        'response' => $recaptchaResponse,
    ];
    $options = [
        'http' => [
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data),
        ],
    ];
    $context  = stream_context_create($options);
    $response = file_get_contents($url, false, $context);
    $result = json_decode($response);

    // Validar respuesta de reCAPTCHA
    if (!$result->success) {
        echo "Por favor, verifica que no eres un robot.";
        exit;
    }

    // Si reCAPTCHA es válido, procesa el formulario
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $projectType = htmlspecialchars($_POST['projectType']);
    $message = htmlspecialchars($_POST['message']);
    
    // Configuración del correo
    $to = "ventas@macoffice.cl"; // Correo de destino
    $subject = "Nuevo mensaje del formulario de contacto";
    $body = "Nombre: $name\nCorreo Electrónico: $email\nTipo de Proyecto: $projectType\n\nMensaje:\n$message";
    $headers = "From: $email";

    // Enviar correo
    if (mail($to, $subject, $body, $headers)) {
        echo "El mensaje se envió correctamente.";
    } else {
        echo "Hubo un error al enviar el mensaje.";
    }
}
?>
