import React, { Component } from 'react'
import { GiAxeInLog } from 'react-icons/gi';
//import items from './data';
import axios from 'axios';

const RoomContext = React.createContext();
class RoomProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rooms: [],
            sortedRooms: [],
            featuredRooms: [],
            loading: true,
            type: 'all',
            capacity: 1,
            price: 0,
            minPrice: 0,
            maxPrice: 0,
            minSize: 0,
            maxSize: 0,
            specialMeal: false,
            acohol: false,
            items: []
        }
    }
    // getData
    componentDidMount() {
        axios.get('http://localhost:3000/room').then(
            res => {
                this.setState({ items: res.data })
            }
        ).then(
            res => {
                let rooms = this.formatData(this.state.items)
                let featuredRooms = rooms.filter(room => room.featured === true);
                let maxPrice = Math.max(...rooms.map(item =>
                    item.price));
                let maxSize = Math.max(...rooms.map(item => item.size));
                this.setState({
                    featuredRooms,
                    sortedRooms: rooms,
                    loading: false,
                    price: maxPrice,
                    maxPrice,
                    rooms,
                    maxSize
                });
            }
        )
        //this.getData
    }

    formatData(items) {

        let tempItems = items.map(item => {
            let images = item.images
            let room = { ...item, images };
            return room;
        });
        return tempItems;
    }
    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug);
        return room;
    };
    handleChange = event => {
        const target = event.target
        const value = event.type === 'checkbox' ? target.checked : target.value
        const name = event.target.name;
        this.setState({
            [name]: value
        }, this.filterRooms)
    };
    filterRooms = () => {
        let {
            rooms, type, capacity, price, minSize, maxSize, specialMeal, acohol
        } = this.state

        let tempRooms = [...rooms];
        capacity = parseInt(capacity)
        price = parseInt(price)
        //filter by type
        if (type !== 'all') {
            tempRooms = tempRooms.filter(room => room.type === type)
        }
        //filter by capacity
        if (capacity !== 1) {
            tempRooms = tempRooms.filter(room => room.capacity >=
                capacity)
        }
        //filter price range
        tempRooms = tempRooms.filter(room => room.price <= price);
        this.setState({
            sortedRooms: tempRooms
        })
    };

    render() {
        return (
            <RoomContext.Provider value={{
                ...this.state, getRoom: this.getRoom, handleChange: this.handleChange
            }}>
                {this.props.children}
            </RoomContext.Provider>
        );
    }
}

const RoomConsumer = RoomContext.Consumer;
export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return <RoomConsumer>
            {value => <Component {...props} context={value} />}
        </RoomConsumer>
    }
}

export { RoomProvider, RoomConsumer, RoomContext };



