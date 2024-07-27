const errorHandlerMiddleware = (err, req, res, next) => {
  //err.status, err.message  controller folderindaki tasks.jsdeki degisiklige gore farklı gelebilir.
  return res.status(err.status).json({ msg: err.message });
};

module.exports = errorHandlerMiddleware;
