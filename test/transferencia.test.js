const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')
const postTransferencias = require('../fixtures/postTransferencias.json')

describe('Trasnferências', () => {
    let token
    beforeEach(async () => {
        token = await obterToken('julio.lima', '123456')
    })
    describe('POST /transferencias', () => {
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

    describe('GET /transferencias/{id}', () => {
        it('Deve retornar sucesso com 200 e dados iguais ao registro de transferência contido no banco de dados quando o ID for válido', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/transferencias/10')
                .set('Authorization', `Bearer ${token}`)

            expect(res.status).to.equal(200)
            expect(res.body.id).to.equal(10)
            expect(res.body.conta_origem_id).to.equal(2)
            expect(res.body.conta_destino_id).to.equal(1)
            expect(res.body.valor).to.equal(10.00)
        })
    })
    describe('GET /transferencias', () => {
        it('Deve retornar 10 elementos na paginação quando informar limite de 10 registros', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/transferencias?page=1&limit=10')
                .set('Authorization', `Bearer ${token}`)

            expect(res.status).to.equal(200)
            expect(res.body.limit).to.equal(10)
            expect(res.body.transferencias).to.have.lengthOf(10)
        })
    })
})