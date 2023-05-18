import img from "../../assets/loading.svg";
import { Container } from "./styles";

const Loading = ({imgWidth}: { imgWidth?: string }) => {
    return <Container imgWidth={imgWidth}><img src={img} alt="Loading" /></Container>;
}
 
export default Loading;