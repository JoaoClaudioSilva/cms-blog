const Joi = require('joi');

const schema = Joi.object({
    titulo: Joi.string()
        .required()
        .regex(/^[a-zA-Z0-9À-ÿ .,!?;:]+$/u)
        .messages({
            'any.required': 'O título é obrigatório.',
            'string.empty': 'O título não pode estar vazio.',
            'string.pattern.base': 'O título não pode conter caracteres especiais.'
        }),

    conteudo: Joi.string()
        .required()
        .messages({
            'any.required': 'O conteúdo é obrigatório.',
            'string.empty': 'O conteúdo não pode estar vazio.'
        }),
    
    categoria: Joi.string()
        .required()
        .messages({
            'any.required': 'A categoria é obrigatória.',
            'string.empty': 'A categoria não pode estar vazia.'
        }),

    data: Joi.string()
});


module.exports = {
    valida_artigo: async (artigo) => {
        try {
            await schema.validateAsync(artigo);
        } catch (error) {
            throw error;
        }
    }
};