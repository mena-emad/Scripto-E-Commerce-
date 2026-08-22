export const orders = [
  {
    id: 'o1',
    userId: 'u1',
    totalPrice: 210,
    totalAmount: 2,
    globalStatus: 'Pending',
    shippingAddress: 'Al-Madinah Street, Jeddah, Saudi Arabia',
    paymentMethod: 'COD',
    createdAt: '2026-03-01T18:15:00.000Z',
    items: [
      { productId: 'p1', productName: 'Aero Wireless Mouse', vendorId: 'v1', quantity: 1, price: 89 },
      { productId: 'p2', productName: 'Nova Desk Lamp', vendorId: 'v1', quantity: 1, price: 120 }
    ]
  },
  {
    id: 'o2',
    userId: 'u1',
    totalPrice: 159,
    totalAmount: 1,
    globalStatus: 'Shipped',
    shippingAddress: 'King Fahd Road, Riyadh, Saudi Arabia',
    paymentMethod: 'Card',
    createdAt: '2026-03-10T09:30:00.000Z',
    items: [
      { productId: 'p3', productName: 'Canvas Travel Backpack', vendorId: 'v2', quantity: 1, price: 159 }
    ]
  },
  {
    id: 'o3',
    userId: 'u1',
    totalPrice: 90,
    totalAmount: 1,
    globalStatus: 'Delivered',
    shippingAddress: 'Al Noor District, Dammam, Saudi Arabia',
    paymentMethod: 'COD',
    createdAt: '2026-02-14T10:00:00.000Z',
    items: [
      { productId: 'p1', productName: 'Aero Wireless Mouse', vendorId: 'v1', quantity: 1, price: 90 }
    ]
  }
];

export const vendorOrders = [
  {
    id: 'vo1',
    parentOrderId: 'o1',
    vendorId: 'v1',
    status: 'Processing',
    totalPrice: 210,
    totalAmount: 2,
    createdAt: '2026-03-01T18:15:00.000Z',
    products: [
      { productId: 'p1', productName: 'Aero Wireless Mouse', quantity: 1, price: 89 },
      { productId: 'p2', productName: 'Nova Desk Lamp', quantity: 1, price: 120 }
    ]
  },
  {
    id: 'vo2',
    parentOrderId: 'o2',
    vendorId: 'v2',
    status: 'Shipped',
    totalPrice: 159,
    totalAmount: 1,
    createdAt: '2026-03-10T09:30:00.000Z',
    products: [
      { productId: 'p3', productName: 'Canvas Travel Backpack', quantity: 1, price: 159 }
    ]
  }
];
