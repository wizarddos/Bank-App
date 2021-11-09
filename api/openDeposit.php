<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if(isset($_GET['id'])){
    $id = $_GET['id'];
    $currency = $_GET['currency'];
    $depositBalanceAdd = $_GET['value'];
    $response = ['serverErr'=>0, 'currencyErr'=>0, 'valueErr'=>0];

    $currencyCodesArr = [ 'PLN', 'USD', 'EUR', 'JPY', 'CHF', 'GBP'];
    $matches = false;
    foreach($currencyCodesArr as $currencyCode){
        if($currency == $currencyCode){
            $matches = true;
            break;
        }
    }

    if($matches){
        $selectSQL = "SELECT `value` FROM `savings` WHERE belongsto = ?";
        $savingsUPDATESQL = "UPDATE `savings` SET value = :balance WHERE belongsto = :id";
        $sql = "INSERT INTO `deposits` VALUES(:id, :value, :curr, :belongs)";
        
        try{
            require_once 'includes/connect.php';
            $db = new PDO($db_dsn, $db_user, $db_pass);

            $select = $db->prepare($selectSQL);
            $select->bindParam(1, $id);
            $select->execute();
            $result = $select->fetch(PDO::FETCH_ASSOC);
            if($result['value'] > $depositBalanceAdd){

                $stmt = $db->prepare($sql);
                $stmt->bindParam(':id', $null, PDO::PARAM_NULL);
                $stmt->bindParam(":value", $depositBalanceAdd, PDO::PARAM_INT);
                $stmt->bindParam(':curr', $currency, PDO::PARAM_STR);
                $stmt->bindParam(':belongs', $id, PDO::PARAM_INT);
                if($stmt->execute()){
                    $savingsValue = $result['value'] - $depositBalanceAdd;
                    $updateStmt = $db->prepare($savingsUPDATESQL);
                    $updateStmt->bindParam(':balance', $savingsValue);
                    $updateStmt->bindParam(':id', $id);
                    if($updateStmt->execute()){
                        echo json_encode($response);
                    }else{
                        $response['serverErr'] = 1;
                        echo json_encode($response);
                    }
                }
            }
            


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