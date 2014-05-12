// Radius Trigger Slider
$(function() {
    $( "#slider-range-min" ).slider({
        range: "min",
        min: 1,
        max: 50,
        slide: function( event, ui ) {
            $( "#radius" ).val( "Radius: " + ui.value + " km");
        }
    });
    $( "#radius" ).val( "Radius: " + $( "#slider-range-min" ).slider( "value" ) + " km" );
});


$(window).resize( function(){
    var height = $(window).height();
    var width = $(window).width();

    if(width > height) {
        // Landscape
        $('div#mode').attr('class', 'col-xs-6');
    } else {
        // Portrait
        $('div#mode').attr('class', 'col-md-6');
    }
});

$(function(){
        var height = $(window).height();
        var width = $(window).width();

        if(width > height) {
            // Landscape
            $('div#mode').attr('class', 'col-xs-6');
        } else {
            // Portrait
            $('div#mode').attr('class', 'col-md-6');
        }
});

$(window).resize( function(){
    var width = $('div#mode img').width();
    $('div.immo-features').attr('style', 'width: '+width+'px');
});

$(function(){
    var width = $('div#mode img').width();
    $('div.immo-features').attr('style', 'width: '+width+'px');
});