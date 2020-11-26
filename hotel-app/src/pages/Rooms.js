import React from 'react'
import Hero from '../components/Hero';
import Banner from '../components/banner';
import { Link } from "react-router-dom";
import RoomContainer from '../components/RoomContainer';

export const Rooms = () => {
    return (
    <div>
    <Hero hero="roomsHero">
        <Banner title="Available rooms">
        <Link to='/' className="btn-primary">
            Back to Homepage
        </Link>
    </Banner>
    </Hero>
    <RoomContainer />
    </div>
    );
};

export default Rooms;