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
    const [valueSearch, setValueSearch] = useState<string>("");
    const [changeQuery, setChangeQuery] = useState<boolean>(false);

    const handleQuery = useQuery();

    const { msg, handleSetMessage } = useMessage();

    useEffect(() => {
        const getAllUsers = async () => {
            const { status, data } = await handleQuery("GET", !valueSearch ? "dashboard" : `dashboard?search_user=${valueSearch}`);

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
    }, [changeQuery]);

    const handleSearchUser = () => {
        setValueSearch(queryUser);
        setChangeQuery(!changeQuery);
    }

    const clearSearch = () => {
        setQueryUser("");
        setValueSearch("");
        setChangeQuery(!changeQuery);
    }

    return ( 
        <Container>
            {msg && msg}
            <Header>
                <h1>Lista de usuários</h1>
                <div>
                    <input type="text" name="search" onChange={(e) => setQueryUser(e.target.value)} value={queryUser} />
                    {!valueSearch ? (
                        <button type="button" onClick={handleSearchUser}>Pesquisar</button>
                    ) : (
                        <button type="button" onClick={clearSearch}>Limpar</button>
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