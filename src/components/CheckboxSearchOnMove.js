import React from 'react';
// import Checkbox from '@material/react-checkbox';
import { connect } from 'react-redux'
import { setIsSearchOnMapMoveToggled } from '../store/actions'

const mapStateToProps = state => {
  return {
    isLoading: state.isLoading, 
    isSearchOnMapMoveToggled: state.isSearchOnMapMoveToggled
  }
}

class CheckboxSearchOnMove extends React.Component {
  render() {
    return (
     <div className='checkbox-search-on-move'>
        <div
          nativeControlId='checkbox-search-on-move'
          // disabled={ this.props.isLoading }
          checked={ this.props.isSearchOnMapMoveToggled }
          // indeterminate={this.props.isSearchOnMapMoveToggled}
          onChange={ (e) => this.props.setIsSearchOnMapMoveToggled(e.target.checked) } />
        
        <label htmlFor='checkbox-search-on-move'>
          { this.props.isLoading ? 'Loading...' : 'Search On Map Move' }
        </label>
     
     </div>
    )
  }
}

export default connect(mapStateToProps, { setIsSearchOnMapMoveToggled })(CheckboxSearchOnMove)
