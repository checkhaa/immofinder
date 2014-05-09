// Radius Trigger Slider
$(function() {
    $( "#slider-range-min" ).slider({
        range: "min",
        value: 5,
        min: 1,
        max: 50,
        slide: function( event, ui ) {
            $( "#radius" ).val( "Radius: " + ui.value + " km");
        }
    });
    $( "#radius" ).val( "Radius: " + $( "#slider-range-min" ).slider( "value" ) + " km" );
});

$(function(){
   $('form#search-form').submit(function(){

       // Füge ein Hash an die URL
       history.pushState(null, null, '#search-list');

       // Alle divs im Tab ausblenden
       $('.tab-pane').removeClass('active');

       // Search Liste Tab einblenden
       $('#search-list').addClass('active');

       var containerId = '#search-list';
       var url = 'http://immofinder.vmd3618.checkzz.de/www/page/page.search-list.php';

       $(document).ajaxStart(function(){
           $(containerId).html('<div id="loading"><img src="img/loading.gif" style="margin-bottom: 10px"/> <br /><strong>WIRD GELADEN...</strong></div>');
       });

       $.ajax({
           url : url,
           success : function(data){
               $(containerId).html(data);
           }
       });
       return false;
   });
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

$(window).resize( function(){
    var width = $('div#mode img').width();
    $('div.immo-features').attr('style', 'width: '+width+'px');
});

$(function(){
    var width = $('div#mode img').width();
    $('div.immo-features').attr('style', 'width: '+width+'px');
});