// Personalized routines + advice generated from onboarding quiz answers.
// Profile shape: { name, skinType, goal, timePerDay, favorites }

/* ─────────────────────────────────────────────────────────────────
 * MORNING + EVENING ROUTINES (per goal × time bucket)
 * Time buckets: '5' (quick), '15' (real ritual), '30' (deep)
 * ────────────────────────────────────────────────────────────── */

const routines = {
  glow: {
    label: 'Glow & confidence',
    accent: 'clay',
    quote: 'Skin first, makeup second.',
    morning: {
      5: ['Splash face with lukewarm water', 'Moisturizer (3 pumps)', 'SPF 30+ — never skip'],
      15: ['Gentle cleanser', 'Hydrating toner or essence', 'Vitamin C serum', 'Moisturizer', 'SPF 30+'],
      30: ['Gentle cleanser', 'Hydrating toner', 'Vitamin C serum', 'Eye cream', 'Moisturizer', 'SPF 50+', 'Gua sha — 2 min upward strokes'],
    },
    evening: {
      5: ['Cleanse (double if you wear makeup)', 'Night moisturizer'],
      15: ['Oil or balm cleanse', 'Gentle cleanser', 'Niacinamide or hyaluronic serum', 'Moisturizer'],
      30: ['Oil cleanse', 'Gentle cleanser', 'Exfoliating toner (2-3×/wk)', 'Serum (retinol or peptides)', 'Eye cream', 'Heavy moisturizer or sleeping mask', 'Lip balm'],
    },
  },
  fitness: {
    label: 'Move & feel strong',
    accent: 'sage',
    quote: 'Consistency beats intensity. Always.',
    morning: {
      5: ['Glass of water + pinch of salt', '20 squats', '10 push-ups (knees OK)', '30-sec plank'],
      15: ['Dynamic warm-up (4 min)', '3 rounds: 15 squats + 10 push-ups + 20 mountain climbers', 'Cool-down stretch'],
      30: ['Warm-up + mobility (5 min)', 'Strength block: 4 compound moves × 3 sets', 'Conditioning finisher (5 min)', 'Full-body stretch (10 min)'],
    },
    evening: {
      5: ['10 min walk after dinner', 'Foam roll calves + back'],
      15: ['20 min easy zone-2 cardio (brisk walk or bike)', 'Hip openers + spinal twist'],
      30: ['30 min mobility + yoga flow', 'Hydration check + protein within 1h of training', 'Magnesium glycinate before bed (if training hard)'],
    },
  },
  calm: {
    label: 'Stress less, sleep better',
    accent: 'sage',
    quote: 'You cannot pour from an empty cup.',
    morning: {
      5: ['4-7-8 breathing × 4 rounds', '10 min outside in natural light'],
      15: ['Box breathing × 4 rounds', '10 min sunlight (no phone)', '3 things you\'re grateful for — on paper'],
      30: ['Box breathing × 6 rounds', '10 min outside walk (no podcast)', 'Journal: 3 wins, 1 worry, 1 intention', '5 min gentle stretch'],
    },
    evening: {
      5: ['Phone in another room by 9 pm', 'Box breathing in bed'],
      15: ['Dim lights at 9 pm', 'Chamomile tea + book (no screens)', '4-7-8 breathing as you settle'],
      30: ['Screens off 1h pre-bed', 'Warm shower → cool room → socks on', 'Yoga nidra or guided meditation (10 min)', 'Journal: brain dump anything circling'],
    },
  },
  body: {
    label: 'Understand my body',
    accent: 'gold',
    quote: 'Pay attention. Your body is talking.',
    morning: {
      5: ['Check urine colour (pale straw = good)', 'Body scan: where am I tight?', 'Glass of water + protein at breakfast'],
      15: ['Body scan + posture reset', 'Mobility flow (5 min)', '2-min walk after breakfast', 'Note energy 1-10'],
      30: ['Wake at same time daily', 'Full body scan + journaling', 'Mobility (10 min)', 'Track: sleep hours, mood, energy, hydration'],
    },
    evening: {
      5: ['Quick check-in: tension, hunger, mood'],
      15: ['Reflect on energy through the day', 'Stretch tight areas (5 min)', 'Same wind-down time daily'],
      30: ['Journal: what fuelled me, what drained me', 'Mobility for any niggles', 'Plan tomorrow\'s movement', 'Lights low + cool room'],
    },
  },
  eat: {
    label: 'Eat smarter',
    accent: 'sage',
    quote: 'Eat the rainbow. Mostly plants. Sit down.',
    morning: {
      5: ['Glass of water before coffee', '20g+ protein at breakfast (eggs, yogurt, tofu)'],
      15: ['Water first, then coffee', 'Protein + fibre breakfast (oats + berries + nuts)', 'Plan today\'s meals briefly'],
      30: ['Hydrate + electrolytes if you exercise', 'Slow breakfast: protein + complex carb + fruit', 'Log today\'s plan in the Quill diet tracker (Pro)', 'Prep lunch ahead'],
    },
    evening: {
      5: ['2-min walk after dinner', 'Stop eating 2h before bed'],
      15: ['Light dinner (protein + veg + olive oil)', 'Herbal tea instead of dessert', 'Walk after eating'],
      30: ['Mediterranean-style dinner', 'Log today\'s intake', 'Plan tomorrow\'s shopping/prep', 'Cup of chamomile to wind down'],
    },
  },
}

const skinAddons = {
  dry: ['Look for: hyaluronic acid, ceramides, squalane', 'Avoid: harsh foaming cleansers, alcohol-heavy toners'],
  oily: ['Look for: niacinamide, salicylic acid (BHA), gel cleansers', 'Avoid: heavy oils, occlusive butters'],
  combo: ['Multi-zone: BHA on T-zone, richer moisturizer on cheeks', 'Niacinamide works across both zones'],
  sensitive: ['Fragrance-free, short ingredient lists, no essential oils', 'Patch test everything for 48 h before face'],
  normal: ['You can experiment — introduce one active at a time', 'SPF is still the single best habit'],
  unsure: ['Start minimal: cleanser, moisturizer, SPF for 2 weeks', 'Note how your skin feels — then add one product'],
}

/* ─────────────────────────────────────────────────────────────────
 * ADVICE CARDS (3-4 cards per goal, customised by skinType when relevant)
 * ────────────────────────────────────────────────────────────── */

const adviceByGoal = {
  glow: [
    { title: 'SPF is non-negotiable', body: 'UVA is the single biggest cause of premature ageing. 30+ daily, cloudy or not, year-round. The difference at 40 will be obvious.' },
    { title: 'Less, but daily', body: 'A 3-step routine (cleanse, moisturize, SPF) done every day beats a 10-step routine done once a week. Build the habit first; layer later.' },
    { title: 'Sleep is skincare', body: 'Growth hormone — which repairs skin — peaks in deep sleep. Under 6 hours and no serum will outwork the damage.' },
    { title: 'Hydration shows', body: 'Skin reflects internal hydration within ~24 hours. Aim for pale-straw urine; your face will thank you.' },
  ],
  fitness: [
    { title: 'Progressive overload', body: 'Add 2.5kg or one rep every week. Linear progression is the most reliable engine for getting stronger — for years, not weeks.' },
    { title: 'Protein at every meal', body: '1.6–2.2 g per kg of bodyweight, spread over 4–5 meals. This is the threshold where muscle stops being limited by protein.' },
    { title: 'Recovery is training', body: 'Sleep 7-9h, eat enough, take rest days. Most plateaus are recovery problems, not training problems.' },
    { title: 'Walk every day', body: '8-10k daily steps under-rated for body composition. NEAT burns more weekly calories than most workouts.' },
  ],
  calm: [
    { title: 'Morning light wins', body: '10 min of outdoor light within 1h of waking sets your circadian rhythm. The single best lever for better sleep tonight.' },
    { title: 'Box breathing — anywhere', body: '4 in, 4 hold, 4 out, 4 hold. Repeat 4 times. Calms your nervous system inside 90 seconds, no app required.' },
    { title: 'Caffeine curfew', body: 'Half-life is 6 hours. No caffeine after 2pm if you want deep sleep. This is the easiest sleep upgrade most people skip.' },
    { title: 'Worry on paper', body: 'When the mind loops, dump it on a page for 5 minutes. Almost always reduces the felt load by half.' },
  ],
  body: [
    { title: 'Track three things', body: 'Sleep hours, energy 1-10, and one body sensation. Two weeks of data tells you more than any wearable summary.' },
    { title: 'Posture reset, every hour', body: 'Chin tucked, shoulders down and back, deep breath. Re-trains default posture over 4-6 weeks. Free.' },
    { title: 'Check your pee', body: 'Pale straw = hydrated. Dark yellow = drink more. Clear all day = back off the water. Your simplest biomarker.' },
    { title: 'Movement is information', body: 'Mobility limits and pain are signals, not problems. 5 min of daily mobility is more diagnostic than any imaging.' },
  ],
  eat: [
    { title: 'Protein anchors meals', body: '20-30g per meal — eggs, yogurt, tofu, chicken, fish, legumes. Stops cravings, supports muscle, blunts blood-sugar spikes.' },
    { title: 'Eat the rainbow', body: 'Aim for 30+ different plants per week. Fibre + polyphenol diversity drives gut health more than any single supplement.' },
    { title: 'Slow and seated', body: 'Sit down. Chew. No screens. The same calories digest differently when you actually taste them.' },
    { title: 'Water before coffee', body: 'You wake up dehydrated. Water first cuts headaches, false hunger, and the afternoon crash.' },
  ],
}

/* ─────────────────────────────────────────────────────────────────
 * RECOMMENDED PAGES (based on goal)
 * ────────────────────────────────────────────────────────────── */

const recommendedPages = {
  glow: [{ key: 'skincare', label: 'Skin care routines', why: 'tailored for your skin type' }, { key: 'tips', label: 'Glow tips', why: 'curated daily wisdom' }],
  fitness: [{ key: 'sport', label: 'Movement routines', why: 'strength + conditioning' }, { key: 'diet', label: 'Fuel for training', why: 'protein + carb timing' }],
  calm: [{ key: 'wellness', label: 'Wellness practices', why: 'breath, sleep, focus' }, { key: 'tips', label: 'Mindset tips', why: 'small daily shifts' }],
  body: [{ key: 'body', label: 'Body map', why: 'understand any area' }, { key: 'wellness', label: 'Wellness check-in', why: 'self-knowledge tools' }],
  eat: [{ key: 'diet', label: 'Diet protocols', why: 'six science-backed ways' }, { key: 'tips', label: 'Nutrition tips', why: 'small wins, big impact' }],
}

/* ─────────────────────────────────────────────────────────────────
 * PUBLIC API
 * ────────────────────────────────────────────────────────────── */

export function getRoutine(profile) {
  const goal = profile.goal || 'body'
  const time = profile.timePerDay || '15'
  const base = routines[goal] || routines.body
  const timeKey = base.morning[time] ? time : '15'

  let morning = [...base.morning[timeKey]]
  let evening = [...base.evening[timeKey]]

  // If it's a skincare-focused goal and we know skin type, append a tailored tip
  const addon = skinAddons[profile.skinType]
  const isSkinGoal = goal === 'glow' || goal === 'body'

  return {
    label: base.label,
    quote: base.quote,
    accent: base.accent,
    minutes: time,
    morning,
    evening,
    skinAddons: isSkinGoal && addon ? addon : null,
  }
}

export function getAdvice(profile) {
  const goal = profile.goal || 'body'
  return adviceByGoal[goal] || adviceByGoal.body
}

export function getRecommendations(profile) {
  const goal = profile.goal || 'body'
  return recommendedPages[goal] || recommendedPages.body
}

export function getGoalLabel(profile) {
  const goal = profile.goal || 'body'
  return (routines[goal] || routines.body).label
}

export function isPersonalized(profile) {
  return !!(profile.goal || profile.skinType || profile.timePerDay)
}
