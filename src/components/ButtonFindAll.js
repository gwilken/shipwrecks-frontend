import React from 'react'
// import Button from '@material/react-button/';


const ButtonFindAll = ({handleClick}) => { 

  return (
    <div
      raised
      className='button-find-in-view button-primary' 
      onClick={ () => handleClick() }>
      
      Find All in View
    
    </div>
  )
}

export default ButtonFindAll;
