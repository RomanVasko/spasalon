<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_POST['name'];
    $ritual = $_POST['ritual'];
    $phone = $_POST['phone'];
    $time = $_POST['time'];
    $call = $_POST['call'];

    $content = $name . ' оставил(а) заявку на бронирование ритуала "' . $ritual . '" на ' . $time . '. Телефон клиента: +' . $phone;
    //Кодировка UTF-8
    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

    if($call) {
        $content1 = 'У клиента возник вопрос, телефон: +' . $call;
        $success1 = mail("callme@whitelotus.com", 'Вопрос от клиента', $content1, $headers);
        if ($success1) {
            // Отдаем 200 код ответа на http запрос
            http_response_code(200);
            echo "Письмо отправлено";
        } else {
            http_response_code(500);
            echo "Письмо не отправлено";
        }
    } else {
        $success = mail("admin@whitelotus.com", 'Запрос на бронирование ритуала', $content, $headers);
        if ($success) {
            http_response_code(200);
            echo "Письмо отправлено";
        } else {
            http_response_code(500);
            echo "Письмо не отправлено";
        }
    }

} else {
    http_response_code(403);
    echo "Данный метод запроса не поддерживается сервером";
}