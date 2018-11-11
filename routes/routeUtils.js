function RouteError(statusCode, errHandler, handlerArgs = []) {
  const routeError = Object.create(Error);
  routeError.status = statusCode;
  routeError.handler = errHandler;
  routeError.args = handlerArgs;
  return routeError;
}

module.exports = {
  RouteError
}
