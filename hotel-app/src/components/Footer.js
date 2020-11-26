import React from 'react'
import { FaFacebookSquare,FaLinkedin } from 'react-icons/fa';
import {IoLogoYoutube} from 'react-icons/io';
import { AiFillInstagram } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <small>Copyright &copy; Din19sp group 5</small>
                <div>
                    <Link>
                        <FaFacebookSquare/></Link>
                    <Link>
                        <FaLinkedin/></Link>
                    <Link>
                        <AiFillInstagram/>
                    </Link>
                    <Link>
                        <IoLogoYoutube/>
                    </Link>
                </div>
        </footer>
    )
}
export default Footer