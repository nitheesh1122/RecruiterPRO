const twilio = require('twilio');

const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendOTP = async (phoneNumber) => {
  return client.verify
    .services(process.env.TWILIO_SERVICE_SID)
    .verifications.create({
      to: phoneNumber,
      channel: 'sms'
    });
};

const verifyOTP = async (phoneNumber, code) => {
  return client.verify
    .services(process.env.TWILIO_SERVICE_SID)
    .verificationChecks.create({
      to: phoneNumber,
      code
    });
};

module.exports = { sendOTP, verifyOTP };
