const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/onefi";

const products = [
  {
    name: "Apple iPhone 15",
    slug: "apple-iphone-15",
    brand: "Apple",
    category: "Smartphones",
    description:
      "Dynamic Island experience with A16 Bionic chip and advanced camera system.",
    variants: [
      {
        variantName: "Blue 128GB",
        storage: "128GB",
        color: "Blue",
        colorHex: "#6FA8DC",
        mrp: 59900,
        price: 54790,
        images: [
          "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/300738_0_c9hoz7.png?tr=w-1000",
          "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/300738_1_onpxb0.png?tr=w-225",
          "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/300738_2_u4l4fz.png?tr=w-225",
        ],
      },
      {
        variantName: "Black 256GB",
        storage: "256GB",
        color: "Black",
        colorHex: "#111111",
        mrp: 69900,
        price: 64790,
        images: [
          "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/300700_0_m0ffoy.png?tr=w-225",
          "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/300700_1_tuf9ln.png?tr=w-225",
          "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/300700_2_vrhvyg.png?tr=w-225",
        ],
      },
    ],
    emiPlans: [
      {
        tenure: 3,
        monthlyAmount: 18263,
        interestRate: 0,
        cashback: true,
        cashbackAmount: 1500,
      },
      {
        tenure: 6,
        monthlyAmount: 9131,
        interestRate: 0,
        cashback: false,
        cashbackAmount: 0,
      },
      {
        tenure: 12,
        monthlyAmount: 4565,
        interestRate: 10.5,
        cashback: false,
        cashbackAmount: 0,
      },
    ],
  },

  {
    name: "Apple iPhone 15 Plus",
    slug: "apple-iphone-15-plus",
    brand: "Apple",
    category: "Smartphones",
    description:
      "Large 6.7-inch Super Retina XDR display with powerful battery performance.",
    variants: [
      {
        variantName: "Pink 128GB",
        storage: "128GB",
        color: "Pink",
        colorHex: "#F4C2C2",
        mrp: 79900,
        price: 74900,
        images: [
          "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/300775_0_geceou.png?tr=w-225",
          "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/300775_1_stnswk.png?tr=w-225",
          "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/300775_2_ql3hiu.png?tr=w-225",
        ],
      },
      {
        variantName: "Yellow 256GB",
        storage: "256GB",
        color: "Yellow",
        colorHex: "#FFD700",
        mrp: 89900,
        price: 84900,
        images: [
          "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/300773_0_o89yyb.png?tr=w-225",
          "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/300773_1_dhulq4.png?tr=w-225",
          "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/300773_2_ojmant.png?tr=w-225",
        ],
      },
    ],
    emiPlans: [
      {
        tenure: 3,
        monthlyAmount: 21665,
        interestRate: 0,
        cashback: true,
        cashbackAmount: 2000,
      },
      {
        tenure: 6,
        monthlyAmount: 10832,
        interestRate: 0,
        cashback: false,
        cashbackAmount: 0,
      },
      {
        tenure: 12,
        monthlyAmount: 5416,
        interestRate: 10.5,
        cashback: false,
        cashbackAmount: 0,
      },
    ],
  },

  {
    name: "Samsung Galaxy S23 Ultra",
    slug: "samsung-galaxy-s23-ultra",
    brand: "Samsung",
    category: "Smartphones",
    description:
      "Flagship Samsung phone with S Pen support and pro-grade camera.",
    variants: [
      {
        variantName: "Phantom Black 256GB",
        storage: "256GB",
        color: "Black",
        colorHex: "#1C1C1E",
        mrp: 149999,
        price: 109990,
        images: [
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/u/a/l/-original-imagzm8qrfdmhy8z.jpeg?q=90",
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/2/a/j/-original-imagmg6gcxzaggfy.jpeg?q=90",
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/f/1/k/-original-imagmg6gzej4y4hf.jpeg?q=90",
        ],
      },
      {
        variantName: "Green 512GB",
        storage: "512GB",
        color: "Green",
        colorHex: "#2ECC71",
        mrp: 159999,
        price: 119990,
        images: [
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/i/5/1/-original-imagzm8pvabtmeys.jpeg?q=90",
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/g/m/t/-original-imagmg6gyhzhh3fb.jpeg?q=90",
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/q/y/u/-original-imagmg6ggzazdevx.jpeg?q=90",
        ],
      },
    ],
    emiPlans: [
      {
        tenure: 3,
        monthlyAmount: 36663,
        interestRate: 0,
        cashback: true,
        cashbackAmount: 2500,
      },
      {
        tenure: 6,
        monthlyAmount: 18331,
        interestRate: 0,
        cashback: false,
        cashbackAmount: 0,
      },
      {
        tenure: 12,
        monthlyAmount: 9165,
        interestRate: 10.5,
        cashback: false,
        cashbackAmount: 0,
      },
    ],
  },

  {
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    brand: "Samsung",
    category: "Smartphones",
    description: "Galaxy AI powered flagship with premium titanium frame.",
    variants: [
      {
        variantName: "Titanium Gray 256GB",
        storage: "256GB",
        color: "Gray",
        colorHex: "#5F6368",
        mrp: 144999,
        price: 119999,
        images: [
          "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/303838_oqpio4.png?tr=w-1000",
          "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/303838_1_l9ya6v.png?tr=w-1000",
          "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/303838_2_pxxmn1.png?tr=w-225",
        ],
      },
      {
        variantName: "Titanium Violet 512GB",
        storage: "512GB",
        color: "Violet",
        colorHex: "#8B7BA8",
        mrp: 154999,
        price: 129999,
        images: [
          "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/303817_cc5lmd.png?tr=w-1000",
          "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/303817_1_xspbe7.png?tr=w-225",
          "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/303817_2_uil61o.png?tr=w-225",
        ],
      },
    ],
    emiPlans: [
      {
        tenure: 3,
        monthlyAmount: 40000,
        interestRate: 0,
        cashback: true,
        cashbackAmount: 2000,
      },
      {
        tenure: 6,
        monthlyAmount: 20000,
        interestRate: 0,
        cashback: false,
        cashbackAmount: 0,
      },
      {
        tenure: 12,
        monthlyAmount: 10000,
        interestRate: 10.5,
        cashback: false,
        cashbackAmount: 0,
      },
    ],
  },

  {
    name: "OnePlus 12",
    slug: "oneplus-12",
    brand: "OnePlus",
    category: "Smartphones",
    description: "Snapdragon flagship with fast charging and AMOLED display.",
    variants: [
      {
        variantName: "Flowy Emerald 256GB",
        storage: "256GB",
        color: "Green",
        colorHex: "#2ECC71",
        mrp: 64999,
        price: 59999,
        images: [
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/7/z/j/12-cph2573-oneplus-original-imahjngudb3jjkew.jpeg?q=90",
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/4/n/r/12-cph2573-oneplus-original-imahjnguthcucenp.jpeg?q=90",
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/t/r/c/12-cph2573-oneplus-original-imahjngugxny5yuy.jpeg?q=90",
        ],
      },

      ,
      {
        variantName: "Silky Black 512GB",
        storage: "512GB",
        color: "Black",
        colorHex: "#000000",
        mrp: 69999,
        price: 64999,
        images: [
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/w/f/q/12-cph2573-oneplus-original-imahjngszsdyddfh.jpeg?q=90",
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/8/g/c/12-cph2573-oneplus-original-imahjngsbrmzunr9.jpeg?q=90",
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/z/i/e/12-cph2573-oneplus-original-imahjngs8xrmzrz2.jpeg?q=90",
        ],
      },
    ],
    emiPlans: [
      {
        tenure: 3,
        monthlyAmount: 19999,
        interestRate: 0,
        cashback: true,
        cashbackAmount: 1000,
      },
      {
        tenure: 6,
        monthlyAmount: 9999,
        interestRate: 0,
        cashback: false,
        cashbackAmount: 0,
      },
      {
        tenure: 12,
        monthlyAmount: 4999,
        interestRate: 10.5,
        cashback: false,
        cashbackAmount: 0,
      },
    ],
  },

  {
    name: "iQOO Neo 9 Pro",
    slug: "iqoo-neo-9-pro",
    brand: "iQOO",
    category: "Smartphones",
    description: "Gaming focused smartphone with flagship processor.",
    variants: [
      {
        variantName: "Red White 256GB",
        storage: "256GB",
        color: "Red",
        colorHex: "#FF3B30",
        mrp: 39999,
        price: 34999,
        images: [
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/i/i/p/neo9-pro-i2304-iqoo-original-imagz8ke4rza59y4.jpeg?q=90",
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/j/e/h/neo9-pro-i2304-iqoo-original-imagz8kewwrehtsf.jpeg?q=90",
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/c/p/t/neo9-pro-i2304-iqoo-original-imagz8ker66f9py4.jpeg?q=90",
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/n/i/q/neo9-pro-i2304-iqoo-original-imagz8keddtrpgzp.jpeg?q=90",
        ],
      },
      {
        variantName: "Black 128GB",
        storage: "128GB",
        color: "Black",
        colorHex: "#111111",
        mrp: 37999,
        price: 32999,
        images: [
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/a/r/t/neo9-pro-neo9-pro-iqoo-original-imagz8kg2999rtwj.jpeg?q=90",
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/y/j/4/neo9-pro-neo9-pro-iqoo-original-imagz8kgnj9s7syx.jpeg?q=90",
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/q/o/r/neo9-pro-neo9-pro-iqoo-original-imagz8kgceznqncq.jpeg?q=90",
        ],
      },
    ],
    emiPlans: [
      {
        tenure: 3,
        monthlyAmount: 11666,
        interestRate: 0,
        cashback: false,
        cashbackAmount: 0,
      },
      {
        tenure: 6,
        monthlyAmount: 5833,
        interestRate: 0,
        cashback: false,
        cashbackAmount: 0,
      },
      {
        tenure: 12,
        monthlyAmount: 2916,
        interestRate: 10.5,
        cashback: false,
        cashbackAmount: 0,
      },
    ],
  },

  {
    name: "Xiaomi 14",
    slug: "xiaomi-14",
    brand: "Xiaomi",
    category: "Smartphones",
    description: "Leica tuned flagship with premium glass design.",
    variants: [
      {
        variantName: "Black 256GB",
        storage: "256GB",
        color: "Black",
        colorHex: "#000000",
        mrp: 69999,
        price: 64999,
        images: [
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/5/8/w/-original-imahfpwvcfvxvqfh.jpeg?q=90",
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/v/h/1/-original-imah4wyqdnmyvd3d.jpeg?q=90",
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/4/2/4/-original-imah4wyq9b8p4gfe.jpeg?q=90",
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/k/x/v/-original-imah4wyqd8jyvhrq.jpeg?q=90",
        ],
      },
      {
        variantName: "White 512GB",
        storage: "512GB",
        color: "White",
        colorHex: "#FFFFFF",
        mrp: 74999,
        price: 69999,
        images: [
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/s/r/m/-original-imah34gxy5562pgz.jpeg?q=90",
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/a/c/g/-original-imah34gxyyqjtq4c.jpeg?q=90",
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/1/5/p/-original-imah34gxdyuz6yqj.jpeg?q=90",
        ],
      },
    ],
    emiPlans: [
      {
        tenure: 3,
        monthlyAmount: 21666,
        interestRate: 0,
        cashback: true,
        cashbackAmount: 1000,
      },
      {
        tenure: 6,
        monthlyAmount: 10833,
        interestRate: 0,
        cashback: false,
        cashbackAmount: 0,
      },
      {
        tenure: 12,
        monthlyAmount: 5416,
        interestRate: 10.5,
        cashback: false,
        cashbackAmount: 0,
      },
    ],
  },

  {
    name: "Realme GT 6",
    slug: "realme-gt-6",
    brand: "Realme",
    category: "Smartphones",
    description:
      "High refresh rate AMOLED display with fast charging performance.",
    variants: [
      {
        variantName: "Silver 256GB",
        storage: "256GB",
        color: "Silver",
        colorHex: "#DADADA",
        mrp: 36999,
        price: 32999,
        images: [
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/l/i/a/-original-imah2y7hazjdbrzh.jpeg?q=90",
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/e/w/a/-original-imah26hp6hrph5uu.jpeg?q=90",
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/y/a/q/-original-imah26hpfz3v9zhh.jpeg?q=90",
        ],
      },
      {
        variantName: "Green 128GB",
        storage: "128GB",
        color: "Green",
        colorHex: "#2ECC71",
        mrp: 34999,
        price: 30999,
        images: [
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/m/1/7/gt-6-rmx3851-realme-original-imah2y7ewhzjpfhd.jpeg?q=90",
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/5/y/m/-original-imah26hqgxsns8e8.jpeg?q=90",
          "https://rukminim2.flixcart.com/image/3024/3024/xif0q/mobile/v/f/l/-original-imah26hqzseugd9z.jpeg?q=90",
        ],
      },
    ],
    emiPlans: [
      {
        tenure: 3,
        monthlyAmount: 10999,
        interestRate: 0,
        cashback: false,
        cashbackAmount: 0,
      },
      {
        tenure: 6,
        monthlyAmount: 5499,
        interestRate: 0,
        cashback: false,
        cashbackAmount: 0,
      },
      {
        tenure: 12,
        monthlyAmount: 2749,
        interestRate: 10.5,
        cashback: false,
        cashbackAmount: 0,
      },
    ],
  },

  {
    name: "Google Pixel 8",
    slug: "google-pixel-8",
    brand: "Google",
    category: "Smartphones",
    description: "Pure Android experience with advanced AI camera features.",
    variants: [
      {
        variantName: "Obsidian 128GB",
        storage: "128GB",
        color: "Black",
        colorHex: "#2B2B2B",
        mrp: 75999,
        price: 69999,
        images: [
          "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/original/google/494494548/0/emhIk4EWpT-_T-Ys4W44b-Google-Pixel-9A-494494548-i-1-1200Wx1200H.jpeg",
          "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/314882_1_6S3QluZ7K.png?updatedAt=1762782598665?tr=w-225",
          "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Feature%20Callout%202025/314882_2_DECIrVDF1.png?updatedAt=1758087246328?tr=w-1000",
          "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/314882_4_c5J-fWpko.png?updatedAt=1758548742438?tr=w-225",
        ],
      },
      {
        variantName: "Hazel 256GB",
        storage: "256GB",
        color: "Hazel",
        colorHex: "#8B7765",
        mrp: 81999,
        price: 75999,
        images: [
          "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/314883_0_dVwL6rPzk.png?updatedAt=1758548803978?tr=w-1000",
          "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/314883_0_dVwL6rPzk.png?updatedAt=1758548803978?tr=w-1000",
          "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/314883_7_uczq6rK_U.png?updatedAt=1758548810599?tr=w-1000",
        ],
      },
    ],
    emiPlans: [
      {
        tenure: 3,
        monthlyAmount: 23333,
        interestRate: 0,
        cashback: true,
        cashbackAmount: 1500,
      },
      {
        tenure: 6,
        monthlyAmount: 11666,
        interestRate: 0,
        cashback: false,
        cashbackAmount: 0,
      },
      {
        tenure: 12,
        monthlyAmount: 5833,
        interestRate: 10.5,
        cashback: false,
        cashbackAmount: 0,
      },
    ],
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("connected to mongodb");

    await Product.deleteMany({});
    console.log("cleared existing products");

    await Product.insertMany(products);
    console.log("seeded products successfully");

    mongoose.connection.close();
    console.log("database connection closed");
  } catch (error) {
    console.error("seeding error:", error);
    process.exit(1);
  }
}

seedDatabase();
