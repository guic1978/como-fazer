const api = require('../api')

const novaForm = async(req, res) => {
    const categorias = await api.list('categorias')
    res.render('publicacoes/nova', {categorias})
}

const nova = async(req,res) => {
    await api.create('publicacoes/' + req.body.categoria, {
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    })

    res.redirect(`/publicacoes/categoria/${req.body.categoria}`)
}

const list = async(req,res) => {
    const categoria = await api.get('categorias', req.params.categoria)
    const publicacoes = await api.list('publicacoes/' + categoria.id)

    res.render('publicacoes/index', {
        publicacoes,
        categoria
    })
}

const editForm = async(req, res) => {
    const categoria = req.params.categoria
    const publicacao = await api.get('publicacoes/'+categoria, req.params.id)
    
    res.render('publicacoes/editar', {
        publicacao,
        categoria
    })
}

const editar = async(req, res) => {
    await api.update('publicacoes/'+req.params.categoria, req.params.id,{
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
    })

    res.redirect(`/publicacoes/categoria/${req.params.categoria}`)
}

const excluir = async(req, res) => {
    api.apagar('publicacoes/'+req.params.categoria, req.params.id)
    
    res.redirect(`/publicacoes/categoria/${req.params.categoria}`)
}

module.exports = {
    novaForm, nova, list, excluir, editForm, editar
}