<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");


if(isset($_GET['jsonReq'])){
    $isOK = true;
    $errors = array("isok"=>0, "emailErr"=>0, "passErr"=>0, "tosErr"=>0, "serverErr"=>0);
    $jsonData = json_decode($_GET['jsonReq'], true);
    $pass = $jsonData['pass'];
    $pass2 = $jsonData['pass2'];
    $tos = $jsonData['tos'];


    $email = filter_var($jsonData['email'], FILTER_SANITIZE_EMAIL);
    if ((filter_var($email, FILTER_VALIDATE_EMAIL)==false) || ($email!=$jsonData['email'])){
        $isOK=false;
        $errors['emailErr'] = 1;
    }

    if(strlen($pass) < 8){
        $isOK=false;
        $errors['passErr'] = 1;
    }

    if($pass != $pass2){
        $isOK=false;
        $errors['passErr'] = 2;
    }

    if(!$tos){
        $isOK=false;
        $errors['tosErr'] = 1;
    }

    try{
        $null = NULL;
        $false = false;
        require_once "includes/connect.php";
        $db = new PDO($db_dsn, $db_user, $db_pass);

        $sql2 = "SELECT id FROM users WHERE email = :email ";
        $prepared2 = $db->prepare($sql2);
        $prepared2->bindParam(":email", $email, PDO::PARAM_STR);
        $prepared2->execute();
        if($prepared2->rowCount() > 0){
            $errors['emailErr'] = 2;
            $isOK = false;
            
        }
        if($isOK == true){
            $pass_hashed = password_hash($pass, PASSWORD_DEFAULT);
            $sql = "INSERT INTO users VALUES(:id, :pass, :email, :isAdmin )";
            $stmt = $db->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
            $stmt->bindParam(":id", $null, PDO::PARAM_INT);
            $stmt->bindParam(":pass", $pass_hashed, PDO::PARAM_STR);
            $stmt->bindParam(":email", $email, PDO::PARAM_STR);
            $stmt->bindParam(":isAdmin", $false, PDO::PARAM_BOOL);
            
            $stmt->execute();
            echo json_encode($errors);
        }else{
            $errors['isok'] = 1;
            echo json_encode($errors);
        }
    }catch(PDOException $e){
        $errors["serverErr"] = 1;
        echo json_encode($errors);
    }
   
}else{
    echo json_encode(isset($_GET['jsonReq']));
}