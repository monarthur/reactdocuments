import React from 'react';

export default class DocumentListFilterControls extends React.Component {
    
    render() {
        return(
            <div className="filter-controls">
                <div className="filter-item type-text">
                    <label htmlFor="freetext">Sök</label>
                    <input type="text" id="freetext" onChange={e => this.props.onSearchTextChanged(e)} />
                </div>
                <div className="filter-item type-dropdown">
                    <label htmlFor="num-items">Antal att visa</label>
                    <select id="num-items" onChange={e => this.props.onNumItemsChanged(e)}>
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                    </select>
                </div>
            </div>
            );
    }
}