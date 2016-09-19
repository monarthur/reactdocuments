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
        if (nextProps.newDocument != null && !this.props.isCreating) {
            console.log('new document!', nextProps.newDocument);
            this.createDocument(nextProps.newDocument);
        }
        else if ((nextProps.documentCreated || (this.props.numItems !== nextProps.numItems || this.props.searchText !== nextProps.searchText)) && !this.props.isFetching) {
            const { numItems, searchText } = nextProps;
            console.log({ numItems, searchText });
            this.fetchDocuments({ numItems, searchText });
        }
    }
    updateApp() {
        console.log('subscribe callback!');
        //const { numItems, searchText } = this.context.store.getState();
        //console.log({ numItems, searchText });
        //this.fetchDocuments({ numItems, searchText });
    }
    fetchDocuments(params) {
        console.log('fetch', params.numItems );
        this.props.dispatchRequestDocuments(params);
        q.ajax.getJson('/webapi/pages', { take: params.numItems, searchText: params.searchText })
            .then(this.onGetPagesSuccess.bind(this))
            .catch(this.onGetPagesError.bind(this));
    }
    createDocument(document) {
        //this.props.dispatchCreateDocument(document);
        q.ajax.postJson('/webapi/pages', document)
            .then(this.onCreatePageSuccess.bind(this))
            .catch(this.onCreatePageError.bind(this));
    }
    onGetPagesSuccess(data) {
        console.log('getsuccess!', data);
        this.props.dispatchReceiveDocuments(data);
    }
    onGetPagesError(data) {
        console.log('geterror!', data);
        this.setState({documents: [{headline: `Något gick fel: ${data}`}]});
    }
    onCreatePageSuccess(data) {
        console.log('createsuccess!', data);
        this.props.dispatchDocumentCreated(data);
    }
    onCreatePageError(data) {
        console.log('createerror!', data);
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
    const { documents, numItems, searchText, isFetching, isCreating, documentCreated, newDocument } = state;
    return { documents, numItems, searchText, isFetching, isCreating, documentCreated, newDocument };
}
function mapDispatchToProps(dispatch) {
    return {
        dispatchRequestDocuments: params => dispatch(actions.requestDocuments(params)),
        dispatchReceiveDocuments: documents => dispatch(actions.receiveDocuments(documents)),
        dispatchCreateDocument: document => dispatch(actions.createDocument(document)),
        dispatchDocumentCreated: document => dispatch(actions.documentCreated(document))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(App)