import test from 'node:test';
import assert from 'node:assert/strict';
import { SKILLS } from '../app/js/skills.js';
import { makeProblem, makeRng, signature } from '../app/js/problems.js';
import { TROPHIES } from '../app/js/trophies.js';
import { CATS, ITEMS } from '../app/js/unlocks.js';
import { fmtDopa } from '../app/js/scoring.js';
import { russianProblemText } from '../app/js/locale.js';

const japanese = /[\u3040-\u30ff\u3400-\u9fff]/u;

test('every curriculum topic and generated instruction is readable in Russian', () => {
  const rng = makeRng(2026);
  for (const skill of SKILLS) {
    assert.ok(!japanese.test(skill.name), skill.id);
    for (let i = 0; i < 20; i++) {
      const p = makeProblem(skill.id, rng);
      const visible = [p.title, p.answerText, ...p.cells.map(c => c.text),
        ...p.steps.flatMap(s => [s.label, s.hint, s.help?.text])].filter(Boolean);
      for (const text of visible) assert.ok(!japanese.test(text), `${skill.id}: ${text}`);
    }
  }
  for (const item of [...TROPHIES, ...ITEMS, ...CATS]) {
    for (const text of [item.name, item.desc].filter(Boolean)) assert.ok(!japanese.test(text), text);
  }
});

test('legacy saved instructions are translated for display without changing problem identity', () => {
  const saved = {
    title: 'あまりのあるわりざん', text: '9 ÷ 5', answer: '1 あまり 4',
    steps: [{ digit: '1', label: '商', help: { text: '5のだん 5 10' } }, { digit: '4', label: 'あまり' }],
  };
  const snapshot = JSON.stringify(saved);
  const key = signature(saved);
  assert.equal(russianProblemText(saved.title), 'Деление с остатком');
  assert.equal(russianProblemText(saved.steps[0].help.text), '×5: 5 10');
  assert.equal(russianProblemText('商の十の位'), 'Частное: Десятки');
  assert.equal(russianProblemText('分母は 12 のまま'), 'Знаменатель 12 не меняется');
  assert.equal(russianProblemText('先に 3 × 4'), 'Сначала 3 × 4');
  assert.equal(russianProblemText('がい数'), 'Округление');
  assert.equal(russianProblemText('の'), '×');
  assert.equal(russianProblemText('と'), 'и');
  assert.equal(JSON.stringify(saved), snapshot);
  assert.equal(signature(saved), key);
});

test('Russian dopa suffixes preserve the magnitude across unit boundaries', () => {
  assert.equal(fmtDopa(4), '10 тыс.');
  assert.equal(fmtDopa(6), '1 млн');
  assert.equal(fmtDopa(8), '100 млн');
  assert.equal(fmtDopa(9), '1 млрд');
  assert.equal(fmtDopa(12), '1 трлн');
  assert.equal(fmtDopa(72), '∞');
});
