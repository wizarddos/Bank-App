<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if($_SERVER['REQUEST_METHOD'] === "GET"){
    $response = ["serverErr" => 0, "stocks" => []];
    $sql = "SELECT * FROM stocks WHERE price = (SELECT MAX(price) FROM stocks)";
    try{
        require_once "includes/connect.php";
        $db = new PDO($db_dsn, $db_user, $db_pass);
        $stmt = $db->prepare($sql);
        $stmt->execute();
        if($stmt->rowCount() > 0){
            $response['stocks'] = $stmt->fetch(PDO::FETCH_ASSOC);
        }else{
            $response['stocks'] = null;
        }
        echo json_encode($response);
    }catch(PDOException $e){
        $response['serverErr'] = 1;
        echo json_encode($response);
    }
}