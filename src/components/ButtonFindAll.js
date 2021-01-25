import React from 'react'

const ButtonFindAll = ({handleClick}) => { 

  return (
    <div className='button button-find-in-view button-primary' 
      onClick={ () => handleClick() }>
      
      Find All in View
    
    </div>
  )
}

export default ButtonFindAll;
