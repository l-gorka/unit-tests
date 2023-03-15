let dateFunc = require('./unitTestingTask.js');

jest.useFakeTimers();
jest.setSystemTime(new Date('2020-01-01'));

describe('Unit testing task', () => {
  test('should return date in correct format', () => {
    const result = dateFunc('YYYY YY MMMM MMM MM M DDD DD D dd d HH H hh h mm m ss s ff f A a ZZ Z', new Date());

    expect(result).toBe('2020 20 January Jan 01 1 Wednesday Wed We 01 1 01 1 01 1 00 0 00 0 000 0 AM am +0100 +01:00');
  });

  test('should convert ISO format to Date', () => {
    const result = dateFunc('YYYY/MM/dd', '2023-12-12');

    expect(result).toBe('2023/12/12');
  });

  test('should convert timestamp to Date', () => {
    const result = dateFunc('YYYY/MM/dd', 1678822716000);

    expect(result).toBe('2023/03/14');
  });

  test('should use current date if incorrect timestamp value is provided', () => {
    const result = dateFunc('YYYY.MM.dd', '1');

    expect(result).toBe('2001.01.01');
  });

  test("should use today's date if no date is passed in args", () => {
    const result = dateFunc('YYYY - MM - dd');

    expect(result).toBe('2020 - 01 - 01');
  });

  test('should return date in predefined format', () => {
    const result = dateFunc('ISODateTimeTZ', new Date(2023, 12, 31));

    expect(result).toBe('2024-01-31T12:00:00+01:00');
  });

  test('should return list of all formaters', () => {
    const result = dateFunc.formatters();

    expect(result).toStrictEqual(['ISODate', 'ISOTime', 'ISODateTime', 'ISODateTimeTZ']);
  });

  test('should create function with predefined format, accepting only 1 date argument', () => {
    const predefinedFunction = dateFunc.register('fullMonth', 'MMMM');
    const result = predefinedFunction(new Date());

    expect(result).toBe('January');
  });

  test('should throw error with correct message when passed format is not string', () => {
    try {
      const error = dateFunc(11, new Date());
    } catch (error) {
      expect(error).toHaveProperty('message', 'Argument `format` must be a string');
    }
  });

  test('should throw error with correct message when date is in incorrect format', () => {
    try {
      const error = dateFunc('YYYY', {});
    } catch (error) {
      expect(error).toHaveProperty(
        'message',
        'Argument `date` must be instance of Date or Unix Timestamp or ISODate String'
      );
    }
  });
});
