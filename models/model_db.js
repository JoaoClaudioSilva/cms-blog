const { MongoClient, ObjectId } = require("mongodb");


// URI do banco de dados
const uri =
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster.18etlug.mongodb.net/?retryWrites=true&w=majority&appName=cluster`

module.exports = {


    /**
     * Insere um novo documento no banco de dados
     * @param {string} collection Nome da coleção para inserir
     * @param {object} data Objeto com os dados a serem inseridos
     * @returns {Promise<{ success: boolean, error: Error }>} Promessa de resolução da inserção
     */
    insere_collection: async (collection, data) => {
    
        const client = new MongoClient(uri);
    
        try {
            await client.connect();
            const db = client.db('data');
    
            if(!data.title || !data.content){
                throw new Error('Os campos não podem estar vazios');
            }

            await db.collection(collection).insertOne(data);

            return { success: true, message: 'Documento inserido com sucesso' }
    
        } 
        catch (err) {     
            console.log(err)
            return { success: false, message: 'Erro ao inserir documento', err: err }     
        } 
        finally {
            await client.close(); 
        }
    },


    /**
     * Consulta documentos no banco de dados
     * @param {string} collection Nome da coleção para consultar
     * @param {object} filter Objeto com o filtro de pesquisa
     * @returns {Promise<{ success: boolean, data: object, error: Error}>} Promessa de resolução da inserção
     */
    consulta_collection: async (collection, id) => {

        const client = new MongoClient(uri);

        try {
            await client.connect();
            const db = client.db('data');
            let answer = await db.collection(collection).find(id ? {_id: new ObjectId(id)} : {}).toArray();

            return { success: true, data: answer };
        } 
        catch (err) {     
            console.log(err)
            return { success: false, err: err };   
        } 
        finally {
            await client.close(); 
        }
    },


    /**
     * Exclui documentos no banco de dados
     * @param {string} collection Nome da coleção para excluir um documento
     * @param {object} filter Objeto com o filtro de pesquisa
     * @returns {Promise<{ success: boolean, data: object, error: Error}>} Promessa de resolução da exclusão
     */
    exclui_collection: async (collection, id) => {

        const client = new MongoClient(uri);

        try {
            await client.connect();
            const db = client.db('data');

            let answer = await db.collection(collection).deleteOne({ _id: new ObjectId(id)})    

            return { success: true, data: answer };
        } 
        catch (err) {     
            console.log(err)
            return { success: false, err: err };   
        } 
        finally {
            await client.close(); 
        }
    },


    /**
     * Edita documentos no banco de dados
     * @param {string} collection Nome da coleção para editar
     * @param {object} filter Objeto com o filtro de pesquisa
     * @returns {Promise<{ success: boolean, data: object, error: Error}>} Promessa de resolução da edição
     */
        edita_collection: async (collection, id , newContent) => {
    
            const client = new MongoClient(uri);
    
            try {
                await client.connect();
                const db = client.db('data');
    
                if(!newContent.title || !newContent.content){
                    throw new Error('Os campos não podem estar vazios');
                }

                let answer = await db.collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: newContent });
                
                return { success: true, data: answer };
            } 
            catch (err) {     
                console.log(err)
                return { success: false, err: err };   
            } 
            finally {
                await client.close(); 
            }
        },
}