<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    $data = date("Y-m-d H:i:s") . " | $name | $email | $password\n";
    file_put_contents("users.txt", $data, FILE_APPEND | LOCK_EX);

    echo "<h2>Спасибо за регистрацию, $name!</h2>";
    echo "<a href='index.html'>Вернуться</a>";
}
?>
