const { create, get, list, edit } = require('../orders');
const orderData = require('../data/order1.json');
const productTestHelper = require('../test-utils/productTestHelper');

let createdOrder;

describe('Orders Module (In-Memory MongoDB)', () => {

  beforeAll(async () => {
    await productTestHelper.setupTestData();
    await productTestHelper.createTestOrders(5);
  });

  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  test('list() should return seeded orders', async () => {
    const orders = await list();
    expect(orders.length).toBeGreaterThan(4);
  });

  test('create() should create an order', async () => {
    createdOrder = await create(orderData);
    expect(createdOrder).toBeDefined();
    expect(createdOrder.buyerEmail).toBe(orderData.buyerEmail);
  });

  test('get() should return order by id', async () => {
    const order = await get(createdOrder._id);
    expect(order).toBeDefined();
    expect(order._id.toString()).toBe(createdOrder._id.toString());
  });

  test('edit() should update order', async () => {
    const change = { buyerEmail: "updated@example.com" };

    const updatedOrder = await edit(createdOrder._id, change);

    expect(updatedOrder).toBeDefined();
    expect(updatedOrder.buyerEmail).toBe("updated@example.com");
  });

});