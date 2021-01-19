import React from 'react'
// import Button from '@material/react-button/';

const ButtonSwapBasemap = ({toggleMapStyle}) =>  {
  return (
      <div className='button-swap button-primary margin-top-bottom' 
        raised
        onClick={  () => toggleMapStyle() } >
        Toggle Depth
      </div>
  )
}

export default ButtonSwapBasemap;
