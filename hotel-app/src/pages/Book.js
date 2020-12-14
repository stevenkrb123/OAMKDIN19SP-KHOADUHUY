import React, { Component } from 'react'
import { RoomContext } from '../context';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import defaultBcg from '../images/room-1.jpeg';
import axios from 'axios';


export default class Booknow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slug: this.props.match.params.slug,
            defaultBcg,
            startDate: new Date(),
            endDate: new Date(),
            id: null
        };
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
    }

    handleChangeStart(date) {
        this.setState({
            startDate: date
        });
    }
    handleChangeEnd(date) {
        this.setState({
            endDate: date
        });
    }
    calculateDaysLeft(startDate, endDate) {
        if (!moment.isMoment(startDate)) startDate = moment(startDate);
        if (!moment.isMoment(endDate)) endDate = moment(endDate);
        return endDate.diff(startDate, "days");
    }
    submit = event => {
        event.preventDefault();
        var start = new Date(this.state.startDate),
            month1 = '' + (start.getMonth() + 1),
            day1 = '' + (start.getDate() + 1),
            year1 = start.getFullYear();

        if (month1.length < 2)
            month1 = '0' + month1;
        if (day1.length < 2)
            day1 = '0' + day1;

        var start_day = [year1, month1, day1].join('-');

        var end = new Date(this.state.endDate),
            month2 = '' + (end.getMonth() + 1),
            day2 = '' + (end.getDate() + 1),
            year2 = end.getFullYear();

        if (month2.length < 2)
            month2 = '0' + month2;
        if (day2.length < 2)
            day2 = '0' + day2;

        var end_day = [year2, month2, day2].join('-');


        const { getRoom } = this.context;
        const room = getRoom(this.state.slug);
        const { id } = room;
        console.log(id);
        axios.post('http://localhost:3000/book', {
            id_room: id,
            id_customer: this.props.userInfo,
            date_begin: start_day,
            date_end: end_day,
        }).then(res => {
            alert("Success")
            this.props.getHistory()
        }).catch(err => {
            alert("Fail")
        })

    }
    static contextType = RoomContext;
    render() {
        if (this.props.isAuthenticated) {
            const { getRoom } = this.context;
            const room = getRoom(this.state.slug);
            const { startDate, endDate } = this.state;
            const daysLeft = this.calculateDaysLeft(startDate, endDate);
            if (!room) {
                return (<div className="container roomerror">
                    <div className="row my-5">
                        <div className="col-md-6 col-12 mx-auto">
                            <div className="card shadow-lg border-0 p-4 error">
                                <h1 className="text-center display-4">SORRY</h1>
                                <h3>No such room could be found...</h3>
                                <Link to="/rooms" className="btn btn-warning mt-4 ">Back to Rooms</Link>
                            </div>
                        </div>
                    </div>
                </div>);
            }
            const { name, capacity, size, price, breakfast, pets, images } = room;
            const [mainImg, ...defaultBcg] = images;
            return (
                <div>
                    <form onSubmit={this.submit}>
                        <section className="single-room">
                            <div className="single-room-images">
                                <img src={'http://localhost:3000/' + mainImg || defaultBcg} className="img-fluid" alt={name} />
                            </div>
                            <div className="single-room-info">
                                <article className="desc">
                                    <h3>Room details</h3>
                                </article>
                                <article className="info">
                                    <h3>info</h3>
                                    <h6>room type : {name}</h6>
                                    <h6>price : {price}Euro</h6>
                                    <h6>size : {size} Square meter</h6>
                                    <h6>
                                        Max people allowed : {
                                            capacity > 1 ? `${capacity} people` : `${capacity} person`
                                        }
                                    </h6>
                                    <h6>
                                        acohol:
                                    {pets ? " allowed" : "not allowed"}</h6>
                                    <h6>
                                        breakfast:
                                    {breakfast === true ? `Included` : `Not Included`}
                                    </h6>
                                </article>
                            </div>
                            <div className="single-room-info">
                                <div>
                                    <label htmlFor="Fromdate">From Date </label>
                                    <DatePicker selected={this.state.startDate} onChange={this.handleChangeStart} className="form-control" />
                                </div>
                                <div>
                                    <label htmlFor="Todate">To Date </label>
                                    <DatePicker selected={this.state.endDate} onChange={this.handleChangeEnd} className="form-control" />
                                </div>
                                <div>
                                    <h6>Number of days : {daysLeft}</h6>
                                    <h6>Price per day : <span> {price} Euro</span></h6>
                                    <h6>Total Price to be paid : <span>{daysLeft * price} Euro</span></h6>
                                </div>
                            </div>
                        </section>
                        <section className="room-extras">
                            <div className="single-room-info">
                                <div>
                                    <label htmlFor="payment">-Payment Options</label>
                                    <select>
                                        <option disabled>Select payment option</option>
                                        <option value="Credit">Credit Card</option>
                                        <option value="Debit">Debit Card</option>
                                        <option value="checkin">Pay during Checkin</option>
                                    </select>
                                </div>
                            </div>
                            <button className="btn-book">Confirm Booking</button>
                        </section>
                    </form>
                </div>
            )
        } else {
            alert('Login First')
            return (
                <React.Fragment><Redirect to='/login' /></React.Fragment>
            )
        }
    }
}