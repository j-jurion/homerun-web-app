import { Button, Typography  } from "@mui/material";
import ModalMessage from "./ModalMessage";
import { deleteActivity } from '../../http.js'

export default function DeleteModal({open, handleClose, activityId, handeActivitiesAfterDeletion}) {

    let buttons = <div>
        <Button onClick={handleClose}>CANCEL</Button>
        <Button color="error" onClick={removeActivity}>DELETE</Button>
    </div>

    async function removeActivity() {
        try {
            await deleteActivity(activityId);
            handeActivitiesAfterDeletion(activityId);
            handleClose();
        } catch (error) {
            // setError({ message: error.message || 'Failed to delete activity.' });
            console.log(error);
        }
    }

    return <ModalMessage open={open} handleClose={handleClose} title="Delete Activity" buttons={buttons}>
        Are you sure you want to delete this activity?
    </ModalMessage>
}