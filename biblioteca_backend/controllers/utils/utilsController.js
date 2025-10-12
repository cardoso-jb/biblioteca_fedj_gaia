//SCRIPT COM AS FUNÇÕES QUE SÃO UTILITÁRIAS AS FUNÇÕES DE CONTROLE


//FUNÇÃO UTILITÁRIA PARA VERIFICAR SE TODOS OS CAMPOS NECESSÁRIOS PARA CADASTRO DOS LIVROS ESTÃO PREENCHIDOS
function verificacoesLivro (titulo, autor, codigoDeBarras) {
    const lengthCodigoDeBarra = 13;
    const apenasNumeros = (codigo) => /^\d+$/.test(codigo)
    if(!titulo || !autor || !codigoDeBarras) {
        return "Campos obrigatórios faltando"
    }
    if (codigoDeBarras.length != lengthCodigoDeBarra) {
        return "Código de barras inválido"
    }
    if(!apenasNumeros(codigoDeBarras))  {
        return "Insira caracteres de 0 a 9 apenas"
    }
}


//FUNÇÃO QUE CONTÉM O ALGORÍTMO DE HASHING PRÓPRIO PARA GERAR OS NÚMEROS DO CÓDIGO DE BARRAS A PARTIR DO TITULO DO LIVRO E DO AUTOR.
function gerarCodigoDeBarras(titulo, autor) {
    const strTituloLimpa = titulo.replace(/[\W_]/g, "").toLowerCase()
    const strAutorLimpa = autor.replace(/[\W_]/g, "").toLowerCase()
    const strLimpaConcat = strTituloLimpa.concat(strAutorLimpa)
    const number = strLimpaConcat.split("").map(char => BigInt(char.charCodeAt(0)))
    let hash = BigInt(0);
    for (const code of number) {
        hash = hash*BigInt(31)+code;
    }
    const hashPositivo = hash < 0 ? -hash : hash;
    const codigoDeBarras = String(hashPositivo).slice(-13).padStart(13, "0")
    return codigoDeBarras
}

//FUNÇÃO QUE NORMALIZA OS TEXTOS DIGITADOS PARA EXECUTAR A BUSCA DE UM LIVRO NA FUNÇÃO DE BUSCA DOS LIVROS.
function normalizarTexto(str) {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

//FUNÇÃO QUE FILTRA E BUSCA OS LIVROS A PARTIR DO CAMPO PREENCHIDO PELO USUÁRIO. UTILIZA A FUNÇÃO NORMALIZAR TEXTO.
function filtrarLivros(livros, titulo, autor) {

    return livros.filter(livro => {

        const tituloMatch = titulo? normalizarTexto(livro.titulo).includes(normalizarTexto(titulo)):true;

        const autorMatch = autor? normalizarTexto(livro.autor).includes(normalizarTexto(autor)):true;

        return tituloMatch && autorMatch;
    });
}

//EXPORTAÇÃO NOMEADA DAS FUNÇÕES
module.exports = { verificacoesLivro, gerarCodigoDeBarras, filtrarLivros,  }