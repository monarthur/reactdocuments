export function changeNumItems(numItems) {
    return {
        type: 'CHANGE_NUM_ITEMS',
        numItems: numItems
    };
}

export function changeSearchText(searchText) {
    return {
        type: 'CHANGE_SEARCH_TEXT',
        searchText: searchText
    };
}

export function requestDocuments(params) {
    return {
        type: 'REQUEST_DOCUMENTS',
        params: params
    }
}

export function receiveDocuments(documents) {
    return {
        type: 'RECEIVE_DOCUMENTS',
        documents: documents
    }
}

export function createDocument(document) {
    return {
        type: 'CREATE_DOCUMENT',
        document: document
    }
}
export function documentCreated(document) {
    return {
        type: 'DOCUMENT_CREATED',
        document: document
    }
}