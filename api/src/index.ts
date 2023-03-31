import express from 'express';
import { products } from './sampleData';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/products', (_, res) => {
    res.send(products);
});

app.get('/api/product/:id', (req, res) => {
    const product = products.find(p => p.productId === parseInt(req.params.id));
    if (!product) {
        return res.status(404).send('The product with the given ID was not found.');
    }
    return res.send(product);
});

app.post('/api/product', (req, res) => {
    const product: any = {
        productId: products.length + 1,
        productName: req.body.productName,
        productOwnerName: req.body.productOwnerName,
        Developers: req.body.Developers,
        scrumMasterName: req.body.scrumMasterName,
        startDate: req.body.startDate,
        methodology: req.body.methodology
    };
    products.push(product);
    return res.send(product);
});

app.put('/api/product/:id', (req, res) => {
    const product: any = products.find(p => p.productId === parseInt(req.params.id));
    if (!product) {
        return res.status(404).send('The product with the given ID was not found.');
    }

    product.productName = req.body.productName;
    product.productOwnerName = req.body.productOwnerName;
    product.Developers = req.body.Developers;
    product.scrumMasterName = req.body.scrumMasterName;
    product.startDate = req.body.startDate;
    product.methodology = req.body.methodology;
    
    return res.send(product);
});

app.delete('/api/product/:id', (req, res) => {
    const product = products.find(p => p.productId === parseInt(req.params.id));
    if (!product) {
        return res.status(404).send('The product with the given ID was not found.');
    }
    const index = products.indexOf(product);
    products.splice(index, 1);
    return res.send(product);
});

app.get('/api/search', (req, res) => {
    const query = req.query;

    if (Object.keys(query)[0] === "scrumMasterName") {
        const filteredProducts = products.filter(product => {
            return product.scrumMasterName === query["scrumMasterName"];
        });
        if(filteredProducts.length === 0) {
            return res.status(404).send('No matching results found.');
        }
        return res.send(filteredProducts);
    }
    if (Object.keys(query)[0] === "Developers") {
        const filteredProducts = products.filter(product => {
            return product.Developers.includes(query["Developers"] as string);
        });
        if(filteredProducts.length === 0) {
            return res.status(404).send('No matching results found.');
        }
        return res.send(filteredProducts);
    }
    
    return res.status(404).send('Key not searchable.');
});

app.get('/api/health', (_, res) => {
    res.status(200).send('API is healthy');
});

app.listen(3000, () => {
    console.log('server started on localhost:3000')
});