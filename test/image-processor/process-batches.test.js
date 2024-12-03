const { resolve } = require('path');
const ImageProcessor = require(resolve('processor/image-processor'));

describe('ImageProcessorTest -> processBatches', () => {
  let processor;

  beforeEach(() => {
    processor = new ImageProcessor();
  });

  test('should not process batches when array is empty', async () => {
    // given
    const batches = [[], [], []];

    // then
    await expect(processor.processBatches(batches)).rejects.toThrow(Error);
  });
});