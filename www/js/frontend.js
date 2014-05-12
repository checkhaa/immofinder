/*
$(document).ajaxStart(function(){
    $('.loader').show();
});

$(document).ajaxStop(function(){
    $('.loader').hide(0);
});
*/

// Menu Panel
function open_menu_panel(){
    $('.menu-panel').removeClass('slideOutLeft');
    $('.menu-panel').addClass('fadeInLeft');
    $('span#list').attr('style', 'left: 0px');
    $('.menu-panel').fadeIn();
}

function close_menu_panel(){
    $('.menu-panel').removeClass('fadeInLeft');
    $('.menu-panel').addClass('slideOutLeft');
    $('span#list').attr('style', 'left: -5px');
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


//---- Autocomplete funktion für die Orte -----
$(function() {
    var termTemplate = "<span class='ui-autocomplete-term'>%s</span>";
    $('.typeahead').autocomplete({
        source : 'http://immofinder.vmd3618.checkzz.de/www/lib/functions/autocomplete.php',
        minLength : 1,
        max : 20,
        autoFocus: true,
        open: function(e,ui) {
            var
                acData = $(this).data('uiAutocomplete'),
                styledTerm = termTemplate.replace('%s', acData.term);

            acData
                .menu
                .element
                .find('a')
                .each(function() {
                    var me = $(this);
                    me.html( me.text().replace(acData.term, styledTerm) );
                });
        }
    });
});

// Geo Location
var geocoder;

$(document).ready(function() {
    geocoder = new google.maps.Geocoder();

    $('span.get-location').click(function(){
        navigator.geolocation.getCurrentPosition(onGetCurrentPositionSuccess, onGetCurrentPositionError);
    });

    navigator.geolocation.getCurrentPosition(onGetCurrentPositionSuccess, onGetCurrentPositionError);
});

var onGetCurrentPositionSuccess = function(position) {
    console.log("lat: " + position.coords.latitude);
    console.log("long: " + position.coords.longitude);
    var lat = parseFloat(position.coords.latitude);
    var lng = parseFloat(position.coords.longitude);
    var latlng = new google.maps.LatLng(lat, lng);

    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                var postal_code = '';
                var street_number = '';
                var city = '';
                var street = '';
                var arrAddress = results[0].address_components;
                // iterate through address_component array
                $.each(arrAddress, function (i, address_component) {
                    console.log(address_component.types[0]);
                    if (address_component.types[0] == "postal_code") {
                        postal_code += address_component.long_name;
                    }

                    if (address_component.types[0] == "street_number") {
                        street_number += address_component.long_name;
                    }

                    if (address_component.types[0] == "locality") {
                        city += address_component.long_name;
                    }

                    if (address_component.types[0] == "route") {
                        street += address_component.long_name;
                    }

                    console.log(postal_code + street_number + city + street);

                    $('input[name=search-where]').val(postal_code + ' ' + street + ' ' + street_number + ' ' + city );


                });
            } else {
                alert("Ort nicht gefunden");
            }
        } else {
            alert("Geocoder failed due to: " + status);
        }
    });
}

var onGetCurrentPositionError = function(error) {
    console.log("Couldn't get geo coords from device");
}
