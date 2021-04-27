import { hexToDec } from 'hex2dec';

/**
 * @description Helper methods to create and convert binary strings
 */
export const privateMethods = {
  /**
   * @description Create a random binary string no greater than 63 bits
   * @param {number} bitSize - A number between 1 and 63
   * @returns {string} A binary string of bitSize length
   */
  randomBits: (bitSize) => {
    // Bit size cannot exceed 63 bits to ensure a positive number
    const size = bitSize > 63 ? 63 : bitSize;
    let bin = '';

    for (let i = 0; i < size; i += 1) {
      bin += Number(Math.random() >= 0.5);
    }

    return bin;
  },
  /**
   * @description Convert a binary string to hexidecimal
   * @param {string} binary - A string of 1's and 0's to represent a value
   * @returns {string} A hexidecimal
   */
  binToHex: (binary) => {
    let hex = '';
    const binToHexLookup = {
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

    for (let i = 0; i < binary.length; i += 4) {
      const group = binary.substring(binary.length - (i + 4), binary.length - i).padStart(4, '0');
      hex = binToHexLookup[`0b${group}`] + hex;
    }

    // Remove non-significant leading 0 in hexadecimal e.g. "0dd1ce"
    return hex.replace(/^0+/, '');
  }
};

/**
 * @description A factory for creating visit and device IDs
 * @returns {object} Contains two functions for creating new visit and device IDs
 */
export const IDFactory = () => {
  return {
    /**
     * @description Create a randomly generated visit ID
     * @returns {string} A 64 bit number as a string that
     * when converted results in a 64 bit number
     */
    generateVisitID: () => {
      const random22Bit = privateMethods.randomBits(22);
      const date41Bit = Date.now().toString(2);
      let binary63Bit = date41Bit + random22Bit;

      // Ensure that we have a positive 63 bit number by leaving 1 bit
      if (binary63Bit.length > 63) {
        binary63Bit = binary63Bit.slice(-63);
      }

      const hexID = privateMethods.binToHex(binary63Bit);
      const decimal64Bit = hexToDec(hexID);

      return decimal64Bit;
    },
    /**
     * @description Create a randomly generated device ID
     * @returns {string} A 64 bit number as a string that
     * when converted results in a 64 bit number
     */
    generateDeviceID: () => {
      const randomBin63Bit = privateMethods.randomBits(63);
      const hexID = privateMethods.binToHex(randomBin63Bit);
      const decimal63Bit = hexToDec(hexID);

      return decimal63Bit;
    }
  };
};

