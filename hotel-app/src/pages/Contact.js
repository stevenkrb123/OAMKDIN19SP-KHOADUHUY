import React from 'react'
import Hero from '../components/Hero';
import Banner from '../components/banner';
import ContactUs from '../components/ContactForm';
import {Link} from "react-router-dom";

export const Contact = () => {
    return (
        <div>
            <Hero hero="defaultHero ">
                <Banner title="Our Contact" subtitle="Please fill in the form bellow!!">
                    <Link to='/' className='btn-primary'> Back to Homepage</Link>
                </Banner>
            </Hero>
            <ContactUs />
        </div>
    )
}

export default Contact;