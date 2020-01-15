import React, { Component } from 'react';
import { Container, Box, Heading, Text, TextField } from 'gestalt';
import ToastMessage from './ToastMessage';
import { getCart, calculatePrice } from '../utils/index';
export default class Checkout extends Component {
  state = {
    cartItems: [],
    address: '',
    postalCode: '',
    city: '',
    confirmationEmailAddress: '',
    toast: false,
    toastMessage: ''
  };

  componentDidMount() {
    this.setState({ cartItems: getCart() });
  }
  handleChange = ({ event, value }) => {
    this.setState({ [event.target.name]: value });
  };

  handleConfirmOrder = async event => {
    event.preventDefault();

    if (!this.isFormEmpty(this.state)) {
    } else {
      this.showToast('Please fill in all fields.');
    }
  };
  isFormEmpty = ({ address, postalCode, city, confirmationEmailAddress }) => {
    return !address || !postalCode || !city || !confirmationEmailAddress;
  };

  showToast = toastMessage => {
    this.setState({
      toast: true,
      toastMessage
    });
    setTimeout(
      () =>
        this.setState({
          toast: false,
          toastMessage: ''
        }),
      2000
    );
  };
  render() {
    const { toast, toastMessage, cartItems } = this.state;
    return (
      <Container>
        <Box
          color='darkWash'
          marginTop={5}
          margin={4}
          padding={4}
          shape='rounded'
          display='flex'
          justifyContent='center'
          alignItems='center'
          direction='column'
        >
          {/* Checkout Form Heading */}

          <Heading color='orange'>Checkout</Heading>

          {cartItems.length > 0 ? (
            <React.Fragment>
              {' '}
              {/* User Cart */}
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                direction='column'
                marginTop={2}
                marginBottom={6}
              >
                <Text color='darkGray' italic>
                  {cartItems.length} items for Checkout
                </Text>
                <Box padding={2}>
                  {cartItems.map(item => (
                    <Box key={item._id} padding={1}>
                      <Text>
                        {item.name} x {item.quantity} - $
                        {item.quantity * item.price}
                      </Text>
                    </Box>
                  ))}
                  <Box padding={1}>
                    <Text bold>Total Amount: {calculatePrice(cartItems)} </Text>
                  </Box>
                </Box>
              </Box>
              {/* Checkout Form  */}
              <form
                onSubmit={this.handleConfirmOrder}
                style={{
                  display: 'inlineBlock',
                  textAlign: 'center',
                  maxWidth: 450
                }}
              >
                {/* Shipping Address Input */}
                <TextField
                  id='address'
                  type='text'
                  name='address'
                  placeholder='Shipping Address'
                  onChange={this.handleChange}
                />
                {/* Postal Code Input */}
                <TextField
                  id='postalCode'
                  type='text'
                  name='postalCode'
                  placeholder='Postal Code'
                  onChange={this.handleChange}
                />
                {/* City Input */}
                <TextField
                  id='city'
                  type='text'
                  name='city'
                  placeholder='City'
                  onChange={this.handleChange}
                />
                {/* Confirmation Email Input */}
                <TextField
                  id='confirmationEmailAddress'
                  type='email'
                  name='confirmationEmailAddress'
                  placeholder='Confirmaton Email Address'
                  onChange={this.handleChange}
                />
                <Box marginTop={2}>
                  <button id='stripe__button' type='submit'>
                    Submit
                  </button>
                </Box>
              </form>
            </React.Fragment>
          ) : (
            /* No items in cart text*/
            <Box color='darkWash' shape='rounded' padding={4}>
              <Heading align='center' color='watermelon' size='xs'>
                Your Cart Is Empty
              </Heading>
            </Box>
          )}
        </Box>
        <ToastMessage message={toastMessage} show={toast} />
      </Container>
    );
  }
}
