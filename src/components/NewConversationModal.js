import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

import { useContacts } from "../contexts/ContactsProvider";
import { useConversations } from "../contexts/ConversationsProvider";

export default function NewConversationModal({ closeModal }) {
    const [selectedContactIds, setSelectedContactIds] = useState([]);
    const { contacts } = useContacts();
    const { createConversation } = useConversations();

    function handleCheckBoxChange(contactId) {
        setSelectedContactIds(prevState => {
            if (prevState.includes(contactId)) {
                return prevState.filter(prevId => {
                    return contactId !== prevId;
                });
            } else {
                return [...prevState, contactId];
            }
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        createConversation(selectedContactIds);
        closeModal();
    }

    return (
        <>
            <Modal.Header closeButton>Create Conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts.map(contact => (
                        <Form.Group controlId={contact.id} key={contact.id}>
                            <Form.Check
                                type="checkbox"
                                value={selectedContactIds.includes(contact.id)}
                                label={contact.name}
                                onChange={() =>
                                    handleCheckBoxChange(contact.id)
                                }
                            />
                        </Form.Group>
                    ))}
                    <Button type="submit">Add Conversation</Button>
                </Form>
            </Modal.Body>
        </>
    );
}
