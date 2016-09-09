import React from 'react';
import DocumentListFilterControls from './DocumentListFilterControls';
import DocumentList from './DocumentList';

export default class FilterableDocumentList extends React.Component {
    constructor() {
        super();
        this.state = { documents: [], numItems: 3 };
    }
    componentDidMount() {
        this.fetchDocuments();
    }
    componentWillReceiveProps(nextProps) {
        console.log('props!');
        console.log(nextProps);
    }
    fetchDocuments() {
        q.ajax.getJson('/webapi/pages', { take: this.state.numItems })
            .then(this.onGetPagesSuccess.bind(this))
            .catch(this.onGetPagesError.bind(this));
    }
    onGetPagesSuccess(data) {
        this.setState({documents: data});
    }
    onGetPagesError(data) {
        this.setState({documents: [{headline: `Något gick fel: ${data}`}]});
    }
    onNumItemsChange(numItems) {
console.log('onNumItemsChange',numItems);
        this.setState({numItems: numItems});
        this.fetchDocuments();
    }
    render() {
console.log('render');
        return (
            <div className="documents">
                <h3 className="header">Dokument här vaaa</h3>
                <DocumentListFilterControls numItemsChangeHandler={this.onNumItemsChange.bind(this)} />
                <DocumentList documents={this.state.documents} />
            </div>
        );
    }
}
