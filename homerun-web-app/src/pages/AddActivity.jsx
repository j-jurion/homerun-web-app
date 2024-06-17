import ActivityForm from '../components/ActivityForm.jsx';
import { useLoaderData, useNavigate } from "react-router-dom";

import { postActivity } from '../http.js'
import { ACTIVITIES } from '../assets/routes.js';


export default function AddActivity() {
    const navigate = useNavigate();

    async function addActivity(activity) {
        try {
            await postActivity(activity);
            navigate(ACTIVITIES);
        } catch (error) {
            console.log(error);
        }
    }

    return <ActivityForm submitActivity={addActivity}/>;
}