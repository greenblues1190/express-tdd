// 테스트 코드

const request = require('supertest');
const should = require('should');
const app = require('../../index');

describe('GET /api/users는', () => {
  describe('성공 시', () => {
    it('유저 객체를 담은 배열로 응답한다.', (done) => {
      request(app)
        .get('/api/users')
        .end((err, res) => {
          const result = res.body;
          result.should.be.instanceOf(Array);
          done();
        });
    });

    it('최대 limit 갯수만큼 응답한다.', (done) => {
      request(app)
        .get('/api/users?limit=2')
        .end((err, res) => {
          const result = res.body;
          result.length.should.be.exactly(2);
          done();
        });
    });
  });

  describe('실패 시', () => {
    it('limit이 숫자형이 아니면 400을 응답한다.', (done) => {
      request(app).get('/api/users?limit=two').expect(400).end(done);
    });

    it('offset이 숫자형이 아니면 400을 응답한다.', (done) => {
      request(app).get('/api/users?offset=one').expect(400).end(done);
    });
  });
});

describe('GET /api/users/:id는', () => {
  describe('성공 시', () => {
    it('id가 1인 유저 객체를 반환한다.', (done) => {
      request(app)
        .get('/api/users/1')
        .end((err, res) => {
          const result = res.body;
          result.should.have.property('id', 1);
          done();
        });
    });
  });

  describe('실패 시', () => {
    it('id가 숫자가 아닐 경우 400으로 응답한다.', (done) => {
      request(app).get('/api/users/one').expect(400).end(done);
    });

    it('id로 유저를 찾을 수 없을 경우 404로 응답한다.', (done) => {
      request(app).get('/api/users/999999999').expect(404).end(done);
    });
  });
});

describe('DELETE /api/users/:id는', () => {
  describe('성공 시', () => {
    it('204를 응답한다.', (done) => {
      request(app).delete('/api/users/4').expect(204).end(done);
    });
  });

  describe('실패 시', () => {
    it('id가 숫자가 아닐 경우 400으로 응답한다.', (done) => {
      request(app).delete('/api/users/one').expect(400).end(done);
    });
  });
});

describe('POST /api/users/register는', () => {
  describe('성공 시', () => {
    const name = 'daniel';
    let body;

    before((done) => {
      request(app)
        .post('/api/users/register')
        .send({ name })
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });

    it('생성된 유저 객체를 반환한다.', () => {
      body.should.have.property('id');
    });

    it('입력한 name을 반환한다.', () => {
      body.should.have.property('name', name);
    });
  });

  describe('실패 시', () => {
    it('name 파라미터 누락 시 400을 반환한다.', (done) => {
      request(app).post('/api/users/register').send({}).expect(400).end(done);
    });

    it('name이 중복일 경우 409를 반환한다.', (done) => {
      request(app)
        .post('/api/users/register')
        .send({ name: 'alice' })
        .expect(409)
        .end(done);
    });
  });
});

describe('PUT /api/users/:id는', () => {
  describe('성공 시', () => {
    it('변경된 name을 응답한다.', (done) => {
      const name = 'brown';

      request(app)
        .put('/api/users/2')
        .send({ name })
        .end((err, res) => {
          const user = res.body;
          user.should.have.property('name', name);
          done();
        });
    });
  });

  describe('실패 시', () => {
    it('정수가 아닌 id일 경우 400으로 응답한다.', (done) => {
      request(app)
        .put('/api/users/two')
        .send({ name: 'brown' })
        .expect(400)
        .end(done);
    });

    it('name이 없을 경우 400으로 응답한다.', (done) => {
      request(app).put('/api/users/2').send({}).expect(400).end(done);
    });

    it('없는 유저일 경우 404로 응답한다.', (done) => {
      request(app)
        .put('/api/users/9999999')
        .send({ name: 'noone' })
        .expect(404)
        .end(done);
    });

    it('name이 중복일 경우 409를 반환한다.', (done) => {
      request(app)
        .put('/api/users/2')
        .send({ name: 'claire' })
        .expect(409)
        .end(done);
    });
  });
});
