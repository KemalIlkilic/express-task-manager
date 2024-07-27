/*
Where do req, res, and next come from?
These parameters are provided by Express.js when it calls a route handler.
Express passes these objects to every middleware and route handler function it invokes.
Why do we have access to them?
The function we're returning from asyncWrapper is designed to be used as an Express route handler.
When Express calls this function, it will provide the req, res, and next arguments.
next() without parameter invokes the next route handler OR next middleware in framework.
next() : move control to next function in same route. case of multiple functions in single route.
next('route') :move control to next route by skipping all remaining function in current route.
next(err) : move control to error middleware
*/

const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = asyncWrapper;
