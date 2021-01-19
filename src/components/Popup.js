import React, {useState, useEffect} from 'react'
import { getRecordById } from '../utils/api';


const Popup = ({id}) => {
  const [popupData, setPopupData] = useState(null);
  const [loading, setLoading] = useState(false);
  let popupContent = null;

  useEffect(() => {
    if (id) {
      setLoading(true);
      getRecordById(id).then(res => {  
        if (res.data.results.length > 0) {
          setPopupData(res.data.results[0]);
        }
        setLoading(false);
      });
    }
  }, [id])
  

  if (popupData) {
    popupContent = (
      <div className="popup-card">
        <div className="popup-header">
          <div className="popup-card-title">
            <h1>{ popupData.vessel_name } {(popupData.year_sunk && popupData.year_sunk !== 'null') ? ' ('+popupData.year_sunk+')' : ''}</h1>
          </div> 
        </div>

        <div className="popup-content">
          { popupData.history && 
            <ul className="popup-history">
              { popupData.history.map((elem, index) => {
                if (elem !== '\u00a0') {
                  return (<li key={'history-' + index}> {elem} </li>)
                } else {
                  return null
                }
                })
              }
            </ul>
          }

          {
            popupData.location &&
              <ul className="popup-location">
                <li key='location'> 
                  { popupData.location.lat }, {popupData.location.lon }
                </li>
              </ul>
          }

          { popupData.sources && popupData.sources_external_links &&
            <ul className="popup-sources">
              { popupData.sources.map((elem, index) => 
                (
                  <li key={'sources-' + index}> 
                    <a href={popupData.sources_external_links[index]}> {elem} </a>
                  </li>
                )
              )}
            </ul>
          }

        </div>

      </div>
    )
  }

    
  return (
    <div className="popup-container">
      { loading 
      ? 
        <p>
          ...LOADING
        </p>
      : 
        <div>
          { popupContent }
        </div>
      }
    </div>
  )
}


export default Popup;
 