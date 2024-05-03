const fs = require('fs').promises;
const { existsSync } = require('fs');
const valid_artigos = require('../validations/valid_artigos');

const hasArtigos = () => {
    if(existsSync('./artigos.json')) {
        return { success: true, message: 'Existe arquivo' };
    }
    else{
        fs.appendFile('./artigos.json', '{ "artigos": [] }', (err) => {
            return { success: false, message: 'Erro ao criar arquivo', err: err };
        });

        return { success: true, message: 'Arquivo criado com sucesso' };
    }
}

module.exports = {

    consulta_artigo: async (tituloArtigo) => {
        if(hasArtigos().success){
            try {
                const answer = await fs.readFile('./artigos.json', 'utf8');
                const artigos = JSON.parse(answer).artigos;
        
                if(!artigos || artigos.length === 0) {
                    return { success: false, message: 'Nenhum artigo encontrado' };
                }
        
                if (tituloArtigo) {
                    const filteredArtigos = artigos.filter(a => a.titulo.toLowerCase() === tituloArtigo);
                    if (filteredArtigos.length > 0) {
                        return { success: true, message: 'Artigo encontrado com sucesso', artigos: filteredArtigos };
                    } else {
                        return { success: false, message: 'Artigo não encontrado' };
                    }
                } else {
                    return { success: true, message: 'Arquivo lido com sucesso', artigos: artigos };
                }
            } catch (err) {
                return { success: false, message: 'Erro ao ler o arquivo', err: err };
            }
        }
    },

    insere_artigo: async (novoArtigo) => {
        try{
            await valid_artigos.valida_artigo(novoArtigo);
            if(hasArtigos().success){
                try {
                    const answer = await fs.readFile('./artigos.json', 'utf8');
                    const artigos = JSON.parse(answer).artigos;
        
                    artigos.push(novoArtigo);
            
                    await fs.writeFile('./artigos.json', JSON.stringify({ artigos: artigos }, null, 2), 'utf8');
            
                    return { success: true, message: 'Artigo adicionado com sucesso' };
                } catch (err) {
                    return { success: false, message: 'Erro ao adicionar artigo', err: err };
                }
            }
        }
        catch(error){
            return { success: false, message: 'Erro ao validar artigo', error: error }
        }
        
    },

    exclui_artigo: async (tituloArtigo) => {
        if(hasArtigos().success){
            try {
                const answer = await fs.readFile('./artigos.json', 'utf8');
                const artigos = JSON.parse(answer).artigos;
        
                const index = artigos.findIndex(a => a.titulo.toLowerCase() === tituloArtigo);
        
                if (index === -1) {
                    return { success: false, message: 'Artigo não encontrado' };
                }
        
                artigos.splice(index, 1);
    
                await fs.writeFile('./artigos.json', JSON.stringify({ artigos: artigos }, null, 2), 'utf8');
        
                return { success: true, message: 'Artigo excluído com sucesso' };
            } catch (err) {
                return { success: false, message: 'Erro ao excluir artigo', err: err };
            }
        }    
    },


    edita_artigo: async (tituloArtigo, novoConteudo) => {
        try{
            await valid_artigos.valida_artigo(novoConteudo);
            if(hasArtigos().success){
                try {
                    const answer = await fs.readFile('./artigos.json', 'utf8');
                    const artigos = JSON.parse(answer).artigos;
            
                    const index = artigos.findIndex(a => a.titulo.toLowerCase() === tituloArtigo);
            
                    if (index === -1) {
                        return { success: false, message: 'Artigo não encontrado' };
                    }
            
                    artigos[index].titulo = novoConteudo.titulo;
                    artigos[index].conteudo = novoConteudo.conteudo;
                    
                    await fs.writeFile('./artigos.json', JSON.stringify({ artigos: artigos }, null, 2), 'utf8');
            
                    console.log(artigos[index]);
                    return { success: true, message: 'Artigo editado com sucesso' };
                } catch (err) {
                    return { success: false, message: 'Erro ao editar artigo', err: err };
                }
            }
        }
        catch(error){
            return { success: false, message: 'Erro ao validar artigo', error: error }
        }

    }
}