import { Link } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import useMessage from "../../hooks/useMessage";

// Styles
import { Container, Header } from "./styles";
import axios, { AxiosError } from "axios";
import { Message } from "../../styles/styles";

// Components
import Loading from "../../components/Loading";

interface IUsers {
    id_usuario: string;
    nome: string;
    cpf: string;
    data_nascimento: string;
    sexo: string;
}

interface IMessage {
    status: string;
    message: string;
}

const Dashboard = () => {
    const [searchUser, setSearchUser] = useState<string>("");
    const [isResearching, setIsResearching] = useState<boolean>(false);

    const { data, isLoading, error } = useQuery<IUsers[], AxiosError<IMessage>>(["users", isResearching], async ({ queryKey }: any) => {
        const isResearching = queryKey[1];

        const response = await axios.get(!isResearching ? "http://localhost:8080/api/dashboard" : `http://localhost:8080/api/dashboard?search_user=${searchUser}`);

        return response.data;
    }, {
        retry: 3,
    });

    const { msg } = useMessage();

    useEffect(() => {
        if(!searchUser){
            setSearchUser("");
            setIsResearching(false);
        }
    }, [searchUser]);

    const clearQuery = () => {
        setSearchUser("");
        setIsResearching(false);
    }

    return ( 
        <Container>
            {isLoading && <Loading />}
            {error && <Message status="error">{error?.response?.data?.message}</Message>}
            {data && (
                <>
                    {msg && msg}
                    <Header>
                        <h1>Lista de usuários</h1>
                        <div>
                            <input type="text" name="search" onChange={(e) => setSearchUser(e.target.value)} value={searchUser} />
                            {!isResearching ? (
                                <button type="button" onClick={() => setIsResearching(true)}>Pesquisar</button>
                            ) : (
                                <button type="button" onClick={clearQuery}>Limpar</button>
                            )}
                        </div>
                    </Header>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Data de Nascimento</th>
                                <th>Sexo</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data!.map(user => (
                                <tr key={user.id_usuario}>
                                    <td>{user.id_usuario}</td>
                                    <td>{user.nome}</td>
                                    <td>{user.cpf}</td>
                                    <td>{user.data_nascimento}</td>
                                    <td>{user.sexo}</td>
                                    <td>
                                        <Link to={`/user/${user.id_usuario}`}>Visualizar</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </Container>
    );
}
 
export default Dashboard;