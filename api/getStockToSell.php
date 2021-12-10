<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if(isset($_GET['stockId'])){
    $stockId = $_GET['stockId'];
    $userId = $_GET['userId'];

    $response = [];
    $sql = "SELECT * FROM `stocks` WHERE `id` = ? AND `belongs` = ?";

    try{
        require_once "includes/connect.php";
        $db = new PDO($db_dsn, $db_user, $db_pass);
        $stmt = $db->prepare($sql);
        $stmt->bindParam(1, $stockId, PDO::PARAM_STR);
        $stmt->bindParam(2, $userId, PDO::PARAM_STR);
        $stmt->execute();
        if($stmt->rowCount() <=0){
            echo json_encode($response);
        }else{
            $response = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($response);
        }
    }catch(PDOException $e){
        
    }


}