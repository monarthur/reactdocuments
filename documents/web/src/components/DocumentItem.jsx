import React from 'react'

export default class DocumentItem extends React.Component {
    render() {
        var publishDate = new Date(this.props.document.publishDate);
        var modifiedDate = new Date(this.props.document.modifiedDate);
        return (
                <li data-id={this.props.document._id}>
                    <span className="headline">{this.props.document.headline}</span>
                    <span className="publish-date">{publishDate.toDateTimeString()}</span>
                    <span className="modified-date">{modifiedDate.toDateTimeString()}</span>
                    <span className="tools"><span className="edit icon pencil"></span></span>
                </li>
        );
    }
}