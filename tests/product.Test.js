const { mockDb, mockModel, mockProducts } = require('./db.mock');
const { list, get, destroy } = require('../products');

jest.mock('../db', () => mockDb);

describe('Products Module (Mocked DB)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('list() should return mock products', async () => {
    const products = await list();
    expect(products.length).toBe(2);
    expect(products[0].description).toBe('Product 1');
  });

  test('get() should return product by id', async () => {
    mockModel.findById.mockResolvedValue({ description: 'Product 1' });

    const product = await get('1');
    expect(product).toBeDefined();
    expect(product.description).toBe('Product 1');
  });

  test('destroy() should delete product', async () => {
    mockModel.deleteOne.mockResolvedValue({ deletedCount: 1 });

    const result = await destroy('1');
    expect(result.deletedCount).toBe(1);
  });
});