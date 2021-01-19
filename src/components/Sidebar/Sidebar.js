import React from 'react';
// import Drawer, { DrawerContent } from '@material/react-drawer';
import Card from './Card';

import { useSelector, useDispatch } from 'react-redux';
import { 
  toggleResultsDrawer, 
  updateKeywordSearchQuery,
  setIsSearchOnMapMoveToggled,
  zoomFitMarkers } from '../../store/actions';
import { fetchWrecksFromDb } from '../../utils/api';

const Sidebar = ({jumpTo, popUp}) => {
  const isOpen = useSelector(state => state.isResultsDrawerToggled);
  const markers = useSelector(state => state.markers);
  const query = useSelector(state => state.keywordSearchQuery);
  const dispatch = useDispatch();

  let cards = [];

  cards = markers.data.features.slice(0, 50).map((elem, index) => {
    return (
      <Card 
        key={ 'card' + index }
        hoverId={ elem.id }
        { ...elem.properties }
        jumpTo={jumpTo}
        popUp={popUp}
      />
    )
  })
  
  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }


  async function handleSearch() {
    if (query) {
      dispatch(setIsSearchOnMapMoveToggled(false));

      let res = await fetchWrecksFromDb({
        query,
        db: 'elastic',
        limit: 10000
      })

      if (res) {
        dispatch(zoomFitMarkers(true));
      }
    }
  }



  return (
    <div className={ isOpen ? 'results-drawer-open' : '' }>
      <div className="drawer-tab"
       onClick={ () => dispatch(toggleResultsDrawer(!isOpen)) }>
         
        <div className="arrow-icon" alt="collapse drawer">
          { isOpen ? '\u25C0' : '\u25B6' }
        </div>
      </div>

      <div tag='main'>
        <div className="results-container">
          <h3>{ markers.data.features.length } results. </h3>

          <div className="filters-container">
            <div className='input-container'>
              <input className='input-field'
                autoFocus
                placeholder="submarine, schooner, etc."
                value={ query }
                onKeyDown={handleKeyDown}
                onChange={ (e) => dispatch(updateKeywordSearchQuery(e.target.value)) } />
            </div>

            <div className='button update-button'
              onClick={ () => handleSearch() }>
                Keyword Search
            </div>
          </div>

          <ul className="card-container">
            { cards }
          </ul>
        </div>
      </div>
    </div>
  )
}


export default Sidebar;
