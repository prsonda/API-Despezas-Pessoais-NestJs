export const messages = {
  email: {
    userCreated: 'Usuário criado com sucesso!',
    resetPassword: 'Senha resetada com sucesso!',
    order: (field: string) => `Pedido n°${field} realizado!`,
  },
  created: {
    Duplicate: (field: string) => `${field} já cadastrado(a)`,
    cratedSuccess: (field: string) => `${field} cadastrado(a) com sucesso`,
  },
  updated: {
    updatedSuccess: (field: string) => `${field} atualizado(a) com sucesso`,
    forgot:
      'Senha resetada com sucesso! Caso não tenha recebido o email, verifique sua caixa de spam',
  },
  group: {},
  deleted: {
    deletedSuccess: (field: string) => `${field} deletado(a) com sucesso`,
    notDeleted: (field: string) =>
      `Não é possível deletar ${field}, outros registros dependem dele(a)`,
  },
  notFound: {
    notFound: (field: string) => `${field} não encontrado(a)`,
  },
  permission: {
    invalidToken: 'Token inválido',
    authorization: `Usuário não aturizado!`,
    userNotLogged: 'Usuário não autenticado!',
    userInactive: 'Usuário inativo!',
  },
  validate: {
    emptyField: (field: string) => `O campo ${field} não pode ser vazio`,
    notEmptyField: (field: string) =>
      `É preciso informar pelo menos um(a) ${field} válido(a)`,
    isInvalid: (field: string) => `${field} inválido(a)`,
    isString: (field: string) => `${field} deve ser uma string`,
    isNumber: (field: string) => `${field} deve ser um número`,
    isBoolean: (field: string) => `${field} deve ser um boolean (true/false)`,
    login: 'Usuário e/ou senha inválido(s)',
    notValue: 'Dados não informados',
    passwordsDoNotMatch: 'As senhas não conferem',
    productStock: 'Quantidade de produtos indisponível',
  },
  error: {
    loginError: 'Erro ao efetuar login',
    errorConsult: (field: string) => `Erro ao consultar ${field} no banco`,
    errorCreate: (field: string) => `Erro ao cadastrar ${field} no banco`,
    errorUpdate: (field: string) => `Erro ao atualizar ${field} no banco`,
    errorDelete: (field: string) => `Erro ao deletar ${field} no banco`,
    errorValidate: (field: string) => `Erro ao validar ${field}`,
  },
};
