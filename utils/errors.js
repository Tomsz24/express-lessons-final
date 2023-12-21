// eslint-disable-next-line max-classes-per-file
class ValidationError extends Error {}

class NotFoundError extends Error {}

function handleError(err, req, res, next) {
  if (err instanceof NotFoundError) {
    res.status(404).render('error', {
      error: 'Nie mozna znlasec uzytkownika',
    });
    return;
  }

  console.error('konsola bledu', req.body);

  res.status(err instanceof ValidationError ? 400 : 500);

  res.render('error', {
    error:
      err instanceof ValidationError
        ? err.message
        : 'Przepraszamy sprobuj ponownie pozniej',
  });
}

module.exports = {
  handleError,
  ValidationError,
  NotFoundError,
};
