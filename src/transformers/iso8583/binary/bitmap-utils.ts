// src/transformers/iso8583/binary/bitmap-utils.ts
import { DataElement } from '../../../core/enums/data-element.js';

/**
 * Utilities for handling ISO 8583 bitmaps (Primary and Secondary)
 */
export class BitmapUtils {

  /**
   * Builds the primary bitmap (bits 1-64) from present data elements
   * Returns the bitmap as a 16-character hex string
   */
  static buildPrimaryBitmap(presentFields: DataElement[]): string {
    const bitmap = new Uint8Array(8); // 64 bits = 8 bytes

    for (const de of presentFields) {
      if (de <= 64) {
        const byteIndex = Math.floor((de - 1) / 8);
        const bitIndex = (de - 1) % 8;
        bitmap[byteIndex] |= (1 << (7 - bitIndex));
      }
    }

    return Array.from(bitmap)
      .map(b => b.toString(16).padStart(2, '0').toUpperCase())
      .join('');
  }

  /**
   * Builds the secondary bitmap (bits 65-128) if needed
   */
  static buildSecondaryBitmap(presentFields: DataElement[]): string | null {
    const hasSecondary = presentFields.some(de => de > 64);
    if (!hasSecondary) return null;

    const bitmap = new Uint8Array(8);

    for (const de of presentFields) {
      if (de > 64 && de <= 128) {
        const adjusted = de - 64;
        const byteIndex = Math.floor((adjusted - 1) / 8);
        const bitIndex = (adjusted - 1) % 8;
        bitmap[byteIndex] |= (1 << (7 - bitIndex));
      }
    }

    return Array.from(bitmap)
      .map(b => b.toString(16).padStart(2, '0').toUpperCase())
      .join('');
  }

  /**
   * Checks if a data element is present in the bitmap
   */
  static isFieldPresent(bitmapHex: string, de: DataElement): boolean {
    if (de < 1 || de > 128) return false;

    const byteIndex = Math.floor((de - 1) / 8);
    const bitIndex = (de - 1) % 8;

    const byte = parseInt(bitmapHex.substring(byteIndex * 2, byteIndex * 2 + 2), 16);
    return (byte & (1 << (7 - bitIndex))) !== 0;
  }

  /**
   * Determines whether secondary bitmap is needed
   */
  static needsSecondaryBitmap(presentFields: DataElement[]): boolean {
    return presentFields.some(de => de > 64);
  }
}

