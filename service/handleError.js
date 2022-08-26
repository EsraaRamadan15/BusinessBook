const handleDBError = (req,err) => {
    let message ='something went wrong';
    if (err.code === 11000) message = handleDuplicateField(req,err);
    if (err.name === 'ValidationError') message = handleValidationError(err);
    if (err.name === 'CastError') message = handleCastError(err);
    return message;
}



function handleValidationError (err) {
    console.log(err)
    let message;
    const key = Object.keys(err.errors);
    message = `Invalid ${err.errors[key[0]].path}: ${err.errors[key[0]].value}.`;
    if (err.errors[key[0]] && err.errors[key[0]].properties) {
      message = err.errors[key[0]].properties.message;
    }
    return message;
}

 function handleDuplicateField (req,err) {
    let message;
    const keys = Object.keys(err.keyValue);
    if (keys.includes('email')) message = req.t('User.user_exist');
    return message;
  }

  function handleCastError  (err)  {
    const message = `Invalid ${err.errors.path}: ${err.errors.value}.`;
    return message;
  }
export default handleDBError;