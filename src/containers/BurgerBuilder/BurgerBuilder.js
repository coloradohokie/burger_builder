import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions'


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('https://react-burger-builder-8a42d.firebaseio.com/ingredients.json')
            .then(response => {
                this.props.onGetResponse(response.data)
            })
            .catch(error => {
                this.setState({error: true})
            })
    }

    updatePurchaseState(ingredients) {   
        const sum = Object.keys(ingredients)
            .map(igKey => {return ingredients[igKey] })
            .reduce((sum, el) => {return sum + el},0)
        return sum > 0
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }



    render() {
        const disabledInfo = {
            ...this.props.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        
        let orderSummary = null;
        let burger = this.state.error ? 
            <p>Ingredients can't be loaded</p> : 
            <Spinner />
        
        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredientAdded={this.props.onAddIngredient}
                        ingredientRemoved={this.props.onRemoveIngredient}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={this.purchaseHandler}
                        price={this.props.totalPrice} />
                </Aux>
            )
            orderSummary = (
                <OrderSummary 
                    ingredients={this.props.ingredients}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    price={this.props.totalPrice} 
                />
                )        
            }

            if (this.state.loading) {
                orderSummary = <Spinner />
            }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapPropsToState = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToState = dispatch => {
    return {
        onAddIngredient: (ingredientType) => dispatch({type:actionTypes.ADD_INGREDIENT, ingredientType:ingredientType}),
        onRemoveIngredient: (ingredientType) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientType: ingredientType}),
        onGetResponse: (ingredients) => dispatch({type: actionTypes.GET_INGREDIENTS, ingredients: ingredients})
    }
}

export default connect(mapPropsToState, mapDispatchToState)(withErrorHandler(BurgerBuilder, axios));