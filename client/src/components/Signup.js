import React, { Component } from 'react';
import { Container, Box, Button, Heading, Text, TextField } from 'gestalt';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    };
  }
  handleChange = ({ event, value }) => {
    this.setState({ [event.target.name]: value });
  };
  render() {
    return (
      <Container>
        <Box
          marginTop={5}
          dangerouslySetInlineStyle={{
            __style: {
              backgroundColor: '#dcdcdc'
            }
          }}
          margin={4}
          padding={4}
          shape='rounded'
          display='flex'
          justifyContent='center'
        >
          {/* Sign Up Form  */}
          <form
            style={{
              display: 'inlineBlock',
              textAlign: 'center',
              maxWidth: 450
            }}
          >
            {/* Sign Up Form Heading */}
            <Box
              marginBottom={2}
              display='flex'
              direction='column'
              alignItems='center'
            >
              <Heading color='orange'>Let's Get Started</Heading>
              <Text italic color='gray'>
                Sign up to order some kicks
              </Text>
            </Box>
            {/* Username Input */}
            <TextField
              id='username'
              type='text'
              name='username'
              placeholder='Username'
              onChange={this.handleChange}
            />
            {/* Email Input */}
            <TextField
              id='email'
              type='email'
              name='email'
              placeholder='Email Address'
              onChange={this.handleChange}
            />
            {/* Password Input */}
            <TextField
              id='password'
              type='text'
              name='password'
              placeholder='Password'
              onChange={this.handleChange}
            />
            <Box marginTop={2}>
              <Button inline color='blue' text='Submit' type='submit' />
            </Box>
          </form>
        </Box>
      </Container>
    );
  }
}
