import React from 'react';
import './home.css';
import { useFetch } from '../hooks/useFetch';

const Home = () => {

const url = 'http://localhost:3001/products';

    const { data, loading, error } = useFetch(url);


    return (
        <div>
            <h2>products</h2>
            {error && <p>{error}</p>}
            {loading && <p>Loading...</p>}
            {data && data.map(product => (
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                </div>
            ))}



        </div>
    );
}

export default Home;    