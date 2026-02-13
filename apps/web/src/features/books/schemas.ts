import { z } from 'zod'

export const bookSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  author: z.string().min(1, 'O autor é obrigatório'),
  publicationDate: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data inválida (DD/MM/AAAA)'),
  description: z
    .string()
    .min(10, 'A descrição deve ter pelo menos 10 caracteres'),
  image: z.string().min(1, 'A imagem de capa é obrigatória')
})

export type BookFormData = z.infer<typeof bookSchema>
