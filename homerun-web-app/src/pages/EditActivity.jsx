import ActivityForm from '../components/ActivityForm.jsx';
import { useLoaderData, useNavigate } from "react-router-dom";
import { putActivity } from '../assets/http.js'
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

    const discardChanges = () => {
        navigate(ACTIVITIES);
    }

    return <ActivityForm activity={activity} handleDiscard={discardChanges} submitActivity={editActivity}/>;
}