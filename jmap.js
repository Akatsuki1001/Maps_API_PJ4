var infoWindow2, maker_created;

function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionDistance = new google.maps.DistanceMatrixService;
    var infowindow_middle = new google.maps.InfoWindow();
    var mapDiv = document.getElementById('map');
    var myLatlng = new google.maps.LatLng(10.7865108, 106.6590994)

    var map = new google.maps.Map(mapDiv, {
        //  center: {lat: -34.397, lng: 150.644},
        center: myLatlng,
        zoom: 15,
        zoomControl: false,
        streetViewControl: false,
        scrollwheel: true,
        //disableDefaultUI: false
    });
    directionsDisplay = new google.maps.DirectionsRenderer({
        polylineOptions: {
            strokeColor: "blue"
        }
    });
    var markerG = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Hello World',
        icon: {
            url: "image/person-location.png", // url
            scaledSize: new google.maps.Size(40, 40)
        },
        draggable: true
    });


    // setting bacground color
    var customerType = new google.maps.StyledMapType([{
            stylers: [{
                hue: '#D2E4C8'
            }]
        },
        {
            featureType: 'water',
            stylers: [{
                color: '#599459'
            }]
        }
    ]);
    var customerTypeId = 'custom_style';
    map.mapTypes.set(customerTypeId, customerType);
    map.setMapTypeId(customerTypeId);

    // var infoWindow = new google.maps.InfoWindow;

    var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
       myFunction(this);
       }
     };
     xhttp.open("GET", "data.xml", true);
     xhttp.send();







    var markers = [{
            'coord': {
                'lat': 10.7888971,
                'lng': 106.6641515
            },
            'title': 'InforBox 1'
        },
        {
            'coord': {
                'lat': 10.7929007,
                'lng': 106.6747141
            },
            'title': 'InforBox 2'
        },
        {
            'coord': {

                'lat': 10.7829925,
                'lng': 106.6721821
            },
            'title': 'InforBox 3'
        },
        {
            'coord': {
                'lat': 10.7861148,
                'lng': 106.6714793
            },
            'title': 'InforBox 4'
        },

    ];
    //vong lap de tao ra cac marker
    function getNewMarker() {
        for (var i = markers.length - 1; i >= 0; i--) {
            createMarker(markers[i]);
            // maker_created.push(item);
        }
    };
    //chay vog lap qua mang marker roi truyen tung item
    //qua function createMarker
    //var newMarker, inforWindow;

    //    var contentString2;

    function createMarker(pos) {
        var marker = new google.maps.Marker({
            position: pos.coord,
            map: map,
            icon: {
                url: "image/marker.png", // url
                scaledSize: new google.maps.Size(30, 30)
            }
        });
        // map.setCenter(newMarker.getPosition());
        var content =
            '<div id="container-fluid container-infobox" class="infowindow ">' +
            '<div style="background: url(' + "image/infowindow.jpg" + ') no-repeat center; width: 280px; height: 120px">' +
            '</div>' + '<p><strong> San Francisco </strong></p>' +
            '<p>Hội An, 0,8 km tới Trung tâm thành phố</p>' +
            '<div>' +
            '<a class="text-left btn" data-toggle="modal" data-target="#myModal">Buy Tickets</a>' +
            '<a href="#" class="text-right direc">' + pos.title + '</a>' +
            '</div>';


        //'<h1 class="text-center"></h1>' +
        var infowindow = new google.maps.InfoWindow();
        //    var dir = document.getElementById('direction');

        google.maps.event.addListener(infowindow, 'domready', function() {
            $('.direc').on('click', function() {
                calculateAndDisplayRoute(marker);
            });
        });
        google.maps.event.addListener(map, 'click', function() {
            infowindow.close();
        });
        google.maps.event.addListener(infowindow, 'domready', function() {

            // Reference to the DIV which receives the contents of the infowindow using jQuery
            var iwOuter = $('.gm-style-iw');

            /* The DIV we want to change is above the .gm-style-iw DIV.
             * So, we use jQuery and create a iwBackground variable,
             * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
             */
            var iwBackground = iwOuter.prev();

            // Remove the background shadow DIV
            iwBackground.children(':nth-child(2)').css({
                'display': 'none'
            });

            // Remove the white background DIV
            iwBackground.children(':nth-child(4)').css({
                'display': 'none'
            });

            iwOuter.parent().parent().css({
                left: '25px'
            });
            iwBackground.children(':nth-child(1)').attr('style', function(i, s) {
                return s + 'left: 130px !important;'
            });

            // Moves the arrow 76px to the left margin
            iwBackground.children(':nth-child(3)').attr('style', function(i, s) {
                return s + 'left: 130px !important;'
            });
            iwBackground.children(':nth-child(3)').find('div').children().css({
                'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px',
                'z-index': '1'
            });

        });



        //tao icon dia diem moi dc them\

        google.maps.event.addListener(marker, 'click', function() {
            $('.infowindow').fadeOut('300');
            infowindow.setContent(content);
            infowindow.open(map, marker);


        });

        return marker;
    }

    function calculateAndDisplayRoute(marker) {
        var middle;
        directionsDisplay.setMap(map);
        directionsDisplay.setOptions({
            suppressMarkers: true
        });

        directionsService.route({
            origin: markerG.getPosition(),
            destination: marker.getPosition(),
            travelMode: 'DRIVING'
        }, function(response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
                //sau khi tim duong xong gio se tinh toan
                var m = Math.ceil((response.routes[0].overview_path.length) / 2);
                middle = response.routes[0].overview_path[m]; //lay dc diem nam giua
                directionDistance.getDistanceMatrix({
                    origins: [markerG.getPosition()],
                    destinations: [marker.getPosition()],
                    travelMode: 'DRIVING'
                }, function(response, status) {
                    if (status === 'OK') {
                        var originList = response.originAddresses;
                        var destinationList = response.destinationAddresses;
                        for (var i = 0; i < originList.length; i++) {
                            var result = response.rows[i].elements;
                            for (var j = 0; j < result.length; j++) {
                                var element = result[j];
                                var dt = element.distance.text; //thoi gian
                                var dr = element.duration.text; //khoan cach
                            };
                        };
                        var contentm = '<div>' + dt + '<br>' +
                            dr + '</div>';
                        infowindow_middle.setContent(contentm);
                        infowindow_middle.setPosition(middle);
                        infowindow_middle.open(map);
                    }
                });

            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    function geolocationControl() {
        var geoBtn = document.getElementById('current-location');
        google.maps.event.addDomListener(geoBtn, 'click', geolocate);
    }
    var pos

    function geolocate() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                map.setCenter(pos);
                markerG.setPosition(pos);

            });
        } else {
            // Browser doesn't support Geolocation
            alert('vui long cho phep su dung location');
        };
        return marker;

    }

    function ZoomControl() {
        var zoomIn = document.getElementById('zoom-in');
        var zoomOut = document.getElementById('zoom-out');

        google.maps.event.addDomListener(zoomIn, 'click', function() {
            map.setZoom(map.getZoom() + 1);
        });
        google.maps.event.addDomListener(zoomOut, 'click', function() {
            map.setZoom(map.getZoom() - 1);
        });
    }

    geolocationControl();
    ZoomControl();
    getNewMarker();




    //zoom in, zoom out
} //end initMap
