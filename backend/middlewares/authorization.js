const { recoverPersonalSignature } = require("eth-sig-util");
const { bufferToHex } = require("ethereumjs-util");

module.exports = (req, res, next) => {
  const { address, signature } = req.headers;

  try {
    const msg = "AUTH";
    const msgBufferHex = bufferToHex(Buffer.from(msg, "utf8"));
    const recover_address = recoverPersonalSignature({
      data: msgBufferHex,
      sig: signature,
    });

    if (address.toLowerCase() !== recover_address.toLowerCase()) {
      return res.status(401).json({
        error: "Signature verification failed",
      });
    }
  } catch (err) {
    return res.status(401).json({
      error: "Signature verification failed",
    });
  }
  next();
};
