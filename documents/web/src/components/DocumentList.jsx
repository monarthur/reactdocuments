import React from 'react';
import DocumentItem from './DocumentItem';

export default class DocumentList extends React.Component {
    
    render() {
        return (
          <ul className="document-list">
              <li className="list-header"><span className="headline">Rubrik</span><span className="publish-date">Skapad</span><span className="modified-date">Ändrad</span><span className="tools"></span></li>
            {this.props.documents.map(function(doc) {
                return <DocumentItem key={doc._id} document={doc} />;
            })}
          </ul>
        );
    }
}