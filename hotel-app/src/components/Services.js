import React, { Component } from 'react'
import {GiBoatFishing,GiSnowman,GiCarWheel,GiBeerStein} from 'react-icons/gi';
import Title from './Title'

export default class Services extends Component {
    constructor(props) {
        super(props)
        this.state = {
            services: [
                {
                    icon:<GiBoatFishing/>,
                    
                    title:"free fishing",
                    info: 'Go get some salmons for your dinner, it will be a fascinating experience in Oulu '
    
                },
                {
                    icon:<GiSnowman/>,
                    title:"Winter activities",
                    info: 'Let go snowboarding, making snow man , snow hiking with reasonable price!! '
    
                },
                {
                    icon:<GiCarWheel/>,
                    title:"free sleigh",
                    info: 'enjoy dogs sleigh!! '
    
                },
                {
                    icon:<GiBeerStein/>,
                    title:"Nordic Beer",
                    info: 'Nice time to enjoy Nordic beer , Karhu, Koff!! '
                }
            ]
        }
    }
    render() {
        return (
            <section className="services">
                <Title title="Oulu Hotel offer" />
                <div className="services-center">
                    {this.state.services.map((item,index) =>{
                        return <article key={index} className="services">
                            <span>{item.icon}</span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                        </article>
                    })}
                </div>
            </section>
        );
    }
}
