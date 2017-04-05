
module.exports = {
  formatDate(date) {
    let postfix;
    if (date.substring(16, 18) <= 11) {
      postfix = 'am'
    }else {
      postfix = 'pm'
    }
    return `${date.substring(0, date.length - 12)} ${postfix}`;
  }
}