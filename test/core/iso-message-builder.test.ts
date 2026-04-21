// test/core/iso-message-builder.test.ts
import * as Paywire from '../../src';

describe('IsoMessageBuilder', () => {
  let mti: Paywire.MTI;

  beforeEach(() => {
    mti = new Paywire.MTI(
      Paywire.Enums.Version.V1987,
      Paywire.Enums.MessageClass.FINANCIAL,
      Paywire.Enums.MessageFunction.REQUEST,
      Paywire.Enums.MessageOrigin.ACQUIRER
    );
  });

  test('should build a basic financial request with common fields', () => {
    const message = new Paywire.IsoMessageBuilder(mti)
      .withPAN("4111111111111111")
      .withTransactionAmount('C', 1250.75, Paywire.Enums.Currency.INR)
      .withTerminalId("TERM001")
      .withSTAN("000123")
      .withResponseCode("00")
      .build();

    expect(message.mti.toString()).toBe("0200");

    const panField = message.getField(Paywire.Enums.DataElement.PRIMARY_ACCOUNT_NUMBER);
    expect(panField?.value).toBe("4111111111111111");

    const amountField = message.getField(Paywire.Enums.DataElement.TRANSACTION_AMOUNT);
    expect(amountField).toBeDefined();
  });

  test('should support generic withField for any DataElement', () => {
    const message = new Paywire.IsoMessageBuilder(mti)
      .withPAN("4111111111111111")
      .withField(Paywire.Enums.DataElement.PRIVATE_USE_127, "Custom merchant additional data")
      .withField(Paywire.Enums.DataElement.ACCOUNT_ID_1, "ACC987654321")
      .build();

    expect(message.getField(Paywire.Enums.DataElement.PRIVATE_USE_127)?.value)
      .toBe("Custom merchant additional data");

    expect(message.getField(Paywire.Enums.DataElement.ACCOUNT_ID_1)?.value)
      .toBe("ACC987654321");
  });

  test('should handle MAC field with field 64 and 128', () => {
    const mac = new Uint8Array([0x01, 0x23, 0x45, 0x67, 0x89, 0xAB, 0xCD, 0xEF]);

    const msg64 = new Paywire.IsoMessageBuilder(mti)
      .withPAN("4111111111111111")
      .withMAC(mac, false)                    // Field 64
      .build();

    const msg128 = new Paywire.IsoMessageBuilder(mti)
      .withPAN("4111111111111111")
      .withMAC(mac, true)                     // Field 128
      .build();

    expect(msg64.getField(Paywire.Enums.DataElement.MESSAGE_AUTHENTICATION_CODE_64))
      .toBeDefined();

    expect(msg128.getField(Paywire.Enums.DataElement.MESSAGE_AUTHENTICATION_CODE_128))
      .toBeDefined();
  });

  test('should throw if required fields are missing when we add validation later', () => {
    // Currently no validation, but this is where we can extend in future
    expect(() => {
      new Paywire.IsoMessageBuilder(mti).build();
    }).not.toThrow();
  });
});
