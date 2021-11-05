<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
if(isset($_GET['id'])){
    $id = $_GET['id'];
    $response = ["serverErr"=>0, "isAccount"=>false];
    try{
        require_once 'includes/connect.php';
        $sql = 'SELECT * FROM `deposits` WHERE belongsto = ?';
        $db = new PDO($db_dsn, $db_user, $db_pass);
        $stmt = $db->prepare($sql);
        $stmt->bindParam(1, $id);
        $stmt->execute();
        if($stmt->rowCount() > 0){
            $response['isAccount'] = true;
        }

        echo json_encode($response);
    }catch(PDOException $e){

    }

}