// src/index.ts
/**
 * Paywire - Type-safe financial payment message library
 *
 * Supports ISO 8583 binary and other formats with a clean, extensible core.
 */

// ==================== Core Public API ====================

// Main domain models
export { IsoMessage } from './core/iso-message.js';
export { IsoMessageBuilder } from './core/iso-message-builder.js';
export { MTI } from './core/mti.js';
export { Amount } from './core/enums/fields.js';

// Core Enums
export { Currency } from './core/enums/currency.js';
export { DataElement } from './core/enums/data-element.js';
export { 
  Version, 
  MessageClass, 
  MessageFunction, 
  MessageOrigin 
} from './core/enums/mti.js';

// ==================== ISO 8583 Support ====================

// Field Configuration & Registry (for extensibility)
export { 
  type FieldConfig, 
  type FieldType, 
  type FieldFormat, 
  ISO8583_FIELD_CONFIG 
} from './transformers/iso8583/common/field-config.js';

export { 
  FieldConfigRegistry, 
  fieldConfigRegistry 
} from './transformers/iso8583/common/field-config-registry.js';

// Binary Transformer (Primary ISO 8583 format)
export { 
  Iso8583BinaryTransformer 
} from './transformers/iso8583/binary/binary-transformer.js';

// ==================== Type Re-exports for Convenience ====================

export type { IsoField, AmountSign } from './core/enums/fields.js';


// ==================== Enums (via barrel) ====================

export * as Enums from './core/enums/index.js';

// ==================== ISO 8583 Support ====================

export * as ISO8583 from './transformers/iso8583/index.js';
