import { useCallback, useEffect, useRef, useState } from "react"
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { Button, Snackbar } from "@mui/material";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";

export default function Customer() {
    const gridRef = useRef();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msg, setMsg] = useState("");
    const [customers, setCustomers] = useState([{
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: ""
    }]);

    const [colDefs, setColDefs] = useState([
        { field: "firstname", filter: true, floatingFilter: true },
        { field: "lastname", filter: true, floatingFilter: true },
        { field: "streetaddress", filter: true, floatingFilter: true },
        { field: "postcode", filter: true, floatingFilter: true },
        { field: "city", filter: true, floatingFilter: true },
        { field: "email", filter: true, floatingFilter: true },
        { field: "phone", filter: true, floatingFilter: true },
        {
            cellRenderer: (params) =>
                <EditCustomer params={params} updateCustomer={updateCustomer} />, width: 120
        },
        {
            cellRenderer: (params) =>
                <Button size="small" color="error" onClick={() => deleteCustomer(params)}>Delete</Button>, width: 120

        }
    ]);

    const addCustomer = (customer) => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer)
        })
            .then(response => {
                //console.log("response: ", response);
                if (response.ok) {
                    setMsg("Add new customer SUCCEED");
                    setOpenSnackbar(true);
                    getCustomers();
                } else {
                    setMsg("Add new customer FAILED!");
                    setOpenSnackbar(true);
                }
                return response.json();
            })
            .catch(err => {
                console.error(err.data);
            });

    }

    const updateCustomer = (customer, params) => {
        //console.log("params ", params.data._links.Customer.href);
        fetch(params.data._links.customer.href, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer)
        })
            .then(response => {
                //console.log("response: ", response);
                if (response.ok) {
                    setMsg("Edit Customer succeed");
                    setOpenSnackbar(true);
                    getCustomers();
                } else {
                    setMsg("Edit Customer failed");
                    setOpenSnackbar(true);
                }
                return response.json();
            })
            .catch(err => {
                console.error(err.data);
            });
    }

    const deleteCustomer = (params) => {
        if (confirm("Are you sure you want to DELETE this item?") == true) {
            fetch(params.data._links.customer.href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setMsg("Delete succeed");
                        setOpenSnackbar(true);
                        getCustomers();
                    } else {
                        setMsg("Delete failed");
                        setOpenSnackbar(true);
                    }
                    return response.json();
                })
                .catch(err => {
                    console.error(err.data);
                });
        };
    }

    const getCustomers = () => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers', { method: 'GET' })
            .then(response => response.json())
            .then(data => setCustomers(data._embedded.customers))
            .catch(error => {
                console.error(error);
            })
    }

    const onBtnExport = useCallback(() => {
        gridRef.current.api.exportDataAsCsv();
    }, []);

    useEffect(() => getCustomers(), []);

    return (
        <>
            <AddCustomer addCustomer={addCustomer} />
            <Button onClick={onBtnExport}>Download CSV export file</Button>
            <div
                className="ag-theme-quartz"
                style={{ width: 900, height: 500 }}
            >
                <AgGridReact
                    ref={gridRef}
                    rowData={customers}
                    columnDefs={colDefs}
                    pagination={true}
                    suppressExcelExport={true}
                />
                <Snackbar
                    open={openSnackbar}
                    message={msg}
                    autoHideDuration={3000}
                    onClose={() => setOpenSnackbar(false)}
                />
            </div>
        </>
    )
}