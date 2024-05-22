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
// Theta(nlogn) - index creation average case | O(n^2) - worst case (very rare when using quick sort)
// O(n) - additional memory usage
// O(log(n)) - search time
class ItemSkuIndex {
    constructor(data) {
        this._sortedData = data.toSorted((a, b) => {
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
    const dataIndex = new ItemSkuIndex(data);
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
