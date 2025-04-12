const sequelize = require('./config/db');

// Import models after sequelize is initialized
const User = require('./models/User');
const Store = require('./models/Store');
const Rating = require('./models/Rating');

async function setupDatabase() {
  try {
    // Create database if not exists
    await sequelize.query('CREATE DATABASE IF NOT EXISTS store_rating');
    console.log('Database verified/created');
    
    // Connect to specific database
    await sequelize.sync({ force: true });
    console.log('All models synchronized');
    
    // Create test data
    await createTestData();
    console.log('Test data created');
    
    process.exit(0);
  } catch (error) {
    console.error('Setup failed:', error);
    process.exit(1);
  }
}

async function createTestData() {
  const user = await User.create({
    name: 'Admin',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  });

  const store = await Store.create({
    name: 'Sample Store',
    address: '123 Main St'
  });

  await Rating.create({
    rating: 5,
    comment: 'Excellent',
    userId: user.id,
    storeId: store.id
  });
}

setupDatabase();