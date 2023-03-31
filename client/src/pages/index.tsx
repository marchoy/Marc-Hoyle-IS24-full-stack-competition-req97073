import { Box, Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Container } from '../components/Container'

const Index = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const data = await fetch('http://localhost:3000/api/products');
      const json = await data.json();
      setProducts(json);
      setLoading(false);
    }
    fetchData()
      .catch(console.error)
  }, []);
  
  return (
    <div>
      <Box padding={5}>
        <Button colorScheme='teal' mr={5}><Link href='/product/create'>Create New Product</Link></Button>
        <Button colorScheme='teal'><Link href='/product/search'>Search</Link></Button>
      </Box>
      <Container>
        {loading ? <Box padding={10}>Loading...</Box> : null}
        {products ? (
          <TableContainer>
            <Table variant="simple" size='sm'>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Product Name</Th>
                  <Th>Product Owner Name</Th>
                  <Th>Developers</Th>
                  <Th>Scrum Master Name</Th>
                  <Th>Start Date</Th>
                  <Th>Methodology</Th>
                </Tr>
              </Thead>
              <Tbody>
              {products.map(product =>
                <Tr key={product.productId}>
                  <Td>{product.productId}</Td>
                  <Td><Link href={`/product/${product.productId}`}><u>{product.productName}</u></Link></Td>
                  <Td>{product.productOwnerName}</Td>
                  <Td>{product.Developers.join(", ")}</Td>
                  <Td>{product.scrumMasterName}</Td>
                  <Td>{product.startDate}</Td>
                  <Td>{product.methodology}</Td>
                </Tr>
              )}
              </Tbody>
            </Table>
          </TableContainer>
        ) : null}
      </Container>
    </div>
)};

export default Index