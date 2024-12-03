const sharp = require('sharp');
const { default: axios } = require('axios');
const { resolve } = require('path');
const ImageProcessor = require(resolve('processor/image-processor'));

describe('ImageProcessorTest -> createThumbnail', () => {
  let processor;

  beforeEach(() => {
    processor = new ImageProcessor();
  });

  test('should not create thumbnail when buffer is null', async () => {
    // when
    const image = null;

    // then
    await expect(processor.createThumbnail(image)).rejects.toThrow(Error);
  });

  test('should not create thumbnail when buffer is empty string', async () => {
    // when
    const image = '';

    // then
    await expect(processor.createThumbnail(image)).rejects.toThrow(Error);
  });

  test('should create thumbnail when image is provided', async () => {
    // given
    const image = await createBuffer();

    // when
    const created = await processor.createThumbnail(image.data);
    const metadata = await sharp(created).metadata();

    // then
    expect(created).not.toBeNull();
    expect(metadata.width).toEqual(100);
    expect(metadata.height).toEqual(100);
  });

  const createBuffer = async () => {
    return await axios.get('https://picsum.photos/200', { responseType: 'arraybuffer' });
  };
});
