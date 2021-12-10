<?php 

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if(isset($_GET['id'])){
    $sql = "SELECT * FROM `stocks` ORDER BY `price` DESC";
    $response = [];
    $id = $_GET['id'];

    try{
        require_once "includes/connect.php";
        $db = new PDO($db_dsn, $db_user, $db_pass);
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($response);

    }catch(PDOException $e){
        $response = null;
        echo json_encode($response);
    }
}