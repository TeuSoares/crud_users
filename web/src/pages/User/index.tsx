import { Link, useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";

// Hooks
import useMessage from "../../hooks/useMessage";
import { useMutation, useQuery } from "react-query";

// Styles
import { Box, Button, Card, Container, Header } from "./styles";
import { Message } from "../../styles/styles";

// Components
import Loading from "../../components/Loading";

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

interface IMessage {
    status: string;
    message: string;
}

const User = () => {
    const { id } = useParams();

    const { msg, handleSetMessage } = useMessage();

    const navigate = useNavigate();

    const { data, isLoading, error } = useQuery<IUser, AxiosError<IMessage>>(["user", id], async ({ queryKey }) => {
        const id_user = queryKey[1];

        const response = await axios.get(`http://localhost:8080/api/user/${id_user}`);

        return response.data;
    }, {
        retry: 3,
    });

    const mutation = useMutation({
        mutationFn: async () => {
            const { data } = await axios.delete(`http://localhost:8080/api/delete/${id}`)

            return data;
        },
        onSuccess: (data) => {
            navigate("/", {state: data});
        },
        onError: (error: any) => {
            handleSetMessage(error.response.data);
        }
    });

    return ( 
        <Container>
            {isLoading && <Loading />}
            {error && <Message status="error">{error?.response?.data?.message}</Message>}
            {data && (
                <>
                    {msg && msg}
                    <Header>
                        <h1>Usuário: #{data.id_usuario} {data.nome}</h1>
                        <div>
                            <Button type="button" background="#1f3156" backgroundHover="#192742">
                                <Link to={`/user/update/${data.id_usuario}`}>Editar</Link>
                            </Button>
                            <Button type="button" background="#ce3434" backgroundHover="#9e3535" onClick={() => mutation.mutateAsync()}>Excluir</Button>
                        </div>
                    </Header>
                    <Box>
                        <Card>
                            <h5>Nome:</h5>
                            <span>{data.nome}</span>
                        </Card>
                        <Card>
                            <h5>Nome da Mãe:</h5>
                            <span>{data.nome_mae}</span>
                        </Card>
                        <Card>
                            <h5>CPF</h5>
                            <span>{data.cpf}</span>
                        </Card>
                        <Card>
                            <h5>Data de Nascimento:</h5>
                            <span>{data.data_nascimento}</span>
                        </Card>
                        <Card>
                            <h5>Local:</h5>
                            <span>{data.local_nascimento}</span>
                        </Card>
                        <Card>
                            <h5>UF:</h5>
                            <span>{data.uf}</span>
                        </Card>
                        <Card>
                            <h5>Estado Civil:</h5>
                            <span>{data.estado_civil}</span>
                        </Card>
                        <Card>
                            <h5>Sexo:</h5>
                            <span>{data.sexo}</span>
                        </Card>
                    </Box>
                </>
            )}
        </Container>
    );
}
 
export default User;