import generateUniqueId from '../../src/utils/generateUniqueId';

describe('Generate Unique ID', () => {
  test('should generate an unique ID', () => {
    const id = generateUniqueId(4);

    expect(id).toHaveLength(8);
  });
});
