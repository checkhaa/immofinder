$(function(){
    $('div.menu-navbar a').on('click', function () {
        if ($('div.menu-panel').is(':visible')) {
			$('div.menu-panel').removeClass('open fadeOutLeft');
			$('div.menu-panel').addClass('closes');
        } else {
			$('div.menu-panel').addClass('open fadeInLeft');
			$('div.menu-panel').removeClass('close');
        };

        return false;
    });
});

$(function(){
	$('div.menu-panel ul li a').click(function(){
		$('div.menu-panel').removeClass('open fadeOutLeft');
		$('div.menu-panel').addClass('close');
	});
});

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