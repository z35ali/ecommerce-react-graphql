import React, { Component } from 'react';
import './App.css';
import { Container, Box, Heading, Card, Image, Text } from 'gestalt';
import Strapi from 'strapi-sdk-javascript/build/main';
import { Link } from 'react-router-dom';
const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: []
    };
  }
  async componentDidMount() {
    try {
      const { data } = await strapi.request('POST', '/graphql', {
        data: {
          query: `
    query{
      brands{
      _id, 
        name,
        description,
        image {
          url
        }
      }
    }`
        }
      });
      this.setState({
        brands: data.brands
      });
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    const { brands } = this.state;
    return (
      <Container>
        {/* Brands Section */}
        <Box display='flex' justifyContent='center' marginBottom={2}>
          {/* Brands Header */}
          <Heading color='midnight' size='md'>
            Brew Brands
          </Heading>
        </Box>
        {/* Brands */}
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              backgroundColor: '#d6c8ec'
            }
          }}
          shape='rounded'
          wrap
          display='flex'
          justifyContent='around'
        >
          {brands.map(brand => (
            <Box paddingY={4} margin={2} width={200} key={brand._id}>
              <Card
                image={
                  <Box height={200} width={200}>
                    <Image
                      fit='cover'
                      alt='Brand'
                      naturalHeight={1}
                      naturalWidth={1}
                      src={`${apiUrl}${brand.image.url}`}
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
                  <Text size='xl'>{brand.name}</Text>
                  <Text size='xl'>{brand.description}</Text>
                  <Text size='xl'>
                    <Link to={`/${brand._id}`}>See Brews</Link>
                  </Text>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    );
  }
}

export default App;
