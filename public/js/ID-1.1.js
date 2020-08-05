import { hexToDec } from 'hex2dec';

interface IDFactory {
  generateVisitID: () => string;
  generateDeviceID: () => string;
}

interface privateMethods {
  randomBits: (bitSize: number) => string;
  binToHex: (binary: string) => string;
}

interface binToHexLookup {
  [index: string]: string;
}

export const privateMethods: privateMethods = {
  randomBits: (bitSize) => {
    let bin = '';
    for (let i = 0; i < bitSize - 1; i += 1) {
      const randomBit = Math.floor(Math.random() * Math.floor(2));
      bin = bin.concat(randomBit.toString());
    }

    // Always return positive binary string
    return '0' + bin;
  },
  binToHex: (binary) => {
    const hex = [];
    const binToHexLookup: binToHexLookup = {
      '0b0000': '0',
      '0b0001': '1',
      '0b0010': '2',
      '0b0011': '3',
      '0b0100': '4',
      '0b0101': '5',
      '0b0110': '6',
      '0b0111': '7',
      '0b1000': '8',
      '0b1001': '9',
      '0b1010': 'a',
      '0b1011': 'b',
      '0b1100': 'c',
      '0b1101': 'd',
      '0b1110': 'e',
      '0b1111': 'f'
    };

    let start = binary.length - 4;
    let end = binary.length - 0;

    for (let i = 0; i < binary.length; i += 4) {
      const group = binary.substring(start, end).padStart(4, '0');
      hex.unshift(binToHexLookup[`0b${group}`]);
      start -= 4;
      end -= 4;
    }

    // Remove non-significant leading 0 in hexadecimal e.g. "0DD1CE"
    return hex.join('').replace(/^0+/, '')
  },
};

export const IDFactory = (): IDFactory => {
  return {
    generateVisitID: () => {
      const random22Bit = privateMethods.randomBits(22);
      // Date.now returns 41 bits and we're padding with '0' bit to make it positive
      const date42Bit = Date.now().toString(2).padStart(42, '0');
      const binary64Bit = date42Bit + random22Bit;
      const hexID = privateMethods.binToHex(binary64Bit);
      const decimal64Bit = hexToDec(hexID);

      return decimal64Bit;
    },
    generateDeviceID: () => {
      const randomBin64Bit = privateMethods.randomBits(64);
      const hexID = privateMethods.binToHex(randomBin64Bit);
      const decimal64Bit = hexToDec(hexID);

      return decimal64Bit;
    }
  };
};

