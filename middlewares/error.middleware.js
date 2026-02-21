const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    //take everything from error

    error.message = err.message;
    //take only the error message

    console.error(err);

    if (err.name === "CastError") {
      const message = "Resource not Found";
      error = new Error(message);
      error.statusCode = 404;
    }

    // mongoose duplicate key
    if (err.code === 11000) {
      const message = "Duplicate field value entered";
      error = new Error(message);
      error.statusCode = 400;
    }

    // mongoose validation error
    if (err.code === 11000) {
      const message = Object.values(err.errors).map((val) => val.message);
      //what map is doing its like doing a foreach and for each we take thier message
      error = new Error(message.join(", "));
      error.statusCode = 400;
    }

        //if non apply's we just take the statusCode givin to us else we make it 500(server error)
    res
      .status(error.statusCode || 500)
      .json({ succuss: false, error: error.message || "Serve Error" });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
