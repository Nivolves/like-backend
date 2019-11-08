module.exports.DELETE_LIKE = 'DELETE FROM likes WHERE id = $1';
module.exports.GET_HISTORY = 'SELECT * FROM history WHERE userId = $1';
module.exports.GET_LIKES = 'SELECT * FROM likes WHERE userId = $1';
module.exports.INSERT_HISTORY =
  'INSERT INTO history(id, userId, query) VALUES($1, $2, $3)';
module.exports.INSERT_LIKE = 'INSERT INTO likes(id, userId) VALUES($1, $2)';
module.exports.INSERT_USER = 'INSERT INTO users(id) VALUES($1)';
