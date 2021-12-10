<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if(isset($_GET['searched'])){
    $searchedString = ucfirst($_GET['searched']);
    $response = [];

    $sql = "SELECT * FROM `stocks` WHERE `brand` = ? AND `belongs` = 0";
    try{
        require_once "includes/connect.php";
        $db = new PDO($db_dsn, $db_user, $db_pass);
        $stmt = $db->prepare($sql);
        $stmt->bindParam(1, $searchedString, PDO::PARAM_STR);
        $stmt->execute();
        $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
 
        echo json_encode($response);
    }catch(PDOException $e){
        $response = ['err'=>$e];
        echo json_encode($response);
    }
}