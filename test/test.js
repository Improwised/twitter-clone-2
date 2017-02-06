const request = require('supertest');
const should = require('should');
const app = require('../app.js');

// let describe;
// let it;
describe('GET /', () => {
  it('it should response index.pug page', (done) => {
    // the request-object is the supertest top level api
    request(app)
      .get('/')
      .expect('Content-type', 'text/html; charset=utf-8')
      .expect(200, done); // note that we're passing the done as parameter to the expect
  });
});

describe('GET /login', () => {
  it('it should response login.pug page', (done) => {
    // the request-object is the supertest top level api
    request(app)
      .get('/login')
      .expect('Content-type', 'text/html; charset=utf-8')
      .expect(200, done); // note that we're passing the done as parameter to the expect
  });
});

describe('POST /check', () => {
  it('it should response home.pug page', (done) => {
    // the request-object is the supertest top level api
    const register = {
      email1: 'b@b',
      password1: 'b',

    };
    request(app)
      .post('/check')
      .send(register)
      .expect('Content-type', 'text/html; charset=utf-8')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.status.should.be.equal(200);
          done();
        }
      });
  });
});

describe('GET /home', () => {
  it('it should response home.pug page', (done) => {
    request(app)
      .get('/home')
      .expect('Content-type', 'text/plain; charset=utf-8')
      .expect(302, done);
  });
});

describe('GET /failed', () => {
  it('it should response failed.pug page', (done) => {
    // the request-object is the supertest top level api
    request(app)
      .get('/failed')
      .expect('Content-type', 'text/html; charset=utf-8')
      .expect(200, done); // note that we're passing the done as parameter to the expect
  });
});

describe('GET /post_tweet', () => {
  it('it should response post_tweet.pug page', (done) => {
    request(app)
      .get('/post_tweet')
      .expect('Content-type', 'text/plain; charset=utf-8')
      .expect(302, done);
  });
});

describe('POST /insert_tweet', () => {
  it('it should response home.pug page', (done) => {
    // the request-object is the supertest top level api
    const register = {
      first_name: 'Test',
      last_name: 'User',
      email: 'a@a',
      password: 'a',
    };
    request(app)
      .post('/insert_tweet')
      .send(register)
      .expect('Content-type', 'text/plain; charset=utf-8')
      .expect(302)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.status.should.be.equal(302);
          done();
        }
      });
  });
});

describe('POST /insert', () => {
  it('it should response login.pug page', (done) => {
    // the request-object is the supertest top level api
    const register = {
      first_name: 'Test',
      last_name: 'User',
      email: '@c',
      password: 'c',
    };
    request(app)
      .post('/insert')
      .send(register)
      .expect('Content-type', 'text/plain; charset=utf-8')
      .expect(302)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.status.should.be.equal(302);
          done();
        }
      });
  });
});

describe('GET /timeline', () => {
  it('it should response timeline.pug page', (done) => {
    request(app)
      .get('/timeline')
      .expect(302, done);
  });
});

describe('GET /search_user', () => {
  it('it should response search_user.pug page', (done) => {
    request(app)
      .get('/search_user')
      .expect(302, done);
  });
});

describe('GET/follow/1', () => {
  it('it should response search_user.pug page', (done) => {
    // this.timeout(500);
    setTimeout(done, 300);
    request(app)
    .get('/follow/1')
    .expect('Content-type', 'text/html; charset=utf-8')
    .expect(200, done);
  });
});

describe('GET /followers', () => {
  it('it should response followers.pug page', (done) => {
    request(app)
      .get('/followers')
      .expect(302, done);
  });
});

describe('GET/followers/1', () => {
  it('it should response followers.pug page', (done) => {
    // this.timeout(500);
    setTimeout(done, 300);
    request(app)
    .get('/followers/1')
    .expect('Content-type', 'text/html; charset=utf-8')
    .expect(200, done);
  });
});

describe('GET /following', () => {
  it('it should response following.pug page', (done) => {
    request(app)
      .get('/following')
      .expect(302, done);
  });
});

describe('GET/following/1', () => {
  it('it should response following.pug page', (done) => {
    // this.timeout(500);
    setTimeout(done, 300);
    request(app)
    .get('/following/1')
    .expect('Content-type', 'text/html; charset=utf-8')
    .expect(200, done);
  });
});

describe('GET /propic', () => {
  it('it should response propic.pug page', (done) => {
    request(app)
      .get('/propic')
      .expect('Content-type', 'text/plain; charset=utf-8')
      .expect(302, done);
  });
});

describe('POST /propic', () => {
  it('it should response home.pug page', (done) => {
    const register = {
      profile: 'propic.jpg',
    };
    request(app)
      .post('/propic')
      .send(register)
      .expect('Content-type', 'text/plain; charset=utf-8')
      .expect(302)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.status.should.be.equal(302);
          done();
        }
      });
  });
});

describe('GET /logout', () => {
  it('it should response login.pug page', (done) => {
    request(app)
      .get('/logout')
      .expect(200, done);
  });
});
