const request = require('supertest')

const obterToken = async (usuario, senha) => {
    const resLogin = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({
            username: usuario,
            senha: senha
        })
    return resLogin.body.token
}

module.exports = {
    obterToken
}