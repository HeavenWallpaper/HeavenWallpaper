<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['file'])) {
    $targetDir = "uploads/";
    if (!file_exists($targetDir)) {
        mkdir($targetDir, 0777, true);
    }

    $fileName = basename($_FILES["file"]["name"]);
    $targetFilePath = $targetDir . $fileName;
    
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)) {
        echo json_encode(["success" => true, "message" => "File caricato con successo!", "file" => $targetFilePath]);
    } else {
        echo json_encode(["success" => false, "message" => "Errore nel caricamento del file."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Nessun file ricevuto."]);
}
?>
