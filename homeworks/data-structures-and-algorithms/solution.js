const data = require('./MOCK_DATA');

function linearSearchBySku(sku, data) {
    let comparisons = 0;
    for (const item of data) {
        comparisons++;
        if (item.sku === sku) {
            return [item, comparisons];
        }
    }
    return [null, comparisons];
}

// I create simple class that will index our data 
// By index I mean the class that will decrease searching time
// at the cost of additional memory usage + creation time required for storing a sorted data

// COMPLEXITY ANALYSIS
// O(log(n)) - search time
// Theta(nlogn) - index creation average case | O(n^2) - worst case (very rare when using quick sort)
// O(n) - additional memory usage
class ItemSkuIndex {
    constructor(data, sort) {
        this._sortedData = sort(data, (a, b) => {
            if (a.sku < b.sku) return -1;
            if (a.sku > b.sku) return 1;
            return 0;
        });
    }

    find(sku) {
        return this._binarySearch(sku, 0, this._sortedData.length - 1);
    }

    _binarySearch(sku) {
        let comparisons = 0;
        let left = 0;
        let right = this._sortedData.length - 1;
        while (left <= right) {
            comparisons++;
            const mid = Math.floor((left + right) / 2);
            const val = this._sortedData[mid];
            if (val.sku === sku) return [val, comparisons];
            else if (val.sku < sku) left = mid + 1;
            else right = mid - 1;
        }
        return [null, comparisons];
    }
}

// QUICK SORT IMPLEMENTATION
//  time complexity - Theta(nlogn) | worst case - O(n^2) (rare)
//  space complexity - Theta(logn) | worst case - O(n) (depends on a partition luck)
function sort(data, cmpFunc) {
    const swap = (arr, i, j) => {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    const partition = (arr, left, right) => {
        const pivot = arr[right];
        let i = left - 1;
        for (let j = left; j < right; j++) {
            if (cmpFunc(arr[j], pivot) < 0) {
                i++;
                swap(arr, i, j);
            }
        }
        const partitionIdx = i + 1;
        swap(arr, partitionIdx, right);
        return partitionIdx;
    }
    const qs = (arr, left, right) => {
        if (left >= right) return;
        const partitionIdx = partition(arr, left, right);
        qs(arr, left, partitionIdx - 1);
        qs(arr, partitionIdx + 1, right);
    }
    data = structuredClone(data);
    qs(data, 0, data.length - 1);
    return data;
}

// CORRECTNESS TESTS
// If this code fails then unhadled error is thrown and the progam won't create a log
function testCorrectness() {
    let item;
    [item, comp] = linearSearchBySku('', data);
    if (item)
        throw new Error('linear search is not working');
    [item, comp] = linearSearchBySku('0dd6bb31-3be6-40ed-8b97-51c33d0154d9', data);
    if (!item || item.name !== 'Salmon - Smoked, Sliced')
        throw new Error('linear search is not working');
    [item, comp] = linearSearchBySku('979c2fba-aabc-4772-a03d-876448f2db6a', data);
    if (!item || item.name !== 'Sobe - Green Tea')
        throw new Error('linear search is not working');
    [item, comp] = linearSearchBySku('7980dcfb-fa04-4c60-a3a4-2892f83146c7', data);
    if (!item || item.price !== '£15.42')
        throw new Error('linear search is not working');
    [item, comp] = linearSearchBySku('c15fb538-7284-44f9-8417-fcab49cbb4f3', data);
    if (!item || item.pack !== 15)
        throw new Error('linear search is not working');

    const idx = new ItemSkuIndex(data, sort);
    [item, comp] = idx.find('');
    if (item) 
        throw new Error('linear search is not working');
    [item, comp] = idx.find('0dd6bb31-3be6-40ed-8b97-51c33d0154d9');
    if (!item || item.name !== 'Salmon - Smoked, Sliced')
        throw new Error('linear search is not working');
    [item, comp] = idx.find('979c2fba-aabc-4772-a03d-876448f2db6a');
    if (!item || item.name !== 'Sobe - Green Tea')
        throw new Error('linear search is not working');
    [item, comp] = idx.find('7980dcfb-fa04-4c60-a3a4-2892f83146c7');
    if (!item || item.price !== '£15.42')
        throw new Error('linear search is not working');
    [item, comp] = idx.find('c15fb538-7284-44f9-8417-fcab49cbb4f3');
    if (!item || item.pack !== 15)
        throw new Error('linear search is not working');
}
testCorrectness();

// PERFORMANCE TESTS
const EXPERIMENT_COUNT = 1000000;
console.log('Experiment Count = ' + EXPERIMENT_COUNT);
const needleList = [
    'd462bb76-81ee-46af-9fdb-ebfe53a93d3f',
    '6df55f86-e3f5-4d7b-9cd5-906d8d7e804a',
    '1e63459f-0b18-4acf-9afc-e7287347bbeb',
    'e04b6074-332f-4661-8f3a-4cdcb3adfb6a',
    'be77abf7-29b0-4ed1-9379-f5d7576cb5ce',
    '3c511860-d159-457d-8374-e8205904e6f5',
    '1e63459f-0b18-4acf-9afc-e7287347bbeb',
    'e04b6074-332f-4661-8f3a-4cdcb3adfb6a',
    '9c4a0320-1d82-4a46-83b3-511ddffb7ee6',
    '1e63459f-0b18-4acf-9afc-e7287347bbeb',
    'e04b6074-332f-4661-8f3a-4cdcb3adfb6a',
    'be77abf7-29b0-4ed1-9379-f5d7576cb5ce',
    '3c511860-d159-457d-8374-e8205904e6f5',
    '1e63459f-0b18-4acf-9afc-e7287347bbeb',
    'd462bb76-81ee-46af-9fdb-ebfe53a93d3f',
    '6df55f86-e3f5-4d7b-9cd5-906d8d7e804a',
    '1e63459f-0b18-4acf-9afc-e7287347bbeb',
    'ccdb70f4-91f1-4543-93fa-8a93f980dc99',
    '5ce1e0a6-1e39-406e-b2be-08bce24b33b3',
    '0dd6bb31-3be6-40ed-8b97-51c33d0154d9',
];

function getRandomSku() {
    return needleList[Math.floor(Math.random() * needleList.length)];
}

function testLinearSearch(experimentCount, data) {
    let timeSum = 0;
    let comparisonsSum = 0;
    for (let i = 0; i < experimentCount; i++) {
        const start = performance.now();
        const [item, comparisons] = linearSearchBySku(getRandomSku(), data);
        const end = performance.now();
        timeSum += end - start;
        comparisonsSum += comparisons;
    }
    return [(timeSum / experimentCount) * 1000.0, Math.floor(comparisonsSum / experimentCount)];
}

const [linAvgExec, linComparisons] = testLinearSearch(EXPERIMENT_COUNT, data);
console.log('linear serach:');
console.log(`\tavg execution time: ${linAvgExec} [microsecond]`);
console.log(`\tavg comparisons count: ${linComparisons}`);

function testBinarySearch(experimentCount, data) {
    const dataIndex = new ItemSkuIndex(data, sort);
    let timeSum = 0;
    let comparisonsSum = 0;
    for (let i = 0; i < experimentCount; i++) {
        const start = performance.now();
        const [item, comparisons] = dataIndex.find(getRandomSku());
        const end = performance.now();
        timeSum += (end - start);
        comparisonsSum += comparisons;
    }
    return [(timeSum / experimentCount) * 1000.0, Math.floor(comparisonsSum / experimentCount)];
}

const [binAvgExec, binComparisons] = testBinarySearch(EXPERIMENT_COUNT, data);
console.log('binary serach:');
console.log(`\tavg execution time: ${binAvgExec} [microsecond]`);
console.log(`\tavg comparisons count: ${binComparisons}`);
