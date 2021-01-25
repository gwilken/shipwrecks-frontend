import React from 'react'
import { useSelector } from 'react-redux';

const ButtonSwapBasemap = ({toggleMapStyle, isResultsDrawerToggled}) =>  {
  let windowWidth = useSelector(state => state.windowWidth);

  return (
      <div 
        className={`button button-swap margin-top-bottom ${isResultsDrawerToggled ? 'drawer-open' : ''}`}
        onClick={  () => toggleMapStyle() } >
        { windowWidth <= 500 ? 'Depth' : 'Toggle Depth'}
      </div>
  )
}

export default ButtonSwapBasemap;
