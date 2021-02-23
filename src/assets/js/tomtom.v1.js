

((window, L) => {

    /*
    STYLES:
    Styles relative0 and relative0-dark are recommended to use.
    
    1. absolute (default) - the colours reflect the absolute speed measured on the given road segment
        When the style is absolute, the colors will reflect the absolute speed measured.
    2.  relative - the speed relative to free-flow is taken into account, highlighting areas of congestion
        Calls using the relative, relative0 and relative0-dark styles return the speed relative to free-flow, highlighting areas of congestion.
    3.  relative-delay - displays relative speeds only where they are different from the freeflow speed (no green segments)
        Style relative-delay displays relative speeds only where they are different from the free-flow speeds.
    4. Style reduced-sensitivity displays relative speeds but larger difference from free-flow (depending on FRC) is required for segment to change the color.
    */
    // visit https://developer.tomtom.com/traffic-api/traffic-api-documentation-traffic-flow/raster-flow-tiles

    let map
    let map_id = 'leaflet_map';
    //let ttToken = 'GleTooveS7f1YX5BYruoqin1Gqtp4dkn'; // juantxo
    let ttToken = 'dlFoTTdPosACGKoJyFCxS0wyeWnNFf6T'; // alvaro
    let ttStyle = 'relative0';
    let mbToken = 'pk.eyJ1IjoiYWRlZ3JhY2lhIiwiYSI6ImNpdXBybDMzMTAxajAyeXA0ZnE0cTN3dGkifQ.Sq6NjjMcGmc5JzPAC7Tnzg';
    let trafficEndpoint = 'https://{cyclingHostname}.api.tomtom.com/traffic/map/4/tile/flow/{cyclingHostname}/{z}/{x}/{y}.png?tileSize=512&key=' + ttToken;
    let maxZoom = 20;
    let formForm = document.forms["tomtom_form"];
    let ttMapTypeSelect = formForm.elements['ttMapType'];



    function setMap() {
        map = L.map(map_id).setView([40.416729, -3.703339], 13);
    }

    function setMapBoxTileLayer() {
        map['mbTileLayer'] = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: '© <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: maxZoom,
            id: 'adegracia/cjacly1ud4fg52rpkca3b85hj',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: mbToken
        }).addTo(map);
    }

    function setTomtomTileLayer(style) {
        map['ttTileLayer'] = L.tileLayer(getTilesForEndpoint(trafficEndpoint, style)[getRandom(4)], {
            attribution: ' © <a href="https://www.tomtom.com/">Tomtom</a>',
            maxZoom: maxZoom,
            id: '',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: ttToken
        }).addTo(map);
    }

    function removeGeojsonLayer(layer) {
        if (map[layer]) {
            map[layer].remove()
            map[layer] = null;
        }
    }

    let getTilesForEndpoint = (endpoint, style) => {
        return ['a', 'b', 'c', 'd'].map((hostname) => {
            return endpoint.replace('{cyclingHostname}', hostname).replace('{cyclingHostname}', style);
        });
    };

    function getRandom(val) {
        return Math.floor(Math.random() * val);
    }

    function onMapClick(e) {
        let alert = "You clicked the map at " + e.latlng;
        return false;
    }

    function setMapEvents() {
        map.on('click', onMapClick);
    }

    function initForm(e) {
        ttMapTypeSelect.onchange = (e) => {
            style = ttMapTypeSelect.value;
            removeGeojsonLayer('ttTileLayer');
            setTomtomTileLayer(ttMapTypeSelect.value);
        }
        return false;
    }



    let init = () => {
        setMap();
        setMapBoxTileLayer();
        setTomtomTileLayer(ttStyle);
        setMapEvents();
        initForm();
        return false;
    };

    init();



})(document, this.L);