import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as burgerBuilderActions from '../../store/actions/index'
import axios from '../../axios-orders'


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount () {
        this.props.onInitIngredients()
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
        let burger = this.props.error ? 
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
        totalPrice: state.totalPrice,
        error: state.error
    }
}

const mapDispatchToState = dispatch => {
    return {
        onAddIngredient: (ingredientType) => dispatch(burgerBuilderActions.addIngredient(ingredientType)),
        onRemoveIngredient: (ingredientType) => dispatch(burgerBuilderActions.removeIngredient(ingredientType)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}

export default connect(mapPropsToState, mapDispatchToState)(withErrorHandler(BurgerBuilder, axios));