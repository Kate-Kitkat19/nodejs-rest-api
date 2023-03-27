const { BASE_URL } = process.env;

const emailBody = (email, verificationToken) => {
  return {
    to: email,
    subject: "Verify your email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click here to verify your email</a>`,
  };
};

module.exports = emailBody;
