export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface BeverageItem {
  name: string;
  price: number;
  category: string;
}

export const menuItems: MenuItem[] = [
  // Shawarma Items
  {
    id: "1",
    name: "Chicken Shawarma Wrap",
    description: "Fresh wrap with tender chicken, vegetables and sauce",
    price: 350,
    image: "/lovable-uploads/3ed59e06-6aec-4207-9ecc-fb66bc1d85cc.png",
    category: "Shawarma"
  },
  {
    id: "2", 
    name: "Beef Shawarma Wrap",
    description: "Authentic beef shawarma wrap with fresh vegetables and garlic sauce",
    price: 400,
    image: "/lovable-uploads/bf1df627-0e97-457f-80fe-9bf859befbeb.png",
    category: "Shawarma"
  },
  {
    id: "3",
    name: "Arabic Style Chicken Shawarma",
    description: "Served with fries, garlic sauce & soda",
    price: 600,
    image: "/lovable-uploads/9e331843-226c-4f3f-9a88-02fe0f63c1c4.png",
    category: "Shawarma"
  },
  {
    id: "4",
    name: "Arabic Style Doner Shawarma",
    description: "Served with fries, humus & soda",
    price: 650,
    image: "/lovable-uploads/0397667b-f0a7-4948-8005-4e657c552ddb.png",
    category: "Shawarma"
  },
  {
    id: "5",
    name: "Chicken Shawarma Plate",
    description: "Delicious chicken shawarma served as a plate",
    price: 650,
    image: "/lovable-uploads/bda0f55d-a0c0-4557-bcb1-e896d6cc2086.png",
    category: "Shawarma"
  },
  {
    id: "6",
    name: "Mix Shawarma Plate",
    description: "A combination of different shawarma meats served as a plate",
    price: 700,
    image: "/lovable-uploads/df8a66a7-5556-404d-bd08-672bc7ec565c.png",
    category: "Shawarma"
  },
  {
    id: "7",
    name: "Chicken Shawarma Combo",
    description: "Served with fries & soda",
    price: 450,
    image: "/lovable-uploads/ef94c0b5-a3bd-46ef-8837-3f32965af7ea.png",
    category: "Shawarma"
  },
  // Burgers
  {
    id: "8",
    name: "Beef Burger Combo",
    description: "Served with fries & soda",
    price: 450,
    image: "/lovable-uploads/28d9c112-63e7-40f3-a1b7-5d973e2c4d40.png",
    category: "Burgers"
  },
  {
    id: "9",
    name: "Chicken Burger Combo",
    description: "Served with fries & soda",
    price: 450,
    image: "/lovable-uploads/28d9c112-63e7-40f3-a1b7-5d973e2c4d40.png",
    category: "Burgers"
  },
  {
    id: "10",
    name: "Doner Sub Combo",
    description: "Served with fries & soda",
    price: 500,
    image: "/lovable-uploads/28d9c112-63e7-40f3-a1b7-5d973e2c4d40.png",
    category: "Burgers"
  },
  {
    id: "11",
    name: "Crispy Chicken Burger Combo",
    description: "Served with fries & soda",
    price: 500,
    image: "/lovable-uploads/e9c02ebd-749e-4f71-b9a8-8edd6ea8b9e5.png",
    category: "Burgers"
  },
  {
    id: "12",
    name: "Doner Burger Combo",
    description: "Served with fries & soda",
    price: 500,
    image: "/lovable-uploads/e9c02ebd-749e-4f71-b9a8-8edd6ea8b9e5.png",
    category: "Burgers"
  },
  // Fajita Items
  {
    id: "13",
    name: "Fajita Chicken",
    description: "Served with fries & soda",
    price: 500,
    image: "/lovable-uploads/6949d173-e2cc-4a41-810c-14a8ed6f08bd.png",
    category: "Fajita"
  },
  {
    id: "14",
    name: "Philadelphian Sub",
    description: "Served with fries & soda",
    price: 550,
    image: "/lovable-uploads/6949d173-e2cc-4a41-810c-14a8ed6f08bd.png",
    category: "Fajita"
  },
  // Kebab Plates
  {
    id: "15",
    name: "Meat Kebab (Kafta) Plate",
    description: "Served with rice/fries, salad, humus & soda",
    price: 600,
    image: "/lovable-uploads/5ad0868b-6885-4a4b-8614-a9955df9fe40.png",
    category: "Kebab"
  },
  {
    id: "16",
    name: "Beef Kebab Plate",
    description: "Served with rice/fries, salad, humus & soda", 
    price: 700,
    image: "/lovable-uploads/5ad0868b-6885-4a4b-8614-a9955df9fe40.png",
    category: "Kebab"
  },
  {
    id: "17",
    name: "Mixed BBQ Plate",
    description: "Served with rice/fries, salad, humus & soda",
    price: 700,
    image: "/lovable-uploads/5ad0868b-6885-4a4b-8614-a9955df9fe40.png",
    category: "Kebab"
  },
  {
    id: "18",
    name: "Falafel Plate",
    description: "Served with rice/fries, salad, humus & soda",
    price: 500,
    image: "/lovable-uploads/d2f1c67f-1410-48f9-9526-8b50dbf25346.png",
    category: "Kebab"
  },
  {
    id: "19",
    name: "Chicken Kebab Plate",
    description: "Served with rice/fries, salad, garlic sauce & soda",
    price: 600,
    image: "/lovable-uploads/d2f1c67f-1410-48f9-9526-8b50dbf25346.png",
    category: "Kebab"
  },
  // Trio Kebab Plates
  {
    id: "20",
    name: "Trio Chicken Kebab Plate",
    description: "Served with rice/fries, garlic sauce & soda",
    price: 750,
    image: "/lovable-uploads/33f5dcbb-e267-4a36-bea0-b54fe1104543.png",
    category: "Trio"
  },
  {
    id: "21",
    name: "Trio Meat Kebab Plate",
    description: "Served with rice/fries, humus & soda",
    price: 850,
    image: "/lovable-uploads/33f5dcbb-e267-4a36-bea0-b54fe1104543.png",
    category: "Trio"
  }
];

export const beverages: BeverageItem[] = [
  // Hot Drinks
  { name: "Black Coffee", price: 150, category: "Hot" },
  { name: "Chai Dawa", price: 150, category: "Hot" },
  { name: "Espresso", price: 150, category: "Hot" },
  { name: "Black Masala Tea", price: 150, category: "Hot" },
  { name: "Black Kenyan Tea", price: 100, category: "Hot" },
  { name: "Green Tea", price: 150, category: "Hot" },
  { name: "White Kenyan Tea", price: 150, category: "Hot" },
  { name: "White Masala Tea", price: 200, category: "Hot" },
  { name: "Latte", price: 200, category: "Hot" },
  { name: "Dancing Coffee", price: 250, category: "Hot" },
  { name: "Caramel Latte", price: 250, category: "Hot" },
  { name: "Caramel Macchiato", price: 250, category: "Hot" },
  { name: "Cappuccino", price: 200, category: "Hot" },
  { name: "Hot Chocolate", price: 300, category: "Hot" },
  
  // Cold Drinks
  { name: "Iced Tea", price: 200, category: "Cold" },
  { name: "Iced Coffee", price: 200, category: "Cold" },
  { name: "Iced Latte", price: 250, category: "Cold" },
  { name: "Iced Cappuccino", price: 250, category: "Cold" },
  
  // Slushies - Small
  { name: "Mango Slushy (Small)", price: 150, category: "Slushies" },
  { name: "Mixed Slushy (Small)", price: 150, category: "Slushies" },
  { name: "Cocktail Slushy (Small)", price: 150, category: "Slushies" },
  { name: "Lemonade Mint Slushy (Small)", price: 150, category: "Slushies" },
  
  // Slushies - Large
  { name: "Mango Slushy (Large)", price: 200, category: "Slushies" },
  { name: "Mixed Slushy (Large)", price: 200, category: "Slushies" },
  { name: "Cocktail Slushy (Large)", price: 200, category: "Slushies" },
  { name: "Lemonade Mint Slushy (Large)", price: 200, category: "Slushies" },
  
  // Soft Drinks
  { name: "Coca Cola (350ml)", price: 70, category: "Soft Drinks" },
  { name: "Fanta (350ml)", price: 70, category: "Soft Drinks" },
  { name: "Sprite (350ml)", price: 70, category: "Soft Drinks" },
  { name: "Stoney (350ml)", price: 70, category: "Soft Drinks" },
  { name: "Black Current (350ml)", price: 70, category: "Soft Drinks" },
  { name: "Coca Cola (500ml)", price: 100, category: "Soft Drinks" },
  { name: "Fanta (500ml)", price: 100, category: "Soft Drinks" },
  { name: "Sprite (500ml)", price: 100, category: "Soft Drinks" },
  { name: "Stoney (500ml)", price: 100, category: "Soft Drinks" },
  { name: "Black Current (500ml)", price: 100, category: "Soft Drinks" },
  { name: "Mineral Water (500ml)", price: 100, category: "Soft Drinks" },
  { name: "Mineral Water (1L)", price: 200, category: "Soft Drinks" },
  
  // Shakes
  { name: "Vanilla Shake", price: 300, category: "Shakes" },
  { name: "Strawberry Shake", price: 300, category: "Shakes" },
  { name: "Oreo Shake", price: 300, category: "Shakes" },
  { name: "Mango Shake", price: 300, category: "Shakes" }
];
