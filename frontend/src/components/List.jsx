import React from 'react';
import { useState } from 'react';
import Ticket from './Ticket'; 
import '../styles.css';

const List = ({ title, tickets }) => {

    const [ticketList, setTicketList] = useState([]);
    const data=JSON.parse(localStorage.getItem('userInfo'))
    ticketList.concat(data)
    console.log("initial ticket list", ticketList)
    
    const addInfo = (info) => {
    const newTicketList = [...ticketList, info];
    setTicketList(newTicketList);
    console.log("new ticket list", newTicketList);
    // localStorage.setItem('userInfo', JSON.stringify(newTicketList));
  };
    return (
        <div className="list">
            <h2>{title}</h2>
            <div className="tickets">
                {tickets.map((ticket, index) => (
                    <Ticket
                    key={index}
                    ticketTitle={ticket}
                    addInfo={addInfo} 
                    />
                ))}
            </div>
        </div>
    );
}

export default List;
