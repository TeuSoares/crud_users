import axios, { AxiosError } from "axios";

// Hooks
import { useNavigate, useParams } from "react-router-dom";
import useMessage from "../../../hooks/useMessage";
import { useMutation, useQuery } from "react-query";

// Styles
import { Container } from "./styles";
import { Message } from "../../../styles/styles";

// Components
import Form from "../../../components/Form";
import Loading from "../../../components/Loading";

// Schema
import { CreateUserFormData } from "../../../components/Form/schema";

// Interfaces
interface IUser {
    nome: string,
    cpf: string,
    estado_civil: string,
    data_nascimento: string,
    local_nascimento: string,
    uf: string,
    sexo: string,
    nome_mae: string,
}

interface IMessage {
    status: string;
    message: string;
}

const Update = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const { msg, handleSetMessage } = useMessage();

    const { data, isLoading, error } = useQuery<IUser, AxiosError<IMessage>>(["user", id], async ({ queryKey}) => {
        const id_user = queryKey[1];

        const response = await axios.get(`http://localhost:8080/api/user/${id_user}`);

        return response.data;
    }, {
        retry: 3,
        refetchOnWindowFocus: false,
    });

    const mutation = useMutation({
        mutationFn: async (dataForm: CreateUserFormData) => {
            const { data } = await axios.put(`http://localhost:8080/api/update/${id}`, dataForm)

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
                    <h1>Editando usuário: {id}</h1>
                    {msg && msg}
                    <Form onSubmit={mutation.mutateAsync} textButton="Atualizar" values={data} />
                </>
            )}
        </Container>
    );
}
 
export default Update;