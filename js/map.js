// Big ol map stuff
function initMap() {
    
// Defining initial map setup - middle, zoom, etc.
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: {lat: 41.072436, lng: -81.526013},
    mapTypeId: 'hybrid',
    scrollwheel: false
  });
  
  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  var icons = {
    parking: {
      name: 'Parking',
      icon: iconBase + 'parking_lot_maps.png'
    },
    bitfactory: {
      name: 'The Bit Factory',
      icon: iconBase + 'library_maps.png'
    }
  };
// Defining bounds of each area
  var TBFCoords = [
    {lat: 41.072158, lng: -81.526644},
    {lat: 41.071615, lng: -81.527011},
    {lat: 41.071637, lng: -81.527102},
    {lat: 41.071588, lng: -81.527137},
    {lat: 41.071657, lng: -81.527554},
    {lat: 41.071717, lng: -81.527528},
    {lat: 41.072340, lng: -81.527115}
  ];
  
  var ParkingCoords = [
  	{lat: 41.072869, lng: -81.528025},
    {lat: 41.073091, lng: -81.527864},
    {lat: 41.073603, lng: -81.527078},
    {lat: 41.073117, lng: -81.526524},
    {lat: 41.072485, lng: -81.526940}
  ];
  
  var ParkingCoords2 = [
  	{lat: 41.072869, lng: -81.528025},
    {lat: 41.073091, lng: -81.527864},
    {lat: 41.073603, lng: -81.527078},
    {lat: 41.073535, lng: -81.526968},
    {lat: 41.073869, lng: -81.526469},
    {lat: 41.074197, lng: -81.526709},
    {lat: 41.073648, lng: -81.528123},
    {lat: 41.073521, lng: -81.528335},
    {lat: 41.073351, lng: -81.528552}
  ];
    
  var IconCoords = [
      {position: {lat: 41.073064, lng: -81.527251}, type: 'parking'},
      {position: {lat: 41.073786, lng: -81.527255}, type: 'parking'},
      {position: {lat: 41.072216, lng: -81.526982}, type: 'bitfactory'}
  ];
  
// Drawing the shapes around the sections
          var TBFPath = new google.maps.Polygon({
          paths: TBFCoords,
          strokeColor: '#00FF00',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#00FF00',
          fillOpacity: 0.35
        });
        TBFPath.setMap(map);
        
        var ParkingPath = new google.maps.Polygon({
          paths: ParkingCoords,
          strokeColor: '#3064a8',
          strokeOpacity: 1,
          strokeWeight: 2,
          fillColor: '#3064a8',
          fillOpacity: 0.35
        });
        ParkingPath.setMap(map);
        
        var ParkingPath2 = new google.maps.Polygon({
          paths: ParkingCoords2,
          strokeColor: '#deb408',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#deb408',
          fillOpacity: 0.25
        });
        ParkingPath2.setMap(map);
        
        var lineSymbol = {
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
        };

// Arrows on the road showing people where to go
        var line1 = new google.maps.Polyline({
          path: [{lat: 41.073291, lng: -81.524304}, {lat: 41.072232, lng: -81.525012}],
          icons: [{
            icon: lineSymbol,
            offset: '100%'
          }],
          strokeColor: '#00ff00',
          map: map
        });
        
        var line2 = new google.maps.Polyline({
        	path: [{lat: 41.070742, lng: -81.526025}, {lat: 41.071406, lng: -81.525597}],
          icons: [{
            icon: lineSymbol,
            offset: '100%'
          }],
          strokeColor: '#00ff00',
          map: map
        });
        
        var line3 = new google.maps.Polyline({
        	path: [{lat: 41.071846, lng: -81.525560}, {lat: 41.072233, lng: -81.526570}],
          icons: [{
            icon: lineSymbol,
            offset: '100%'
          }],
          strokeColor: '#00ff00',
          map: map
        });
     
// Add the markers themselves to the map
  var marker1 = new google.maps.Marker({
    position: {lat: 41.072216, lng: -81.526982},
    title:"The Bit Factory",
    map: map
  });
    
  var marker2 = new google.maps.Marker({
    position: {lat: 41.073064, lng: -81.527251},
    title:"Primary Parking",
    map: map
  });
    
  var marker3 = new google.maps.Marker({
    position: {lat: 41.073786, lng: -81.527255},
    title:"Secondary Parking",
    map: map
  });
    
// Making info pop up on click of markers
  var infowindow = new google.maps.InfoWindow({
    content: "The Bit Factory is on the 5th Floor of the Akron Global Business Accelerator"
  });
   marker1.addListener('click', function() {
    infowindow.open(map, marker1);
       //close the other open infowindows
    infowindow2.close();
    infowindow3.close();
  });
    
  var infowindow2 = new google.maps.InfoWindow({
    content: "Primary Parking"
  });
   marker2.addListener('click', function() {
    infowindow2.open(map, marker2);
    infowindow.close();
    infowindow3.close();
  });
    
  var infowindow3 = new google.maps.InfoWindow({
    content: "Secondary Parking"
  });
   marker3.addListener('click', function() {
    infowindow3.open(map, marker3);
    infowindow.close();       
    infowindow2.close();
  });

  var legend = document.getElementById('legend');
    
  // Create markers.
  IconCoords.forEach(function(feature) {
    var marker = new google.maps.Marker({
      position: feature.position,
      icon: icons[feature.type].icon,
      map: map
    });
  });

  var legend = document.getElementById('legend');
  for (var key in icons) {
    var type = icons[key];
    var name = type.name;
    var icon = type.icon;
    var div = document.createElement('div');
    div.innerHTML = '<img src="' + icon + '"> ' + name;
    legend.appendChild(div);
  }
// Adding the legend locations
map.controls[google.maps.ControlPositoin.RIGHT_BOTTOM].push(legend);
    
}