import { useEffect, useState } from "react"
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import moment from "moment";

export default function Training() {

    const [trainings, setTrainings] = useState([{
        date: "",
        duration: "",
        activity: "",
        customer: {
            firstname: "",
            lastname: "",
            streetaddress: "",
            postcode: "",
            city: "",
            email: "",
            phone: ""
        }
    }]);



    const dateFormatter = (params) => {
        return moment(params.value).format('MM.DD.YYYY HH:mm');
    };
    const [colDefs, setColDefs] = useState([
        { field: "date", filter: true, floatingFilter: true, valueFormatter: dateFormatter },
        { field: "duration", filter: true, floatingFilter: true },
        { field: "activity", filter: true, floatingFilter: true },
        { field: "customer.firstname", filter: true, floatingFilter: true},
        { field: "customer.lastname", filter: true, floatingFilter: true}
    ]);


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

    useEffect(() => getTrainings(), []);

    return (
        <>
            <div
                className="ag-theme-quartz"
                style={{ width: 900, height: 500 }}
            >
                <AgGridReact
                    rowData={trainings}
                    columnDefs={colDefs}
                />
            </div>
        </>
    )
}