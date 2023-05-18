import { z } from "zod";

export const createUserFormSchema = z.object({
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

export type CreateUserFormData = z.infer<typeof createUserFormSchema>