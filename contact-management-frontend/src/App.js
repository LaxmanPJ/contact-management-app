import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
import { Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function App() {
    const [contacts, setContacts] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '', company: '', jobTitle: ''
    });
    const [editing, setEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        const response = await axios.get('http://localhost:5000/contacts');
        setContacts(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editing) {
            await axios.put(`http://localhost:5000/contacts/${editId}`, formData);
            setEditing(false);
        } else {
            await axios.post('http://localhost:5000/contacts', formData);
        }
        setFormData({ firstName: '', lastName: '', email: '', phone: '', company: '', jobTitle: '' });
        fetchContacts();
    };

    const handleEdit = (contact) => {
        setFormData(contact);
        setEditing(true);
        setEditId(contact.id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/contacts/${id}`);
        fetchContacts();
    };

    return (
        <Container>
            <h1>Contact Management</h1>
            <form onSubmit={handleSubmit}>
                <TextField label="First Name" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} required />
                <TextField label="Last Name" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} required />
                <TextField label="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                <TextField label="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
                <TextField label="Company" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
                <TextField label="Job Title" value={formData.jobTitle} onChange={(e) => setFormData({...formData, jobTitle: e.target.value})} />
                <Button type="submit" variant="contained" color="primary">
                    {editing ? 'Update Contact' : 'Add Contact'}
                </Button>
            </form>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Job Title</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contacts.map((contact) => (
                            <TableRow key={contact.id}>
                                <TableCell>{contact.firstName}</TableCell>
                                <TableCell>{contact.lastName}</TableCell>
                                <TableCell>{contact.email}</TableCell>
                                <TableCell>{contact.phone}</TableCell>
                                <TableCell>{contact.company}</TableCell>
                                <TableCell>{contact.jobTitle}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEdit(contact)}>Edit</Button>
                                    <Button onClick={() => handleDelete(contact.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default App;