import { Link } from "react-router-dom";
import { Container, Items } from "./styles";

const Header = () => {
    return ( 
        <Container>
            <Items>
                <h1>CRUD</h1>
                <ul>
                    <li>
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/register">Cadastro</Link>
                    </li>
                </ul>
            </Items>
        </Container>
    );
}
 
export default Header;