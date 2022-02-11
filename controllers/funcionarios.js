const upload = require('../model/uploadModel');



async function get(req, res, next) {
  try {
    const context = {};

    context.id = parseInt(req.params.id, 10);
    context.skip = parseInt(req.query.skip, 10);
    context.limit = parseInt(req.query.limit, 10);
    context.sort = req.query.sort;
    context.NOME = req.query.NOME; 

    const rows = await upload.find(context);

    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

module.exports.get = get;

function getfuncionarioFromRec (req) {

  const FUNCIONARIO = { 
      cpf: req.body.cpf,
      nome: req.body.nome,
      filial: req.body.filial,
      dt_nascimento: req.body.dt_nascimento,
      rg:	req.body.rg,
      uf: req.body.uf,
      cidade: req.body.cidade,
      endereco: req.body.endereco,
      numero: req.body.numero,
      bairro: req.body.bairro,
      cep: req.body.cep,
      telefone_princial: req.body.telefone_princial,
      telefone_secundario: req.body.telefone_secundario,
      data_admissao: req.body.data_admissao,
      empresa_pagadora: req.body.empresa_pagadora,
      valor: req.body.valor,
      tipo_de_documento: req.body.tipo_de_documento,
      data_geracao: req.body.data_geracao,
      data_vencimento: req.body.data_vencimento,
      conta_contabil: req.body.conta_contabil,
      centro_de_custo: req.body.centro_de_custo,
      observacao: req.body.observacao
      
      
    };
   return FUNCIONARIO;
}


async function post(req, res, next) {
  try {
    let funcionario = getfuncionarioFromRec(req);

    funcionario = await upload.create(funcionario);

    res.status(201).json(funcionario);
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;
 
