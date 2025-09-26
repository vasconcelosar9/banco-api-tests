const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')
const postTransferencias = require('../fixtures/postTransferencias.json')

describe('Trasnferências', () => {
    describe('POST /transferencias', () => {
        let token
        beforeEach(async () => {
            token = await obterToken('julio.lima', '123456')
        })

        it('Deve retornar sucesso com 201 quando o valor da transferência for igual ou maior que R$ 10,00', async () => {
            const bodyTransferencias = { ...postTransferencias }
            const res = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)
            expect(res.status).to.equal(201)
        })
        it('Deve retornar falha com 422 quando o valor da transferência for menor que R$ 10,00', async () => {
            const bodyTransferencias = { ...postTransferencias }
            bodyTransferencias.valor = 9.99
            const res = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)
            expect(res.status).to.equal(422)
        })
    })
})