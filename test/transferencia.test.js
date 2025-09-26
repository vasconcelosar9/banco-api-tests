const request = require('supertest')
const { expect } = require('chai')

describe('Trasnferências', () => {
    describe('POST /transferencias', () => {
        it('Deve retornar sucesso com 201 quando o valor da transferência for igual ou maior que R$ 10,00', async () => {
            const resLogin = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    username: 'julio.lima',
                    senha: '123456'
                })
            const token = resLogin.body.token

            const res = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 2,
                    contaDestino: 1,
                    valor: 10.00,
                    token: ''
                })
            expect(res.status).to.equal(201)
        })
        it('Deve retornar falha com 422 quando o valor da transferência for menor que R$ 10,00', async () => {
            const resLogin = await request('http://localhost:3000')
            .post('/login')
            .set('Content-Type', 'application/json')
            .send({
                username: 'julio.lima',
                senha: '123456'
            })
            const token = resLogin.body.token

            const res = await request('http://localhost:3000')
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 2,
                    contaDestino: 1,
                    valor: 9.99,
                    token: ''
                })
            expect(res.status).to.equal(422)
        })
    })
})