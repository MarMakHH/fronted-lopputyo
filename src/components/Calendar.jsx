import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'

import '@schedule-x/theme-default/dist/index.css'
import { useEffect, useState } from 'react'
import moment from 'moment'

export default function Calendar() {
    useEffect(() => getTrainings(), []);

    const eventsService = useState(() => createEventsServicePlugin())[0]
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

    const events = [];
    let index = 0;
    trainings.map(e => {
        if (moment(e.date).isValid()) {
            index++;
            events.push({
                id: index,
                title: e.activity,
                start: moment(e.date).format('YYYY-MM-DD HH:mm'),
                end: moment(e.date).add(e.duration, "m").format('YYYY-MM-DD HH:mm'),
                people: [e.customer.firstname + " " + e.customer.lastname]
            })
        }
    })

    console.log(events);

    const calendar = useCalendarApp({
        views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
        events: events,
        plugins: [eventsService]
    });


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



    useEffect(() => {
        eventsService.getAll()
    }, [])

    return (
        <div>
            <ScheduleXCalendar calendarApp={calendar} />
        </div>
    )
}