/* global L */

export default () => {
  const mapContainer = document.querySelector('#map');
  if (!mapContainer) return;

  const addressPoints = [
    [
      55.859069,
      37.602726,
      '<div><span class="img"><img src="img/logos/logo-footer.png" width="300" height="150"></span><br><h3>Наш офис:</h3><br>г. Москва, Отрадная, 2<br>ежедневно с 10:00 - 20:00<br><hr>e-mail: window@winfin.ru<br><b>+7 (499) 904 14 88  +7(499) 904 01 71</b><br>Viber / WhatsApp +79169495077</div>',
      'Офис компании WINFIN',
    ],
  ];

  const tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  });

  const latlng = L.latLng(55.859069, 37.602726);
  const map = L.map('map', { center: latlng, zoom: 14, layers: [tiles] });
  const markers = L.layerGroup();

  const greenIcon = new L.Icon({
    iconUrl: 'img/logos/map-big-logo.png',
    shadowUrl: 'img/logos/map-big-logo-shadow.png',
    iconSize: [85, 26],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [85, 26],
  });

  addressPoints.forEach((point) => {
    const a = point;
    const title = a[2];
    const description = a[3];
    const marker = L.marker(new L.LatLng(a[0], a[1]), { icon: greenIcon, title: description });
    marker.bindPopup(title);
    markers.addLayer(marker);
  });

  map.addLayer(markers);
};
