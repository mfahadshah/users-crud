const ValidationErrors = (errorsList) => {
  var mapped = errorsList.errors.map((item) => ({ [item.param]: item.msg }));
  var errors = Object.assign({}, ...mapped);
  return { errors };
};
module.exports = { ValidationErrors };
