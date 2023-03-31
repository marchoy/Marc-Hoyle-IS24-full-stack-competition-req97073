import { Button, Container, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Product = () => {
    const [product, setProduct] = useState(null);
    const router = useRouter();
    const { id } = router.query;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (router.isReady) {
            const fetchData = async () => {
                const data = await fetch(`http://localhost:3000/api/product/${id}`);
                const json = await data.json();
                setProduct(json);
            }
            fetchData()
                .catch(console.error)
        }
    }, [router.isReady]);

    const handleSubmit = () => {
        setLoading(true);
        const fetchData = async () => {
            await fetch(`http://localhost:3000/api/product/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productName: product.productName,
                    productOwnerName: product.productOwnerName,
                    Developers: product.Developers,
                    scrumMasterName: product.scrumMasterName,
                    startDate: product.startDate,
                    methodology: product.methodology,
                }),
            });
            setLoading(false);
            router.push('/');
        };
        fetchData()
            .catch(console.error)
    };
        
    return (
        <Container paddingTop={10}>
            {product ? (
                <>
                    <FormLabel>Product Name</FormLabel>
                    <Input
                        type='text'
                        value={product.productName}
                        onChange={event => setProduct({ ...product, productName: event.target.value })}
                    />
                    <FormLabel>Product Owner Name</FormLabel>
                    <Input
                        type='text'
                        value={product.productOwnerName}
                        onChange={event => setProduct({ ...product, productOwnerName: event.target.value })}
                    />
                    <FormLabel>Developers</FormLabel>
                    <Input
                        type='text'
                        value={product.Developers}
                        onChange={(e) => setProduct({ ...product, Developers: e.target.value })}
                    />
                    <FormLabel>Scrum Master Name</FormLabel>
                    <Input
                        type='text'
                        value={product.scrumMasterName}
                        onChange={(e) => setProduct({ ...product, scrumMasterName: e.target.value })}
                    />
                    <FormLabel>Start Date</FormLabel>
                    <Input
                        type='text'
                        value={product.startDate}
                        onChange={(e) => setProduct({ ...product, startDate: e.target.value })}
                    />
                    <FormLabel>Methodology</FormLabel>
                    <Input
                        type='text'
                        value={product.methodology}
                        onChange={(e) => setProduct({ ...product, methodology: e.target.value })}
                    />
                    <Button
                        mt={4}
                        colorScheme='teal'
                        onClick={handleSubmit}
                        isLoading={loading}
                    >
                        Update Product
                    </Button>
                </>
            ) : null}
        </Container>
    );
};

export default Product;
