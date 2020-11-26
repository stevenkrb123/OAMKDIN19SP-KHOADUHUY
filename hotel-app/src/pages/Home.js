import React from 'react'
import Hero from '../components/Hero';
import Banner from '../components/banner';
import { Link } from "react-router-dom";
import Services from '../components/Services';
import FeaturedRooms from '../components/FearturedRooms'

export const Home = () => {
    return <div>
    <Hero hero="defaultHero">
    <Banner title="Öulu King room" subtitle="Special offer only from 300eu">
        <Link to='/Rooms' className="btn-primary">
            Check it out
        </Link>
    </Banner>
    </Hero>
    <Services />
    <FeaturedRooms />
    </div>
}

export default Home;