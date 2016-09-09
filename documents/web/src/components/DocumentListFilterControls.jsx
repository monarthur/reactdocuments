import React from 'react';

export default class DocumentListFilterControls extends React.Component {
    onNumItemsChange(event) {
        //this.setState({numItems: event.target.value});
        var numItems = event.target.value;
        console.log('change!', numItems);
        console.log(this);
        this.props.numItemsChangeHandler(numItems);
    }
    render() {
        return(
            <div className="filter-controls">
                <div className="filter-item type-text">
                    <label htmlFor="freetext">Sök</label>
                    <input type="text" id="freetext" />
                </div>
                <div className="filter-item type-dropdown">
                    <label htmlFor="num-items">Antal att visa</label>
                    <select id="num-items" onChange={this.onNumItemsChange.bind(this)}>
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                    </select>
                </div>
            </div>
            );
    }
}