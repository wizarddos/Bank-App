<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if(isset($_GET['id'])){
    $id = $_GET['id'];
    $currency = $_GET['currency'];
    $response = ['serverErr'=>0, 'currencyErr'=>0];

    $currencyCodesArr = [ 'PLN', 'USD', 'EUR', 'JPY', 'CHF', 'GBP'];
    $matches = false;
    foreach($currencyCodesArr as $currencyCode){
        if($currency == $currencyCode){
            $matches = true;
            break;
        }
    }

    if($matches){
        $sql = "INSERT INTO `savings` VALUES(:id, :value, :curr, :belongs)";
        try{
            require_once 'includes/connect.php';
            $db = new PDO($db_dsn, $db_user, $db_pass);
            $stmt = $db->prepare($sql);
            $accountValue = 500;
            $stmt->bindParam(':id', $null, PDO::PARAM_NULL);
            $stmt->bindParam(":value", $accountValue, PDO::PARAM_INT);
            $stmt->bindParam(':curr', $currency, PDO::PARAM_STR);
            $stmt->bindParam(':belongs', $id, PDO::PARAM_INT);
            $stmt->execute();
            echo json_encode($response);


        }catch(PDOException $e){
            echo $e;
            $response['serverErr'] = 1;
            echo json_encode($response);
        }
    }else{
        $response['currencyErr'] =1;
        echo json_encode($response);
    }

}