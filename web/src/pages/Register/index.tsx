import { useNavigate } from "react-router-dom";
import axios from "axios";

// Hooks
import useMessage from "../../hooks/useMessage";
import { useMutation } from "react-query";

// Styles
import { Container } from "./styles"
import Form from "../../components/Form";

// Schema
import { CreateUserFormData } from "../../components/Form/schema";

const Register = () => {
    const navigate = useNavigate();

    const { msg, handleSetMessage } = useMessage();

    const mutation = useMutation({
        mutationFn: async (dataForm: CreateUserFormData) => {
            const { data } = await axios.post("http://localhost:8080/api/register", dataForm)

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
            <h1>Cadastro de usuário</h1>
            {msg && msg}
            <Form onSubmit={mutation.mutateAsync} textButton="Cadastrar" />
        </Container>
    );
}
 
export default Register;