import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, { message: "O nome não pode ficar em branco." }),
  last_name: z
    .string()
    .min(1, { message: "O sobrenome não pode ficar em branco." }),
  user_name: z
    .string()
    .min(6, { message: "O nome de usuário deve conter 6 ou mais caracteres." })
    .trim()
    .regex(/^[_a-zA-Z0-9]+$/, {
      message:
        "O nome de usuário deve conter apenas letras, números e o símbolo _.",
    }),
  email: z
    .string()
    .regex(
      /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,63}$/,
      {
        message: "Email inválido revise as informações.",
      }
    ),
  password: z
    .string()
     .min(8, { message: "A senha deve ter no mínimo 8 ou mais caracteres." }),
});
