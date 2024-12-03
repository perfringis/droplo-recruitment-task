const { v4: uuidv4 } = require('uuid');
const { resolve } = require('path');
const ImageProcessor = require(resolve('processor/image-processor'));

describe('ImageProcessorTest -> processBatch', () => {
  let processor;

  beforeEach(() => {
    processor = new ImageProcessor();
  });

  test('should process the batch', async () => {
    // given
    const batch = createBatch();

    // when
    const processed = await processor.processBatch(batch);

    // then
    expect(processed).not.toBeNull();
    expect(processed.length).toEqual(batch.length);

    expect(processed[0]._id).toEqual(batch[0].id);
    expect(processed[1]._id).toEqual(batch[1].id);
    expect(processed[2]._id).toEqual(batch[2].id);
  });

  test('should process the empty batch', async () => {
    // given
    const batch = createEmptyBatch();

    // when
    const processed = await processor.processBatch(batch);

    // then
    expect(processed).not.toBeNull();
    expect(processed.length).toEqual(batch.length);
  });

  const createBatch = () => {
    return [{
      index: '0', id: uuidv4(), url: 'https://picsum.photos/200',
    }, {
      index: '1', id: uuidv4(), url: 'https://picsum.photos/200',
    }, {
      index: '2', id: uuidv4(), url: 'https://picsum.photos/200',
    }];
  };

  const createEmptyBatch = () => {
    return [];
  };
});
