import { Button, Container, FormLabel, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

const CreateProduct = ({}) => {
    const [product, setProduct] = useState({
        productName: '',
        productOwnerName: '',
        Developers: [],
        scrumMasterName: '',
        startDate: '',
        methodology: '',
    });
    const [error, setError] = useState(false);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        if (!product.productName || !product.productOwnerName || !product.Developers || !product.scrumMasterName || !product.startDate || !product.methodology) {
            setError(true);
            return;
        }
        setLoading(true);
        const fetchData = async () => {
            await fetch(`http://localhost:3000/api/product/`, {
                method: 'POST',
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
            <FormLabel>Product Name</FormLabel>
            <Input
                type='text'
                value={product.productName}
                onChange={(e) => setProduct({...product, productName: e.target.value })}
            />
            <FormLabel>Product Owner Name</FormLabel>
            <Input
                type='text'
                value={product.productOwnerName}
                onChange={(e) => setProduct({...product, productOwnerName: e.target.value })}
            />
            <FormLabel>Developers</FormLabel>
            <Input
                type='text'
                value={product.Developers}
                onChange={(e) => setProduct({...product, Developers: e.target.value.split(',') })}
            />
            <FormLabel>Scrum Master Name</FormLabel>
            <Input
                type='text'
                value={product.scrumMasterName}
                onChange={(e) => setProduct({...product, scrumMasterName: e.target.value })}
            />
            <FormLabel>Start Date</FormLabel>
            <Input
                type='text'
                value={product.startDate}
                onChange={(e) => setProduct({...product, startDate: e.target.value })}
            />
            <FormLabel>Methodology</FormLabel>
            <Input
                type='text'
                value={product.methodology}
                onChange={(e) => setProduct({...product, methodology: e.target.value })}
            />
            <Button
                mt={4}
                colorScheme='teal'
                onClick={handleSubmit}
                isLoading={loading}
            >
                Create Product
            </Button>
            {error ? <div>All fields are required.</div> : null}
        </Container>
    );
};

export default CreateProduct;