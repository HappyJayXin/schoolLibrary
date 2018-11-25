let map, marker
let position = { lat: 23.023581, lng: 120.224112 }
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: position,
    zoom: 18
  })
  marker = new google.maps.Marker({
    position: position,
    map: map,
    animation: google.maps.Animation.DROP,
    label: {text:'BOOK',color:'#000000'}
  });
}
