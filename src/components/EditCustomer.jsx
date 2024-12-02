import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

export default function EditCustomer(props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    const handleInputChange = e => {
        setCustomer({ ...customer, [e.target.name]: e.target.value })
    }

    const handleSave = () => {
        props.updateCustomer(customer, props.params);
        setOpen(false);
        setCustomer({
            firstname: '',
            lastname: '',
            streetaddress: '',
            postcode: '',
            city: '',
            email: '',
            phone: ''
        });
    }

    const handleClickOpen = () => {
        //console.log(props.params.data);
        setCustomer({
            firstname: props.params.data.firstname,
            lastname: props.params.data.lastname,
            streetaddress: props.params.data.streetaddress,
            postcode: props.params.data.postcode,
            city: props.params.data.city,
            email: props.params.data.email,
            phone: props.params.data.phone
        })
        setOpen(true);

    }

    return (
        <>
            <Button size="small" color="info" onClick={() => handleClickOpen()}>Edit</Button>
            <Dialog
                open={open}>
                <DialogTitle>Edit Customer</DialogTitle>
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