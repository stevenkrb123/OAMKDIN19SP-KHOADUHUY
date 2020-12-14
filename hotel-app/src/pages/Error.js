import React from 'react'
import Hero from '../components/Hero';
import Banner from '../components/banner';
import { Link } from "react-router-dom";

export const Error = () => {
    return (
        <div>
            <Hero hero="defaultHero" >
                <Banner title="404" subtitle="Page not found">
                    <Link to='/' className="btn-primary">
                        Back to Homepage
                    </Link>
                </Banner>
            </Hero>
        </div>
    );
}

export default Error;
