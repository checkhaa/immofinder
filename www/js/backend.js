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