function generateDeviceID() {
  const maxUnsigned32Bit = 4294967295;
  const randomNumberOne = getRandomInt(maxUnsigned32Bit);
  const randomNumberTwo = getRandomInt(maxUnsigned32Bit);
  const random64Bit = randomNumberOne.toString() + randomNumberTwo.toString();

  return random64Bit;
}

function generateVisitID() {
  const number22Bit = randomBits(22);
  const date41Bit = Date.now().toString(2);
  const date42BitPadded = date41Bit.padStart(42, '0');
  const id = date42BitPadded + number22Bit;

  const first32Bits = id.substring(0, 32); // get first 32 bits
  const second32Bits = id.substring(32, 64); // get second 32 bits

  const number64Bit = parseInt(first32Bits, 2).toString() + parseInt(second32Bits, 2).toString();

  return number64Bit;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function dec2bin(dec){
  return (dec >>> 0).toString(2);
}

const randomBits = bitSize => Math.trunc(Math.random() * (1 << bitSize)).toString(2).padStart(bitSize, '0');

const results = generateVisitID();

console.log(results);
