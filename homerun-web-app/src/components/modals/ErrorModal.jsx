import { Button } from "@mui/material";
import ModalMessage from "./ModalMessage";
import Typography from '@mui/material/Typography';

export default function ErrorModal({open, handleClose, errorMessage}) {

    let buttons = <div>
        <Button>CLOSE</Button>
    </div>

    return <ModalMessage open={open} handleClose={handleClose} title="Something went wrong" buttons={buttons}>
        <p>{errorMessage}</p>
    </ModalMessage>
}