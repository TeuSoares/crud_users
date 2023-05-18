import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Message } from "../styles/styles";

interface IMessage {
    status: string;
    message: string;
}

const useMessage = () => {
    const [msg, setMsg] = useState<JSX.Element | undefined>(undefined);

    const location = useLocation();

    const handleSetMessage = (msg: IMessage) => {
        setMsg(<Message status={msg.status}>{msg.message}</Message>);

        setTimeout(() => {
            setMsg(undefined);
        }, 3000)
    }

    useEffect(() => {
        if(location.state){
            if(location.state.message){
                setMsg(<Message status={location.state.status}>{location.state.message}</Message>);
    
                setTimeout(() => {
                    setMsg(undefined);
                }, 3000)
            }
        }
    }, [location.state]);

    return {
        msg,
        handleSetMessage
    }
}

export default useMessage;