// Menu Panel
function open_menu_panel(){
    $('.menu-panel').animate({"margin-left": '+=220px'});
}

function close_menu_panel(){
    $('.menu-panel').animate({"margin-left": '-=220px'});
}

$(function(){
    $('.menu-navbar a').click(function(){
        if($('.menu-panel').css('margin-left') == '0px' && !$('.menu-panel').is(':animated')){
            close_menu_panel();
        }
        else {
            if(!$('.menu-panel').is(':animated')){
                open_menu_panel();
            }
        }
        return false;
    });

    $('html').click(function(){
        if($('.menu-panel').css('margin-left') == '0px' && !$('.menu-panel').is(':animated')){
            close_menu_panel();
        }
    });

    $('.menu-panel ul li a').click(function(){
        close_menu_panel();
    });
});

// Beim zurückklicken auf die vorherige Seite springen
$(function() {
    $('a[data-toggle="tab"]').on('click', function(e) {
        history.pushState(null, null, $(this).attr('href'));
    });

    window.addEventListener("popstate", function(e) {
        var activeTab = $('[href=' + location.hash + ']');
        if (activeTab.length) {
            activeTab.tab('show');
        } else {
            $('.nav a:first').tab('show');
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