import { useEffect, useReducer, useState } from "react"
// import { Link } from "react-router-dom"
import axios from 'axios';
import logger from 'use-reducer-logger';
import { Row, Col } from "react-bootstrap";
import { Product } from "../components/Product";
import { Helmet } from "react-helmet-async";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export const HomeScreen = () => {
    const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
        products: [],
        loading: true,
        error: ''
    })
    // const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });

            try {
                const { data } = await axios.get('/api/products');
                dispatch({ type: 'FETCH_SUCCESS', payload: data });

            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error.message })
            }
            // setProducts(data);
        };
        fetchData();
    }, [])
    return (
        <div>
            <Helmet>
                <title>Mern Site</title>
            </Helmet>
            <h1>Featured</h1>
            <div className="products">
                {loading ? (<div>Loading ...</div>) :
                    error ? (<div>{error}</div>) :
                        (
                            <Row>
                                {
                                    products.map(product => (
                                        <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                                            <Product product={product}></Product>
                                        </Col>
                                    ))}
                            </Row>
                        )
                }
            </div>
        </div>
    )
}
