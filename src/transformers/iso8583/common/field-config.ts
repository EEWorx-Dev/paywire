// src/transformers/iso8583/common/field-config.ts
import { DataElement } from '../../../core/enums/data-element.js';

export type FieldType = 'fixed' | 'llvar' | 'lllvar' | 'binary.js';

export type FieldFormat = 'n' | 'an' | 'ans' | 'b' | 'z' | 'x+n8';

export interface FieldConfig {
  readonly dataElement: DataElement;
  readonly type: FieldType;
  readonly maxLength: number;
  readonly format: FieldFormat;
  readonly description: string;
  readonly padding?: 'left' | 'right.js';
}

/**
 * Core ISO 8583 Field Configurations
 * Only defines the most commonly used fields.
 * Private use fields (120-127) and less common fields can be added via FieldConfigRegistry.
 */
export const ISO8583_FIELD_CONFIG: Partial<Record<DataElement, FieldConfig>> = {
  [DataElement.PRIMARY_ACCOUNT_NUMBER]: {
    dataElement: DataElement.PRIMARY_ACCOUNT_NUMBER,
    type: 'llvar',
    maxLength: 19,
    format: 'n',
    description: 'Primary Account Number (PAN)',
    padding: 'left'
  },
  [DataElement.PROCESSING_CODE]: {
    dataElement: DataElement.PROCESSING_CODE,
    type: 'fixed',
    maxLength: 6,
    format: 'n',
    description: 'Processing Code'
  },
  [DataElement.TRANSACTION_AMOUNT]: {
    dataElement: DataElement.TRANSACTION_AMOUNT,
    type: 'fixed',
    maxLength: 12,
    format: 'x+n8',
    description: 'Transaction Amount (x + n8)'
  },
  [DataElement.SETTLEMENT_AMOUNT]: {
    dataElement: DataElement.SETTLEMENT_AMOUNT,
    type: 'fixed',
    maxLength: 12,
    format: 'x+n8',
    description: 'Settlement Amount (x + n8)'
  },
  [DataElement.TRANSMISSION_DATE_TIME]: {
    dataElement: DataElement.TRANSMISSION_DATE_TIME,
    type: 'fixed',
    maxLength: 10,
    format: 'n',
    description: 'Transmission Date and Time (MMDDhhmmss)'
  },
  [DataElement.SYSTEM_TRACE_AUDIT_NUMBER]: {
    dataElement: DataElement.SYSTEM_TRACE_AUDIT_NUMBER,
    type: 'fixed',
    maxLength: 6,
    format: 'n',
    description: 'System Trace Audit Number (STAN)'
  },
  [DataElement.LOCAL_TRANSACTION_TIME]: {
    dataElement: DataElement.LOCAL_TRANSACTION_TIME,
    type: 'fixed',
    maxLength: 6,
    format: 'n',
    description: 'Local Transaction Time (hhmmss)'
  },
  [DataElement.LOCAL_TRANSACTION_DATE]: {
    dataElement: DataElement.LOCAL_TRANSACTION_DATE,
    type: 'fixed',
    maxLength: 4,
    format: 'n',
    description: 'Local Transaction Date (MMDD)'
  },
  [DataElement.EXPIRATION_DATE]: {
    dataElement: DataElement.EXPIRATION_DATE,
    type: 'fixed',
    maxLength: 4,
    format: 'n',
    description: 'Expiration Date (YYMM)'
  },
  [DataElement.MERCHANT_TYPE]: {
    dataElement: DataElement.MERCHANT_TYPE,
    type: 'fixed',
    maxLength: 4,
    format: 'n',
    description: 'Merchant Type (MCC)'
  },
  [DataElement.ACQUIRING_INSTITUTION_ID]: {
    dataElement: DataElement.ACQUIRING_INSTITUTION_ID,
    type: 'llvar',
    maxLength: 11,
    format: 'n',
    description: 'Acquiring Institution Identification Code'
  },
  [DataElement.TRACK_2_DATA]: {
    dataElement: DataElement.TRACK_2_DATA,
    type: 'llvar',
    maxLength: 37,
    format: 'z',
    description: 'Track 2 Data'
  },
  [DataElement.RETRIEVAL_REFERENCE_NUMBER]: {
    dataElement: DataElement.RETRIEVAL_REFERENCE_NUMBER,
    type: 'fixed',
    maxLength: 12,
    format: 'an',
    description: 'Retrieval Reference Number'
  },
  [DataElement.RESPONSE_CODE]: {
    dataElement: DataElement.RESPONSE_CODE,
    type: 'fixed',
    maxLength: 2,
    format: 'an',
    description: 'Response Code'
  },
  [DataElement.CARD_ACCEPTOR_TERMINAL_ID]: {
    dataElement: DataElement.CARD_ACCEPTOR_TERMINAL_ID,
    type: 'fixed',
    maxLength: 8,
    format: 'an',
    description: 'Card Acceptor Terminal Identification'
  },
  [DataElement.CARD_ACCEPTOR_ID_CODE]: {
    dataElement: DataElement.CARD_ACCEPTOR_ID_CODE,
    type: 'fixed',
    maxLength: 15,
    format: 'ans',
    description: 'Card Acceptor Identification Code'
  },
  [DataElement.CARD_ACCEPTOR_NAME_LOCATION]: {
    dataElement: DataElement.CARD_ACCEPTOR_NAME_LOCATION,
    type: 'fixed',
    maxLength: 40,
    format: 'ans',
    description: 'Card Acceptor Name / Location'
  },
  [DataElement.TRANSACTION_CURRENCY_CODE]: {
    dataElement: DataElement.TRANSACTION_CURRENCY_CODE,
    type: 'fixed',
    maxLength: 3,
    format: 'n',
    description: 'Transaction Currency Code (ISO 4217 numeric)'
  },
  [DataElement.ICC_CARD_SYSTEM_RELATED_DATA]: {
    dataElement: DataElement.ICC_CARD_SYSTEM_RELATED_DATA,
    type: 'lllvar',
    maxLength: 999,
    format: 'b',
    description: 'ICC / EMV Related Data'
  },
  [DataElement.MESSAGE_AUTHENTICATION_CODE_64]: {
    dataElement: DataElement.MESSAGE_AUTHENTICATION_CODE_64,
    type: 'fixed',
    maxLength: 8,
    format: 'b',
    description: 'Message Authentication Code (Field 64)'
  },
  [DataElement.MESSAGE_AUTHENTICATION_CODE_128]: {
    dataElement: DataElement.MESSAGE_AUTHENTICATION_CODE_128,
    type: 'fixed',
    maxLength: 8,
    format: 'b',
    description: 'Message Authentication Code (Field 128)'
  }
} as const;
