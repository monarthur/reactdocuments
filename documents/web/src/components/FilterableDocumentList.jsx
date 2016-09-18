import React from 'react';
import { connect } from 'react-redux';
import DocumentListFilterControls from './DocumentListFilterControls';
import DocumentList from './DocumentList';
import * as actions from '../actions/actions';

class FilterableDocumentList extends React.Component {
    //static contextTypes = {
    //    store: React.PropTypes.object
    //}
    constructor() {
        super();
        this.searchTextChangedTimeout = 0;
    }
    
    numItemsChanged(e) {
        console.log('numItemsChanged');
        const numItems = e.target.value
        console.log(numItems);
        this.props.dispatchChangeNumItems(numItems);
    }
    searchTextChanged(e) {
        console.log('searchTextChanged');
        const searchText = e.target.value
        console.log(searchText);
        clearTimeout(this.searchTextChangedTimeout);
        this.searchTextChangedTimeout = setTimeout(this.props.dispatchChangeSearchText.bind(this, searchText), 500);
    }
    render() {
        console.log('render FILTERABLEDOCLIST');
        //const store = this.context.store;
        //const { documents, numItems, searchText } = store.getState();

        return (
            <div className="documents">
                <DocumentListFilterControls numItems={this.props.numItems} searchText={this.props.searchText} 
                onNumItemsChanged={this.numItemsChanged.bind(this)} onSearchTextChanged={this.searchTextChanged.bind(this)} />
                <DocumentList documents={this.props.documents} />
            </div>
        );
    }
}


function mapStateToProps(state) {
    const { documents, numItems, searchText , isFetching} = state;
    return { documents, numItems, searchText, isFetching };
}
function mapDispatchToProps(dispatch) {
    return {
        dispatchChangeNumItems: numItems => dispatch(actions.changeNumItems(numItems)),
        dispatchChangeSearchText: searchText => dispatch(actions.changeSearchText(searchText))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterableDocumentList)
//export default connect()(App)