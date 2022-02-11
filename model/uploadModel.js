const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
 `select
  id,
  cpf,
  nome,
  filial, 
  empresa_pagadora,
  valor,
  tipo_de_documento,
  to_char (data_geracao,'dd/mm/yyyy') data_geracao,
  data_vencimento,
  conta_contabil,
  centro_de_custo 
  from integracao_metadata  
  where 1=1
  `;

const sortableColumns = ['id', 'nome'];

async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
    binds.employee_id = context.id;
 
    query += '\nand id = :employee_id';
  }

  if (context.NOME) {
    binds.NOME = context.NOME;
 
    query += '\nand NOME like :NOME';
  }
 
 
  if (context.sort === undefined) {
    query += '\norder by NOME asc';
  } else {
    let [column, order] = context.sort.split(':');
 
    if (!sortableColumns.includes(column)) {
      throw new Error('Invalid "sort" column');
    }
 
    if (order === undefined) {
      order = 'asc';
    }
 
    if (order !== 'asc' && order !== 'desc') {
      throw new Error('Invalid "sort" order');
    }
 
    query += `\norder by "${column}" ${order}`;
  }

  if (context.skip) {
    binds.row_offset = context.skip;

    query += '\noffset :row_offset rows';
  }

  const limit = (context.limit > 0) ? context.limit : 5000;

  binds.row_limit = limit;

  query += '\nfetch next :row_limit rows only';

  const result = await database.simpleExecute(query, binds);

  return result.rows
}

module.exports.find = find;

const createSqlIntegracaoMetadata =
 `insert into integracao_metadata cd (
  cpf,
  nome,
  filial,
  dt_nascimento,
  rg,
  uf,
  cidade,
  endereco,
  numero,
  bairro,
  cep,
  telefone_princial,
  telefone_secundario,
  data_admissao,
  empresa_pagadora,
  valor,
  tipo_de_documento,
  data_geracao,
  data_vencimento,
  conta_contabil,
  centro_de_custo,
  observacao)
 values  (
  :cpf,
  :nome,
  :filial,
  to_date (:dt_nascimento,'dd/mm/yyyy'),
  :rg,
  :uf,
  :cidade,
  :endereco,
  :numero,
  :bairro,
  :cep,
  :telefone_princial,
  :telefone_secundario,
  to_date (:data_admissao,'dd/mm/yyyy'), 
  :empresa_pagadora,
  :valor,
  :tipo_de_documento,
  to_date (:data_geracao,'dd/mm/yyyy'), 
  to_date (:data_vencimento,'dd/mm/yyyy'), 
  :conta_contabil,
  :centro_de_custo,
  :observacao)
  `

async function create(emp) { 
  const ParmUpload = Object.assign({}, emp);
  
  const registro_metadata = await
       database.simpleExecute(createSqlIntegracaoMetadata, 
                              [ ParmUpload.cpf,
                                ParmUpload.nome,
                                ParmUpload.filial,
                                ParmUpload.dt_nascimento,
                                ParmUpload.rg,
                                ParmUpload.uf,
                                ParmUpload.cidade,
                                ParmUpload.endereco,
                                ParmUpload.numero,
                                ParmUpload.bairro,
                                ParmUpload.cep,
                                ParmUpload.telefone_princial,
                                ParmUpload.telefone_secundario,
                                ParmUpload.data_admissao,
                                ParmUpload.empresa_pagadora,
                                ParmUpload.valor,
                                ParmUpload.tipo_de_documento,
                                ParmUpload.data_geracao,
                                ParmUpload.data_vencimento,
                                ParmUpload.conta_contabil,
                                ParmUpload.centro_de_custo,
                                ParmUpload.observacao
                              ]
                              , { autoCommit: true });
return ParmUpload;
}

module.exports.create = create;
 
