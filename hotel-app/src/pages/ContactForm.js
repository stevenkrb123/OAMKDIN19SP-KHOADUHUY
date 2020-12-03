import React from 'react';
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
init("user_sTJvxVV9GDLyFCFAu0CzG");

export default function ContactUs() {
    function sendEmail(e) {
        e.preventDefault();
        emailjs.sendForm('Gmail', 'template_mjqepfn', e.target, 'user_sTJvxVV9GDLyFCFAu0CzG')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset()
    }
    return (
        <div className="contact">
            <div className="contact-info">
                <form onSubmit={sendEmail}>
                    <div>
                        <div>
                            <input type="text" placeholder="Name" name="name"/>
                        </div>
                        <div>
                            <input type="email" placeholder="Email Address" name="email"/>
                        </div>
                        <div>
                            <input type="text" placeholder="Subject" name="subject"/>
                        </div>
                        <div>
                            <textarea id="" cols="30" rows="8" placeholder="Your message" name="message"></textarea>
                        </div>
                        <div className="col-8 pt-3 mx-auto">
                            <input type="submit" className="btn-primary" value="Send Message"></input>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}