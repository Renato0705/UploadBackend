const multer     = require('multer') ;
const upload     = multer();
const { Readable }   = require('stream'); 
const readline       = require('readline'); 


  const Funcionarios = [{
      cpf: Number,
      nome: String,
      filial: String,
      dt_nascimento: Date,
      rg:	String,
      uf: String,
      cidade: String,
      endereco: String,
      numero: Number,
      bairro: String,
      cep: String,
      telefone_princial: String,
      telefone_secundario: String,
      data_admissao: Date,
      empresa_pagadora: String,
      valor: Number,
      tipo_de_documento: Number,
      data_geracao: Date,
      data_vencimento: Date,
      conta_contabil: Number,
      centro_de_custo: Number,
      observacao: String
    }]
   

uploadFile = async  (request, response, next )=> {
    const { file } = request;
    const {buffer} = file;
    
    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);

   

    const productsLine = readline.createInterface({
      input: readableFile
     })
   
     const funcionarios = [Funcionarios];
  
    for await (let line of productsLine){
       const productLineSplit = line.split(";");
      
       funcionarios.push({
        cpf: Number(productLineSplit[0]),
        nome: productLineSplit[1],
        filial: productLineSplit[2],
        dt_nascimento: productLineSplit[3],
        rg:	productLineSplit[4],
        uf: productLineSplit[5],
        cidade: productLineSplit[6],
        endereco: productLineSplit[7],
        numero: productLineSplit[8],
        bairro: productLineSplit[9],
        cep: productLineSplit[10],
        telefone_princial: productLineSplit[11],
        telefone_secundario: productLineSplit[12],
        data_admissao: productLineSplit[13],
        empresa_pagadora: productLineSplit[14],
        valor: productLineSplit[15],
        tipo_de_documento: productLineSplit[16],
        data_geracao: productLineSplit[17],
        data_vencimento: productLineSplit[18],
        conta_contabil: productLineSplit[19],
        centro_de_custo: productLineSplit[20],
        observacao: productLineSplit[21]
       })
     }  
     dados = response.json(funcionarios) 
     uploadModel.create();
    return response.json(dados)   
     
  }

  function exportaDados () {
    console.log(dados);
    return dados
  }
module.exports.exportaDados = exportaDados;

module.exports.uploadFile = uploadFile;
