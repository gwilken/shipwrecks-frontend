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

  
export const updateSearchQuery = (query) => (
  {
    type: UPDATE_SEARCH_QUERY,
    payload: query
  }
)

export const updateMarkers = (markers) => (
  {
    type: UPDATE_MARKERS,
    markers
  }
)

export const deleteMarkers = () => (
  {
    type: DELETE_MARKERS
  }
)

export const isLoading = (flag) => (
  {
    type: TOGGLE_IS_LOADING,
    flag
  }
)

export const updateViewExtent = (viewExtent) => (
  {
    type: UPDATE_VIEW_EXTENT,
    viewExtent
  }
)

export const setView = (view) => (
  {
    type: SET_VIEW,
    view
  }
)

export const updateDisplayedFeatures = (displayedFeatures) => (
  {
    type: UPDATE_DISPLAYED_FEATURES,
    displayedFeatures
  }
  )
  
  export const setResultsWithinCoords = (resultsWithInCoords) => (
    {
      type: SET_RESULTS_WITHIN_COORDS,
      resultsWithInCoords
    }
  )
    
  export const setFeatureLayer = (featureLayer) => (
    {
      type: SET_FEATURE_LAYER,
      featureLayer
    }
  )
  
  export const setCurrentBasemap = (currentBasemap) => (
    {
      type: SET_CURRENT_BASEMAP,
      currentBasemap
    }
  )

  export const setCurrentMapPosition = (currentMapPosition) => (
    {
      type: SET_CURRENT_MAP_POSITION,
      currentMapPosition
    }
  )

  export const setSelectedRecord = (selectedRecord) => (
    {
      type: SET_SELECTED_RECORD,
      selectedRecord
    }
  )

export const setHoveredFeature = (hoveredFeature) => (
  {
    type: SET_HOVERED_FEATURE,
    hoveredFeature
  }
)

export const togglePopup = (isPopupOpen) => (
  {
    type: TOGGLE_POPUP,
    isPopupOpen
  }
)

export const setPopupCoords = (popupCoords) => (
  {
    type: SET_POPUP_COORDS,
    popupCoords
  }
)

export const setIsSourceLoaded = (isSourceLoaded) => (
  {
    type: SET_IS_SOURCE_LOADED,
    isSourceLoaded
  }
)

export const setIsMapLoaded = (isMapLoaded) => (
  {
    type: SET_IS_MAP_LOADED,
    isMapLoaded
  }
)

export const setIsLabelsToggled = (isLabelsToggled) => (
  {
    type: SET_IS_LABELS_TOGGLED,
    isLabelsToggled
  }
)

export const setIsDarkModeToggled = (isDarkModeToggled) => (
  {
    type: SET_IS_DARK_MODE_TOGGLED,
    isDarkModeToggled
  }
)

export const setIsClusterToggled = (isClusterToggled) => (
  {
    type: SET_IS_CLUSTER_TOGGLED,
    isClusterToggled
  }
)

export const setIsSearchOnMapMoveToggled = (isSearchOnMapMoveToggled) => (
  {
    type: SET_IS_SEARCH_ON_MAP_MOVE_TOGGLED,
    isSearchOnMapMoveToggled
  }
)

export const setMapStyle = (mapStyle) => (
  {
    type: SET_MAP_STYLE,
    mapStyle
  }
)

export const toggleResultsDrawer = (toggle) => (
  {
    type: TOGGLE_RESULTS_DRAWER,
    isResultsDrawerToggled: toggle
  }
)

export const toggleSettingsDrawer = (toggle) => (
  {
    type: TOGGLE_SETTINGS_DRAWER,
    isSettingsDrawerToggled: toggle
  }
)

export const setHoveredFeatureData = (data) => (
  {
    type: SET_HOVERED_FEATURE_DATA,
    hoveredFeatureData: data
  }
)

export const addHoveredFeatureHash = (data) => (
  {
    type: ADD_HOVERED_FEATURE_HASH,
    hoveredFeatureHashMap: data
  }
)

export const moveMapToPosition = (moveMapToPosition) => (
  {
    type: MOVE_MAP_TO_POSITION,
    moveMapToPosition
  }
)

export const toggleIsPopupLoading = (isPopupLoading) => (
  {
    type: TOGGLE_IS_POPUP_LOADING,
    isPopupLoading
  }
)

export const setCurrentPopupTitle = (currentPopupTitle) => (
  {
    type: SET_CURRENT_POPUP_TITLE,
    currentPopupTitle
  }
)

export const resizeMap = (toggle) => (
  {
    type: RESIZE_MAP,
    resizeMap: toggle
  }
)

export const setUrl = (url) => (
  {
    type: SET_URL,
    url
  }
)

export const forceGetDisplayedFeatures = (toggle) => (
  {
    type: FORCE_GET_DISPLAYED_FEATURES,
    forceGetDisplayedFeatures: toggle
  }
)

export const jumpToMapPosition = (jumpToMapPosition) => (
  {
    type: JUMP_TO_MAP_POSITION,
    jumpToMapPosition
  }
)

export const updateLocationSearchQuery = (locationSearchQuery) => (
  {
    type: UPDATE_LOCATION_SEARCH_QUERY,
    locationSearchQuery
  }
)

export const setSearchMode = (searchMode) => (
  {
    type: SEARCH_MODE,
    searchMode
  }
)

export const setValidatedLocation = (validatedLocation) => (
  {
    type: SET_VALIDATED_LOCATION,
    validatedLocation
  }
)

export const showFilters = (showFilters) => (
  {
    type: SHOW_FILTERS,
    showFilters
  }
)

export const setFilterCount = (filterCount) => (
  {
    type: SET_FILTER_COUNT,
    filterCount
  }
)

export const updateKeywordSearchQuery = (keywordSearchQuery) => (
  {
    type: UPDATE_KEYWORD_SEARCH_QUERY,
    keywordSearchQuery
  }
)

export const zoomFitMarkers = (zoomFitMarkers) => (
  {
    type: ZOOM_FIT_MARKERS,
    zoomFitMarkers
  }
)

