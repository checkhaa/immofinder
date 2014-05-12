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
});

// Zurückbutton einbinden
$(document).ready(function() {
	// add a hash to the URL when the user clicks on a tab
	$('a[data-toggle="tab"]').on('click', function(e) {
		history.pushState(null, null, $(this).attr('href'));
	});
	// navigate to a tab when the history changes
	window.addEventListener("popstate", function(e) {
		
		var hash = window.location.hash;
		if(hash == '#search-start'){
			$('.tab-pane').removeClass('active');
			$(hash).addClass('active');
		} else if(hash == '#search-list'){
			$('.tab-pane').removeClass('active');
			$(hash).addClass('active');
		}
		
		var activeTab = $('[href=' + location.hash + ']');
		if (activeTab.length) {
			activeTab.tab('show');
		} else {
			$('.nav-tabs a:first').tab('show');
		}
	});
});

$(function() {
	$('a[data-tab-url]').click(function(){
			
		var url = $(this).attr('data-tab-url');
		var tabDiv = $(this).attr('href');
				
		if($(tabDiv).is(':visible')){
			return false;
		} else {
            // Führe das Request aus
            $.ajax({
                url : url,
                success : function(data){
                    $(tabDiv).html(data);
                }
            });
		}
	});
});

// Beim aufrufen des Apps hashtag für die Startseite hinzufügen
$(function(){
	if($('#search-start').is(':visible')){
		history.pushState(null, null, '#search-start');
	} else {
		return false;
	}
});

$(function(){
	$('form#search-form').submit(function(){
        
        var url = 'http://immofinder.vmd3618.checkzz.de/www/page/page.search-list.php';
        var tabDiv = '#search-list';
        var radius = $('input#radius').val();
        var radius_arr = radius.split(" ");
        var data = 'search-where='+$('input[name=search-where]').val()+'&search-radius='+radius_arr[1]+'&search-what='+$('input[name=search-what]').attr('id')+'';
		
		$('.tab-pane').removeClass('active');
		$(tabDiv).addClass('active');

        // Führe das Request aus
        $.ajax({
            url : url,
            data : data,
            success : function(data){
                $(tabDiv).html(data);
            }
        });

		history.pushState(null, null, '#search-list');
		return false;
	});
});