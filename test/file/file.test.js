const { resolve } = require('path');
const File = require(resolve('utils/file'));

describe('file -> of', () => {
  test('Should read a file for certain limit', async () => {

    // when
    const file = await File.of({
      path: 'test/file/data.csv',
      limit: 120,
    });

    // then
    expect(file).not.toBeNull();

    expect(file.getPath()).toEqual('test/file/data.csv');
    expect(file.getLimit()).toEqual(120);
    expect(file.getSize()).toEqual(0.00020503997802734375);
  });

  test('should not read a file when file is missing', async () => {

    // when
    await expect(File.of({
      path: 'test/file/no-existing.csv',
      limit: 120,
    })).rejects.toThrow(Error);
  });
});