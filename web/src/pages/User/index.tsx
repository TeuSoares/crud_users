import { Link, useNavigate, useParams } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";
import useMessage from "../../hooks/useMessage";
import useQuery from "../../hooks/useQuery";

// Styles
import { Box, Button, Card, Container, Header } from "./styles";

interface IUser {
    id_usuario: string;
    nome: string;
    cpf: string;
    data_nascimento: string;
    sexo: string;
    nome_mae: string;
    estado_civil: string;
    local_nascimento: string;
    uf: string;
}

const User = () => {
    const { id } = useParams();

    const [user, setUser] = useState<IUser>();

    const handleQuery = useQuery();

    const { msg, handleSetMessage } = useMessage();

    const navigate = useNavigate();

    useEffect(() => {
        const getUserByID = async () => {
            const { status, data } = await handleQuery("GET", `user/${id}`);

            if(status === "success") {
                const date = new Date(data.data_nascimento);
                const newsDate = date.toLocaleDateString("pt-BR", {timeZone: 'UTC'});

                const cpf = data.cpf;
                const newsCpf = `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;

                data.data_nascimento = newsDate;
                data.cpf = newsCpf;

                setUser(data);
            }else if(status === "error"){
                handleSetMessage(data);
            }
        }

        getUserByID();
    }, []);

    const handleDelete = async () => {
        const { status, data } = await handleQuery("DELETE", `delete/${id}`);

        if(status === "success") {
            navigate("/", {state: data});
        }else if(status === "error"){
            handleSetMessage(data);
        }
    }

    return ( 
        <Container>
            {msg && msg}
            {user && (
                <>
                    <Header>
                        <h1>Usuário: #{user.id_usuario} {user.nome}</h1>
                        <div>
                            <Button type="button" background="#1f3156" backgroundHover="#192742">
                                <Link to={`/user/update/${user.id_usuario}`}>Editar</Link>
                            </Button>
                            <Button type="button" background="#ce3434" backgroundHover="#9e3535" onClick={handleDelete}>Excluir</Button>
                        </div>
                    </Header>
                    <Box>
                        <Card>
                            <h5>Nome:</h5>
                            <span>{user.nome}</span>
                        </Card>
                        <Card>
                            <h5>Nome da Mãe:</h5>
                            <span>{user.nome_mae}</span>
                        </Card>
                        <Card>
                            <h5>CPF</h5>
                            <span>{user.cpf}</span>
                        </Card>
                        <Card>
                            <h5>Data de Nascimento:</h5>
                            <span>{user.data_nascimento}</span>
                        </Card>
                        <Card>
                            <h5>Local:</h5>
                            <span>{user.local_nascimento}</span>
                        </Card>
                        <Card>
                            <h5>UF:</h5>
                            <span>{user.uf}</span>
                        </Card>
                        <Card>
                            <h5>Estado Civil:</h5>
                            <span>{user.estado_civil}</span>
                        </Card>
                        <Card>
                            <h5>Sexo:</h5>
                            <span>{user.sexo}</span>
                        </Card>
                    </Box>
                </>
            )}
        </Container>
    );
}
 
export default User;