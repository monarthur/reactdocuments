import React from 'react'

export default class DocumentItem extends React.Component {
    render() {
        var publishDate = new Date(this.props.document.publishDate);
        var modifiedDate = new Date(this.props.document.modifiedDate);
        var dateFormat = new Intl.DateTimeFormat('se-SV', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' });
        var publishDateString = dateFormat.format(publishDate);
        var modifiedDateString = dateFormat.format(modifiedDate);
        return (
                <li data-id={this.props.document._id}>
                    <span className="headline">{this.props.document.headline}</span>
                    <span className="publish-date">{publishDateString}</span>
                    <span className="modified-date">{modifiedDateString}</span>
                    <span className="tools"><span className="edit icon pencil"></span></span>
                </li>
        );
    }
}