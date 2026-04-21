// src/core/enums/mti.ts

export enum Version {
  V1987 = 0,   // ISO 8583:1987
  V1993 = 1    // ISO 8583:1993
}

export enum MessageClass {
  AUTHORIZATION     = 1,
  FINANCIAL         = 2,
  REVERSAL          = 4,
  RECONCILIATION    = 5,
  ADMINISTRATIVE    = 8
}

export enum MessageFunction {
  REQUEST           = 0,
  RESPONSE          = 1,
  ADVICE            = 2,
  ACKNOWLEDGEMENT   = 3,
  NOTIFICATION      = 5
}

export enum MessageOrigin {
  ACQUIRER          = 0,
  ISSUER            = 2
}

