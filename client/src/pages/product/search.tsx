import { Box, Button, FormLabel, Input, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import { Container } from '../../components/Container'

const Index = () => {
    const [filteredProducts, setFilteredProducts] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleClick = (searchField) => {
        setError('');
        setLoading(true);
        setFilteredProducts(null);
        const fetchData = async () => {
            const data = await fetch(`http://localhost:3000/api/search?${searchField}=${searchValue}`);
            if (!data.ok) {
                const errorMessage = await data.text();
                throw new Error(errorMessage);
            }
            const json = await data.json();
            setFilteredProducts(json);
            setLoading(false);
        };
        fetchData().catch((err) => {
            console.error('Error fetching data: ', err);
            setLoading(false);
            setError(err.message);
        });
    };
    
    return (
        <div>
            <Box padding={5}>
                <Box pr={10}>
                    <FormLabel>Search</FormLabel>
                    <Input
                        type='text'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        width={500}
                        pr={10}
                    ></Input>
                </Box>
                <Button
                    mt={4}
                    colorScheme='teal'
                    onClick={() => handleClick("scrumMasterName")}
                    isLoading={loading}
                    disabled={loading}
                    mr={10}
                >
                    Search by Scrum Master Name
                </Button>
                <Button
                    mt={4}
                    colorScheme='teal'
                    onClick={() => handleClick("Developers")}
                    isLoading={loading}
                    disabled={loading}
                >
                    Search by Developer
                </Button>
            </Box>
            <Container>
                {loading ? <Box padding={10}>Loading...</Box> : null}
                {error ? <Box padding={10}>{error}</Box> : null}
                {filteredProducts ? (
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
                        {filteredProducts.map(product =>
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
    );
};

export default Index