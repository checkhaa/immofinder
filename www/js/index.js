var geocoder;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function() {

        geocoder = new google.maps.Geocoder();
        navigator.geolocation.getCurrentPosition(onSuccess, onError);

        function onSuccess(position) {
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

        // onError Callback receives a PositionError object
        //
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
        }

    }
};
