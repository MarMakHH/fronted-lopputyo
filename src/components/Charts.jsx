import { chain, groupBy, sumBy } from "lodash";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function Charts() {


    const [trainings, setTrainings] = useState([{
        date: '',
        duration: '',
        activity: '',
    }]);


    let result = groupBy(trainings, "activity")


    console.log(trainings);

    const getTrainings = () => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings', { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setTrainings(data._embedded.trainings);
            })
            .catch(error => {
                console.error(error);
            })
    };

    useEffect(() => getTrainings(), []);

    return (
        <>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart width={150} height={40} data={trainings}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="activity" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="duration" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </>
    )
}