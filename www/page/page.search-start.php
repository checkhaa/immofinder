<script>
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
</script>

<div style="padding: 20px" class="center-block">
    <form method="GET" action="?search-list">
        <div class="input-group marginbottom10">
            <span class="input-group-addon"><strong>Wo:</strong></span>
            <input type="text" class="form-control own-control" name="search-where" placeholder="ORT / PLZ" value=""/>
        </div>

        <input type="text" id="radius" name="search-radius" class="form-control center-block" style="width: 150px; border: none; font-weight: bold;  box-shadow: none; margin-bottom: 5px"></span>
        <div id="slider-range-min"></div><br />

        <div class="input-group marginbottom10">
            <span class="input-group-addon"><strong>Was:</strong></span>
            <input type="text" class="form-control own-control" id="apartmentbuy" name="search-what" value="Wohnung kaufen" placeholder="" />
        </div>
    </form>
</div>
