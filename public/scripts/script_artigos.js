function changeURL(acao, id) {
    id = id || "";

    window.location.href = acao + id;
}

function excluirArtigo(acao, id){
    if(confirm('Deseja realmente excluir o artigo?')){
        changeURL(acao, id);
    }
}
