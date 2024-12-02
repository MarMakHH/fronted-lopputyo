import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from "moment";
import { useEffect, useState } from "react";

export default function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: '',
        customer: ''
    });

    const [customers, setCustomers] = useState([{
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: '',
        _links: {
            self: {
                href: ''
            }
        }
    }]);

    const getCustomers = () => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers', { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setCustomers(data._embedded.customers)
            })
            .catch(error => {
                console.error(error);
            })
    }

    const handleInputChange = e => {
        setTraining({ ...training, [e.target.name]: e.target.value })
    }

    const handleSave = () => {
        console.log(training)
        const formatedStringDate = moment(training.date).toISOString();
        setTraining({ ...training, date: formatedStringDate })
        props.addTraining(training);
        setOpen(false);
        setTraining({
            date: '',
            duration: '',
            activity: '',
            customer: ''
        });
    }

    const handleOpen = () => {
        getCustomers();
        setOpen(true);
    }

    useEffect(() => getCustomers(), []);

    return (
        <>
            <Button onClick={() => handleOpen()}>Add Training</Button>
            <Dialog
                open={open}>
                <DialogTitle>New Training</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DateTimePicker
                            required
                            label='Date'
                            name="date"
                            value={moment(training.date)}
                            onChange={(newValue) => setTraining({ ...training, date: newValue })}
                        />
                    </LocalizationProvider>
                    <TextField
                        required
                        label='Duration'
                        variant="standard"
                        name="duration"
                        type="number"
                        value={training.duration}
                        onChange={handleInputChange}
                        margin="dense"
                        fullWidth
                    />
                    <TextField
                        required
                        label='Activity'
                        variant="standard"
                        name="activity"
                        value={training.activity}
                        onChange={handleInputChange}
                        margin="dense"
                        fullWidth
                    />
                    <Select
                        required
                        autoWidth
                        label="Customer"
                        name="customer"
                        value={training.customer}
                        onChange={handleInputChange}
                    >
                        {
                            customers.map(c => (
                                <MenuItem
                                    value={c._links.self.href}
                                    key={c._links.self.href}
                                >
                                    {c.firstname + " " + c.lastname}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleSave()}>Save</Button>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}