import React from 'react';
import { connect } from 'react-redux';
import FilterableDocumentList from './FilterableDocumentList';
import CreateDocumentForm from './CreateDocumentForm';
import * as actions from '../actions/actions';

export default class App extends React.Component {
    static contextTypes = {
        store: React.PropTypes.object
    }
    componentDidMount() {
        const store = this.context.store;
        store.subscribe(this.updateApp.bind(this));
    }
    componentWillReceiveProps(nextProps) {
        //if (this.props.numItems !== nextProps.numItems || this.props.searchText !== nextProps.searchText) {
            const { numItems, searchText } = nextProps;
            console.log({ numItems, searchText });
            this.fetchDocuments({ numItems, searchText });
        //}
    }
    updateApp() {
        console.log('subscribe callback!');
        //const { numItems, searchText } = this.context.store.getState();
        //console.log({ numItems, searchText });
        //this.fetchDocuments({ numItems, searchText });
    }
    fetchDocuments(params) {
        console.log('fetch', params.numItems );
        q.ajax.getJson('/webapi/pages', { take: params.numItems, searchText: params.searchText })
            .then(this.onGetPagesSuccess.bind(this))
            .catch(this.onGetPagesError.bind(this));
    }
    onGetPagesSuccess(data) {
        console.log('success!', data);
        this.props.dispatchReceiveDocuments(data);
    }
    onGetPagesError(data) {
        this.setState({documents: [{headline: `Något gick fel: ${data}`}]});
    }

    render() { 
        return (
            <div className="wrapper">
                <FilterableDocumentList />
                <CreateDocumentForm />
            </div>
            );
    }
}

function mapStateToProps(state) {
    const { documents, numItems, searchText, isFetching, newDocument } = state;
    return { documents, numItems, searchText, isFetching, newDocument };
}
function mapDispatchToProps(dispatch) {
    return {
        dispatchReceiveDocuments: documents => dispatch(actions.receiveDocuments(documents))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(App)