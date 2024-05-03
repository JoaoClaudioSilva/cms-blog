function changeURL(acao, titulo) {
    titulo = titulo || "";

    window.location.href = acao + titulo.toLowerCase().replace(/\s+/g, "-");
}

function excluirArtigo(acao, titulo){
    if(confirm('Deseja realmente excluir o artigo?')){
        changeURL(acao, titulo);
    }
}
