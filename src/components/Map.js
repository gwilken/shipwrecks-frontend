import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactDOM from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl, { LngLatBounds } from 'mapbox-gl';
import Sidebar from './Sidebar/Sidebar';
import ButtonFindAll from './ButtonFindAll';
import ButtonSwapBasemap from './ButtonSwapBasemap';
import CheckboxSearchOnMove from './CheckboxSearchOnMove'
import Popup from './Popup';
import { searchWithinBoundingBox } from '../utils/api';
import { 
  zoomFitMarkers,
  updateSearchQuery,
  setMapStyle
} from '../store/actions'

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;


const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const hoveredIdRef = useRef(null);
  const popupRef = useRef(null);
  const dispatch = useDispatch();

  let markers = useSelector(state => state.markers);
  let hoveredFeature = useSelector(state => state.hoveredFeature);
  let isSearchOnMapMoveToggled = useSelector(state => state.isSearchOnMapMoveToggled);
  let isResultsDrawerToggled = useSelector(state => state.isResultsDrawerToggled);
  let zoomFit = useSelector(state => state.zoomFitMarkers);
  let mapStyle = useSelector(state => state.mapStyle);
  let windowWidth = useSelector(state => state.windowWidth);


  console.log('windowWidth', windowWidth)

  const handleMarkerClick = (e) => {
    let features = e.target.queryRenderedFeatures(e.point, { layers: ['markers'] })
          
    if (features && features.length > 0) {

      let { properties = { }} = features[0]
      let { location_latitude, location_longitude } = properties
    
      map.current.jumpTo({
        center: [location_longitude, location_latitude],
      })

      const placeholder = document.createElement('div');
      placeholder.style.minWidth = "400px";
      placeholder.style.minHeight = "400px";

      ReactDOM.render((
        <Popup {...properties } />), placeholder
      );

      popupRef.current = new mapboxgl.Popup({offset: 20})
        .setLngLat({lng: location_longitude, lat: location_latitude})
        .setDOMContent(placeholder)
        .on('open', () => {
          e.target._update();
        })
        .addTo(e.target);
    } 
  }


  useEffect(() => {
    map.current = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoiZ3dpbGtlbiIsImEiOiJjanI1ajR6Z2QwMWk1NDRubXYyYmV6OHVkIn0.D68kEgoBzr8IZn8zz40MOQ',
      attributionControl: false,
      logoPosition: 'top-right', 
      container: mapContainer.current,
      // style: mapStyles[0],
      style: 'mapbox://styles/mapbox/light-v9',
      // alaska
      center: (windowWidth <= 500) ? {lng: -122.4553226852846, lat: 37.99972502121675} :  {lng: -152.4469810886438, lat: 58.58999571845493},
      zoom: (windowWidth <= 500) ? 9.5 : 5
    });

    map.current.on('load', () => {
      map.current.resize();

      map.current.addSource('geojson-markers', markers);

      map.current.addSource('oceans-base', {
        'type': 'raster',
        'tiles': [
          'https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}'
        ],
        'tileSize': 256,
      })

      map.current.addSource('oceans-labels', {
        'type': 'raster',
        'tiles': [
          'https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}'
        ],
        'tileSize': 256,
      })

      map.current.addLayer(
        {
        'id': 'oceans-base-layer',
        'type': 'raster',
        'source': 'oceans-base',
        'minzoom': 0,
        'maxzoom': 22
        });

      // map.current.addLayer(
      //   {
      //   'id': 'oceans-labels-layer',
      //   'type': 'raster',
      //   'source': 'oceans-labels',
      //   'minzoom': 0,
      //   'maxzoom': 22
      //   });


      map.current.addLayer({
        id: 'markers',
        source: 'geojson-markers',
        type: 'circle',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-radius': [
            'case', ['boolean', ['feature-state', 'hover'], false],
            7,
            5
          ],
          'circle-stroke-width': [
            'case', ['boolean', ['feature-state', 'hover'], false],
            3,
            1
          ],
          'circle-stroke-color': [
            'case', ['boolean', ['feature-state', 'hover'], false],
            'rgba(251, 104, 57, 1)',
            'rgba(50, 98, 234, 1)'
          ],
          'circle-color':[
              'case', ['boolean', ['feature-state', 'hover'], false],
              'rgba(251, 104, 57, .6)',
              '#FF3535'
            ]
          }
      });

      map.current.addLayer({
        id: "clusters",
        type: "circle",
        source: "geojson-markers",
        filter: ["has", "point_count"], 
        paint: {
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#FFDB33",
            10,
            "#FFBF3B",
            50,
            "#FA6B23"
            ],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            20,
              100,
            30,
              500,
            40
          ]
        }
      })

      map.current.addLayer({
        id: "cluster-labels",
        type: "symbol",
        source: "geojson-markers",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12
          },
        paint: {
          "text-color": [
            "step",
            ["get", "point_count"],
            'rgb(0,0,0)',
            10,
            'rgb(255,255,255)',
            50,
            'rgb(255,255,255)'
          ],
        }
      })

      map.current.addLayer({
        id: "marker-labels",
        type: "symbol",
        source: "geojson-markers",
        layout: { 
          "text-size": 18, 
          "text-field": 
            ["case",
              ["to-boolean",["get","year_sunk"]],
                ["concat",["get","vessel_name"]," (",["get","year_sunk"],")"],
              ["get","vessel_name"]
            ],
          "text-anchor": "left",
          "text-offset": [.75, -1] },
        paint: {
            "text-color": "rgba(0, 0, 0, 1)",
            "text-halo-color": "rgb(255,255,255)",
            "text-halo-width":  [
              'case', ['boolean', ['feature-state', 'hover'], false],
              2,
              1
            ]
          }
      })

      map.current.setLayoutProperty('oceans-base-layer', 'visibility', 'visible');

      map.current.on('click', 'markers', handleMarkerClick);

      map.current.on('mousemove', 'markers', (e) => {
        if (e.features && e.features.length > 0) {
          map.current.getCanvas().style.cursor = 'pointer'

          if (hoveredIdRef.current) {
            map.current.setFeatureState(
              { source: 'geojson-markers', id: hoveredIdRef.current },
              { hover: false }
            );
          }

          hoveredIdRef.current = e.features[0].id

          if (e.features.length && e.features[0].id) {
            map.current.setFeatureState(
              { source: 'geojson-markers', id: e.features[0].id },
              { hover: true }
            );
          }
        } 
      })

      map.current.on('mouseleave', 'markers', (e) => {
        map.current.getCanvas().style.cursor = 'grab'

        if (hoveredIdRef.current) {
          map.current.setFeatureState(
            { source: 'geojson-markers', id: hoveredIdRef.current },
            { hover: false }
          );
        }
      })

      map.current.on('click', 'clusters', (e) => {
        let features = e.target.queryRenderedFeatures(e.point, { layers: ['clusters'] });

        if (!features.length) {
          return
        }

        let clusterId = features[0].properties.cluster_id;

        map.current.getSource('geojson-markers').getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err)
          return;
          map.current.jumpTo({
            center: features[0].geometry.coordinates,
            zoom: zoom
          });
        });
      })
    
      map.current.on('move', () => {
        console.log(map.current.getCenter(), map.current.getZoom())
      })

      // map.current.on('style.load', handleStyleChange);
    })

    return () => map.current.remove();
    // eslint-disable-next-line
  }, [])


  useEffect(() => {
    if (map) {
      let layer = map.current.getLayer('markers');

      if (layer) {
        let features = map.current.queryRenderedFeatures({
          layers: ['markers']
        })

        features.forEach(feature => {
          map.current.setFeatureState(
            { source: 'geojson-markers', id: feature.id },
            { hover: false }
          );
        })
  
        map.current.setFeatureState(
          { source: 'geojson-markers', id: hoveredFeature },
          { hover: true }
        );
      }
    }
  }, [map, hoveredFeature])


  useEffect(() => {
    if (!map) { 
      return 
    }

    const cb = () => {
      let {_ne, _sw} = map.current.getBounds()
      if (isSearchOnMapMoveToggled) {
        searchWithinBoundingBox( {_ne: _ne.wrap(), _sw: _sw.wrap()})
      }
    }

    map.current.on('moveend', cb)

    return () => {
      map.current.off('moveend', cb)
    }
  }, [map, isSearchOnMapMoveToggled]);


  useEffect(() => {
    if (map) {
      if (map.current.getSource('geojson-markers') && map.current.isSourceLoaded('geojson-markers')) {
        map.current.getSource('geojson-markers').setData(markers.data);
      }
    }
  // eslint-disable-next-line 
  }, [markers])

  
  useEffect(() => {
    function move() {
      if (map && markers.data.features.length > 0) {  
        let newLngLatBounds = new LngLatBounds().extend([markers.data.features[0].properties.location_longitude, markers.data.features[0].properties.location_latitude]);
        let coordinates = markers.data.features.map(elem => {
          if (elem.properties.location_longitude && elem.properties.location_latitude) {
            return newLngLatBounds.extend([elem.properties.location_longitude, elem.properties.location_latitude]);
          } else {
            return null;
          }
        })
        let newBounds = new LngLatBounds();
        let bounds = coordinates.reduce((bounds, coord) => {
          return newBounds.extend(coord);
        })
        map.current.fitBounds(bounds, {
          padding: 250
        })
      }
    }

    if (zoomFit) {
      move();
      dispatch(zoomFitMarkers(false));
    }
    // eslint-disable-next-line 
  }, [zoomFit])
  

  useEffect(() => {
    if (windowWidth <= 500) {
      map.current.setPadding({ left: 0, top: 0, bottom: 450 });
    } else {
      if (isResultsDrawerToggled) {
        map.current.setPadding({ left: 300, top: 50 });
      } else {
        map.current.setPadding({ left: 0, top: 0 });
      }
    }
    
  }, [isResultsDrawerToggled, windowWidth])


  function jumpTo(lon, lat) {
    map.current.jumpTo({
      center: [lon, lat],
      zoom: 9
    })
  }


  function popUp(lng, lat, id) {
    if (map) {
     if (popupRef.current) {
      popupRef.current.remove();
     }

     const placeholder = document.createElement('div');
     placeholder.style.minWidth = "400px";
     placeholder.style.minHeight = "400px";

      ReactDOM.render((
          <Popup id={id} />), placeholder
        );

      popupRef.current = new mapboxgl.Popup({ offset: 20 })
        .setLngLat({lng, lat})
        .setDOMContent(placeholder)
        .on('open', () => {
          map.current._update();
        })
        .addTo(map.current);
    }
  }


  function findInView() {
    searchWithinBoundingBox(map.current.getBounds());
    dispatch(updateSearchQuery(''));
  }


  function toggleMapStyle() {
    if (map) {
      if (mapStyle === 'depth') {
        map.current.setLayoutProperty('oceans-base-layer', 'visibility', 'none');
        map.current.resize();
        dispatch(setMapStyle('no-depth'));
      } else {
        map.current.setLayoutProperty('oceans-base-layer', 'visibility', 'visible');
        map.current.resize();
        dispatch(setMapStyle('depth'));
      }
    }
  }


  return (
    <div className="fullscreen-container">
      <Sidebar 
        jumpTo={jumpTo} 
        popUp={popUp} />

      <CheckboxSearchOnMove />

      <div className="map-container" >
        <div className="map" ref={el => (mapContainer.current = el)}></div>
        
        <ButtonSwapBasemap toggleMapStyle={toggleMapStyle} isResultsDrawerToggled={isResultsDrawerToggled} />

        { !isSearchOnMapMoveToggled &&
          <ButtonFindAll handleClick={findInView} />
        }
      </div>
    </div>
  )
}

export default Map;
