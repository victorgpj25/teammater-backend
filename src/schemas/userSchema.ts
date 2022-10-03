import joi from 'joi'

const signUpSchema = joi.object({
    email: joi.string().email().required()
        .messages({
            'any.required': 'Email é um campo obrigatório',
            'string.base': 'Email enviado não é válido',
            'string.email': 'Email enviado não é válido'
        }
    ),
    password: joi.string().min(5).required()
        .messages({
            'any.required': 'Senha é um campo obrigatório',
            'string.base': 'Senha enviada não é válida',
            'string.min': 'Senhas devem ter no mínimo 5 caracteres'
        }
    ),
    picture: joi.string().required(),
    nickname: joi.string().min(3).required()
        .messages({
            'any.required': 'Nickname é um campo obrigatório',
            'string.base': 'Nickname enviado não é válido',
            'string.min': 'Nicknames devem ter no mínimo 3 caracteres'
        }
    ),
    name: joi.string().min(3)
        .messages({
            'any.required': 'Nome é um campo obrigatório',
            'string.base': 'Nome enviado não é válido',
            'string.min': 'Nomes devem ter no mínimo 3 caracteres'
        }
    ),
    description: joi.string().required()
        .messages({
            'any.required': 'Apresentação é um campo obrigatório',
            'string.base': 'A apresentação enviada não é válida'
        }
    ),
    teammate_description: joi.string().required()
        .messages({
            'any.required': 'Texto para TeamMates é um campo obrigatório',
            'string.base': 'O texto para TeamMates enviado não é válido'
        }
    )
})

const signInSchema = joi.object({
    email: joi.string().email().required()
        .messages({
            'any.required': 'Email é um campo obrigatório',
            'string.base': 'Email enviado não é válido',
            'string.email': 'Email enviado não é válido'
        }
    ),
    password: joi.string().required()
        .messages({
            'any.required': 'Senha é um campo obrigatório',
            'string.base': 'Senha enviada não é válida'
        }
    )
})

const editProfileSchema = joi.object({
    picture: joi.string().required(),
    nickname: joi.string().min(3).required()
        .messages({
            'any.required': 'Nickname é um campo obrigatório',
            'string.base': 'Nickname enviado não é válido',
            'string.min': 'Nicknames devem ter no mínimo 3 caracteres'
        }
    ),
    name: joi.string().min(3)
        .messages({
            'any.required': 'Nome é um campo obrigatório',
            'string.base': 'Nome enviado não é válido',
            'string.min': 'Nomes devem ter no mínimo 3 caracteres'
        }
    ),
    description: joi.string().required()
        .messages({
            'any.required': 'Apresentação é um campo obrigatório',
            'string.base': 'A apresentação enviada não é válida'
        }
    ),
    teammate_description: joi.string().required()
        .messages({
            'any.required': 'Texto para TeamMates é um campo obrigatório',
            'string.base': 'O texto para TeamMates enviado não é válido'
        }
    )
})

export { signUpSchema, signInSchema, editProfileSchema }