import EventForm from '../components/planning/EventForm.jsx';
import { useNavigate } from "react-router-dom";

import { PLANNING } from '../assets/routes.js';
import { postEvent } from '../assets/http.js';


export default function AddEvent() {
    const navigate = useNavigate();

    async function addEvent(event) {
        try {
            await postEvent(event);
            navigate(PLANNING);
        } catch (error) {
            console.log(error);
        }
    }

    return <EventForm submitEvent={addEvent}/>;
}