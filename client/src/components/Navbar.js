import React, { Component } from 'react';
import { Box, Text, Heading, Image } from 'gestalt';
import { NavLink } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <Box
        display='flex'
        alignItems='center'
        justifyContent='around'
        height={70}
        color='white'
        padding={1}
        shape='roundedBottom'
      >
        {/* Sign in link */}
        <NavLink activeClassName='active' to='/signin'>
          <Text size='xl'>Sign In</Text>
        </NavLink>

        {/* Title and Logo */}
        <NavLink activeClassName='active' exact to='/'>
          <Box display='flex' alignItems='center'>
            <Box height={50} width={50} margin={2}>
              <Image
                src='./icons/logo.jpg'
                alt='Logo'
                naturalHeight={1}
                naturalWidth={1}
              />
            </Box>
            <Heading size='xs' color='orange'>
              {'Shoe Shop'}
            </Heading>
          </Box>
        </NavLink>

        {/* Sign up link */}
        <NavLink activeClassName='active' to='/signup'>
          <Text size='xl'>Sign Up</Text>
        </NavLink>
      </Box>
    );
  }
}
