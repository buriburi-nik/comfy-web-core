export interface Vendor {
  id: string;
  name: string;
  logo: string;
  description: string;
  rating: number;
  productsCount: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  vendorId: string;
  images: string[];
  stock: number;
  status: 'active' | 'inactive' | 'pending' | 'rejected' | 'flagged';
  createdAt: string;
  updatedAt: string;
  sku: string;
  tags: string[];
  specifications: Record<string, string>;
}

export interface AuditLog {
  id: string;
  action: string;
  productId: string;
  productName: string;
  userId: string;
  userName: string;
  timestamp: string;
  details: string;
}

export interface BulkUploadLog {
  id: string;
  fileName: string;
  uploadedBy: string;
  timestamp: string;
  totalRows: number;
  successCount: number;
  errorCount: number;
  status: 'completed' | 'failed' | 'partial';
}

export const vendors: Vendor[] = [
  {
    id: 'v1',
    name: 'TechStore Pro',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
    description: 'Premium electronics and gadgets',
    rating: 4.8,
    productsCount: 156,
  },
  {
    id: 'v2',
    name: 'Fashion Forward',
    logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop',
    description: 'Trendy fashion for everyone',
    rating: 4.5,
    productsCount: 289,
  },
  {
    id: 'v3',
    name: 'Home Essentials',
    logo: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop',
    description: 'Quality home and living products',
    rating: 4.7,
    productsCount: 423,
  },
];

export const categories = [
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Sports',
  'Books',
  'Toys',
  'Beauty',
  'Automotive',
];

export const mockProducts: Product[] = [
  {
    id: 'p1',
    slug: 'wireless-bluetooth-headphones',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and comfortable over-ear design.',
    price: 199.99,
    originalPrice: 249.99,
    category: 'Electronics',
    subcategory: 'Audio',
    vendorId: 'v1',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop',
    ],
    stock: 45,
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
    sku: 'WBH-001',
    tags: ['wireless', 'bluetooth', 'noise-cancelling'],
    specifications: {
      'Battery Life': '30 hours',
      'Driver Size': '40mm',
      'Connectivity': 'Bluetooth 5.2',
      'Weight': '250g',
    },
  },
  {
    id: 'p2',
    slug: 'smart-fitness-watch',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, and water resistance up to 50m.',
    price: 299.99,
    category: 'Electronics',
    subcategory: 'Wearables',
    vendorId: 'v1',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&h=600&fit=crop',
    ],
    stock: 32,
    status: 'active',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-18T11:20:00Z',
    sku: 'SFW-002',
    tags: ['fitness', 'smartwatch', 'gps'],
    specifications: {
      'Display': '1.4" AMOLED',
      'Water Resistance': '50m',
      'Battery Life': '7 days',
      'Sensors': 'Heart rate, SpO2, GPS',
    },
  },
  {
    id: 'p3',
    slug: 'cotton-casual-shirt',
    name: 'Premium Cotton Casual Shirt',
    description: 'Comfortable 100% organic cotton shirt, perfect for casual and semi-formal occasions.',
    price: 59.99,
    originalPrice: 79.99,
    category: 'Fashion',
    subcategory: 'Shirts',
    vendorId: 'v2',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=600&fit=crop',
    ],
    stock: 120,
    status: 'active',
    createdAt: '2024-01-12T08:15:00Z',
    updatedAt: '2024-01-19T16:30:00Z',
    sku: 'PCS-003',
    tags: ['cotton', 'casual', 'organic'],
    specifications: {
      'Material': '100% Organic Cotton',
      'Fit': 'Regular',
      'Care': 'Machine wash cold',
      'Origin': 'India',
    },
  },
  {
    id: 'p4',
    slug: 'leather-crossbody-bag',
    name: 'Leather Crossbody Bag',
    description: 'Elegant genuine leather crossbody bag with adjustable strap and multiple compartments.',
    price: 129.99,
    category: 'Fashion',
    subcategory: 'Bags',
    vendorId: 'v2',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop',
    ],
    stock: 28,
    status: 'pending',
    createdAt: '2024-01-14T12:00:00Z',
    updatedAt: '2024-01-14T12:00:00Z',
    sku: 'LCB-004',
    tags: ['leather', 'crossbody', 'elegant'],
    specifications: {
      'Material': 'Genuine Leather',
      'Dimensions': '25cm x 18cm x 8cm',
      'Strap': 'Adjustable',
      'Closure': 'Magnetic snap',
    },
  },
  {
    id: 'p5',
    slug: 'ceramic-dinner-set',
    name: 'Ceramic Dinner Set (16 pieces)',
    description: 'Beautiful hand-crafted ceramic dinner set including plates, bowls, and mugs for 4 people.',
    price: 89.99,
    category: 'Home & Garden',
    subcategory: 'Kitchen',
    vendorId: 'v3',
    images: [
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&h=600&fit=crop',
    ],
    stock: 55,
    status: 'active',
    createdAt: '2024-01-08T14:30:00Z',
    updatedAt: '2024-01-17T10:15:00Z',
    sku: 'CDS-005',
    tags: ['ceramic', 'dinner', 'handcrafted'],
    specifications: {
      'Pieces': '16',
      'Material': 'Ceramic',
      'Dishwasher Safe': 'Yes',
      'Microwave Safe': 'Yes',
    },
  },
  {
    id: 'p6',
    slug: 'indoor-plant-collection',
    name: 'Indoor Plant Collection',
    description: 'Set of 3 low-maintenance indoor plants perfect for home or office decoration.',
    price: 45.99,
    category: 'Home & Garden',
    subcategory: 'Plants',
    vendorId: 'v3',
    images: [
      'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=600&h=600&fit=crop',
    ],
    stock: 40,
    status: 'active',
    createdAt: '2024-01-11T11:45:00Z',
    updatedAt: '2024-01-16T09:00:00Z',
    sku: 'IPC-006',
    tags: ['plants', 'indoor', 'low-maintenance'],
    specifications: {
      'Number of Plants': '3',
      'Pot Size': '4 inch',
      'Light': 'Low to medium',
      'Watering': 'Weekly',
    },
  },
  {
    id: 'p7',
    slug: 'yoga-mat-premium',
    name: 'Premium Yoga Mat',
    description: 'Extra thick non-slip yoga mat with carrying strap, perfect for all types of yoga.',
    price: 39.99,
    category: 'Sports',
    subcategory: 'Yoga',
    vendorId: 'v1',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=600&fit=crop',
    ],
    stock: 75,
    status: 'active',
    createdAt: '2024-01-09T07:30:00Z',
    updatedAt: '2024-01-15T13:45:00Z',
    sku: 'YMP-007',
    tags: ['yoga', 'fitness', 'non-slip'],
    specifications: {
      'Thickness': '6mm',
      'Material': 'TPE',
      'Dimensions': '183cm x 61cm',
      'Weight': '1.2kg',
    },
  },
  {
    id: 'p8',
    slug: 'running-shoes-pro',
    name: 'Professional Running Shoes',
    description: 'Lightweight running shoes with superior cushioning and breathable mesh upper.',
    price: 149.99,
    originalPrice: 189.99,
    category: 'Sports',
    subcategory: 'Footwear',
    vendorId: 'v2',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop',
    ],
    stock: 0,
    status: 'active',
    createdAt: '2024-01-07T16:00:00Z',
    updatedAt: '2024-01-20T08:30:00Z',
    sku: 'RSP-008',
    tags: ['running', 'shoes', 'lightweight'],
    specifications: {
      'Upper': 'Breathable Mesh',
      'Sole': 'Rubber',
      'Cushioning': 'Foam',
      'Weight': '280g',
    },
  },
  {
    id: 'p9',
    slug: 'organic-skincare-set',
    name: 'Organic Skincare Set',
    description: 'Complete skincare routine with cleanser, toner, serum, and moisturizer - all organic.',
    price: 79.99,
    category: 'Beauty',
    subcategory: 'Skincare',
    vendorId: 'v3',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop',
    ],
    stock: 60,
    status: 'flagged',
    createdAt: '2024-01-13T10:00:00Z',
    updatedAt: '2024-01-18T14:20:00Z',
    sku: 'OSS-009',
    tags: ['organic', 'skincare', 'natural'],
    specifications: {
      'Items': '4 products',
      'Skin Type': 'All types',
      'Cruelty Free': 'Yes',
      'Paraben Free': 'Yes',
    },
  },
  {
    id: 'p10',
    slug: 'portable-bluetooth-speaker',
    name: 'Portable Bluetooth Speaker',
    description: 'Compact waterproof speaker with 360° sound and 12-hour playtime.',
    price: 69.99,
    category: 'Electronics',
    subcategory: 'Audio',
    vendorId: 'v1',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop',
    ],
    stock: 88,
    status: 'inactive',
    createdAt: '2024-01-06T09:30:00Z',
    updatedAt: '2024-01-19T11:00:00Z',
    sku: 'PBS-010',
    tags: ['bluetooth', 'speaker', 'waterproof'],
    specifications: {
      'Battery Life': '12 hours',
      'Water Resistance': 'IPX7',
      'Bluetooth': '5.0',
      'Weight': '540g',
    },
  },
  {
    id: 'p11',
    slug: 'desk-lamp-led',
    name: 'LED Desk Lamp with Wireless Charger',
    description: 'Modern LED desk lamp with adjustable brightness, color temperature, and built-in wireless charging pad.',
    price: 54.99,
    category: 'Home & Garden',
    subcategory: 'Lighting',
    vendorId: 'v3',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=600&fit=crop',
    ],
    stock: 42,
    status: 'active',
    createdAt: '2024-01-05T13:15:00Z',
    updatedAt: '2024-01-14T17:45:00Z',
    sku: 'DLL-011',
    tags: ['led', 'desk lamp', 'wireless charging'],
    specifications: {
      'Power': '10W',
      'Color Temp': '2700K-6500K',
      'Wireless Charging': '15W',
      'Material': 'Aluminum',
    },
  },
  {
    id: 'p12',
    slug: 'bestseller-book-collection',
    name: 'Bestseller Book Collection 2024',
    description: 'Curated collection of top 5 bestselling fiction books of 2024.',
    price: 49.99,
    category: 'Books',
    subcategory: 'Fiction',
    vendorId: 'v2',
    images: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=600&fit=crop',
    ],
    stock: 25,
    status: 'pending',
    createdAt: '2024-01-04T15:00:00Z',
    updatedAt: '2024-01-04T15:00:00Z',
    sku: 'BBC-012',
    tags: ['books', 'fiction', 'bestseller'],
    specifications: {
      'Number of Books': '5',
      'Format': 'Paperback',
      'Language': 'English',
      'Total Pages': '~1500',
    },
  },
];

export const auditLogs: AuditLog[] = [
  {
    id: 'al1',
    action: 'Product Approved',
    productId: 'p1',
    productName: 'Wireless Bluetooth Headphones',
    userId: 'admin1',
    userName: 'Admin User',
    timestamp: '2024-01-20T14:30:00Z',
    details: 'Product approved for listing',
  },
  {
    id: 'al2',
    action: 'Product Flagged',
    productId: 'p9',
    productName: 'Organic Skincare Set',
    userId: 'admin1',
    userName: 'Admin User',
    timestamp: '2024-01-18T14:20:00Z',
    details: 'Product flagged for review - potential ingredient issues',
  },
  {
    id: 'al3',
    action: 'Product Created',
    productId: 'p4',
    productName: 'Leather Crossbody Bag',
    userId: 'v2',
    userName: 'Fashion Forward',
    timestamp: '2024-01-14T12:00:00Z',
    details: 'New product added, pending approval',
  },
  {
    id: 'al4',
    action: 'Product Deactivated',
    productId: 'p10',
    productName: 'Portable Bluetooth Speaker',
    userId: 'v1',
    userName: 'TechStore Pro',
    timestamp: '2024-01-19T11:00:00Z',
    details: 'Product deactivated by vendor',
  },
  {
    id: 'al5',
    action: 'Bulk Upload',
    productId: '-',
    productName: '-',
    userId: 'v3',
    userName: 'Home Essentials',
    timestamp: '2024-01-17T09:00:00Z',
    details: 'Bulk upload of 15 products completed',
  },
];

export const bulkUploadLogs: BulkUploadLog[] = [
  {
    id: 'bu1',
    fileName: 'products_batch_jan.csv',
    uploadedBy: 'TechStore Pro',
    timestamp: '2024-01-20T10:00:00Z',
    totalRows: 50,
    successCount: 48,
    errorCount: 2,
    status: 'partial',
  },
  {
    id: 'bu2',
    fileName: 'fashion_items.xlsx',
    uploadedBy: 'Fashion Forward',
    timestamp: '2024-01-18T14:30:00Z',
    totalRows: 30,
    successCount: 30,
    errorCount: 0,
    status: 'completed',
  },
  {
    id: 'bu3',
    fileName: 'home_products.csv',
    uploadedBy: 'Home Essentials',
    timestamp: '2024-01-17T09:00:00Z',
    totalRows: 15,
    successCount: 15,
    errorCount: 0,
    status: 'completed',
  },
  {
    id: 'bu4',
    fileName: 'electronics_new.xlsm',
    uploadedBy: 'TechStore Pro',
    timestamp: '2024-01-15T16:45:00Z',
    totalRows: 25,
    successCount: 0,
    errorCount: 25,
    status: 'failed',
  },
];
