import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 1.3
}

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientType]: state.ingredients[action.ingredientType] + 1}
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType]
    }
    return updateObject(state, updatedState)
}

const removeIngredient = (state, action) => {
    if (state.ingredients[action.ingredientType] <= 0) {
        return state
    }
    
    const updatedIng = {[action.ingredientType]: state.ingredients[action.ingredientType] - 1}
    const updatedIngs = updateObject(state.ingredients, updatedIng)
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType]
    }
    return updateObject(state, updatedSt)
}

const setIngredients = (state, action) => {
    const updatedSetState = {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false
    }
    return updateObject (state, updatedSetState )    
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {error: true})    
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action)
        default: return state
    }
}

export default reducer