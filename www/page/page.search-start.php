<?php
// Funktionen einbinden
require_once('/home/www/immofinder/www/lib/functions/functions.php');

// Immobilienscout Klasse einbinden
require_once('/home/www/immofinder/www/Immocaster/Sdk.php');

// Immobilienscout Klasse initialisieren
$sImmobilienScout24Key    = 'IMMOFinderKeyKey';
$sImmobilienScout24Secret = 'HX6kbq5w0jJaWKUr';
$oImmocaster              = Immocaster_Sdk::getInstance('is24',$sImmobilienScout24Key,$sImmobilienScout24Secret);
$oImmocaster->setRequestUrl('live');

// Objekte holen
$aParameter = array('geocoordinates'=>'50.0954;12.2196;17', 'realestatetype' => 'apartmentbuy', 'pagenumber' => ($_REQUEST['page_number'] ? $_REQUEST['page_number'] : '1'));
$res        = $oImmocaster->radiusSearch($aParameter);
$array = xmlstr_to_array($res);

// Immobilienanzahl ermitteln
$sizeimmo = sizeof($array['resultlistEntries']['resultlistEntry']);

for($i = 0; $i < $sizeimmo; $i++){
    $titel = $array['resultlistEntries']['resultlistEntry'][$i]['resultlist:realEstate']['title'];
    $picture = $array['resultlistEntries']['resultlistEntry'][$i]['resultlist:realEstate']['titlePicture']['urls']['url'][1]['@attributes']['href'];
    echo '
            <div class="immo-list">
                <div class="image-cropper"><img src="'.$picture.'"  style="height: 140x" /></div>
            </div>
          ';
}
?>