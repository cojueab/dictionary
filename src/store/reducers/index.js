const initialState = {
    active: false,
    next: false,
    page: 1,
    word: [],

};
export default function userstate(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_PRODUCTS_SUCCESS':
            const word = [...state.word].concat(action.payload.products)
            global.console.log(word)
            return {...state, word, page: action.page, next: action.payload.products.next}
        case 'FETCH_PRODUCTS_SUCCESS_FIRST':
            const word1 = action.payload.products
            global.console.log(word)
            return {...state, word:word1, page: action.page, next: action.payload.products.next}
        case 'SET_CHANGE':
            const item1 = state.word.map((x, i) => {
                if (i === action.number) {
                    return action.payload
                }
                return x;
            })
            return {...state, word: item1}
        case 'CREATE':
            const arr = state.word
            arr.unshift(action.payload)
            global.console.log(state, arr)
            return {...state, word: arr}
        case 'active':
            const item = state.word.map((x, i) => {
                if (i === action.number) {
                    x.active = action.active
                }
                return x;
            })
            return {...state, word: item}
        case 'DELETE':
            let array = [...state.word];
            array.splice(action.number, 1);
            return {...state, word: array}
        default:
            return state;
    }
}