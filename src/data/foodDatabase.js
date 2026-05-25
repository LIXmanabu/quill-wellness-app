// Per-serving macro values. Values are approximate, per standard serving.
// kcal, protein (g), carbs (g), fat (g), fibre (g)

export const foods = [
  // ─── Proteins ─────────────────────────────────────────────────
  { id: 'chicken-breast', name: 'Chicken breast', serving: '150 g', kcal: 248, p: 46, c: 0, f: 5, fib: 0, cat: 'protein' },
  { id: 'salmon', name: 'Salmon fillet', serving: '120 g', kcal: 250, p: 25, c: 0, f: 16, fib: 0, cat: 'protein' },
  { id: 'eggs-2', name: 'Eggs', serving: '2 large', kcal: 156, p: 13, c: 1, f: 11, fib: 0, cat: 'protein' },
  { id: 'tofu', name: 'Tofu, firm', serving: '120 g', kcal: 145, p: 17, c: 3, f: 8, fib: 2, cat: 'protein' },
  { id: 'tempeh', name: 'Tempeh', serving: '100 g', kcal: 195, p: 20, c: 8, f: 11, fib: 7, cat: 'protein' },
  { id: 'greek-yogurt', name: 'Greek yogurt (0%)', serving: '170 g', kcal: 100, p: 17, c: 6, f: 0, fib: 0, cat: 'protein' },
  { id: 'cottage-cheese', name: 'Cottage cheese', serving: '120 g', kcal: 110, p: 14, c: 4, f: 4, fib: 0, cat: 'protein' },
  { id: 'whey', name: 'Whey or pea protein', serving: '1 scoop', kcal: 120, p: 24, c: 3, f: 1, fib: 0, cat: 'protein' },
  { id: 'lentils', name: 'Lentils, cooked', serving: '1 cup', kcal: 230, p: 18, c: 40, f: 1, fib: 16, cat: 'protein' },
  { id: 'chickpeas', name: 'Chickpeas, cooked', serving: '1 cup', kcal: 270, p: 15, c: 45, f: 4, fib: 12, cat: 'protein' },
  { id: 'black-beans', name: 'Black beans', serving: '1 cup', kcal: 220, p: 15, c: 40, f: 1, fib: 15, cat: 'protein' },
  { id: 'tuna-can', name: 'Tuna, canned in water', serving: '1 can (140 g)', kcal: 130, p: 28, c: 0, f: 1, fib: 0, cat: 'protein' },
  { id: 'sardines', name: 'Sardines', serving: '1 tin (90 g)', kcal: 200, p: 23, c: 0, f: 11, fib: 0, cat: 'protein' },
  { id: 'lean-beef', name: 'Lean beef', serving: '120 g', kcal: 240, p: 30, c: 0, f: 13, fib: 0, cat: 'protein' },

  // ─── Grains & starches ────────────────────────────────────────
  { id: 'oats', name: 'Rolled oats, dry', serving: '50 g', kcal: 190, p: 7, c: 33, f: 3, fib: 5, cat: 'carb' },
  { id: 'brown-rice', name: 'Brown rice, cooked', serving: '1 cup', kcal: 215, p: 5, c: 45, f: 2, fib: 4, cat: 'carb' },
  { id: 'white-rice', name: 'White rice, cooked', serving: '1 cup', kcal: 205, p: 4, c: 45, f: 0, fib: 1, cat: 'carb' },
  { id: 'quinoa', name: 'Quinoa, cooked', serving: '1 cup', kcal: 220, p: 8, c: 39, f: 4, fib: 5, cat: 'carb' },
  { id: 'pasta-whole', name: 'Wholemeal pasta', serving: '80 g dry', kcal: 280, p: 12, c: 56, f: 2, fib: 7, cat: 'carb' },
  { id: 'sweet-potato', name: 'Sweet potato, baked', serving: '200 g', kcal: 180, p: 4, c: 41, f: 0, fib: 7, cat: 'carb' },
  { id: 'potato', name: 'Potato, boiled', serving: '200 g', kcal: 175, p: 4, c: 40, f: 0, fib: 4, cat: 'carb' },
  { id: 'bread-whole', name: 'Wholegrain bread', serving: '2 slices', kcal: 160, p: 8, c: 28, f: 2, fib: 6, cat: 'carb' },
  { id: 'tortilla', name: 'Wholewheat tortilla', serving: '1 large', kcal: 140, p: 5, c: 22, f: 4, fib: 4, cat: 'carb' },
  { id: 'bagel', name: 'Bagel', serving: '1 plain', kcal: 270, p: 11, c: 53, f: 2, fib: 2, cat: 'carb' },

  // ─── Vegetables ───────────────────────────────────────────────
  { id: 'spinach', name: 'Spinach, fresh', serving: '100 g', kcal: 23, p: 3, c: 4, f: 0, fib: 2, cat: 'veg' },
  { id: 'broccoli', name: 'Broccoli', serving: '150 g', kcal: 50, p: 4, c: 10, f: 1, fib: 4, cat: 'veg' },
  { id: 'carrot', name: 'Carrots', serving: '150 g', kcal: 60, p: 1, c: 14, f: 0, fib: 4, cat: 'veg' },
  { id: 'mixed-salad', name: 'Mixed salad leaves', serving: '100 g', kcal: 15, p: 1, c: 3, f: 0, fib: 2, cat: 'veg' },
  { id: 'tomato', name: 'Tomato', serving: '1 medium', kcal: 22, p: 1, c: 5, f: 0, fib: 1, cat: 'veg' },
  { id: 'cucumber', name: 'Cucumber', serving: '100 g', kcal: 15, p: 1, c: 3, f: 0, fib: 1, cat: 'veg' },
  { id: 'peppers', name: 'Bell peppers', serving: '150 g', kcal: 45, p: 1, c: 9, f: 0, fib: 3, cat: 'veg' },
  { id: 'roasted-veg', name: 'Roasted veg mix', serving: '200 g', kcal: 120, p: 3, c: 18, f: 5, fib: 5, cat: 'veg' },
  { id: 'kale', name: 'Kale, sautéed', serving: '100 g', kcal: 60, p: 4, c: 7, f: 3, fib: 3, cat: 'veg' },

  // ─── Fruit ────────────────────────────────────────────────────
  { id: 'banana', name: 'Banana', serving: '1 medium', kcal: 105, p: 1, c: 27, f: 0, fib: 3, cat: 'fruit' },
  { id: 'apple', name: 'Apple', serving: '1 medium', kcal: 95, p: 0, c: 25, f: 0, fib: 4, cat: 'fruit' },
  { id: 'berries', name: 'Mixed berries', serving: '150 g', kcal: 75, p: 1, c: 18, f: 0, fib: 6, cat: 'fruit' },
  { id: 'orange', name: 'Orange', serving: '1 medium', kcal: 70, p: 1, c: 17, f: 0, fib: 3, cat: 'fruit' },
  { id: 'avocado-half', name: 'Avocado', serving: '½ medium', kcal: 160, p: 2, c: 9, f: 15, fib: 7, cat: 'fruit' },
  { id: 'pear', name: 'Pear', serving: '1 medium', kcal: 100, p: 1, c: 27, f: 0, fib: 6, cat: 'fruit' },
  { id: 'kiwi', name: 'Kiwi', serving: '2 medium', kcal: 90, p: 2, c: 22, f: 1, fib: 4, cat: 'fruit' },

  // ─── Fats, nuts, dairy ────────────────────────────────────────
  { id: 'olive-oil', name: 'Extra-virgin olive oil', serving: '1 tbsp', kcal: 120, p: 0, c: 0, f: 14, fib: 0, cat: 'fat' },
  { id: 'almonds', name: 'Almonds', serving: '30 g', kcal: 170, p: 6, c: 6, f: 15, fib: 4, cat: 'fat' },
  { id: 'walnuts', name: 'Walnuts', serving: '30 g', kcal: 185, p: 4, c: 4, f: 18, fib: 2, cat: 'fat' },
  { id: 'peanut-butter', name: 'Peanut butter', serving: '2 tbsp', kcal: 190, p: 8, c: 6, f: 16, fib: 2, cat: 'fat' },
  { id: 'feta', name: 'Feta cheese', serving: '40 g', kcal: 105, p: 6, c: 2, f: 8, fib: 0, cat: 'dairy' },
  { id: 'milk', name: 'Milk', serving: '250 ml', kcal: 125, p: 8, c: 12, f: 5, fib: 0, cat: 'dairy' },
  { id: 'dark-chocolate', name: 'Dark chocolate (70%+)', serving: '20 g', kcal: 115, p: 2, c: 9, f: 8, fib: 2, cat: 'treat' },
  { id: 'hummus', name: 'Hummus', serving: '60 g', kcal: 100, p: 4, c: 8, f: 6, fib: 3, cat: 'fat' },

  // ─── Common composed meals ───────────────────────────────────
  { id: 'salad-bowl', name: 'Big leafy salad bowl', serving: '1 bowl', kcal: 180, p: 6, c: 18, f: 9, fib: 7, cat: 'composed' },
  { id: 'chicken-rice-bowl', name: 'Chicken + rice + veg bowl', serving: '1 bowl', kcal: 580, p: 45, c: 65, f: 12, fib: 6, cat: 'composed' },
  { id: 'pasta-bolognese', name: 'Pasta bolognese', serving: '1 plate', kcal: 620, p: 32, c: 75, f: 18, fib: 6, cat: 'composed' },
  { id: 'sushi-roll', name: 'Sushi roll, 8 pieces', serving: '1 roll', kcal: 350, p: 12, c: 60, f: 6, fib: 3, cat: 'composed' },
  { id: 'burger-fries', name: 'Burger + fries', serving: '1 meal', kcal: 950, p: 35, c: 90, f: 50, fib: 6, cat: 'composed' },
  { id: 'pizza-slice', name: 'Pizza, 2 slices', serving: '2 slices', kcal: 540, p: 22, c: 65, f: 22, fib: 4, cat: 'composed' },
  { id: 'porridge-bowl', name: 'Porridge + berries + nuts', serving: '1 bowl', kcal: 380, p: 12, c: 55, f: 12, fib: 9, cat: 'composed' },
  { id: 'smoothie', name: 'Protein smoothie', serving: '500 ml', kcal: 380, p: 30, c: 45, f: 8, fib: 6, cat: 'composed' },

  // ─── Drinks & treats ──────────────────────────────────────────
  { id: 'coffee-black', name: 'Black coffee', serving: '1 cup', kcal: 5, p: 0, c: 0, f: 0, fib: 0, cat: 'drink' },
  { id: 'latte', name: 'Latte', serving: '350 ml', kcal: 150, p: 8, c: 14, f: 6, fib: 0, cat: 'drink' },
  { id: 'soda', name: 'Soda', serving: '330 ml', kcal: 140, p: 0, c: 39, f: 0, fib: 0, cat: 'drink' },
  { id: 'beer', name: 'Beer', serving: '330 ml', kcal: 145, p: 1, c: 11, f: 0, fib: 0, cat: 'drink' },
  { id: 'wine-glass', name: 'Wine', serving: '150 ml', kcal: 125, p: 0, c: 4, f: 0, fib: 0, cat: 'drink' },
  { id: 'biscuit', name: 'Biscuit / cookie', serving: '1 medium', kcal: 100, p: 1, c: 14, f: 5, fib: 0, cat: 'treat' },
  { id: 'crisps', name: 'Crisps / chips', serving: '30 g', kcal: 160, p: 2, c: 15, f: 10, fib: 1, cat: 'treat' },
  { id: 'ice-cream', name: 'Ice cream', serving: '1 scoop', kcal: 140, p: 2, c: 16, f: 7, fib: 0, cat: 'treat' },
]

export const categoryStyles = {
  protein: { label: 'Protein', dot: '#3D4A40', bg: '#EAEFEA' },
  carb: { label: 'Grain', dot: '#B08A2E', bg: '#F5EBD0' },
  veg: { label: 'Vegetable', dot: '#5A6B5D', bg: '#D5DDD6' },
  fruit: { label: 'Fruit', dot: '#C8654A', bg: '#F5E1D8' },
  fat: { label: 'Fat / nut', dot: '#9B4423', bg: '#FBEFE9' },
  dairy: { label: 'Dairy', dot: '#8FA694', bg: '#EAEFEA' },
  composed: { label: 'Meal', dot: '#1A1410', bg: '#E8DFD0' },
  drink: { label: 'Drink', dot: '#6B5D52', bg: '#F7F2EA' },
  treat: { label: 'Treat', dot: '#A04E37', bg: '#FBEFE9' },
}

// Daily targets per goal — used to score progress and surface gaps.
export const goalTargets = {
  'fat-loss': { kcal: 1800, p: 130, c: 180, f: 60, fib: 30, label: 'Fat loss' },
  muscle: { kcal: 2800, p: 160, c: 350, f: 80, fib: 30, label: 'Muscle gain' },
  longevity: { kcal: 2200, p: 90, c: 270, f: 75, fib: 35, label: 'Longevity' },
  performance: { kcal: 2600, p: 130, c: 380, f: 70, fib: 30, label: 'Performance' },
  heart: { kcal: 2000, p: 90, c: 240, f: 60, fib: 35, label: 'Heart health' },
  brain: { kcal: 2100, p: 100, c: 240, f: 75, fib: 30, label: 'Brain & focus' },
  balanced: { kcal: 2200, p: 110, c: 270, f: 75, fib: 30, label: 'Balanced' },
}

/**
 * Decide the meal slot based on local time and what's already been logged.
 */
export function currentMealSlot(now = new Date(), logged = []) {
  const h = now.getHours()
  const hasBreakfast = logged.some((m) => m.slot === 'breakfast')
  const hasLunch = logged.some((m) => m.slot === 'lunch')
  const hasDinner = logged.some((m) => m.slot === 'dinner')

  if (h < 11 && !hasBreakfast) return 'breakfast'
  if (h >= 11 && h < 15 && !hasLunch) return 'lunch'
  if (h >= 17 && h < 22 && !hasDinner) return 'dinner'
  if (h < 11) return 'breakfast'
  if (h < 15) return 'lunch'
  if (h >= 17) return 'dinner'
  return 'snack'
}

const slotLabels = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snack',
}

export function slotLabel(slot) { return slotLabels[slot] || 'Meal' }

/**
 * Suggest the next thing to eat based on:
 *  – the current meal slot
 *  – nutrient gaps vs. the user's daily target
 *  – what's already been eaten today (avoid repeats)
 */
export function suggestNext({ logged, target, now = new Date() }) {
  const slot = currentMealSlot(now, logged)
  const totals = logged.reduce(
    (acc, m) => ({
      kcal: acc.kcal + m.kcal * m.servings,
      p: acc.p + m.p * m.servings,
      c: acc.c + m.c * m.servings,
      f: acc.f + m.f * m.servings,
      fib: acc.fib + m.fib * m.servings,
    }),
    { kcal: 0, p: 0, c: 0, f: 0, fib: 0 }
  )

  const gaps = {
    kcal: target.kcal - totals.kcal,
    p: target.p - totals.p,
    c: target.c - totals.c,
    f: target.f - totals.f,
    fib: target.fib - totals.fib,
  }

  // Which macro is most behind (as a % of daily target)
  const ratios = [
    { key: 'p', pct: gaps.p / target.p, label: 'protein' },
    { key: 'fib', pct: gaps.fib / target.fib, label: 'fibre' },
    { key: 'c', pct: gaps.c / target.c, label: 'carbs' },
    { key: 'f', pct: gaps.f / target.f, label: 'healthy fats' },
  ]
  ratios.sort((a, b) => b.pct - a.pct)
  const topGap = ratios[0]

  const loggedIds = new Set(logged.map((m) => m.id))

  // Candidate pool based on slot
  const slotPool = {
    breakfast: ['porridge-bowl', 'greek-yogurt', 'eggs-2', 'oats', 'berries', 'banana', 'bread-whole'],
    lunch: ['chicken-rice-bowl', 'salad-bowl', 'lentils', 'quinoa', 'tofu', 'salmon', 'chicken-breast'],
    dinner: ['salmon', 'chicken-breast', 'tofu', 'lentils', 'pasta-bolognese', 'sweet-potato', 'roasted-veg'],
    snack: ['greek-yogurt', 'almonds', 'apple', 'berries', 'cottage-cheese', 'hummus', 'dark-chocolate'],
  }
  const pool = (slotPool[slot] || slotPool.snack).filter((id) => !loggedIds.has(id))

  // Score every candidate by how well it closes the top gap
  const scored = pool.map((id) => {
    const food = foods.find((f) => f.id === id)
    if (!food) return null
    const gain = food[topGap.key] || 0
    const overflow = Math.max(0, food.kcal - Math.max(gaps.kcal, 0)) // penalise over-eating
    return { food, score: gain * 4 - overflow * 0.05 }
  }).filter(Boolean)

  scored.sort((a, b) => b.score - a.score)
  const pick = scored[0]?.food || foods.find((f) => f.id === slotPool[slot][0])

  // Reason text
  let reason
  if (totals.kcal === 0) {
    reason = `It's ${slot} time — start your day strong.`
  } else if (topGap.pct > 0.4) {
    reason = `You're behind on ${topGap.label} today. This will help close the gap.`
  } else if (totals.kcal > target.kcal) {
    reason = `You're over your calorie target — a lighter ${slot} keeps the day balanced.`
  } else {
    reason = `A solid choice for ${slot}, fitting your remaining day.`
  }

  return { slot, food: pick, reason, totals, gaps, topGap }
}
