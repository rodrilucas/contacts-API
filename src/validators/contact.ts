import { z } from "zod";

export const createContactSchema = z.object({
  first_name: z
    .string()
    .min(1, { message: "Adicione pelo menos um nome para o contato." }),
  last_name: z.string(),
  twitter: z.string(),
  phone: z.string(),
  email: z.string(),
  avatar: z.string().regex(/^$|^https:\/\/.+$/, {
    message: "Imagem inválida. Deve estar vazia ou começar com https://.",
  }),
  info: z.string(),
});
