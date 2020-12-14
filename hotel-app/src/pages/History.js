// import Axios from 'axios';
import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Title from '../components/Title';
import Hero from '../components/Hero';
import Banner from '../components/banner';

export default function History(props) {
    const reserve = props.historyInfo;
    if(reserve.length === 0) {
        return (
            <Hero>
            <Banner title="reservation">Your list is empty</Banner>
            </Hero>
        )
    }
    function Cancel(id) {
        props.onclickDelete(id);
    }
    return (
        <div>
            <Hero>
                <Title title="reservation"></Title>
            </Hero>
            <div className="history">
                <div className="history-table">
                    <tb className="history-info">
                        <tr>
                            <th>id_room</th>
                            <th>id_customer</th>
                            <th>name</th>
                            <th>date_begin</th>
                            <th>date_end</th>
                            <th>capacity</th>
                            <th>price</th>
                            <th>size</th>
                            <th>breakfast</th>
                            <th>pets</th>
                        </tr>
                        {reserve.map((item, index) => {
                            return <tr key={index}>
                                <td>{item.id_room}</td>
                                <td>{item.id_customer}</td>
                                <td>{item.name}</td>
                                <td>{item.date_begin.split("T")[0]}</td>
                                <td>{item.date_end.split("T")[0]}</td>
                                <td>{item.capacity}</td>
                                <td>{item.price}</td>
                                <td>{item.size}</td>
                                <td>{item.breakfast && "included"}</td>
                                <td>{item.pets ? "allowed" : "no allowed"}</td>
                                <button onClick={() => Cancel(item.id_room)} className="btn-delete">Cancle</button>
                            </tr>
                        })}
                    </tb>
                </div>
            </div>
        </div>
    )
}
