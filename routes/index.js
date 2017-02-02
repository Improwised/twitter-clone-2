const express = require(`express`);
const DB = require(`../helpers/db`);
const multer = require('multer');
const path = require('path');

const upload = multer({ dest: path.resolve(__dirname, '../public/images/') });
const router = express.Router();


// sGET: /
router.get(`/`, (req, res, next) => {
  // sConstuct and run a simple query
  const query = DB.builder()
    .select()
    .function(`NOW()`)
    .toParam();

  DB.executeQuery(query, (error, results) => {
    if (error) {
      next(error);
      return;
    }

    res.render(`index`, {
      title: `Time from the database is ${results.rows[0].now}`,
    });
  });
});


// ssession isn't required to be set
router.get(`/login`, (req, res, next) => {
  const query = DB.builder()
    .select()
    .toParam();
  DB.executeQuery(query, (error, results) => {
    if (error) {
      next(error);
      return;
    }
    res.render(`login`, {
    });
  });
});


// ssession isn't required to be set
router.post(`/check`, (req, res, next) => {
  const email1 = req.body.email1;
  const password1 = req.body.password1;
  const session = req.session;
  const query = DB.builder()
    .select()
    .from(`users`)
    .where(`email = ? AND password= ? `, email1, password1)
    .toParam();

  DB.executeQuery(query, (error, results) => {
    if (error) {
      next(error);
    } else if (results.rows.length === 0) {
      res.render(`failed`, {
      });
    } else {
      session.user_id = results.rows[0].id;
      session.name = `${results.rows[0].first_name}  ${results.rows[0].last_name}`;
      return res.redirect(`/home`);
    }
  });
});


// session is required to be set
router.get(`/home`, (req, res, next) => {
  if (req.session.user_id) {
    const query = DB.builder()
    .select()
    .field(`first_name`)
    .field(`last_name`)
    .field(`propic`)
    .from(`users`)
    .where(`id= ? `, req.session.user_id)
    .toParam();
    DB.executeQuery(query, (error, results) => {
      if (error) {
        next(error);
        return;
      }

      res.render(`home`, {
        data: results.rows[0],
      });
    });
  } else {
    res.redirect(`/failed`);
  }
});


// session isn't required to be set
router.get(`/failed`, (req, res) => {
  res.render(`failed`, {
  });
});


// session is required to be set
router.get(`/post_tweet`, (req, res) => {
  if (req.session.user_id) {
    res.render(`post_tweet`, {
    });
  } else {
    res.redirect(`/failed`);
  }
});


// ssession is required to be set
// sbecause we can insert value without it but unable to go to home page
// sand it take null values in username field
// sand our requirement is user can't insert into table without logging in
router.post(`/insert_tweet`, (req, res, next) => {
  if (req.session.user_id) {
    const tweet1 = req.body.tweet;
    const query = DB.builder()
    .insert()
    .into(`tweets`)
    .set(`id`, req.session.user_id)
    .set(`user`, req.session.name)
    .set(`tweet`, tweet1)
    .toParam();
    DB.executeQuery(query, (error, results) => {
      if (error) {
        next(error);
        return;
      }
      res.redirect(`/home`);
    });
  } else {
    res.redirect(`/failed`);
  }
});


// ssession isn't required to be set
router.post(`/insert`, (req, res, next) => {
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const email = req.body.email;
  const password = req.body.password;
  const query = DB.builder()
  .select()
  .from(`users`)
  .where(`email = ? `, email)
  .toParam();
  DB.executeQuery(query, (error, results) => {
    if (error) {
      next(error);
      return;
    }
    if (results.rows.length === 0) {
      const query1 = DB.builder()
      .insert()
      .into(`users`)
      .set(`first_name`, firstName)
      .set(`last_name`, lastName)
      .set(`email`, email)
      .set(`password`, password)
      .toParam();
      DB.executeQuery(query1, (error1, results1) => {
        if (error1) {
          next(error1);
        } else {
          res.redirect(`/login`);
        }
      });
    } else {
      res.redirect(`/failed`);
    }
  });
});


// session is required to be set
router.get(`/timeline`, (req, res, next) => {
  if (req.session.user_id) {
    const query = DB.builder()
      .select()
      .field('first_name')
      .field('last_name')
      .field('tweet')
      .field('time')
      .from('users', 'u')
      .join( DB.builder().select().from('tweets'), 't', 'u.id = t.id')
      .where("t.id IN ? OR t.id= ? ",(DB.builder().select().field("followingid").from("followers").where("id = ?",req.session.user_id)),req.session.user_id)
      .order("time", false)
      .toParam();
    DB.executeQuery(query, (error, results) => {
      if (error) {
        next(error);
        return;
      }

      console.log(results.rows);
      res.render(`timeline`, {
        data: results.rows,
      });
    });
  } else {
    res.redirect(`/failed`);
  }
});


// session is required to be set
router.get(`/search_user`, (req, res, next) => {
  if (req.session.user_id) {
    const query = DB.builder()
    .select()
    .field(`id`)
    .field(`first_name`)
    .field(`last_name`)
    .from(`users`)
    .where(`id NOT IN ? AND id!= ?`, DB.builder().select().field('followingid')
    .from('followers')
    .where('id = ?', req.session.user_id), req.session.user_id)
    .toParam();
    DB.executeQuery(query, (error, results) => {
      if (error) {
        next(error);
        return;
      }

      res.render(`search_user`, {
        data1: results.rows,
      });
    });
  } else {
    res.redirect(`/failed`);
  }
});


// session is required to be set
router.get(`/follow/:user_id`, (req, res, next) => {
  if (req.session.user_id) {
    const followingid = req.params.user_id;
    const query = DB.builder()
    .insert()
    .into(`followers`)
    .set(`id`, req.session.user_id)
    .set(`followingid`, followingid)
    .toParam();

    DB.executeQuery(query, (error, results) => {
      if (error) {
        next(error);
        return;
      }
      res.redirect(`/search_user`);
    });
  }
});


// session is required to be set
router.get(`/followers`, (req, res, next) => {
  if (req.session.user_id) {
    const query = DB.builder()
    .select()
    .field(`id`)
    .field(`first_name`)
    .field(`last_name`)
    .from(`users`)
    .where(`id IN ? AND id!= ?`, DB.builder().select().field('id')
    .from('followers')
    .where('followingid = ?', req.session.user_id), req.session.user_id)
    .toParam();
    DB.executeQuery(query, (error, results) => {
      if (error) {
        next(error);
        return;
      }

      res.render(`followers`, {
        data1: results.rows,
      });
    });
  } else {
    res.redirect(`/failed`);
  }
});


// session is required to be set
router.get(`/followers/:user_id`, (req, res, next) => {
  if (req.session.user_id) {
    const followingid = req.params.user_id;
    const query = DB.builder()
    .delete()
    .from(`followers`)
    .where(`id = ?`, followingid)
    .toParam();

    DB.executeQuery(query, (error, results) => {
      if (error) {
        next(error);
        return;
      }
      res.redirect(`/followers`);
    });
  }
});

// session is required to be set
router.get(`/following`, (req, res, next) => {
  if (req.session.user_id) {
    const query = DB.builder()
    .select()
    .field(`id`)
    .field(`first_name`)
    .field(`last_name`)
    .from(`users`)
    .where(`id IN ? AND id!= ?`, DB.builder().select().field('followingid').from('followers')
    .where('id = ?', req.session.user_id), req.session.user_id)
    .toParam();
    DB.executeQuery(query, (error, results) => {
      if (error) {
        next(error);
        return;
      }

      res.render(`following`, {
        data1: results.rows,
      });
    });
  } else {
    res.redirect(`/failed`);
  }
});


// session is required to be set
router.get(`/following/:user_id`, (req, res, next) => {
  if (req.session.user_id) {
    const followingid = req.params.user_id;
    const query = DB.builder()
    .delete()
    .from(`followers`)
    .where(`followingid = ?`, followingid)
    .toParam();

    DB.executeQuery(query, (error, results) => {
      if (error) {
        next(error);
        return;
      }
      res.redirect(`/following`);
    });
  }
});


// session isn't required to be set
router.get(`/propic`, (req, res, next) => {
  if (req.session.user_id) {
    const query = DB.builder()
    .select()
    .from(`users`)
    .where(`id= ? `, req.session.user_id)
    .toParam();
    DB.executeQuery(query, (error, results) => {
      if (error) {
        next(error);
        return;
      }
      res.render(`propic`, {
        data: results.rows,

      });
    });
  } else {
    res.redirect(`/failed`);
  }
});


// ssession is required to be set
router.post('/propic', upload.single(`file_upload`), (req, res, next) => {
  if (req.session.user_id) {
    let propic = [``];
    if (req.file) {
      propic = req.file.filename;
    } else {
      propic = ``;
    }
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const password = req.body.password;

    if (propic.length === 0) {
      const query = DB.builder()
       .update()
       .table('users')
       .set('first_name', firstName)
       .set('last_name', lastName)
       .set('password', password)
       .where('id = ?', req.session.user_id)
       .toParam();
      DB.executeQuery(query, (error, results) => {
        if (error) {
          next(error);
          return;
        }
        res.redirect('/home');
      });
    } else {
      const query = DB.builder()
      .update()
      .table('users')
      .set('first_name', firstName)
      .set('last_name', lastName)
      .set('password', password)
      .set('propic', propic)
      .where('id = ?', req.session.user_id)
      .toParam();
      DB.executeQuery(query, (error, results) => {
        if (error) {
          next(error);
          return;
        }
        res.redirect('/home');
      });
    }
  } else {
    res.redirect(`/failed`);
  }
});

// ssession isn't required to be set
router.get(`/logout`, (req, res) => {
  req.session.destroy();
  res.render(`login`, {
  });
});


module.exports = router;
