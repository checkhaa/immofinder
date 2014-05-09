$(document).ajaxStart(function(){
    $('.loader').show();
});

$(document).ajaxStop(function(){
    $('.loader').hide(0);
});

// Menu Panel
function open_menu_panel(){
    $('.menu-panel').removeClass('slideOutLeft');
    $('.menu-panel').addClass('fadeInLeft');
    $('.menu-panel').fadeIn();
}

function close_menu_panel(){
    $('.menu-panel').removeClass('fadeInLeft');
    $('.menu-panel').addClass('slideOutLeft');
    $('.menu-panel').fadeOut();
}

$(function(){

    // Funktion für das ein und ausklappen der Menüleiste
    $('.menu-navbar a').click(function(){
        if($('.menu-panel').is(':visible')){
            close_menu_panel();
        }
        else {
            open_menu_panel();
        }
        return false;
    });

    $('html').click(function(){
        close_menu_panel();
    });

    // Wenn im Panel eine Spezielle a Klasse geklickt wird
    $('ul.nav li').click(function(){

        $('ul.nav li').removeClass('active');
        $(this).addClass('active');

    });
});

// Beim zurückklicken auf die vorherige Seite springen
$(function() {
    $('a[data-toggle="tab"]').on('click', function(e) {
        history.pushState(null, null, $(this).attr('href'));
    });

    // Wenn Window zurückgeklickt wird aktion ausführen
    window.addEventListener("popstate", function(e) {

        // Hole letzten Hash aus der URL
        var hash = window.location.hash;

        // Ermittle die Url von der Hash ID
        var url = $(hash).attr('data-tab-url');

        // Lösche alle aktiven Tabs
        $('.tab-pane').removeClass('active');
        $('.tab-pane').html('');

        // Füge der Hash Div id die Klasse aktiv hinzu
        $(hash).addClass('active');

        // Wenn der div visible / angezeigt steht Führe Ajax Request aus
        if($(hash).is(':visible')){

            // Führe das Request aus
            $.ajax({
                url : url,
                success : function(data){
                    $(hash).html(data);
                }
            });
        } else {
            return false;
        }
    });
});

// Mit der GPS Funktion lat und lon werte holen
var getLocation = function() {
    var suc = function(p) {
        alert(p.coords.latitude + " " + p.coords.longitude);
    };
    var locFail = function() {
    };
    navigator.geolocation.getCurrentPosition(suc, locFail);
};


// Beim Starten der Anwendung erste Seite laden
$(function(){

    // Container Variable ermitteln
    var containerId = '#search-start';

    // Url ermitteln
    var url = 'http://immofinder.vmd3618.checkzz.de/www/page/page.search-start.php';

    // Führe Ajax Request
    $.ajax({
        url : url,
        success : function(data){
            $(containerId).html(data);
        }
    });
});
