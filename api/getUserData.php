<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if(isset($_GET['id'])){
    $id = $_GET['id'];
    $response = ['id'=>$id, 'email'=> '', 'balance'=>0, 'currency'=>"", 'error'=>0, 'stocksLength'=>0, 'stocks'=>[]];
    $usersSQL = 'SELECT * FROM `users` WHERE id = ?';
    $savingsSQL = 'SELECT * FROM `savings` WHERE belonsto = ?';
    $stocksSQL = 'SELECT * FROM `stocks` WHERE belongs = ?';

    try{
        include_once "includes/connect.php";
        $db = new PDO($db_dsn, $db_user,$db_pass);

        $userSQLStatment = $db->prepare($usersSQL);
        $userSQLStatment->bindParam(1, $id);

        $savingsSQLStatment = $db->prepare($savingsSQL);
        $savingsSQLStatment->bindParam(1, $id, PDO::PARAM_INT);

        $stocksSQLStatment = $db->prepare($stocksSQL);
        $stocksSQLStatment->bindParam(1, $id, PDO::PARAM_INT);

        $userSQLStatment->execute();
        $savingsSQLStatment->execute();
        $stocksSQLStatment->execute();

        $usersSQLresult = $userSQLStatment->fetch(PDO::FETCH_ASSOC);
        $savingsSQLresult = $savingsSQLStatment->fetch(PDO::FETCH_ASSOC);
        $stocksSQLresult = $stocksSQLStatment->fetchAll(PDO::FETCH_ASSOC);

        $response['email'] = $usersSQLresult['email'];
        $response['balance'] = $savingsSQLresult['value'] ?? null;
        $response['currency'] = $savingsSQLresult['currency'] ?? null;
        $response['stocksLength'] = $stocksSQLStatment->rowCount();
        $response['stocks'] = $stocksSQLresult;
        echo json_encode($response);

    }catch(PDOException $e){
        $response['error'] = 1;
        echo json_encode($response);
    }
}