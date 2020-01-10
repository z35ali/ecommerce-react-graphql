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
        color='midnight'
        padding={1}
        shape='roundedBottom'
      >
        {/* Sign in link */}
        <NavLink to='/signin'>
          <Text size='x1' color='white'>
            Sign In
          </Text>
        </NavLink>

        {/* Title and Logo */}
        <NavLink to='/'>
          <Box display='flex' alignItems='center'>
            <Box height={50} width={50} margin={2}>
              <Image
                src='./icons/logo.svg'
                alt='Logo'
                naturalHeight={1}
                naturalWidth={1}
              />
            </Box>
            <Heading size='xs' color='orange'>
              {'E - Drinks'}
            </Heading>
          </Box>
        </NavLink>

        {/* Sign up link */}
        <NavLink to='/signup'>
          <Text size='x1' color='white'>
            Sign Up
          </Text>
        </NavLink>
      </Box>
    );
  }
}
