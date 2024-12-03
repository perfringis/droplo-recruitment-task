const { resolve } = require('path');
const CSVParser = require(resolve('utils/csv-parser'));
const File = require(resolve('utils/file'));
const { parse } = require('dotenv');

describe('CSVParser -> parse', () => {
  test('should parse empty file', async () => {
    // given
    const file = await File.of({
      path: 'test/csv-parser/empty.csv',
      limit: 120,
    });

    // when
    const parsed = await CSVParser.parse(file);

    // then
    expect(parsed.length).toBe(0);
  });

  test('should parse file with only header', async () => {
    // given
    const file = await File.of({
      path: 'test/csv-parser/only-header.csv',
      limit: 120,
    });

    // when
    const parsed = await CSVParser.parse(file);

    // then
    expect(parsed.length).toBe(0);
  });

  test('should parse csv file without the header', async () => {
    // given
    const file = await File.of({
      path: 'test/csv-parser/without-header.csv',
      limit: 120,
    });

    // when
    const parsed = await CSVParser.parse(file);

    // then
    expect(parsed).toEqual([
        {
          '0': '1',
          '42fb7bba-7f84-433e-88e5-cb20e6243cac': '12cdc50c-bda4-4015-b173-3b948d659faf',
          'https://picsum.photos/200': 'https://picsum.photos/200',
        },
        {
          '0': '2',
          '42fb7bba-7f84-433e-88e5-cb20e6243cac': '776275ed-685e-4d23-987a-0b90bd3e1b9e',
          'https://picsum.photos/200': 'https://picsum.photos/200',
        },
      ],
    );

    expect(parsed.length).toBe(2);
  });

  test('should parse csv file with header and data', async () => {
    // given
    const file = await File.of({
      path: 'test/csv-parser/data.csv',
      limit: 120,
    });

    // when
    const parsed = await CSVParser.parse(file);

    // then
    expect(parsed).toEqual([
        {
          'index': '0',
          'id': '42fb7bba-7f84-433e-88e5-cb20e6243cac',
          'url': 'https://picsum.photos/200',
        },
        {
          'index': '1',
          'id': '12cdc50c-bda4-4015-b173-3b948d659faf',
          'url': 'https://picsum.photos/200',
        }, {
          'index': '2',
          'id': '776275ed-685e-4d23-987a-0b90bd3e1b9e',
          'url': 'https://picsum.photos/200',
        },
      ],
    );

    expect(parsed.length).toBe(3);
  });
});