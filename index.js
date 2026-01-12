/** @type {Array<{letter: string, count: number, percentage: string}>} */
let densityData = [];
let isDensityExpanded = false;
const DENSITY_LIMIT = 5;

initialize();

function initialize() {
  const textInput = /** @type {HTMLTextAreaElement} */ (document.getElementById('textInput'));
  const noSpaceOptionElem = /** @type {HTMLInputElement} */ (document.getElementById('noSpaceOption'));
  const [totalCharsElem, wordCountElem, sentenceCountElem] = /** @type {Array<HTMLElement>} */ ([...document.querySelectorAll('.banner > :first-child')]);
  const viewMoreBtn = /** @type {HTMLButtonElement} */ (document.getElementById('viewMoreBtn'));

  /** @param {Event} event */
  const textObserver = (event) => {
    const e = /** @type {InputEvent} */ (event);
    const target = /** @type {HTMLTextAreaElement} */ (e.target);
    const chars = target.value.length;
    const noSpaceChars = target.value.replaceAll(' ', '').length;
    const words = target.value
      .trim()
      .split(/\s+/)
      .filter((w) => w != '').length;
    const segmenter = new Intl.Segmenter('en', {granularity: 'sentence'});
    const segments = segmenter.segment(target.value);
    const sentences = [...segments].filter((s) => s.segment.trim().length > 0).length;
    noSpaceOptionElem.checked ? (totalCharsElem.textContent = noSpaceChars.toString()) : (totalCharsElem.textContent = chars.toString());
    wordCountElem.textContent = words.toString();
    sentenceCountElem.textContent = sentences.toString();
    analyzeText(textInput.value);
  };

  noSpaceOptionElem.addEventListener(
    'input',
    () => (totalCharsElem.textContent = noSpaceOptionElem.checked ? textInput.value.replaceAll(' ', '').length.toString() : textInput.value.length.toString())
  );
  textInput.addEventListener('input', textObserver);

  viewMoreBtn.addEventListener('click', () => {
    isDensityExpanded = !isDensityExpanded;
    renderDensityList();
  });
}

/** @param {string} text */
function analyzeText(text) {
  const letterDensityEmptyElem = /** @type {HTMLElement} */ (document.getElementById('letterDensityEmpty'));
  const letterDensityElem = /** @type {HTMLElement} */ (document.getElementById('letterDensity'));

  const cleanText = text.replace(/[^a-zA-Z]/g, '').toUpperCase();
  const totalLetters = cleanText.length;

  if (!totalLetters) {
    letterDensityElem.setAttribute('hidden', '');
    letterDensityEmptyElem.removeAttribute('hidden');
    return;
  }

  letterDensityEmptyElem.setAttribute('hidden', '');
  letterDensityElem.removeAttribute('hidden');

  /* FREQUENCY MAP
   * Iterate over every letter.
   * 'counts' becomes an object like { A: 2, B: 5 }.
   * Also to track 'maxFreq' (highest count found) to help size our buckets in the next step.
   */
  /** @type {Record<string, number>} */
  const counts = {};
  let maxFreq = 0;
  for (const char of cleanText) {
    counts[char] = (counts[char] || 0) + 1;
    if (counts[char] > maxFreq) maxFreq = counts[char];
  }

  /* BUCKET SORT ALGORITHM
   * Instead of a standard sort, use an array of arrays (buckets).
   * The array INDEX represents the frequency count.
   * If 'E' and 'Z' both appear 5 times, they both go into buckets[5].
   */
  /** @type {Array<string[]>} */
  const buckets = Array.from({length: maxFreq + 1}, () => []);
  for (const [char, count] of Object.entries(counts)) {
    buckets[count].push(char);
  }

  /* FINAL ARRAY CONVERSION
   * Iterate backwards from the highest frequency (maxFreq) down to 1.
   * This ensures the most frequent letters are listed first.
   * If multiple letters share the same count (same bucket), sort them alphabetically.
   */
  densityData = [];
  for (let i = maxFreq; i > 0; i--) {
    if (buckets[i].length > 0) {
      buckets[i].sort().forEach((char) => {
        densityData.push({
          letter: char,
          count: i,
          percentage: ((i / totalLetters) * 100).toFixed(2),
        });
      });
    }
  }

  isDensityExpanded = false;
  renderDensityList();
}

function renderDensityList() {
  const densityList = /** @type {HTMLElement} */ (document.getElementById('densityList'));
  const viewMoreBtn = /** @type {HTMLButtonElement} */ (document.getElementById('viewMoreBtn'));

  const showAll = isDensityExpanded || densityData.length <= DENSITY_LIMIT;
  const displayData = showAll ? densityData : densityData.slice(0, DENSITY_LIMIT);

  densityList.innerHTML = displayData
    .map(
      (item) => `
      <div class="density-row">
          <span class="letter-label">${item.letter}</span>
          <div class="progress-wrapper">
              <div class="progress-fill" style="width: ${item.percentage}%"></div>
          </div>
          <span class="count-label">
              ${item.count} <span class="percentage">(${item.percentage}%)</span>
          </span>
      </div>
  `
    )
    .join('');

  if (densityData.length > DENSITY_LIMIT) {
    viewMoreBtn.style.display = 'inline-block';
    viewMoreBtn.textContent = isDensityExpanded ? 'View less' : 'View more';
  } else {
    viewMoreBtn.style.display = 'none';
  }
}
