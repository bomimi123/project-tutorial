const crypto = require('crypto');
const stripeSecretKey = crypto.randomBytes(32).toString('hex');
console.log(stripeSecretKey);   