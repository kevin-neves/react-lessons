const reducer = (state, action) => {
    if (action.type === "CLEAR_CART") {
        return {...state, cart: []};
    }
    if (action.type === "REMOVE") {
        return { ...state, cart: state.cart.filter((item) => item.id !== action.payload)}
    }
    if (action.type === "INCREASE" || action.type === "DECREASE") {
        const isIncrease = action.type === "INCREASE";
        const tempCart = state.cart.map((item) => {
            if (item.id === action.payload) {
                return { ...item, amount: isIncrease ? item.amount + 1 : item.amount - 1};
            }
            return item;
        }).filter((item) => item.amount >= 1);
        return {...state, cart: tempCart}
    }
    // if (action.type === "DECREASE") {
    //     let tempCart = state.cart.map((item) => {
    //         if (item.id === action.payload) {
    //             return { ...item, amount: item.amount - 1};
    //         }
    //         return item;
    //         })
    //     return {...state, cart: tempCart};
    // }
    if (action.type === "GET_TOTALS") {
        const [ total, amount ] = state.cart.reduce((acc, {price, amount}) => {
            acc[0] += price * amount;
            acc[1] += amount;
            return acc;
        }, [0, 0]);

        return {...state, total: parseFloat(total.toFixed(2)), amount};
    }
    if (action.type === "LOADING") {
        return { ...state, loading: true}
    }
    if (action.type === "DISPLAY_ITEMS") { 
        return {...state, cart: action.payload, loading: false}
    }
    throw new Error(`No matching action type called ${action.type}`)
};

export default reducer;