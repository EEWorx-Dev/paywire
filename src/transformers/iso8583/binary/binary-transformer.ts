// src/transformers/iso8583/binary/binary-transformer.ts
import { IsoMessage } from '../../../core/iso-message.js';
import { DataElement, AmountField, StringField, BinaryField } from '../../../core/enums/index.js';
import { fieldConfigRegistry } from '../common/field-config-registry.js';
import { BitmapUtils } from './bitmap-utils.js';

/**
 * Paywire ISO 8583 Binary Transformer
 * Uses FieldConfigRegistry to support standard + private use fields (120-127)
 */
export class Iso8583BinaryTransformer {

  /**
   * Convert IsoMessage → ISO 8583 packed binary (uppercase hex string)
   */
  toBinary(message: IsoMessage): string {
    const mtiStr = message.mti.toString();
    const presentFields = message.getPresentDataElements();

    const primaryBitmap = BitmapUtils.buildPrimaryBitmap(presentFields);
    const secondaryBitmap = BitmapUtils.buildSecondaryBitmap(presentFields);

    const dataFields = this.packDataFields(message);

    let result = mtiStr + primaryBitmap;
    if (secondaryBitmap) {
      result += secondaryBitmap;
    }
    result += dataFields;

    return result;
  }

  /**
   * Packs all data fields using the combined registry configuration
   */
  private packDataFields(message: IsoMessage): string {
    let packed = '';
    const combinedConfig = fieldConfigRegistry.getCombinedConfig();

    for (const [de, field] of message.getAllFields()) {
      const config = combinedConfig[de];
      if (!config) continue;

      let fieldValue: string;

      if (field instanceof AmountField) {
        fieldValue = field.value.toIsoString();
      } 
      else if (field instanceof StringField) {
        fieldValue = field.value;
      } 
      else if (field instanceof BinaryField) {
        // Safe conversion for binary fields (works in both Node and browser environments)
        fieldValue = Array.from(field.value)
          .map(byte => byte.toString(16).padStart(2, '0'))
          .join('')
          .toUpperCase();
      } 
      else {
        fieldValue = String(field.value);
      }

      packed += this.formatField(fieldValue, config);
    }

    return packed;
  }

  private formatField(value: string, config: any): string {
    switch (config.type) {
      case 'fixed':
        if (config.format === 'x+n8') {
          return value;                    // Already formatted correctly by Amount
        }
        const padChar = config.format === 'n' ? '0' : ' ';
        return value.padStart(config.maxLength, padChar).slice(0, config.maxLength);

      case 'llvar':
        const len2 = value.length.toString().padStart(2, '0');
        return len2 + value;

      case 'lllvar':
        const len3 = value.length.toString().padStart(3, '0');
        return len3 + value;

      case 'binary':
        return value;

      default:
        return value;
    }
  }

  // Static convenience methods
  static pack(message: IsoMessage): string {
    return new Iso8583BinaryTransformer().toBinary(message);
  }
}
