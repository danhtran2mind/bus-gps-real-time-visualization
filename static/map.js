var mymap = L.map(
            "mymap",{
                    center: [ -22.901421,  -43.347271],
                    crs: L.CRS.EPSG3857,
                    zoom: 11,
                    zoomControl: true,
                    preferCanvas: false,
                    }
            );L.control.scale().addTo(mymap);

var tile_layer = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {"attribution": "Data by \u0026copy; \u003ca target=\"_blank\" href=\"http://openstreetmap.org\"\u003eOpenStreetMap\u003c/a\u003e, under \u003ca target=\"_blank\" href=\"http://www.openstreetmap.org/copyright\"\u003eODbL\u003c/a\u003e.", "detectRetina": false, "maxNativeZoom": 18, "maxZoom": 18, "minZoom": 0, "noWrap": false, "opacity": 1, "subdomains": "abc", "tms": false}
).addTo(mymap);
var map_marker_dict = {};
var order_dict = {};
var source = new EventSource('/topic/bus_2019_brazil');
source.addEventListener('message', function(e){ 
obj = JSON.parse(e.data);
var bus_line = Math.round(obj['line']);
var bus_order = obj['order'];
var timestamp_ = Date.parse(`${obj['date']} ${obj['time']} GMT+7`);
//Add new Bus if not exist 
if(map_marker_dict.hasOwnProperty(`mapMarkers_${bus_order}`)==false) {
  console.log("add"+`${bus_order}`);
  map_marker_dict[`mapMarkers_${bus_order}`]=[]
}
order_dict[`${bus_order}`] = timestamp_
var time_now =new Date(new Date()- obj['delta_time']);
var unixtime_now = time_now.getTime();
var date_now = time_now.getDate();
var month_now = time_now.getMonth();
var year_now = time_now.getFullYear();

for (const [key, value] of Object.entries(order_dict)) {
  //Remove Bus if not connect more than 2 hours and new day
  if ((unixtime_now - order_dict[key]>7200*1000) &
  ((date_now - new Date(order_dict[key]).getDate()>0)||
    (month_now - new Date(order_dict[key]).getMonth()>0)||
    (year_now - new Date(order_dict[key]).getFullYear()>0)
  ))
  {
    //Remove in order_timedict
    delete order_dict[key];
    for (var i = 0; i < map_marker_dict[`mapMarkers_${key}`].length;i++){
      //Remove bus marker in map
      mymap.removeLayer(map_marker_dict[`mapMarkers_${key}`][i]);
    }
    //Remove bus order dict
    delete map_marker_dict[`mapMarkers_${key}`]; 
  }
}
//Remove old marker on map and just contain 7 nearest location
for (var i = 0; i < map_marker_dict[`mapMarkers_${bus_order}`].length;i++){
  //Remove old marker on map
  mymap.removeLayer(map_marker_dict[`mapMarkers_${bus_order}`][i]);
  //Just contain 7 nearest location
  if (map_marker_dict[`mapMarkers_${bus_order}`].length == 6){
    map_marker_dict[`mapMarkers_${bus_order}`].splice(0,1)[0];
  }
}
marker = L.marker([obj.latitude, obj.longitude]
  ).addTo(mymap);
  map_marker_dict[`mapMarkers_${bus_order}`].push(marker);
  var beautify_icon = L.BeautifyIcon.icon(
    {"backgroundColor": "white", "borderColor": "red", "borderWidth": 3,
    "iconShape": "marker", "innerIconStyle": "", "isAlphaNumericIcon": true,
    "spin": false, "text": `${bus_line}`, "textColor": "black"}
  );
  marker.setIcon(beautify_icon);
  var popup_1 = L.popup({"maxWidth": 650});
  var speed_ = 12;     
  var i_frame_1 =
  $(`<div style="width: 100.0%; height: 100.0%;">
    <p>Order: ${obj['order']}</p>
    <p>Date: ${obj['date']}</p>
    <p>Time: ${obj['time']}</p>
    <p>Speed: ${obj['speed']}</p>
    <p>Latitude: ${obj['latitude']}</p>
    <p>Longitude: ${obj['longitude']}</p>
    </div>`)[0];
  popup_1.setContent(i_frame_1);
  marker.bindPopup(popup_1);
}, false);