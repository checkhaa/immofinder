<?php
// Datenbankverbindung holen
require_once($_SERVER['DOCUMENT_ROOT'].'/www/lib/functions/functions.php');

// Datenbank initialisieren
$db = new dbClass();

// Übergabe escapen
$term = trim(strip_tags($_GET['term']));

$autocomplete = $db -> set_query('SELECT ZIP, City FROM  GeoPC  WHERE  ZIP LIKE  "%'.$term.'%" OR City LIKE  "%'.$term.'%" GROUP BY City LIMIT 20');
while($autocompleterow = $db -> set_assoc($autocomplete)){
    $results[] = array('label' => $autocompleterow['ZIP'].' - '.$autocompleterow['City']);
}

echo json_encode($results);
?>