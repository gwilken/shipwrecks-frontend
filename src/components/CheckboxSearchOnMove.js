import React from 'react';
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
      <div className="checkbox-search-on-move">
        <div className="mdc-checkbox mdc-checkbox--upgraded mdc-ripple-upgraded mdc-ripple-upgraded--unbounded">
          <input type="checkbox" 
            className="mdc-checkbox__native-control" 
            id="checkbox-search-on-move" 
            aria-checked="true" 
            checked={ this.props.isSearchOnMapMoveToggled } 
            onChange={ (e) => this.props.setIsSearchOnMapMoveToggled(e.target.checked) }
            />
          
          <div className="mdc-checkbox__background">
            <svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24" focusable="false">
              <path className="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
            </svg>
            <div className="mdc-checkbox__mixedmark"></div>
          </div>
        </div>
      
        <label htmlFor="checkbox-search-on-move">Search On Map Move</label>
      
      </div>
    )
  }
}

export default connect(mapStateToProps, { setIsSearchOnMapMoveToggled })(CheckboxSearchOnMove)
