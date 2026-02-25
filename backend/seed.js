require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.error('MongoDB connection error:', err));

const Size = require('./models/Size');
const Voucher = require('./models/Voucher');
const Color = require('./models/Color');

const sizes = [
    { name: 'Small', description: 'Kích thước nhỏ' },
    { name: 'Medium', description: 'Kích thước vừa' },
    { name: 'Large', description: 'Kích thước lớn' }
];

const vouchers = [
    { name: 'Giảm giá 10%', code: 'DISCOUNT10', discount_value: 10, start_date: '2025-01-01', end_date: '2025-12-31' },
    { name: 'Giảm giá 20%', code: 'DISCOUNT20', discount_value: 20, start_date: '2025-01-01', end_date: '2025-12-31' }
];

const colors = [
    { name: 'Red', description: 'Màu đỏ' },
    { name: 'Blue', description: 'Màu xanh dương' },
    { name: 'Green', description: 'Màu xanh lá' }
];

const seedData = async () => {
    try {
        await Size.deleteMany({});
        await Voucher.deleteMany({});
        await Color.deleteMany({});

        await Size.insertMany(sizes);
        await Voucher.insertMany(vouchers);
        await Color.insertMany(colors);

        console.log('Data seeded successfully!');
    } catch (err) {
        console.error('Seed error:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedData();
