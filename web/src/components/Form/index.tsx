import { FormContainer } from "./styles";

// Form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateUserFormData, createUserFormSchema } from "./schema";

const ufs = ["RO", "AC", "AM", "RR", "PA", "AP", "TO", "MA", "PI", "CE", "RN", "PB", "PE", "AL", "SE", "BA", "MG", "ES", "RJ", "SP", "SC", "RS", "MS", "MT", "GO", "DF"];

interface FormProps {
    onSubmit: (data: CreateUserFormData) => void;
    textButton: string;
    values?: {
        nome: string,
        cpf: string,
        estado_civil: string,
        data_nascimento: string,
        local_nascimento: string,
        uf: string,
        sexo: string,
        nome_mae: string,
    };
}

const Form = ({onSubmit, textButton, values}: FormProps) => {
    const { 
        register, 
        handleSubmit,
        formState: { errors } 
    } = useForm<CreateUserFormData>({
        resolver: zodResolver(createUserFormSchema),
        defaultValues: {
            name: values ? values.nome : "",
            cpf: values ? values.cpf : "",
            marital_status: values ? values.estado_civil : "",
            date_birth: values ? values.data_nascimento : "",
            local: values ? values.local_nascimento : "",
            uf: values ? values.uf : "",
            gender: values ? values.sexo : "",
            name_mother: values ? values.nome_mae : "",
        }
    });

    return ( 
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
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

            <button type="submit">{textButton}</button>
        </FormContainer>
    );
}
 
export default Form;