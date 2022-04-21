export const handleHttpError = (res, error) => {
  console.log("Error", error);
  res.status(500);
  res.send({ error: "ERROR" });
};

export const handleErrorResponse = (res, message = "something went wrong", code = 401) => {
  console.log("Error", message);
  res.send({ error: message });
  res.status(code);
};