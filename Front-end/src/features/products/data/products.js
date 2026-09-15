export const products = [
  {
    id: 'p1',
    name: 'Aero Wireless Mouse',
    vendor: 'v1',
    category: 'Electronics',
    price: 89,
    description: 'Ergonomic wireless mouse with silent clicks and all-day battery life.',
    quantity: 24,
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'approved',
    isActive: true,
    discount: { percentage: 10, isActive: true, startDate: '2026-01-01', endDate: '2026-12-31' },
    slug: 'aero-wireless-mouse'
  },
  {
    id: 'p2',
    name: 'Nova Desk Lamp',
    vendor: 'v1',
    category: 'Home',
    price: 120,
    description: 'Minimalist adjustable lamp with warm ambient lighting for workspaces.',
    quantity: 10,
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'approved',
    isActive: true,
    discount: { percentage: 0, isActive: false, startDate: null, endDate: null },
    slug: 'nova-desk-lamp'
  },
  {
    id: 'p3',
    name: 'Canvas Travel Backpack',
    vendor: 'v2',
    category: 'Accessories',
    price: 159,
    description: 'Water-resistant backpack built for everyday work and travel.',
    quantity: 18,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'approved',
    isActive: true,
    discount: { percentage: 15, isActive: true, startDate: '2026-02-01', endDate: '2026-04-30' },
    slug: 'canvas-travel-backpack'
  },
  {
    id: 'p4',
    name: 'Velocity Smart Watch',
    vendor: 'v2',
    category: 'Wearables',
    price: 249,
    description: 'Fitness tracking, notifications, and an elegant all-day design.',
    quantity: 6,
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'pending',
    isActive: true,
    discount: { percentage: 0, isActive: false, startDate: null, endDate: null },
    slug: 'velocity-smart-watch'
  },
  {
    id: 'p5',
    name: 'Studio Pro Microphone',
    vendor: 'v3',
    category: 'Audio',
    price: 199,
    description: 'USB microphone designed for streamers, podcast creators, and creators.',
    quantity: 7,
    images: [
      'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'pending',
    isActive: true,
    discount: { percentage: 5, isActive: false, startDate: null, endDate: null },
    slug: 'studio-pro-microphone'
  }
];

export const categories = ['Electronics', 'Home', 'Accessories', 'Wearables', 'Audio'];
