import ActivityForm from '../components/ActivityForm.jsx';
import { postActivity } from '../http.js'


export default function AddActivity() {
    async function addActivity(activity) {
        try {
            await postActivity(activity);
        } catch (error) {
            console.log(error);
        }
    }

    return <ActivityForm submitActivity={addActivity}/>;
}