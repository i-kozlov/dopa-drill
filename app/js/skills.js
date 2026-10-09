// Skill tree for grades 1-6 (calculation only). See docs/curriculum.md.
// Each skill: id, name (shown on screen), grade, lane (tree column),
// req (all must be mastered to unlock), gen (generator + params, problems.js).

export const LANES = ['Сложение и вычитание', 'Умножение и деление', 'Дроби', 'Другие темы'];

// Mastery / unlock rule (provisional): 5 first-try clears in the last 6 attempts.
export const MASTERY = { window: 6, need: 5 };

export const SKILLS = [
  // ---------------------------------------------------------------- grade 1
  { id: 'g1-compose10', name: 'Состав числа 10', grade: 1, lane: 0, req: [], gen: ['compose', { total: 10 }] },
  { id: 'g1-add-nc', name: 'Сложение однозначных', grade: 1, lane: 0, req: [], gen: ['hadd', { a: [1, 9], b: [1, 9], carry: 'none' }] },
  { id: 'g1-sub-nb', name: 'Вычитание до 10', grade: 1, lane: 0, req: ['g1-add-nc'], gen: ['hsub', { a: [2, 10], b: [1, 9], borrow: 'none' }] },
  { id: 'g1-add-c', name: 'Сложение с переходом через десяток', grade: 1, lane: 0, req: ['g1-compose10', 'g1-add-nc'], gen: ['hadd', { a: [2, 9], b: [2, 9], carry: 'yes' }] },
  { id: 'g1-sub-b', name: 'Вычитание с переходом через десяток', grade: 1, lane: 0, req: ['g1-add-c', 'g1-sub-nb'], gen: ['hsub', { a: [11, 18], b: [2, 9], borrow: 'yes' }] },
  { id: 'g1-add3', name: 'Действия с тремя числами', grade: 1, lane: 0, req: ['g1-sub-b'], gen: ['add3', {}] },
  { id: 'g1-add-2d1', name: 'Двузначное + однозначное', grade: 1, lane: 0, req: ['g1-add-c'], gen: ['hadd', { a: [11, 89], b: [1, 9], carry: 'none', tensToo: true }] },
  { id: 'g1-sub-2d1', name: 'Двузначное − однозначное', grade: 1, lane: 0, req: ['g1-sub-b', 'g1-add-2d1'], gen: ['hsub', { a: [11, 99], b: [1, 9], borrow: 'none', tensToo: true }] },

  // ---------------------------------------------------------------- grade 2
  { id: 'g2-vadd2-nc', name: 'Сложение двузначных в столбик', grade: 2, lane: 0, req: ['g1-add-2d1'], gen: ['vadd', { da: 2, db: 2, carry: 'none', maxDigits: 2 }] },
  { id: 'g2-vadd2-c', name: 'Сложение в столбик с переносом', grade: 2, lane: 0, req: ['g2-vadd2-nc', 'g1-add-c'], gen: ['vadd', { da: 2, db: [1, 2], carry: 'some', maxDigits: 2 }] },
  { id: 'g2-vsub2-nb', name: 'Вычитание двузначных в столбик', grade: 2, lane: 0, req: ['g1-sub-2d1'], gen: ['vsub', { da: 2, db: 2, borrow: 'none' }] },
  { id: 'g2-vsub2-b', name: 'Вычитание в столбик с заимствованием', grade: 2, lane: 0, req: ['g2-vsub2-nb', 'g1-sub-b'], gen: ['vsub', { da: 2, db: [1, 2], borrow: 'some' }] },
  { id: 'g2-vadd3s', name: 'Сложение с результатом больше 100', grade: 2, lane: 0, req: ['g2-vadd2-c'], gen: ['vadd', { da: 2, db: 2, carry: 'many', maxDigits: 3 }] },
  { id: 'g2-vsub3s', name: 'Вычитание из трёхзначных до 199', grade: 2, lane: 0, req: ['g2-vsub2-b', 'g2-vadd3s'], gen: ['vsub', { da: 3, db: 2, borrow: 'some', aMax: 199 }] },
  { id: 'g2-kuku25', name: 'Таблица умножения: 5 и 2', grade: 2, lane: 1, req: ['g1-add-c'], gen: ['kuku', { dans: [5, 2] }] },
  { id: 'g2-kuku34', name: 'Таблица умножения: 3 и 4', grade: 2, lane: 1, req: ['g2-kuku25'], gen: ['kuku', { dans: [3, 4] }] },
  { id: 'g2-kuku67', name: 'Таблица умножения: 6 и 7', grade: 2, lane: 1, req: ['g2-kuku34'], gen: ['kuku', { dans: [6, 7] }] },
  { id: 'g2-kuku891', name: 'Таблица умножения: 8, 9 и 1', grade: 2, lane: 1, req: ['g2-kuku67'], gen: ['kuku', { dans: [8, 9, 1] }] },
  { id: 'g2-kuku-mix', name: 'Вся таблица умножения', grade: 2, lane: 1, req: ['g2-kuku891'], gen: ['kuku', { dans: [1, 2, 3, 4, 5, 6, 7, 8, 9] }] },
  { id: 'g2-mul-tens', name: 'Круглые десятки × однозначное', grade: 2, lane: 1, req: ['g2-kuku-mix'], gen: ['mulTens', {}] },
  { id: 'g2-frac-of', name: 'Половина и четверть', grade: 2, lane: 2, req: ['g2-kuku25'], gen: ['fracOf', { dens: [2, 4] }] },

  // ---------------------------------------------------------------- grade 3
  { id: 'g3-vadd3', name: 'Сложение трёхзначных', grade: 3, lane: 0, req: ['g2-vadd3s'], gen: ['vadd', { da: 3, db: 3, carry: 'some', maxDigits: 3 }] },
  { id: 'g3-vsub3', name: 'Вычитание трёхзначных', grade: 3, lane: 0, req: ['g2-vsub3s'], gen: ['vsub', { da: 3, db: [2, 3], borrow: 'some' }] },
  { id: 'g3-vadd4', name: 'Сложение четырёхзначных', grade: 3, lane: 0, req: ['g3-vadd3'], gen: ['vadd', { da: 4, db: [3, 4], carry: 'many', maxDigits: 4 }] },
  { id: 'g3-vsub4', name: 'Вычитание четырёхзначных', grade: 3, lane: 0, req: ['g3-vsub3'], gen: ['vsub', { da: 4, db: [3, 4], borrow: 'zero' }] },
  { id: 'g3-div-basic', name: 'Деление', grade: 3, lane: 1, req: ['g2-kuku-mix'], gen: ['div', { exact: true }] },
  { id: 'g3-div-rem', name: 'Деление с остатком', grade: 3, lane: 1, req: ['g3-div-basic'], gen: ['divRem', {}] },
  { id: 'g3-div-tens', name: 'Деление десятков', grade: 3, lane: 1, req: ['g3-div-basic'], gen: ['divTens', {}] },
  { id: 'g3-vmul-2x1', name: 'Двузначное × однозначное в столбик', grade: 3, lane: 1, req: ['g2-mul-tens'], gen: ['vmul', { da: 2, db: 1 }] },
  { id: 'g3-vmul-3x1', name: 'Трёхзначное × однозначное', grade: 3, lane: 1, req: ['g3-vmul-2x1'], gen: ['vmul', { da: 3, db: 1 }] },
  { id: 'g3-vmul-2x2', name: 'Двузначное × двузначное', grade: 3, lane: 1, req: ['g3-vmul-2x1'], gen: ['vmul', { da: 2, db: 2 }] },
  { id: 'g3-vmul-3x2', name: 'Трёхзначное × двузначное', grade: 3, lane: 1, req: ['g3-vmul-2x2', 'g3-vmul-3x1'], gen: ['vmul', { da: 3, db: 2 }] },
  { id: 'g3-dec-add1', name: 'Сложение десятичных дробей', grade: 3, lane: 2, req: ['g2-vadd2-c'], gen: ['vdec', { op: 'add', places: 1 }] },
  { id: 'g3-dec-sub1', name: 'Вычитание десятичных дробей', grade: 3, lane: 2, req: ['g3-dec-add1', 'g2-vsub2-b'], gen: ['vdec', { op: 'sub', places: 1 }] },
  { id: 'g3-frac-same', name: 'Сложение и вычитание дробей', grade: 3, lane: 2, req: ['g2-frac-of'], gen: ['frac', { op: 'addsub', same: true, maxOne: true }] },

  // ---------------------------------------------------------------- grade 4
  { id: 'g4-vdiv-2d1', name: 'Двузначное ÷ однозначное в столбик', grade: 4, lane: 1, req: ['g3-div-rem', 'g3-div-tens'], gen: ['vdiv', { dd: 2, ds: 1 }] },
  { id: 'g4-vdiv-3d1', name: 'Трёхзначное ÷ однозначное', grade: 4, lane: 1, req: ['g4-vdiv-2d1'], gen: ['vdiv', { dd: 3, ds: 1 }] },
  { id: 'g4-vdiv-2d2', name: 'Двузначное ÷ двузначное', grade: 4, lane: 1, req: ['g4-vdiv-2d1', 'g3-vmul-2x1'], gen: ['vdiv', { dd: 2, ds: 2 }] },
  { id: 'g4-vdiv-3d2', name: 'Трёхзначное ÷ двузначное', grade: 4, lane: 1, req: ['g4-vdiv-2d2', 'g4-vdiv-3d1'], gen: ['vdiv', { dd: 3, ds: 2 }] },
  { id: 'g4-order', name: 'Порядок действий', grade: 4, lane: 3, req: ['g2-kuku-mix', 'g2-vsub2-b'], gen: ['order', {}] },
  { id: 'g4-round', name: 'Округление', grade: 4, lane: 3, req: ['g3-vadd4'], gen: ['round', {}] },
  { id: 'g4-dec-add2', name: 'Десятичные дроби: сотые', grade: 4, lane: 2, req: ['g3-dec-sub1'], gen: ['vdec', { op: 'addsub', places: 2 }] },
  { id: 'g4-dec-mul', name: 'Десятичная дробь × целое', grade: 4, lane: 2, req: ['g4-dec-add2', 'g3-vmul-2x1'], gen: ['vmul', { da: 2, db: 1, pa: 1 }] },
  { id: 'g4-dec-div', name: 'Десятичная дробь ÷ целое', grade: 4, lane: 2, req: ['g4-dec-mul', 'g4-vdiv-2d1'], gen: ['decDivInt', {}] },
  { id: 'g4-frac-mixed', name: 'Сложение и вычитание смешанных чисел', grade: 4, lane: 2, req: ['g3-frac-same'], gen: ['frac', { op: 'addsub', same: true, mixed: true }] },

  // ---------------------------------------------------------------- grade 5
  { id: 'g5-dec-mul', name: 'Умножение десятичных дробей', grade: 5, lane: 2, req: ['g4-dec-mul'], gen: ['vmul', { da: 2, db: 2, pa: 1, pb: 1 }] },
  { id: 'g5-dec-div', name: 'Деление десятичных дробей', grade: 5, lane: 2, req: ['g4-dec-div', 'g5-dec-mul'], gen: ['decDivDec', {}] },
  { id: 'g5-gcd', name: 'НОД', grade: 5, lane: 3, req: ['g3-div-basic'], gen: ['gcdlcm', { kind: 'gcd' }] },
  { id: 'g5-lcm', name: 'НОК', grade: 5, lane: 3, req: ['g5-gcd'], gen: ['gcdlcm', { kind: 'lcm' }] },
  { id: 'g5-frac-reduce', name: 'Сокращение дробей', grade: 5, lane: 2, req: ['g5-gcd', 'g4-frac-mixed'], gen: ['frac', { op: 'reduce' }] },
  { id: 'g5-frac-diff', name: 'Дроби с разными знаменателями', grade: 5, lane: 2, req: ['g5-frac-reduce', 'g5-lcm'], gen: ['frac', { op: 'addsub', same: false }] },
  { id: 'g5-frac-int', name: 'Дробь × или ÷ целое', grade: 5, lane: 2, req: ['g5-frac-reduce'], gen: ['frac', { op: 'muldivInt' }] },
  { id: 'g5-percent', name: 'Проценты', grade: 5, lane: 3, req: ['g4-dec-mul'], gen: ['percent', {}] },

  // ---------------------------------------------------------------- grade 6
  { id: 'g6-frac-mul', name: 'Умножение дробей', grade: 6, lane: 2, req: ['g5-frac-int'], gen: ['frac', { op: 'mul' }] },
  { id: 'g6-frac-div', name: 'Деление дробей', grade: 6, lane: 2, req: ['g6-frac-mul'], gen: ['frac', { op: 'div' }] },
  { id: 'g6-frac-dec', name: 'Обыкновенные и десятичные дроби', grade: 6, lane: 2, req: ['g6-frac-div', 'g5-dec-div'], gen: ['frac', { op: 'decimal' }] },
  { id: 'g6-ratio', name: 'Равные отношения', grade: 6, lane: 3, req: ['g5-lcm'], gen: ['ratio', {}] },
  { id: 'g6-letter', name: 'Найди x', grade: 6, lane: 3, req: ['g4-order'], gen: ['letter', {}] },
];

export const SKILL = Object.fromEntries(SKILLS.map((s) => [s.id, s]));

// Depth in the tree = longest prerequisite chain (roots are 0).
export const DEPTH = (() => {
  const memo = {};
  const d = (id) => memo[id] ?? (memo[id] = SKILL[id].req.length ? 1 + Math.max(...SKILL[id].req.map(d)) : 0);
  for (const s of SKILLS) d(s.id);
  return memo;
})();

export const skillsOfGrade = (g) => SKILLS.filter((s) => s.grade === g);
