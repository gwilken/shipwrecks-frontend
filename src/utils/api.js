import store from '../store/store'
import axios from 'axios'

import { 
    isLoading,
    updateMarkers,
    setIsSearchOnMapMoveToggled,
    setUrl,
    setValidatedLocation
  } from '../store/actions'


export const getRecordById = (id) => {
  return new Promise(resolve => {
    axios.get(`/api/id/${id}`).then(res => {
      if (res.status >= 200 && res.status < 500) {
        resolve(res)
      } else {
       resolve(); 
      }
    })
  })
}


export const searchWithinBoundingBox = (bounds) => {
  store.dispatch(isLoading(true))
  const _ne = bounds._ne 
  const _sw = bounds._sw 
  axios.get(`/api/geobox/${_ne.lng}/${_ne.lat}/${_sw.lng}/${_sw.lat}`)
    .then(res => {
      if (res.status >= 200 && res.status < 500) {
        let arr = (res.data.hits.hits.map(elem => elem._source))
        let markers = createMarkers(arr);

        store.dispatch(updateMarkers(markers));
        store.dispatch(isLoading(false))
      } else {
        store.dispatch(isLoading(false))
      }
    })
    .catch(err => {
    })
}


export const searchNear = (geoname) => {
  if (geoname.length > 0) {
    store.dispatch(isLoading(true))
    axios.get(`/api/near/${geoname}`)
      .then(res => {
        if (res.status >= 200 && res.status < 500) {
          let arr = (res.data.hits.map(elem => elem._source))
          let markers = createMarkers(arr);
          store.dispatch(updateMarkers(markers))
          store.dispatch(isLoading(false))
          store.dispatch(setIsSearchOnMapMoveToggled(false))
          store.dispatch(setValidatedLocation(res.data.name))
          store.dispatch(setUrl())
        } else {
          store.dispatch(isLoading(false))
          store.dispatch(setValidatedLocation(''))
        }
      })
      .catch(err => {
        store.dispatch(isLoading(false))
        store.dispatch(setValidatedLocation(''))
      })
  }
}


export const fetchWrecksFromDb = (payload) => {
  return new Promise((resolve, reject) => {
    store.dispatch(isLoading(true))
    let { query, limit } = payload
    
    axios.get(`/api/meta/${query}/${limit}`)
    .then(res => {
      if (res.status >= 200 && res.status < 500) {
        let arr = (res.data.hits.hits.map(elem => elem._source))
        let markers = createMarkers(arr);
        store.dispatch(updateMarkers(markers))
        store.dispatch(isLoading(false))
        resolve('ok')
      } else {
        store.dispatch(isLoading(false))
        resolve()
      }
    })
    .catch(err => {
      store.dispatch(isLoading(false))
      resolve()
    })
  })
}


// {
//   history_summary: "The 7 ton 27 foot wooden gas screw fishing vessel A M burned November 14, 1962 at the mouth of the Kasilof River in Cook Inlet."
//   id: "5da7952ca33afb21154bd82f"
//   location_latitude: 60.3875
//   location_longitude: -151.29583333333332
//   vessel_name: "A M"
//   year_sunk: "1962"
// }

const createMarkers = (data) => { 
  let markers = data.map(elem => {
    return (
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [elem.location_longitude, elem.location_latitude]
        },
        "properties": { ...elem },
        "id": Math.floor(Math.random() * 99999999)
      }
    )
  })
  
  return markers;
}


// decimal places  decimal degrees N/S or E/W at equator
// 2   0.01    1.1132 km
// 3   0.001   111.32 m
// 4   0.0001  11.132 m
// 5   0.00001 1.1132 m