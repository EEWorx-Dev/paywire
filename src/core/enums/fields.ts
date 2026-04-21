// src/core/fields.ts
import { DataElement } from './data-element.js';
import { Currency } from './currency.js';

export type AmountSign = 'C' | 'D';

export class Amount {
  constructor(
    readonly sign: AmountSign,
    readonly value: number,
    readonly currency: Currency
  ) {}

  /** Returns amount in x+n8 format as per ISO 8583 spec */
  toIsoString(): string {
    const amountInCents = Math.round(this.value * 100);
    const padded = amountInCents.toString().padStart(8, '0');
    return `${this.sign}${padded}`;
  }
}

export interface IsoField<T = unknown> {
  readonly dataElement: DataElement;
  readonly value: T;
  readonly rawValue?: string;
}

export class StringField implements IsoField<string> {
  constructor(
    readonly dataElement: DataElement,
    readonly value: string,
    readonly rawValue?: string
  ) {}
}

export class AmountField implements IsoField<Amount> {
  constructor(
    readonly dataElement: DataElement,
    readonly value: Amount,
    readonly rawValue?: string
  ) {}
}

export class BinaryField implements IsoField<Uint8Array> {
  constructor(
    readonly dataElement: DataElement,
    readonly value: Uint8Array,
    readonly rawValue?: string
  ) {}
}

