module.exports = async (schema, reqData, res, next) => {
  try {
    await schema.validateAsync(reqData);
    next();
  } catch (error) {
    return res.json({ message: 'Invalid request data', error });
  }
}