import React, { Component } from 'react'
import defaultBcg from '../images/room-1.jpeg';
import Banner from '../components/banner';
import {Link} from 'react-router-dom';
import {RoomContext} from '../context';
import StyledHero from '../components/StyledHero';

export default class SingleRoom extends Component {
    constructor(props){
        super(props)
        //console.log(this.props)
        this.state ={
            slug:this.props.match.params.slug,
            defaultBcg
        };
    }
    static contextType = RoomContext;
    //componentDidMount(){}
    render() {
        const {getRoom} = this.context;
        const room = getRoom(this.state.slug);
        if(!room){
            return ( 
                <div className="error">
                <h3>no such room could be found</h3>
                <Link to='/room' className="btn-primary">
                    Back to room
                </Link>
                </div>
            )
        }
        const{name,description,capacity,size,price,extras,breakfast,pets,images} = room;
        const [mainImg,...defaultImg] = images;

        return (
            <div>
                <div>
                    <StyledHero img={mainImg|| this.state.defaultBcg}>
                    <Banner title={`${name} room`}>
                        <Link to='/rooms' className='btn-primary'>
                            back to rooms!!
                        </Link>
                    </Banner>
                    </StyledHero>
                    <section className="single-room">
                        <div className="single-room-images">
                            {defaultImg.map((item,index)=>{
                                console.log(item)
                                return <img key={index} src={'http://localhost:3000/' + item} alt={name}/>;
                            })}
                        </div>
                        <div className="single-room-info">
                            <article className="desc">
                                <h3>Room details</h3>
                                <p>{description}</p>
                            </article>
                            <article className="info">
                                <h3>info</h3>
                                <h6>price : {price}Euro</h6>
                                <h6>size : {size} Square meter</h6>
                                <h6>
                                    Max people allowed : {
                                        capacity > 1 ? `${capacity} people` : `${capacity} person`
                                    }
                                </h6>
                                <h6>{pets?"Acohol allowed":"no acohol allowed"}</h6>
                                <h6>
                                    {breakfast && "You can choose between free breakfast or a movie ticket"}
                                </h6>
                            </article>
                        </div>
                    </section>
                    <section className="room-extras">
                        <h6>Special Services</h6>
                        <ul className="extras">
                            {extras.map((item,index)=>{
                                return <li key={index}>-{item}</li>;
                            })}
                        </ul>
                        <div className="p-4 clearfix">
                            <div className="row">
                            <div className="col-md-3 col-12 ml-auto">
                                <Link to={`/booknow/${this.state.slug}`} className="btn-book">Book Now</Link>
                            </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}



