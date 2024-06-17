import ActivityForm from '../components/ActivityForm.jsx';
import { useLoaderData, useNavigate } from "react-router-dom";
import { putActivity } from '../http.js'
import { ACTIVITIES } from '../assets/routes.js';

export default function EditActivity() {
    const { activity } = useLoaderData();
    const navigate = useNavigate();

    async function editActivity(activity) {
        try {
            await putActivity(activity);
            navigate(ACTIVITIES);
        } catch (error) {
            console.log(error);
        }
    }

    return <ActivityForm activity={activity} submitActivity={editActivity}/>;
}