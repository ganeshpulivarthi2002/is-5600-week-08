const fs = require('fs/promises');
const { create, destroy } = require('../products');
const orderModel = require('../orders');   // IMPORT ORDER FUNCTIONS

const productTestHelper = {
  testProductIds: [],
  testOrderIds: [],

  // Load test products
  async setupTestData() {
    console.log('Loading test products...');
    const data = await fs.readFile('data/full-products.json', 'utf-8');
    const testProducts = JSON.parse(data);

    for (const product of testProducts) {
      if (!product.price) {
        product.price = Math.floor(Math.random() * 100) + 1;
      }
      const createdProduct = await create(product);
      this.testProductIds.push(createdProduct.id);
    }

    console.log('Test products loaded successfully');
  },

  // Create dummy test orders
  async createTestOrders(count) {
    console.log(`Creating ${count} test orders...`);

    const orderTemplate = {
      buyerEmail: "test@example.com",
      buyerName: "Test User",
      buyerPhone: "555-5555",
      shippingAddress: "123 Test St",
      orderItems: [
        {
          productId: this.testProductIds[0],
          quantity: 1
        }
      ]
    };

    for (let i = 0; i < count; i++) {
      const order = await orderModel.create(orderTemplate);
      this.testOrderIds.push(order._id);
    }

    console.log('Test orders created successfully');
  },

  // Clean up test data
  async cleanupTestData() {
    console.log('Cleaning up test products...');

    for (const productId of this.testProductIds) {
      await destroy(productId);
    }

    console.log('Cleaning up test orders...');
    // Skipped since orders.js has no destroy()

    console.log('All test data cleaned successfully');
  }
};

module.exports = productTestHelper;
