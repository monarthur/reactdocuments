let defaultState = {
    documents: [],
    numItems: 3,
    searchText: '',
    isFetching: false,
    isCreating: false,
    documentCreated: false,
    newDocument: null
};

const reducers = function(state = defaultState, action) {
    console.log('reducer!', action.type);
    switch (action.type) {
        case 'CHANGE_NUM_ITEMS':
            var newState = Object.assign({}, state, { numItems: action.numItems });
            return newState;
            break;
        case 'CHANGE_SEARCH_TEXT':
            var newState = Object.assign({}, state, { searchText: action.searchText });
            return newState;
            break;
        case 'REQUEST_DOCUMENTS':
            var newState = Object.assign({}, state, { isFetching: true, documentCreated: false });
            return newState;
            break;
        case 'RECEIVE_DOCUMENTS':
            var newState = Object.assign({}, state, { documents: action.documents, isFetching: false } );
            return newState;
            break;
        case 'CREATE_DOCUMENT':
            var newState = Object.assign({}, state, { newDocument: action.document, isCreating: true });
            return newState;
            break;
        case 'DOCUMENT_CREATED':
            var newState = Object.assign({}, state, { newDocument: null, isCreating: false, documentCreated: true });
            return newState;
            break;
        default:
            return state;
    }
}

export default reducers;