import React from 'react';
import List from './List'; 
import '../styles.css';

function Board() {
    const boardTitle = 'Citizen helpdesk Ticket System'; 
    
    const lists = [
        // { title: 'To Do', tickets: ['Ticket 1', 'Ticket 2'] },
        // { title: 'In Progress', tickets: ['Ticket 3'] },
        { title: 'Ticket', tickets: ['Ticket 1', 'Ticket 2'] },
    ];

    


    return (
        <div className="board">
            <h1>{boardTitle}</h1>
            <div className="lists">
                {lists.map((list, index) => (
                    <List key={index} title={list.title} tickets={list.tickets} />
                ))}
            </div>
        </div>
    );
}

export default Board;
