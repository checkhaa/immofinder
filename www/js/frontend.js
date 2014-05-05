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
     $("html").swiperight(function() {
        open_menu_panel();
     });

     $(".menu-panel").swipeleft(function() {
        close_menu_panel();
     });
});

$(function(){
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

    $('.menu-panel ul li a').click(function(){
        $('.menu-panel').hide(0);
        var containerId = $(this).attr('href');
        var self = $(this);
        var url = self.attr('data-tab-url');
        $.ajax({
            url : url,
            beforeSend : function(){
                $('#loading').show();
            },
            complete : function(){
                $('#loading').hide();
            },
            success : function(data){
                $(containerId).html(data);
            }
        })
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

// Beim öffnen der App erste seite laden
$(function(){
    var containerId = '#search-start';
    var url = 'http://immofinder.vmd3618.checkzz.de/www/page/page.search-start.php';
    $.ajax({
        url : url,
        beforeSend : function(){
            $('#loading').show();
        },
        complete : function(){
            $('#loading').hide();
        },
        success : function(data){
            $(containerId).html(data);
        }
    })
});