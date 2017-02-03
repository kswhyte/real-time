const expect = require('chai').expect
const request = require('supertest')
const app = require('../server')

describe('GET Route(s)', () => {
  it('undefined routes -- respond with a 404', (done) => {
    request(app)
    .get('/not-real')
    .expect(404, done)
  })
  it('/ -- responds with success upon redirect', (done) => {
    request(app)
      .get('/')
      .expect(302, done)
  })
  it('/polls -- responds with success', (done) => {
    request(app)
    .get('/polls')
    .expect(200, done)
  })
  it('/vote/* -- responds with success', (done) => {
    request(app)
    .get('/vote/*')
    .expect(200, done)
  })
  it('/api/v1/polls/ -- responds with success', (done) => {
    request(app)
    .get('/api/v1/polls/')
    .expect(200, done)
  })
  it('/api/v1/polls/:id -- responds with success', (done) => {
    request(app)
      .get('/api/v1/polls/:id')
      .expect(200, done)
  })
})

describe('POST Route(s)', () => {
  it('responds with success', (done) => {
    request(app)
      .post('/polls')
      .expect(200, done)
  })
})
