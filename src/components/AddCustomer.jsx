import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

export default function AddCustomer(props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: ""
    });

    const handleInputChange = e => {
        setCustomer({ ...customer, [e.target.name]: e.target.value })
    }

    const handleSave = () => {
        props.addCustomer(customer);
        setOpen(false);
        setCustomer({
            firstname: "",
            lastname: "",
            streetaddress: "",
            postcode: "",
            city: "",
            email: "",
            phone: ""
        });
    }

    return (
        <>
            <Button onClick={() => setOpen(true)}>Add Customer</Button>
            <Dialog
                open={open}>
                <DialogTitle>New Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        label='Firstname'
                        variant="standard"
                        name="firstname"
                        value={customer.firstname}
                        onChange={handleInputChange}
                        margin="dense"
                        fullWidth
                    />
                    <TextField
                        required
                        label='Lastname'
                        variant="standard"
                        name="lastname"
                        value={customer.lastname}
                        onChange={handleInputChange}
                        margin="dense"
                        fullWidth
                    />
                    <TextField
                        required
                        label='Streetaddress'
                        variant="standard"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={handleInputChange}
                        margin="dense"
                        fullWidth
                    />
                    <TextField
                        required
                        label='Postcode'
                        variant="standard"
                        name="postcode"
                        value={customer.postcode}
                        onChange={handleInputChange}
                        margin="dense"
                        fullWidth
                    />
                    <TextField
                        required
                        label='City'
                        variant="standard"
                        name="city"
                        value={customer.city}
                        onChange={handleInputChange}
                        margin="dense"
                        fullWidth
                    />
                    <TextField
                        required
                        label='Email'
                        variant="standard"
                        name="email"
                        type="email"
                        value={customer.email}
                        onChange={handleInputChange}
                        margin="dense"
                        fullWidth
                    />
                    <TextField
                        required
                        label='Phone'
                        variant="standard"
                        name="phone"
                        value={customer.phone}
                        onChange={handleInputChange}
                        margin="dense"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleSave()}>Save</Button>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}