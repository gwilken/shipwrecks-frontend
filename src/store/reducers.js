import {
  UPDATE_SEARCH_QUERY,
  UPDATE_MARKERS,
  DELETE_MARKERS,
  TOGGLE_IS_LOADING,
  UPDATE_VIEW_EXTENT,
  SET_VIEW,
  UPDATE_DISPLAYED_FEATURES,
  SET_RESULTS_WITHIN_COORDS,
  SET_FEATURE_LAYER,
  SET_CURRENT_BASEMAP,
  SET_CURRENT_MAP_POSITION,
  SET_SELECTED_RECORD,
  SET_HOVERED_FEATURE,
  TOGGLE_POPUP,
  SET_POPUP_COORDS,
  SET_IS_SOURCE_LOADED,
  SET_IS_MAP_LOADED,
  SET_IS_LABELS_TOGGLED,
  SET_IS_DARK_MODE_TOGGLED,
  SET_IS_CLUSTER_TOGGLED,
  SET_IS_SEARCH_ON_MAP_MOVE_TOGGLED,
  SET_MAP_STYLE,
  TOGGLE_RESULTS_DRAWER,
  TOGGLE_SETTINGS_DRAWER,
  SET_HOVERED_FEATURE_DATA,
  ADD_HOVERED_FEATURE_HASH,
  MOVE_MAP_TO_POSITION,
  TOGGLE_IS_POPUP_LOADING,
  SET_CURRENT_POPUP_TITLE,
  RESIZE_MAP,
  SET_URL,
  FORCE_GET_DISPLAYED_FEATURES,
  JUMP_TO_MAP_POSITION,
  UPDATE_LOCATION_SEARCH_QUERY,
  SEARCH_MODE,
  SET_VALIDATED_LOCATION,
  SHOW_FILTERS,
  SET_FILTER_COUNT,
  UPDATE_KEYWORD_SEARCH_QUERY,
  ZOOM_FIT_MARKERS
} from './constants'

const initialState = {
  windowWidth:  window.innerWidth,
  windowHeight:  window.innerHeight,
  isLoading: false,
  error: null,
  searchQuery: '',
  viewExtent: null,
  view: null,
  displayedFeatures: null,
  resultsWithinCoords: null,
  featureLayer: null,
  currentBasemap: 'oceans',
  selectedRecord: null,
  currentMapPosition: {
    center: {
      lng: -75.41030655591322,
      lat: 39.91818160566052
    },
    zoom: [6],
    bounds: null
  },
  hoveredFeature: null,
  isPopupOpen: false,
  popupCoords: [0,0],
  isSourceLoaded: false,
  isMapLoaded: false,
  markers: {
    type: 'geojson',
    // generateId: true,
    cluster: true,
    clusterRadius: 45,
    clusterMaxZoom: 11,
    data: {
      type: 'FeatureCollection',
      features: []
    }
  },
  isLabelsToggled: true,
  isDarkModeToggled: false,
  isClusterToggled: true,
  isSearchOnMapMoveToggled: true,
  // mapStyle: 'mapbox://styles/gwilken/cjxwljb4b1kt51cl63y6wzr0w',
  mapStyle: 'depth',
  isResultsDrawerToggled: window.innerWidth <= 500 ? false : true,
  isSettingsDrawerToggled: false,
  hoveredFeatureData: null,
  hoveredFeatureHashMap: {},
  moveMapToPosition: null,
  isPopupLoading: false,
  currentPopupTitle: null,
  resizeMap: false,
  url: '',
  forceGetDisplayedFeatures: false,
  jumpToMapPosition: null,
  locationSearchQuery: '',
  searchMode: 'keyword',
  validatedLocation: '',
  showFilters: false,
  filterCount: 0,
  keywordSearchQuery: '',
  zoomFitMarkers: false
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload }

    case UPDATE_MARKERS:
      return {
        ...state, 
        markers: {
          ...state.markers,
          data: {
            ...state.markers.data,
            features: action.markers
          }
        }  
      }

    case DELETE_MARKERS:
      return {...state, markers: [] }

    case TOGGLE_IS_LOADING:
      return {...state, isLoading: action.flag}

    case UPDATE_VIEW_EXTENT:
      return {...state, viewExtent: action.viewExtent}

    case SET_VIEW:
      return {...state, view: action.view}

    case UPDATE_DISPLAYED_FEATURES:
      return {...state, displayedFeatures: action.displayedFeatures}

    case SET_RESULTS_WITHIN_COORDS:
      return {...state, resultsWithinCoords: action.resultsWithinCoords}

    case SET_FEATURE_LAYER:
      return {...state, featureLayer: action.featureLayer}

    case SET_CURRENT_BASEMAP:
      return {...state, currentBasemap: action.currentBasemap}

    case SET_CURRENT_MAP_POSITION:
      return {...state, currentMapPosition: action.currentMapPosition}

    case SET_SELECTED_RECORD:
      return {...state, selectedRecord: action.selectedRecord}

    case SET_HOVERED_FEATURE:
      return {...state, hoveredFeature: action.hoveredFeature}

    case TOGGLE_POPUP:
      return {...state, isPopupOpen: action.isPopupOpen}

    case SET_POPUP_COORDS:
      return {...state, popupCoords: action.popupCoords}

    case SET_IS_SOURCE_LOADED:
      return {...state, isSourceLoaded: action.isSourceLoaded}
      
    case SET_IS_MAP_LOADED:
      return {...state, isMapLoaded: action.isMapLoaded}

    case SET_IS_LABELS_TOGGLED:
      return {...state, isLabelsToggled: action.isLabelsToggled}

    case SET_IS_DARK_MODE_TOGGLED:
      return {...state, isDarkModeToggled: action.isDarkModeToggled}

    case SET_IS_CLUSTER_TOGGLED:
      return {...state, isClusterToggled: action.isClusterToggled, markers: {...state.markers, cluster: action.isClusterToggled } }

    case SET_IS_SEARCH_ON_MAP_MOVE_TOGGLED:
      return {...state, isSearchOnMapMoveToggled: action.isSearchOnMapMoveToggled }

    case SET_MAP_STYLE:
      return {...state, mapStyle: action.mapStyle}

    case TOGGLE_RESULTS_DRAWER:
      return {...state, isResultsDrawerToggled: action.isResultsDrawerToggled}

    case TOGGLE_SETTINGS_DRAWER:
      return {...state, isSettingsDrawerToggled: action.isSettingsDrawerToggled}

    case SET_HOVERED_FEATURE_DATA:
      return {...state, hoveredFeatureData: action.hoveredFeatureData}

    case ADD_HOVERED_FEATURE_HASH:
      return {
          ...state, 
          hoveredFeatureHashMap: {
            ...state.hoveredFeatureHashMap,
            [action.hoveredFeatureHashMap._id]: action.hoveredFeatureHashMap
          }
        }

    case MOVE_MAP_TO_POSITION:
      return {...state, moveMapToPosition: action.moveMapToPosition}

    case TOGGLE_IS_POPUP_LOADING:
      return {...state, isPopupLoading: action.isPopupLoading}

    case SET_CURRENT_POPUP_TITLE:
      return {...state, currentPopupTitle: action.currentPopupTitle}

    case RESIZE_MAP:
      return {...state, resizeMap: action.resizeMap}

    case SET_URL:
      let urlParams = {}

      if (state.currentMapPosition && state.currentMapPosition.center) {
        let [ zoom ] = state.currentMapPosition.zoom
        urlParams['center'] = `${state.currentMapPosition.center.lng.toFixed(7)}:${state.currentMapPosition.center.lat.toFixed(7)}`
        urlParams['zoom'] = zoom.toFixed(3)
      }
      
      if (state.hoveredFeature && state.isPopupOpen && state.popupCoords) {
        urlParams['popup'] = `${state.hoveredFeature}:${state.popupCoords[0]}:${state.popupCoords[1]}`
      }

      if (!state.isResultsDrawerToggled) {
        urlParams['sidebar'] = '0'
      }
      
      let url = '?'

      for (let [key, val] of Object.entries(urlParams)) {
        url += `&${key}=${val}`
      }
      return {...state, url}

    case FORCE_GET_DISPLAYED_FEATURES:
      return {...state, forceGetDisplayedFeatures: action.forceGetDisplayedFeatures}

    case JUMP_TO_MAP_POSITION:
      return {...state, jumpToMapPosition: action.jumpToMapPosition}
    
    case UPDATE_LOCATION_SEARCH_QUERY:
      return {...state, locationSearchQuery: action.locationSearchQuery}

    case SEARCH_MODE:
      return {...state, searchMode: action.searchMode}

    case SET_VALIDATED_LOCATION:
      return {...state, validatedLocation: action.validatedLocation}

    case SHOW_FILTERS:
      return {...state, showFilters: action.showFilters}

    case SET_FILTER_COUNT:
      return {...state, filterCount: action.filterCount}

    case UPDATE_KEYWORD_SEARCH_QUERY:
      return {...state, keywordSearchQuery: action.keywordSearchQuery}

    case ZOOM_FIT_MARKERS:
      return {...state, zoomFitMarkers: action.zoomFitMarkers}

    default:
      return state;
    }
  }
  
export default rootReducer
  