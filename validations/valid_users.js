const Joi = require('joi');

const schema = Joi.object({
    email: Joi.string().email().required(),
    nome: Joi.string().min(3),
    senha: Joi.string().min(8)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required(),
    confirmaSenha: Joi.string().valid(Joi.ref('senha')).messages({ 'any.only': 'As senhas não correspondem' }),
    action: Joi.string().valid('/login', '/signup').required(),
})
    .when(Joi.object({ action: Joi.string().valid('/signup')}), {
        then: Joi.object({
            nome: Joi.required(),
            confirmaSenha: Joi.required()
        }),
})
    .when(Joi.object({ action: Joi.string().valid('/login')}), {
    then: Joi.object({
        nome: Joi.forbidden(),
        confirmaSenha: Joi.forbidden()
    }),
});

module.exports = {
    validar: (req, res, next) => {
        req.body.action = req.path;
        
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).send({ message: 'Erro de validação', details: error.details });
        }

        next();
    },
}
