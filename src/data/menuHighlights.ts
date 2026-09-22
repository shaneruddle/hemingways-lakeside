// Prices read from the live menu boards (Firestore menu_images) on 22 Sept 2026.
// If the printed menu changes, update here — these feed /food, /steak, /sunday-roast,
// /th/western-food-pattaya and the FAQ schema. Keep in sync with the menu images.

export interface MenuItem {
  name: string
  th?: string
  price: number | string
  desc: string
}

export const BREAKFASTS: MenuItem[] = [
  { name: 'Small English Breakfast', price: 165, desc: '1 pork sausage, 1 bacon, 2 eggs your way, baked beans, toast or fried bread.' },
  { name: 'Medium English Breakfast', price: 229, desc: '1 sausage, 2 bacon, 2 eggs, black pudding, hash brown, beans, tomato, toast.' },
  { name: 'Full English Breakfast', price: 289, desc: '2 sausages, 2 bacon, 2 eggs, black pudding, 2 hash browns, mushrooms, beans, tomato, 2 toast.' },
  { name: 'Sausage or Bacon Sandwich', price: 130, desc: 'Two sausages or two rashers in a soft roll. Add an egg for 20.' },
  { name: 'Sausage & Egg / Bacon & Egg Muffin', price: 185, desc: 'Served with hash browns.' },
]
export const BREAKFAST_NOTE = 'All English breakfast sets include coffee or tea with one refill. Served from 8am.'

export const PUB_CLASSICS: MenuItem[] = [
  { name: 'Beer Battered Cod & Chips', th: 'คอด แอนด์ ชิพ', price: 325, desc: 'Crispy beer-battered cod fillet, homemade chips, garden or mushy peas, tartare sauce.' },
  { name: 'Bangers & Mash', th: 'แบงเกอร์ แอนด์ มัช', price: 295, desc: 'English pork sausages, creamy mash, caramelised onion chutney, baby carrots and peas, red wine gravy.' },
  { name: 'Cottage Pie (Beef)', th: 'คอทเทจ พาย', price: 295, desc: 'Slow-cooked minced beef and vegetables in rich gravy under cheesy mash, with a warm bread roll.' },
  { name: 'Ham, Egg & Chips', th: 'แฮม เอ๊ก แอนด์ ชิพ', price: 239, desc: 'Home-cooked ham, two fried eggs, homemade chips and baked beans.' },
  { name: 'Gammon, Egg & Chips', th: 'แกรมมอน สเต็ก', price: 325, desc: '300g pan-seared gammon steak, charred pineapple, fried egg, homemade chips and salad.' },
  { name: 'Pork Chop', th: 'พอร์ค ชอป', price: 325, desc: '300g grilled pork chop, French fries, fresh salad and a jug of gravy.' },
  { name: 'BBQ Ribs (half / full)', th: 'บาร์บีคิว ริบ', price: '359 / 479', desc: 'Tender pork ribs in BBQ glaze with homemade chips, coleslaw and salad.' },
  { name: 'Chicken Fajitas', th: 'ชิกเก้น ฟาจิตาส', price: 325, desc: 'Sizzling Cajun-style chicken with onions and peppers, 3 tortillas, salsa, sour cream and cheese.' },
]

export const STEAKS: MenuItem[] = [
  { name: 'Australian Ribeye Steak', th: 'ริบอาย สเต็ก', price: 650, desc: '250g Black Angus ribeye.' },
  { name: 'Australian Sirloin Steak', th: 'สเตปลอย สเต็ก', price: 550, desc: '250g Black Angus sirloin.' },
  { name: 'Australian Lamb Chops', th: 'แลมชอป สเต็ก', price: 699, desc: '300g Angus lamb chops.' },
  { name: 'Salmon Steak', th: 'แซลมอน สเต็ก', price: 469, desc: 'Crisp-fried fillet of fresh Atlantic salmon.' },
  { name: 'Chicken Steak', th: 'ไก่ สเต็ก', price: 299, desc: 'Grilled 250g chicken steak.' },
]
export const STEAK_SIDES = {
  side1: ['French fries', 'Homemade chips', 'Mash potato', 'Baked potato', 'Onion rings'],
  side2: ['Garden salad', 'Grilled vegetables', 'Spinach'],
  sauce: ['Peppercorn gravy', 'Mushroom gravy', 'Peppercorn cream', 'Mushroom cream'],
}

export const SUNDAY_ROAST = {
  small: 279,
  big: 379,
  from: '12pm',
  meats: ['Porchetta', 'Beef', 'Lamb', 'Chicken', 'Pork'],
  includes: 'Soup (self-service side dish), roast potatoes, Yorkshire pudding, seasonal veg and gravy',
  note: 'Served from 12pm until it runs out. Weekend happy hour all day on Sundays.',
}

export const WEEKLY_SPECIALS = [
  { day: 'Thursday', name: 'Thursday Special', desc: 'Chicken Parma 249 · Chicken Fajitas 279' },
  { day: 'Saturday', name: 'Pizza Day', desc: 'Any pizza 250 - BBQ Chicken, Pad Ka Pow, Spicy Supreme, Classic Napoli, Mediterranean Margherita' },
  { day: 'Sunday', name: 'Sunday Roast Carvery', desc: `Small plate ${SUNDAY_ROAST.small} · Big plate ${SUNDAY_ROAST.big}, from ${SUNDAY_ROAST.from}` },
]
