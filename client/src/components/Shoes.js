import React, { Component } from 'react';
import Strapi from 'strapi-sdk-javascript/build/main';
import {
  Box,
  Heading,
  Button,
  Text,
  Card,
  Image,
  Container,
  Mask
} from 'gestalt';
import Loader from './Loader';
import { Link } from 'react-router-dom';
const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);
export default class shoes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoes: [],
      brand: '',
      loadingshoes: true,
      cartItems: []
    };
  }
  async componentDidMount() {
    try {
      const { data } = await strapi.request('POST', '/graphql', {
        data: {
          query: `query{
            brand(id: "${this.props.match.params.brandId}"){
             _id
             name
             shoes{
               _id
               name
               description
               image{
                 url
               }
               price
               
             }
           }
         }`
        }
      });
      this.setState({ shoes: data.brand.shoes, brand: data.brand.name });
    } catch (err) {
      console.error(err);
    }
    this.setState({ loadingshoes: false });
  }

  render() {
    const { brand, shoes, loadingshoes, cartItems } = this.state;
    return (
      <Container>
        <Box
          marginTop={4}
          display='flex'
          justifyContent='center'
          alignItems='start'
          dangerouslySetInlineStyle={{
            __style: {
              flexWrap: 'wrap-reverse'
            }
          }}
        >
          {/* shoes Section */}
          <Box display='flex' direction='column' alignItems='center'>
            {/* shoes Heading */}
            <Box margin={2}>
              <Heading color='orchid'>{brand}</Heading>
            </Box>
            {/* shoes */}
            <Box
              dangerouslySetInlineStyle={{
                __style: {
                  backgroundColor: '#bdcdd9'
                }
              }}
              shape='rounded'
              display='flex'
              wrap
              justifyContent='center'
              padding={4}
            >
              {shoes.map(shoe => (
                <Box paddingY={4} margin={2} width={210} key={shoe._id}>
                  <Card
                    image={
                      <Box height={250} width={200}>
                        <Image
                          fit='cover'
                          alt='Brand'
                          naturalHeight={1}
                          naturalWidth={1}
                          src={`${apiUrl}${shoe.image.url}`}
                        />
                      </Box>
                    }
                  >
                    <Box
                      display='flex'
                      alignItems='center'
                      justifyContent='center'
                      direction='column'
                    >
                      <Box marginBottom={2}>
                        <Text size='xl'>{shoe.name}</Text>
                      </Box>
                      <Text size='xl'>{shoe.description}</Text>
                      <Text color='orchid'>${shoe.price}</Text>
                      <Box marginTop={2}>
                        <Text size='xl'>
                          <Button color='blue' text='Add to Cart' />
                        </Text>
                      </Box>
                    </Box>
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>
          {/* User Cart */}
          <Box alignSelf='end' marginTop={2} marginLeft={8}>
            <Mask shape='rounded' wash>
              <Box
                display='flex'
                direction='column'
                alignItems='center'
                padding={2}
              >
                {/* User Cart Heading */}
                <Heading align='center' size='md'>
                  Your Cart
                </Heading>
                <Text color='gray' italic>
                  {cartItems.length} items selected
                </Text>

                {/* Cart Items */}

                <Box
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  direction='column'
                >
                  <Box margin={2}>
                    {cartItems.length === 0 && (
                      <Text color='red'>Please selected some items</Text>
                    )}
                  </Box>
                  <Text size='lg'>Total: $4.99</Text>
                  <Text>
                    <Link to='/checkout'>Checkout</Link>
                  </Text>
                </Box>
              </Box>
            </Mask>
          </Box>
        </Box>
        <Loader show={loadingshoes} />
      </Container>
    );
  }
}
