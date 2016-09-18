import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

class CreateDocumentForm extends React.Component {
    onCreateClick() {
        let headline = q('#newdoc-headline').value;
        const document = { headline: headline };
        this.props.dispatchCreateDocument(document);
    }
    render() {
        return(
            <form className="create-document">
                <h3 className="header">Skapa ny</h3>
                <div className="form-item">
                    <input type="text" id="newdoc-headline" placeholder="Rubrik" />
                </div>
                <div className="form-item">
                    <button type="button" id="newdoc-create" onClick={this.onCreateClick.bind(this)}>Skapa</button>
                </div>
            </form>
            );
    }
}

function mapStateToProps(state) {
    return {

    };
}
function mapDispatchToProps(dispatch) {
    return {
        dispatchCreateDocument: document => dispatch(actions.createDocument(document))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateDocumentForm);