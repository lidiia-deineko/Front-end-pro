import { Button } from "@mui/material";
import { useCallback,  useContext} from "react"
import { MainContext } from '../../App'

const Reset = () => {

    const mainContext = useContext(MainContext);

    const onReset = useCallback(() => {
        mainContext.setListState([])  
    }, [])

    return (
        <Button onClick={onReset} variant="outlined">Reset</Button>
    )
}

export default Reset