<?php
session_start();
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if($_SERVER['REQUEST_METHOD'] === "POST"){
    $data = json_decode(file_get_contents('php://input'), true);
    $errors = array("isOk" => 0,"emailErr"=>0, "passErr"=>0, "servErr"=>0, "isAdmin"=>0);
    $email = $data['userEmail'];
    $pass = $data['password'];
    try{
       
        require_once "includes/connect.php";
        $db = new PDO($db_dsn, $db_user, $db_pass);
        $sql = "SELECT * FROM `users` WHERE `email` = :email";
        $query1 = $db->prepare($sql);
        $query1->bindParam(":email", $email, PDO::PARAM_STR);
        $query1->execute();
        $result = $query1->fetch(PDO::FETCH_ASSOC);
        if($query1->rowCount() > 0){
            if(password_verify($pass, $result['pass'])){
                $_SESSION['id'] = $result["id"];
                $_SESSION['email'] = $email;
                $_SESSION["isAdmin"] =  $result["isAdmin"];
                if($_SESSION["isAdmin"]){$errors['isAdmin'] = 1;}
                echo json_encode($errors);
            }else{
                $errors["isOk"] = 1;
                $errors['passErr'] = 1;
                echo json_encode($errors);
            }
        }else{
            $errors["isOk"] = 1;
            $errors['emailErr'] = 1;
            echo json_encode($errors);
        }

    }catch(PDOException $e){
        $errors["isOk"] = 1;
        $errors['servErr'] = 1;
        echo json_encode($errors);
    }
}else{
    
}


