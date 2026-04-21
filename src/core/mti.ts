// src/core/mti.ts
import { Version, MessageClass, MessageFunction, MessageOrigin } from './enums/mti.js';

export class MTI {
  constructor(
    readonly version: Version,
    readonly messageClass: MessageClass,
    readonly messageFunction: MessageFunction,
    readonly origin: MessageOrigin
  ) {}

  /**
   * Converts MTI to numeric value (e.g., 0x0200 for Financial Request)
   */
  toNumber(): number {
    return (this.version << 12) |
           (this.messageClass << 8) |
           (this.messageFunction << 4) |
           this.origin;
  }

  /**
   * Returns MTI as 4-digit hex string (common in logs)
   */
  toString(): string {
    return this.toNumber().toString(16).toUpperCase().padStart(4, '0');
  }

  /**
   * Creates MTI from numeric value
   */
  static fromNumber(value: number): MTI {
    const version = (value >> 12) & 0xF;
    const msgClass = (value >> 8) & 0xF;
    const msgFunc = (value >> 4) & 0xF;
    const origin = value & 0xF;

    return new MTI(
      version as Version,
      msgClass as MessageClass,
      msgFunc as MessageFunction,
      origin as MessageOrigin
    );
  }
}

