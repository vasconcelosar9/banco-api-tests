const request = require('supertest')
const { expect } = require('chai')
const { obterToken } = require('../helpers/autenticacao')

describe('Trasnferências', () => {
    describe('POST /transferencias', () => {
        it('Deve retornar sucesso com 201 quando o valor da transferência for igual ou maior que R$ 10,00', async () => {
            const token = await obterToken('julio.lima', '123456')

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
            const token = await obterToken('julio.lima', '123456')

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