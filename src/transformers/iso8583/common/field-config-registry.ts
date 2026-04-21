// src/transformers/iso8583/common/field-config-registry.ts
import { DataElement } from '../../../core/enums/data-element.js';
import { type FieldConfig, ISO8583_FIELD_CONFIG } from './field-config.js';

/**
 * FieldConfigRegistry
 * 
 * Combines the core ISO 8583 field definitions with application-specific extensions.
 * Supports private use fields (120-127) and any custom overrides.
 */
export class FieldConfigRegistry {
  private readonly extensions = new Map<DataElement, FieldConfig>();

  /**
   * Register or override a field configuration
   * Especially useful for private use fields (120-127)
   */
  register(de: DataElement, config: FieldConfig): void {
    this.extensions.set(de, config);
  }

  /**
   * Register multiple private use fields at once
   */
  registerPrivateFields(configs: Partial<Record<DataElement, FieldConfig>>): void {
    Object.entries(configs).forEach(([key, config]) => {
      if (config) {
        this.register(Number(key) as DataElement, config);
      }
    });
  }

  /**
   * Get the final combined configuration
   * Core config is used as fallback, extensions take precedence
   */
  getCombinedConfig(): Readonly<Record<DataElement, FieldConfig>> {
    const combined = { ...ISO8583_FIELD_CONFIG } as Record<DataElement, FieldConfig>;

    // Apply extensions (they override core definitions)
    this.extensions.forEach((config, de) => {
      combined[de] = config;
    });

    return combined;
  }

  /**
   * Get configuration for a specific field
   * Returns undefined if the field is not defined in core or extensions
   */
  getFieldConfig(de: DataElement): FieldConfig | undefined {
    return this.extensions.get(de) ?? ISO8583_FIELD_CONFIG[de];
  }

  /**
   * Check if a field has been extended or overridden
   */
  isExtended(de: DataElement): boolean {
    return this.extensions.has(de);
  }

  /**
   * Clear all extensions (useful for testing)
   */
  reset(): void {
    this.extensions.clear();
  }
}

// Global singleton instance
export const fieldConfigRegistry = new FieldConfigRegistry();