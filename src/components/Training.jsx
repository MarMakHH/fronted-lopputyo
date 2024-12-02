import { useEffect, useState } from "react"
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import moment from "moment";
import { Button, Snackbar } from "@mui/material";
import AddTraining from "./AddTraining";

export default function Training() {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msg, setMsg] = useState("");
    const [trainings, setTrainings] = useState([{
        date: '',
        duration: '',
        activity: '',
        customer: {
            firstname: '',
            lastname: '',
            streetaddress: '',
            postcode: '',
            city: '',
            email: '',
            phone: ''
        }
    }]);

    const dateFormatter = (params) => {
        return moment(params.value).format('MM.DD.YYYY HH:mm');
    };
    const [colDefs, setColDefs] = useState([
        { field: 'date', filter: true, floatingFilter: true, valueFormatter: dateFormatter },
        { field: 'duration', filter: true, floatingFilter: true },
        { field: 'activity', filter: true, floatingFilter: true },
        { field: 'customer.firstname', filter: true, floatingFilter: true },
        { field: 'customer.lastname', filter: true, floatingFilter: true },
        {
            cellRenderer: (params) =>
                <Button size="small" color="error" onClick={() => deleteTraining(params)}>Delete</Button>, width: 120

        }
    ]);

    const addTraining = (training) => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(training)
        })
            .then(response => {
                //console.log("response: ", response);
                if (response.ok) {
                    setMsg("Add new training SUCCEED");
                    setOpenSnackbar(true);
                    getCustomers();
                } else {
                    setMsg("Add new training FAILED!");
                    setOpenSnackbar(true);
                }
                return response.json();
            })
            .catch(err => {
                console.error(err.data);
            });

    }


    const getTrainings = () => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings', { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setTrainings(data);
            })
            .catch(error => {
                console.error(error);
            })
    };

    const deleteTraining = (params) => {
        if (confirm("Are you sure you want to DELETE this item?") == true) {
            const url = "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/" + params.data.id;
            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setMsg("Delete succeed");
                        setOpenSnackbar(true);
                        getTrainings();
                    } else {
                        setMsg("Delete failed");
                        setOpenSnackbar(true);
                    }
                    return response.json();
                })
                .catch(err => {
                    console.error(err.data);
                });

        }
    }

    useEffect(() => getTrainings(), []);

    return (
        <>
            <AddTraining addTraining={addTraining}/>
            <div
                className="ag-theme-quartz"
                style={{ width: 900, height: 500 }}
            >
                <AgGridReact
                    rowData={trainings}
                    columnDefs={colDefs}
                />
            </div>
            <Snackbar
                open={openSnackbar}
                message={msg}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
            />
        </>
    )
}