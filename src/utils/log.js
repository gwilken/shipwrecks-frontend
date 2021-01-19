const log = (str, args) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(str, args ? args : '')
  }
}

module.exports = log;
