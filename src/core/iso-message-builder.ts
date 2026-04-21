// src/core/iso-message-builder.ts
import { MTI } from './mti.js';
import { DataElement } from './enums/data-element.js';
import { IsoMessage } from './iso-message.js';
import { StringField, AmountField, BinaryField, type AmountSign, Amount } from './enums/fields.js';
import { Currency } from './enums/currency.js';

export class IsoMessageBuilder {
  private readonly fields = new Map<DataElement, any>();

  constructor(private readonly mti: MTI) {}

  // ==================== High-frequency domain methods ====================

  withPAN(pan: string): this {
    this.fields.set(DataElement.PRIMARY_ACCOUNT_NUMBER, 
      new StringField(DataElement.PRIMARY_ACCOUNT_NUMBER, pan));
    return this;
  }

  withProcessingCode(code: string): this {
    this.fields.set(DataElement.PROCESSING_CODE, 
      new StringField(DataElement.PROCESSING_CODE, code));
    return this;
  }

  withTransactionAmount(sign: AmountSign, value: number, currency: Currency): this {
    const amount = new Amount(sign, value, currency);
    this.fields.set(DataElement.TRANSACTION_AMOUNT, 
      new AmountField(DataElement.TRANSACTION_AMOUNT, amount));
    return this;
  }

  withTransmissionDateTime(datetime: string): this {
    this.fields.set(DataElement.TRANSMISSION_DATE_TIME, 
      new StringField(DataElement.TRANSMISSION_DATE_TIME, datetime));
    return this;
  }

  withSTAN(stan: string): this {
    this.fields.set(DataElement.SYSTEM_TRACE_AUDIT_NUMBER, 
      new StringField(DataElement.SYSTEM_TRACE_AUDIT_NUMBER, stan));
    return this;
  }

  withResponseCode(code: string): this {
    this.fields.set(DataElement.RESPONSE_CODE, 
      new StringField(DataElement.RESPONSE_CODE, code));
    return this;
  }

  withTerminalId(terminalId: string): this {
    this.fields.set(DataElement.CARD_ACCEPTOR_TERMINAL_ID, 
      new StringField(DataElement.CARD_ACCEPTOR_TERMINAL_ID, terminalId));
    return this;
  }

  withTrack2Data(track2: string): this {
    this.fields.set(DataElement.TRACK_2_DATA, 
      new StringField(DataElement.TRACK_2_DATA, track2));
    return this;
  }

  withMAC(mac: Uint8Array, useField128: boolean = false): this {
    const de = useField128 
      ? DataElement.MESSAGE_AUTHENTICATION_CODE_128 
      : DataElement.MESSAGE_AUTHENTICATION_CODE_64;
    
    this.fields.set(de, new BinaryField(de, mac));
    return this;
  }

  // ==================== Generic method for ALL other fields ====================

  /**
   * Generic method to set any DataElement.
   * Use this for less common or private use fields.
   */
  withField(de: DataElement, value: string | Amount | Uint8Array): this {
    if (typeof value === 'string') {
      this.fields.set(de, new StringField(de, value));
    } else if (value instanceof Amount) {
      this.fields.set(de, new AmountField(de, value));
    } else {
      this.fields.set(de, new BinaryField(de, value));
    }
    return this;
  }

  // ==================== Build ====================

  build(): IsoMessage {
    const message = new IsoMessage(this.mti);

    this.fields.forEach((field, de) => {
      (message as any).setInternalField(de, field);
    });

    return message;
  }
}