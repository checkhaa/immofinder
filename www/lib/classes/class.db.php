<?php
class dbClass {

    protected $connectionData = array(
        'host' => 'localhost',
        'user' => 'immofindersql1',
        'password' => 'jZGVmMmI2M',
        'dbname' => 'immofindersql1',
    );
    protected $db;
    protected $result;
    protected $count;

    public function __construct($connectionData = array()) {
        $config = array_merge($this->connectionData, $connectionData);
        $this->db = new mysqli($config['host'], $config['user'], $config['password'], $config['dbname']);

        if ($this->db->connect_errno) {
            die($this->db->mysqli_connect_error());
        }

        $this->db->set_charset("utf8");
    }

    public function set_query($query) {
        $this->result = $this->db->query($query);
        return $this->result;
    }

    public function set_assoc($result) {
        return $this->result->fetch_assoc();
    }

    public function set_count($result) {
        return $this->result->num_rows;
    }

    public function insertDB($postArray, $insertdb_name) {
        // Variablen konfigurieren
        $db_key = '';
        $db_value = '';

        // Schleife durch den Post-Speicher und Variablen füllen
        foreach($postArray as $key => $value){
            $db_key .= $key .", ";
            $db_value .= "'$value'".", ";
        }

        // Variablen 2 stellen von hinten entfernen
        $db_key = substr($db_key, 0, -2);
        $db_value = substr($db_value, 0, -2);

        $insertSql = $this->set_query('INSERT INTO ' . $insertdb_name . ' (' . $db_key . ') VALUES (' . $db_value . ')');

        if($this->db->error){
            return false;
        } else {
            return true;
        }
    }

    public function updateDB($postArray, $updatedb_name, $change_id_name, $change_id) {
        // Datenbank update Befehl vergeben
        $db_update = 'SET ';

        // Schleife durch den Post-Speicher und Update Variable füllen
        foreach($postArray as $key => $value){
            $db_update .= $key ."='".$value."', ";
        }

        // Update Variablen 2 stellen von hinten entfernen
        $db_update = substr($db_update , 0, -2);

        // Datenbank Update Befehl durchführen
        $dbUpdate = $this -> set_query("UPDATE ".$updatedb_name." ".$db_update." WHERE ".$change_id_name." = '".$change_id."'");

        if($this->db->error){
            return false;
        } else {
            return true;
        }
    }

}
?>