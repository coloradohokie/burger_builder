import React, { Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'

class Checkout extends Component {
    checkoutCanceled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    
    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ingredients} 
                     checkoutCanceled={this.checkoutCanceled}
                     checkoutContinued={this.checkoutContinued} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData} />
            </div>
        )
    }


}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}



export default connect(mapStateToProps)(Checkout)