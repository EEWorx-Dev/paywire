// src/core/iso-message.ts
import { MTI } from './mti.js';
import { DataElement } from './enums/data-element.js';
import { type IsoField } from './enums/fields.js';

export class IsoMessage {
  private readonly fields = new Map<DataElement, IsoField>();

  constructor(readonly mti: MTI) {}

  /** Internal method used by the builder */
  setInternalField(de: DataElement, field: IsoField): void {
    this.fields.set(de, field);
  }

  getField(de: DataElement): IsoField | undefined {
    return this.fields.get(de);
  }

  getAllFields(): ReadonlyMap<DataElement, IsoField> {
    return this.fields;
  }

  hasField(de: DataElement): boolean {
    return this.fields.has(de);
  }

  /** Returns all data elements present in this message */
  getPresentDataElements(): DataElement[] {
    return Array.from(this.fields.keys());
  }
}

