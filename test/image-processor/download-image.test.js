const { resolve } = require('path');
const ImageProcessor = require(resolve('processor/image-processor'));

describe('ImageProcessorTest -> downloadImage', () => {
  let processor;

  beforeEach(() => {
    processor = new ImageProcessor();
  });

  test('should not download an image when url is missing', async () => {
    // when
    const url = null;

    // then
    await expect(processor.downloadImage(url)).rejects.toThrow(Error);
  });

  test('should not download an image when url is empty', async () => {
    // when
    const url = '';

    // then
    await expect(processor.downloadImage(url)).rejects.toThrow(Error);
  });

  test('should download an image when url is correct', async () => {
    // given
    const url = 'https://picsum.photos/200';

    // when
    const response = await processor.downloadImage(url);

    // then
    expect(response).not.toBeNull();
  });
});
