export function fetchPosts(page) {
    return dispatch => {
        return fetch(`http://localhost:3001/api/words/?page=${page}`)
            .then(response => response.json())
            .then(json => dispatch(fetchProductsSuccess(json)))
    }
}

export function fetchPostsFirst() {
    return dispatch => {
        return fetch(`http://localhost:3001/api/words/?page=1`)
            .then(response => response.json())
            .then(json => dispatch(fetchProductsSuccessFIRST(json)))
    }
}


export const fetchProductsSuccess = products => {
    const items = products.result.map(x => {
                x.active = false
                return x;
            })
    return {
        payload: {products: items},
        type: 'FETCH_PRODUCTS_SUCCESS'
    }
};


export function changeComponent1(item, index) {
    global.console.log(item, index)
    return {
        number: index,
        payload: item,
        type: 'SET_CHANGE'

    }

}


export function changeComponent(item, index) {
    return dispatch => {
        return fetch(`http://localhost:3001/api/words/${index}`, {

            body: JSON.stringify(item),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PATCH',

        }).then(response => response.json())
            .then(json => dispatch(changeComponent1(json, index)));
    }
}



export function deleteComponent1(index) {
    return {
        number: index,
        type: 'DELETE'
    }
}

export const fetchProductsSuccessFIRST = products => {
    const items = products.result.map(x => {
                x.active = false
                return x;
            })
    return {
        payload: {products: items},
        type: 'FETCH_PRODUCTS_SUCCESS_FIRST'
    }
};




export function deleteComponent(index) {
    return dispatch => {
        return fetch(`http://localhost:3001/api/words/${index}`, {
            method: 'DELETE',
        }).then(response => response.json())
            .then(json => dispatch(fetchPostsFirst()));
    }
}


export function activeComponent(index, active) {
    return {
        active,
        number: index,
        type: 'active'

    }
}

export function createComponent1(item) {
    return {
        payload: item,

        type: 'CREATE'

    }
}

export function createComponent(item) {
    return dispatch => {
        return fetch(`http://localhost:3001/api/words`, {

            body: JSON.stringify(item),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',

        }).then(response => response.json())
            .then(json => dispatch(fetchPostsFirst()));
    }
}