import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const reducer = (state = initialState, action) => {
    const INGREDIENT_PRICES = {
        salad: 0.5,
        cheese: 0.4,
        bacon: 0.7,
        meat: 1.3
    }


    switch(action.type) {
        // case actionTypes.GET_INGREDIENTS:
        //     return {
        //         ...state,
        //         ingredients: action.ingredients
        //     }

        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType]
            }

        case actionTypes.REMOVE_INGREDIENT:
            if (state.ingredients[action.ingredientType] <= 0) {
                return state
            }
            
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType]
            }

        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                error: false
            }
        
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }

        default:
            return state
    }

}

export default reducer