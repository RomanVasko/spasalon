<?php
// Проверяем тип запроса, обрабатываем только POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Получаем параметры, посланные с javascript
    $name = $_POST['name'];
    $count = $_POST['count'];
    $phone = $_POST['phone'];
    $time = $_POST['time'];

    // создаем переменную с содержанием письма
    $content = $name . ' оставил заявку на бронирование столика для ' . $count . ' человек в ' . $time . '. Его телефон: ' . $phone;

    //Кодировка UTF-8
    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

    // Первый параметр - кому отправляем письмо, второй - тема письма, третий - содержание
    $success = mail("admin@burgerclub.com", 'Запрос на бронирование столика', $content, $headers);

    if ($success) {
        // Отдаем 200 код ответа на http запрос
        http_response_code(200);
        echo "Письмо отправлено";
    } else {
        // Отдаем ошибку с кодом 500 (internal server error).
        http_response_code(500);
        echo "Письмо не отправлено";
    }

} else {
    // Если это не POST запрос - возвращаем код 403 (действие запрещено)
    http_response_code(403);
    echo "Данный метод запроса не поддерживается сервером";
}