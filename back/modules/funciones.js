//modulo para las funciones
//Función para encriptar la contraseña
const CryptoJS = require("crypto-js");
const SHA256 = require("crypto-js/sha256");
function stringBase64Encode(input) {
  let utf8Input = CryptoJS.enc.Utf8.parse(input);
  return CryptoJS.enc.Base64.stringify(utf8Input);
}

module.exports = stringBase64Encode;
