<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if(isset($_GET['id'])){
    $id = $_GET['id'];
    $money = $_GET['value'];
    $response = ["serverErr"=> 0, "moneyErr"=>0];

    $select1 = "SELECT * FROM `savings` WHERE `belongsto` = ?";
    if(is_numeric($money)){
        try{
            require_once "includes/connect.php";
            $db = new PDO($db_dsn, $db_user, $db_pass);
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $selectStmt = $db->prepare($select1);
            $selectStmt->bindParam(1, $id, PDO::PARAM_INT);
            if($selectStmt->execute()){
                $userSavings = $selectStmt->fetch(PDO::FETCH_ASSOC);
                if($userSavings['value'] < $money){
                    $response['moneyErr'] = 1;
                    echo json_encode($response);
                }else{
                    $DepositSelect = "SELECT * FROM `deposits` WHERE `belongsto` = ?";
                    $DepositSelectStmt = $db->prepare($DepositSelect);
                    $DepositSelectStmt->bindParam(1, $id, PDO::PARAM_INT);
                    if($DepositSelectStmt->execute()){

                        $userDeposit = $DepositSelectStmt->fetch(PDO::FETCH_ASSOC);
                        $DepositUpdate = 'UPDATE `deposits` SET `value` = ? WHERE `belongsto` = ?';
                        $DepositUpdateStmt = $db->prepare($DepositUpdate);
                        $newDepositValue = $userDeposit['value']+$money;
                        $DepositUpdateStmt->bindParam(1, $newDepositValue , PDO::PARAM_INT);
                        $DepositUpdateStmt->bindParam(2, $id, PDO::PARAM_INT);
                        if($DepositUpdateStmt->execute()){
                            $savingsUpdate = "UPDATE `savings` SET `value` = ? WHERE `belongsto` = ?";
                            $savingsUpdateStmt = $db->prepare($savingsUpdate);
                            $newUserSavings = $userSavings['value'] - $money;
                            $savingsUpdateStmt->bindParam(1, $newUserSavings, PDO::PARAM_INT);
                            $savingsUpdateStmt->bindParam(2, $id, PDO::PARAM_INT);
                            if($savingsUpdateStmt->execute()){
                                echo json_encode($response);
                            }
                        }


                    }
                }
            }else{
                $response['serverErr'] = 3;
                echo json_encode($response);
            }
        } catch (PDOException $e) {
            echo $e;
            $response['serverErr'] = 1;
            echo json_encode($response);
        }
    }else{
        $response['moneyErr'] = 2;
        echo json_encode($response);
    }
}