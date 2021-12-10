<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if(isset($_GET['stockID'])){
    $userID = $_GET['userID'];
    $stockID = $_GET['stockID'];

    $response = ["updated" => true];
    $selectSQL = "SELECT * FROM `stocks` WHERE `id` = ?";
    $selectSavingsSQL = "SELECT * FROM `savings` WHERE `belongsto` = ?";
    $updateSQL = "UPDATE `stocks` SET `belongs` = ? WHERE `id` = ?";
    $updateSavingsSQL = "UPDATE `savings` SET `value` = ? WHERE `belongsto` = ?";

    try{
        require_once "includes/connect.php";
        $db = new PDO($db_dsn, $db_user, $db_pass);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        //Select statement
        $select = $db->prepare($selectSQL);
        $select->bindParam(1, $stockID, PDO::PARAM_INT);
        $select->execute();

        if($select->rowCount() > 0){
            $selectResult = $select->fetch(PDO::FETCH_ASSOC);
            if($selectResult['belongs'] == 0){
                // Update statment
                $update = $db->prepare($updateSQL);
                $update->bindParam(1, $userID, PDO::PARAM_INT);
                $update->bindParam(2, $stockID, PDO::PARAM_INT);
                if($update->execute()){
                    
                    $select2 = $db->prepare($selectSavingsSQL);
                    $select2->bindParam(1, $userID, PDO::PARAM_INT);
                    $select2->execute();
                    if($select2->rowCount() > 0){
                        $savings = $select2->fetch(PDO::FETCH_ASSOC);
                        $newAccValue =  $savings['value'] - $selectResult['price'];
                        if($newAccValue > 0){
                            $update2 = $db->prepare($updateSavingsSQL);
                            $update2->bindParam(1, $newAccValue, PDO::PARAM_INT);
                            $update2->bindParam(2, $userID, PDO::PARAM_INT);
                            if($update2->execute()){
                                echo json_encode($response);
                            }
                        }else{
                            $response['updated'] = false;
                            echo json_encode($response);
                        }
                    }
                }
            }else{
                $response['updated'] = false;
                echo json_encode($response);
            }
        }else{
            $response['updated'] = false;
            echo json_encode($response);
        }
    }catch(PDOException $e){
        $response['updated'] = false;
        echo $e;
       echo  json_encode($response);
    }
}else{
}