<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if(isset($_POST['pass'])){
    $id = $_POST['id'];
    $pass = $_POST['pass'];
    try{
        if(!is_numeric($id)){
            echo json_encode(["error"=>1]);
            exit();
        }
        require_once "includes/connect.php";
        $db = new PDO($db_dsn, $db_user, $db_pass);
        $sql = "SELECT * FROM `users` WHERE `id` = ?";
        $query1 = $db->prepare($sql);
        $query1->bindParam(1, $slogin, PDO::PARAM_STR);
        $query1->execute();
        $result = $query1->fetch(PDO::FETCH_ASSOC);
        if($query1->rowCount() > 0){
            if(password_verify($pass, $result['pass'])){
                echo json_encode(["error"=>0]);
            }else{
                echo json_encode(["error"=>2]);
            }
        }else{
            echo json_encode(["error"=>3]);
        }

    }catch(PDOException $e){
        echo json_encode(["error"=>4]);
    }
}


