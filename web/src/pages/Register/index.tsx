import { ChangeEvent, FormEvent, useEffect, useState } from "react";

// Hooks
import { useNavigate, useParams } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import useMessage from "../../hooks/useMessage";

// Styles
import { Container } from "./styles"

const ufs = ["RO", "AC", "AM", "RR", "PA", "AP", "TO", "MA", "PI", "CE", "RN", "PB", "PE", "AL", "SE", "BA", "MG", "ES", "RJ", "SP", "SC", "RS", "MS", "MT", "GO", "DF"];

const Register = () => {
    const [dataForm, setDataForm] = useState({
        name: "",
        cpf: "",
        marital_status: "",
        date_birth: "",
        local: "",
        uf: "",
        gender: "",
        name_mother: "",
    });

    const { id } = useParams();

    const handleQuery = useQuery();

    const navigate = useNavigate();

    const { msg, handleSetMessage } = useMessage();

    useEffect(() => {
        if(id){
            const getUserByID = async () => {
                const { status, data } = await handleQuery("GET", `user/${id}`);
    
                if(status === "success") {
                    const user = data;

                    setDataForm({
                        name: user.nome,
                        cpf: user.cpf,
                        marital_status: user.estado_civil,
                        date_birth: user.data_nascimento,
                        local: user.local_nascimento,
                        uf: user.uf,
                        gender: user.sexo,
                        name_mother: user.nome_mae,
                    });
                }else if(status === "error"){
                    navigate("/", {state: {status: "error", message: "Não foi possível atualizar os dados nesse momento!"}});
                }
            }
    
            getUserByID();
        }
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setDataForm({ ...dataForm!, [e.target.name]: e.target.value});
        console.log("change");
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { status, data } = await handleQuery(!id ? "POST" : "PUT", !id ? "register" : `update/${id}`, dataForm);

        if(status === "success") {
            navigate("/", {state: data});
        }else if(status === "error"){
            handleSetMessage(data);
        }
    }

    return ( 
        <Container>
            <h1>{!id ? "Cadastro de usuário" : `Editando usuário: ${id}`}</h1>
            {msg && msg}
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nome Completo:</label>
                <input type="text" name="name" onChange={handleChange} value={dataForm.name} />
                
                <label htmlFor="cpf">CPF:</label>
                <input type="text" name="cpf" onChange={handleChange} value={dataForm.cpf} />

                <label htmlFor="marital_status">Estado Civil:</label>
                <select name="marital_status" onChange={handleChange}>
                    <option value={dataForm.marital_status}>{dataForm.marital_status}</option>
                    <option value="solteiro">Solteiro</option>
                    <option value="namorando">Namorando</option>
                    <option value="casado">Casado</option>
                    <option value="divorciado">Divorciado</option>
                    <option value="viuvo">Viúvo</option>
                </select>

                <label htmlFor="date_birth">Data de Nascimento:</label>
                <input type="date" name="date_birth" onChange={handleChange} value={dataForm.date_birth} />

                <label htmlFor="local">Local de Nascimento:</label>
                <input type="text" name="local" onChange={handleChange} value={dataForm.local} />

                <label htmlFor="uf">Estado:</label>
                <select name="uf" onChange={handleChange} value={dataForm.uf}>
                    <option value=""></option>
                    {ufs.map((uf, key) => (
                        <option key={key} value={uf}>{uf}</option>
                    ))}
                </select>

                <label htmlFor="gender">Sexo:</label>
                <div>
                    <input type="radio" name="gender" onChange={handleChange} value="Masculino" checked={dataForm.gender == "Masculino" && true} /> Masculino
                    <input type="radio" name="gender" onChange={handleChange} value="Feminino" checked={dataForm.gender == "Feminino" && true} /> Feminino
                </div>

                <label htmlFor="name_mother">Nome da Mãe:</label>
                <input type="text" name="name_mother" onChange={handleChange} value={dataForm.name_mother} />

                <button type="submit">{!id ? "Cadastrar" : "Atualizar"}</button>
            </form>
        </Container>
    );
}
 
export default Register;