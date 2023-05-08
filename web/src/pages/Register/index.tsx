import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Form
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

// Hooks
import useQuery from "../../hooks/useQuery";
import useMessage from "../../hooks/useMessage";

// Styles
import { Container } from "./styles"

const ufs = ["RO", "AC", "AM", "RR", "PA", "AP", "TO", "MA", "PI", "CE", "RN", "PB", "PE", "AL", "SE", "BA", "MG", "ES", "RJ", "SP", "SC", "RS", "MS", "MT", "GO", "DF"];

const createUserFormSchema = z.object({
    name: z.string()
        .nonempty("O nome é obrigatório!")
        .min(4, "O nome não pode conter menos de 4 caracteres.")
        .regex(new RegExp("[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$"), "O nome só pode conter letras.")
        .transform(name => {
            return name.trim().split(" ").map(word => {
                return word[0].toLocaleUpperCase().concat(word.substring(1))
            }).join(" ");
        }),

    cpf: z.string()
        .nonempty("O CPF é obrigatório!")
        .regex(new RegExp('^[0-9]+$'), "O CPF só pode conter números")
        .length(11, "Formato de CPF inválido"),

    marital_status: z.string()
        .nonempty("O estado civil é obrigatório!"),

    date_birth: z.string()
    .nonempty("A data de nascimento é obrigatória!"),

    local: z.string()
        .nonempty("O local de nascimento é obrigatório!")
        .regex(new RegExp("[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$"), "O local só pode conter letras."),

    uf: z.string()
        .nonempty("O estado de nascimento é obrigatório!"),

    gender: z.string()
        .nonempty("O gênero é obrigatório!"),

    name_mother: z.string()
        .nonempty("O nome da mãe é obrigatório!")
        .min(4, "O nome da mãe não pode conter menos de 4 caracteres.")
        .regex(new RegExp("[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$"), "O nome da mãe só pode conter letras.")
        .transform(name => {
            return name.trim().split(" ").map(word => {
                return word[0].toLocaleUpperCase().concat(word.substring(1))
            }).join(" ");
        }),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>

const Register = () => {
    const { 
        register, 
        handleSubmit, 
        setValue, 
        formState: { errors } 
    } = useForm<CreateUserFormData>({
        resolver: zodResolver(createUserFormSchema),
        defaultValues: {
            gender: ""
        }
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

                    setValue("name", user.nome);
                    setValue("cpf", user.cpf);
                    setValue("marital_status", user.estado_civil);
                    setValue("date_birth", user.data_nascimento);
                    setValue("local", user.local_nascimento);
                    setValue("uf", user.uf);
                    setValue("gender", user.sexo);
                    setValue("name_mother", user.nome_mae);
                }else if(status === "error"){
                    navigate("/", {state: {status: "error", message: "Não foi possível atualizar os dados nesse momento!"}});
                }
            }
    
            getUserByID();
        }
    }, []);

    const onSubmit = async (dataForm: CreateUserFormData) => {
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">Nome Completo:</label>
                <input type="text" {...register("name")} />
                {errors.name && <span>{errors.name.message}</span>}
                
                <label htmlFor="cpf">CPF:</label>
                <input type="text" {...register("cpf")} />
                {errors.cpf && <span>{errors.cpf.message}</span>}

                <label htmlFor="marital_status">Estado Civil:</label>
                <select {...register("marital_status")}>
                    <option value=""></option>
                    <option value="solteiro">Solteiro</option>
                    <option value="namorando">Namorando</option>
                    <option value="casado">Casado</option>
                    <option value="divorciado">Divorciado</option>
                    <option value="viuvo">Viúvo</option>
                </select>
                {errors.marital_status && <span>{errors.marital_status.message}</span>}

                <label htmlFor="date_birth">Data de Nascimento:</label>
                <input type="date" {...register("date_birth")} />
                {errors.date_birth && <span>{errors.date_birth.message}</span>}

                <label htmlFor="local">Local de Nascimento:</label>
                <input type="text" {...register("local")} />
                {errors.local && <span>{errors.local.message}</span>}

                <label htmlFor="uf">Estado:</label>
                <select {...register("uf")}>
                    <option value=""></option>
                    {ufs.map((uf, key) => (
                        <option key={key} value={uf}>{uf}</option>
                    ))}
                </select>
                {errors.uf && <span>{errors.uf.message}</span>}

                <label htmlFor="gender">Sexo:</label>
                <div>
                    <input type="radio" {...register("gender")} value="Masculino" /> Masculino
                    <input type="radio" {...register("gender")} value="Feminino" /> Feminino
                </div>
                {errors.gender && <span>{errors.gender.message}</span>}

                <label htmlFor="name_mother">Nome da Mãe:</label>
                <input type="text" {...register("name_mother")} />
                {errors.name_mother && <span>{errors.name_mother.message}</span>}

                <button type="submit">{!id ? "Cadastrar" : "Atualizar"}</button>
            </form>
        </Container>
    );
}
 
export default Register;