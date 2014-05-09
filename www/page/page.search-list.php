<script type="text/javascript" src="http://immofinder.vmd3618.checkzz.de/www/js/backend.js"></script>
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

// Initialisiere Seite
$pageNumber = ($_GET['page_number'] ? $_GET['page_number'] : '1');

// Objekte holen
$aParameter = array('geocoordinates'=>'50.0954;12.2196;30', 'realestatetype' => 'apartmentbuy', 'pagenumber' => $pageNumber);
$res        = $oImmocaster->radiusSearch($aParameter);
$array = xmlstr_to_array($res);

/*
echo "<pre>";
print_r($array);
echo "</pre>";
*/

// Immobilienanzahl ermitteln
$sizeimmo = sizeof($array['resultlistEntries']['resultlistEntry']);

// Ermittle vorhandene Seiten
$numberOfPages = $array['paging']['numberOfPages'];

echo '<div class="scroll">';
    for($i = 0; $i < $sizeimmo; $i++){
        $titel = $array['resultlistEntries']['resultlistEntry'][$i]['resultlist:realEstate']['title'];
        $postcode = $array['resultlistEntries']['resultlistEntry'][$i]['resultlist:realEstate']['address']['postcode'];
        $quarter = $array['resultlistEntries']['resultlistEntry'][$i]['resultlist:realEstate']['address']['quarter'];
        $picture = $array['resultlistEntries']['resultlistEntry'][$i]['resultlist:realEstate']['titlePicture']['urls']['url'][3]['@attributes']['href'];

        $search_pic = array('%WIDTH%', '%HEIGHT%');
        $replace_with = array('250', '150');
        $replace_picture = str_replace($search_pic, $replace_with, $picture);

        echo '
                <div class="col-md-6" id="mode" style="margin-bottom: 10px; margin-top: 10px">
                    <div class="immo-features" style=""><span style="font-size: 13px; font-weight: bold">'.sub_string($titel, 20).'</span></div>
                    '.($replace_picture ? '<img src="'.$replace_picture.'" style="width: 100%; border-top: 1px solid black">' : '<img src="http://immofinder.vmd3618.checkzz.de/www/img/no-pic.jpg" style="width: 100%;  border-top: 1px solid black"/>').'
                </div>
             ';
    }

    // Immobilien nachladen
    $getPage = $array['paging']['pageNumber'] + 1;
    if($getPage <= $numberOfPages){
        echo "  <script>
                    $(function(){
                        $('.scroll').jscroll({
                            loadingHtml: '',
                            autoTrigger: true,
                            padding: 10
                        });
                    });
                </script>
             ";

        echo '<div class="center-block text-center" style="width: 100%"><a class="btn btn-primary" href="http://immofinder.vmd3618.checkzz.de/www/page/page.search-list.php?page_number='.$getPage.'">Weitere Immobilien laden</a></div>';
    }

echo '</div>';
?>