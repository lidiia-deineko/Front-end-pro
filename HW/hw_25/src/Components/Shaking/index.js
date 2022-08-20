import { getRandomHeight, getRandomWidth } from "../../Services/getService";
import { useCallback,  useContext} from "react"
import { MainContext } from '../../App'
import { Button } from "@mui/material";

const Shaking = () => {

    const mainContext = useContext(MainContext);

    const onShaking = useCallback(() => {
        const shakingList = mainContext.list.map(item => (
            {...item, top: getRandomHeight(), left: getRandomWidth()}
        ))

        mainContext.setListState(shakingList)  

    }, [mainContext.list])

   

    return (
        <Button className="btnShaking" onClick={onShaking} variant="outlined">Shaking</Button>
    )
}

export default Shaking;