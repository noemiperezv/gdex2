const { check } = require('express-validator');

exports.login = [check('email').isEmail().withMessage('Email: No se ingreso un correo valido').trim().not().isEmpty().withMessage('Email: El campo esta vacio').isLength({min: 7}).withMessage('Email: Minimo 7 caracteres'),
check('password').trim().not().isEmpty().withMessage('Password: El campo esta vacio').isLength({min: 8}).withMessage('Password: Minimo 8 caracteres')
];

exports.register = [check('name').trim().not().isEmpty().withMessage('Nombre: El campo esta vacio').isLength({min: 3}).withMessage('Nombre: Minimo 3 caracteres'),
check('lastname').trim().not().isEmpty().withMessage('Apellido: El campo esta vacio').isLength({min: 3}).withMessage('Apellido: Minimo 3 caracteres'),
check('matricula').trim().not().isEmpty().withMessage('Matricula: El campo esta vacio').isLength({min: 10}).withMessage('Matricula: Minimo 10 caracteres'),
check('email').isEmail().withMessage('Email: No se ingreso un correo valido').trim().not().isEmpty().withMessage('Email: El campo esta vacio').isLength({min: 8}).withMessage('Minimo 8 caracteres'),
check('rol').not().isEmpty().withMessage('Rol: Selecciona un rol'),
check('password').trim().not().isEmpty().withMessage('Password: El campo esta vacio').isLength({min: 8}).withMessage('Password: Minimo 8 caracteres'),
check('confirmarpassword').trim().not().isEmpty().withMessage('Confirmar Password: El campo esta vacio').isLength({min: 8}).withMessage('Confirmar Password: Minimo 8 caracteres')


];
