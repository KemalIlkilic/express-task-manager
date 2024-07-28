const { CustomAPIError } = require("../errors/custom-error");
// Place the error handler at the end of your middleware chain: (app.js)
const errorHandlerMiddleware = (err, req, res, next) => {
  //err.status, err.message  controller folderindaki tasks.jsdeki degisiklige gore farklı gelebilir.
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(500)
    .json({ msg: "Something went wrong, please try again" });
};

module.exports = errorHandlerMiddleware;

//Use next(error) in other middleware to pass errors to this handler.

/*
1)
In other middleware or route handlers, when you encounter an error, you pass it to the next middleware using next(error):
app.get('/some-route', (req, res, next) => {
    try {
      // Some code that might throw an error
    } catch (error) {
      next(error); // This passes the error to the next middleware
    }
  });
  2)
  Express recognizes that you've passed an error to next(), 
  so it skips all other non-error-handling middleware and routes, and goes directly to your error handling middleware.
  3) Your errorHandler function then receives this error as its first parameter (err).
  4) So, next(error) is not the name of your middleware, but the method used to trigger it when an error occurs elsewhere in your application.
  */

/*
Error Handler Triggering:
  When you call next(error) anywhere in your application, Express knows to skip regular middleware and look for error-handling middleware.
  Identifying Error-Handling Middleware:
  Express distinguishes error-handling middleware from regular middleware by the number of arguments the function accepts:

Regular middleware: function(req, res, next)
Error-handling middleware: function(err, req, res, next)

The presence of four parameters, with the first one being the error, is what tells Express this is an error-handling middleware.
  */
