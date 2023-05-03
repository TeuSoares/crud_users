import { Link } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";
import useQuery from "../../hooks/useQuery";
import useMessage from "../../hooks/useMessage";

// Styles
import { Container, Header } from "./styles";

interface IUsers {
    id_usuario: string;
    nome: string;
    cpf: string;
    data_nascimento: string;
    sexo: string;
}

const Dashboard = () => {
    const [users, setUsers] = useState<IUsers[]>();
    const [queryUser, setQueryUser] = useState<string>("");
    const [isQuery, setIsQuery] = useState<boolean>(false);

    const handleQuery = useQuery();

    const { msg, handleSetMessage } = useMessage();

    useEffect(() => {
        const getAllUsers = async () => {
            const { status, data } = await handleQuery("GET", !isQuery ? "dashboard" : `dashboard?search_user=${queryUser}`);

            if(status === "success") {
                for(const users of data){
                    const date = new Date(users.data_nascimento);
                    const newsDate = date.toLocaleDateString("pt-BR", {timeZone: 'UTC'});

                    const cpf = users.cpf;
                    const newsCpf = `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;

                    users.data_nascimento = newsDate;
                    users.cpf = newsCpf;
                }

                setUsers(data);
            }else if(status === "error"){
                handleSetMessage(data);
            }
        }

        getAllUsers();
    }, [isQuery]);

    useEffect(() => {
        if(!queryUser){
            setIsQuery(false);
        }
    }, [queryUser]);

    const clearQuery = () => {
        setQueryUser("");
        setIsQuery(false);
    }

    return ( 
        <Container>
            {msg && msg}
            <Header>
                <h1>Lista de usuários</h1>
                <div>
                    <input type="text" name="search" onChange={(e) => setQueryUser(e.target.value)} value={queryUser} />
                    {!isQuery ? (
                        <button type="button" onClick={() => setIsQuery(true)}>Pesquisar</button>
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
                    {users && (
                        <>
                            {users!.map(user => (
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
                        </>
                    )}
                </tbody>
            </table>
        </Container>
    );
}
 
export default Dashboard;