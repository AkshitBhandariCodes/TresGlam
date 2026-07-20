export const seaBuckthornProduct = {
  id: "sea-buckthorn-juice",
  name: "Tresglam Sea Buckthorn Juice",
  origin: "Ladakh",
  subtitle: "100% Pure & Natural | Premium Glass Bottle | 300 ml",
  shortDescription:
    "A vibrant daily wellness ritual made from premium Ladakh sea buckthorn berries, bottled in food-grade glass to protect its natural taste, freshness and nutrients.",
  price: 700,
  mrp: 1100,
  savings: 400,
  image: "/images/seabuck/tresglam-sea-buckthorn-product.png",
  images: [
    "/images/seabuck/tresglam-sea-buckthorn-product.png",
    "/images/seabuck/tresglam-glass-bottle-benefits.png",
  ],
  benefits: [
    "Rich in natural Vitamin C",
    "Powerful source of antioxidants",
    "Supports healthy immunity",
    "Helps maintain healthy skin",
    "Supports hair health",
    "Promotes overall wellness",
  ],
  glassReasons: [
    "Premium food-grade glass bottle",
    "Preserves natural taste, freshness and nutrients",
    "Free from unwanted plastic odour",
    "Better for long-term storage",
    "Eco-friendly and recyclable",
  ],
  howToUse: [
    "Shake well before use.",
    "Take 30 ml daily.",
    "Dilute with 150–200 ml of water.",
    "Best consumed after meals or as advised by your healthcare professional.",
  ],
  ingredients: [
    "99% Sea Buckthorn Fruit Pulp",
    "Permitted Natural Preservatives (if applicable)",
  ],
  storage: [
    "Store in a cool and dry place.",
    "Keep away from direct sunlight.",
    "Refrigerate after opening.",
    "Consume within the recommended period after opening.",
  ],
  packageContents: [
    "1 × Tresglam Sea Buckthorn Juice",
    "Net Quantity: 300 ml",
    "Premium Glass Bottle",
  ],
} as const;

export type SeaBuckthornProduct = typeof seaBuckthornProduct;
