import ActivityForm from '../components/ActivityForm.jsx';
import { useLoaderData } from "react-router-dom";
import { putActivity } from '../http.js'

export default function EditActivity() {
    const { activity } = useLoaderData();
    console.log(activity)

    async function editActivity(activity) {
        console.log(activity);
        try {
            await putActivity(activity);
        } catch (error) {
            console.log(error);
        }
    }

    return <ActivityForm activity={activity} submitActivity={editActivity}/>;
}