import React, { useState } from 'react';

const Ticket = ({ ticketTitle, addInfo }) => {
    const [isTicketOpen, setTicketOpen] = useState(false);
    const [isEditing, setEditing] = useState(false); // Manage edit mode
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [issues, setIssues] = useState('');
    const [ticketContent, setTicketContent] = useState('');
   
    

    
    const openTicket = () => {
        setTicketOpen(true);
       
    };

    const closeTicket = () => {
        setTicketOpen(false);
        setEditing(false); 
    };

    const handleEdit = () => {
        setEditing(true);
       
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const info = {
            name: name,
            phoneNumber: phoneNumber,
            issues:issues
        };
        localStorage.setItem('userInfo', JSON.stringify(info));
        addInfo(info);
        setTicketContent(info)
        console.log("info in Ticket.jsx", info)
        setEditing(false); 
    };

    
    return (
        <div className="tickets">
            {!isTicketOpen && (
                <button onClick={openTicket}>{ticketTitle}</button>
            )}
            
            {isTicketOpen && (
                <div className="ticket">
                    <div className="ticket-content">
                        <button onClick={closeTicket}>Close</button>
                        <h3>{ticketTitle}</h3>
                        
                        {ticketContent && !isEditing ? ( // Content and the edit is shown 
                            <div>
                                <p>Customer name: {ticketContent.name}</p>
                                <p>Phone number: {ticketContent.phoneNumber}</p>
                                <p>Issues: {ticketContent.issues}</p>
                                <button onClick={handleEdit}>Edit</button>
                            </div>
                        ) : ( // The form is shown if there is no content or in edit mode
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Issues"
                                    value={issues}
                                    onChange={(e) => setIssues(e.target.value)}
                                />
                                <button type="submit">Save</button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Ticket;


