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

$search_where = $_GET['search-where'];
$search_where = explode("-", $search_where);

$url = "http://maps.google.com/maps/api/geocode/json?address=".urlencode($search_where[0])."+".urlencode($search_where[1])."&sensor=false&region=DE";
$response = file_get_contents($url);
$response = json_decode($response, true);

$lat = $response['results'][0]['geometry']['location']['lat'];
$long = $response['results'][0]['geometry']['location']['lng'];

// Objekte holen
$aParameter = array('geocoordinates'=>' '.$lat.';'.$long.';'.$_GET['search-radius'].' ', 'realestatetype' => 'apartmentbuy', 'pagenumber' => $pageNumber);
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
        $city = $array['resultlistEntries']['resultlistEntry'][$i]['resultlist:realEstate']['address']['city'];
        $quarter = $array['resultlistEntries']['resultlistEntry'][$i]['resultlist:realEstate']['address']['quarter'];
        $distance = $array['resultlistEntries']['resultlistEntry'][$i]['distance'];
        $picture = $array['resultlistEntries']['resultlistEntry'][$i]['resultlist:realEstate']['titlePicture']['urls']['url'][3]['@attributes']['href'];
        $realtorLogo = $array['resultlistEntries']['resultlistEntry'][$i]['resultlist:realEstate']['realtorLogo'];
        $privateoffer = $array['resultlistEntries']['resultlistEntry'][$i]['resultlist:realEstate']['privateOffer'];
        $pricevalue = $array['resultlistEntries']['resultlistEntry'][$i]['resultlist:realEstate']['price']['value'];
        $numberofRooms = $array['resultlistEntries']['resultlistEntry'][$i]['resultlist:realEstate']['numberOfRooms'];
        $livingSpace = $array['resultlistEntries']['resultlistEntry'][$i]['resultlist:realEstate']['livingSpace'];

        if($privateoffer == 'true'){
            $img = '<div class="realTorLogo" style="padding: 5px">von Privat</div>';
        } else {
            if($realtorLogo != ''){
                $img = '<div class="realTorLogo"><img src="'.$realtorLogo.'" style=" height: 35px" /></div>';
            } else {
                $img = '<div class="realTorLogo" style="padding: 5px">kein Logo</div>';
            }
        }

        $search_pic = array('%WIDTH%', '%HEIGHT%');
        $replace_with = array('250', '150');
        $replace_picture = str_replace($search_pic, $replace_with, $picture);

        echo '
                <div class="col-md-6 animated" id="mode" style="margin-bottom: 10px; margin-top: 10px">
                    <div class="immo-features" style="">
                        <span style="font-size: 13px; font-weight: bold">'.sub_string($titel, 20).'</span><br />
                        '.$distance.' km | '.$postcode.' '.$quarter.' <br />
                        <span style="font-size: 13px; font-weight: bold">'.number_format($pricevalue, 2, ',', '.').' € '.($numberofRooms ? ' | '. $numberofRooms .' Zi.' : '').' '.($livingSpace ? ' | Wohfl. '. $livingSpace . ' m²'  : '').'</span>
                    </div>
                    '.$img.'
                    '.($replace_picture ? '<img class="lazy" src="'.$replace_picture.'" data-original="" style="width: 100%; border-top: 1px solid black">' : '<img src="http://immofinder.vmd3618.checkzz.de/www/img/no-pic.jpg" style="width: 100%;  border-top: 1px solid black"/>').'
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

        echo '<div class="center-block text-center" style="width: 100%"><a class="btn btn-primary" href="http://immofinder.vmd3618.checkzz.de/www/page/page.search-list.php?search-what='.$_GET['search-what'].'&search-radius='.$_GET['search-radius'].'&search-where='.urlencode($_GET['search-where']).'&page_number='.$getPage.'">Weitere Immobilien laden</a></div>';
    }

echo '</div>';
?>