const RangeList = require('../src/RangeList');

test('test case 1: general operations', () => {
    const rangeList = new RangeList();
    expect(rangeList.toString()).toBe("");

    rangeList.add([1, 5]);
    expect(rangeList.toString()).toBe("[1, 5)");

    rangeList.add([10, 20]);
    expect(rangeList.toString()).toBe("[1, 5) [10, 20)");

    rangeList.add([20, 20]);
    expect(rangeList.toString()).toBe("[1, 5) [10, 20)");

    rangeList.add([20, 21]);
    expect(rangeList.toString()).toBe("[1, 5) [10, 21)");

    rangeList.add([2, 4]);
    expect(rangeList.toString()).toBe("[1, 5) [10, 21)");

    rangeList.add([3, 8]);
    expect(rangeList.toString()).toBe("[1, 8) [10, 21)");

    rangeList.remove([10, 10]);
    expect(rangeList.toString()).toBe("[1, 8) [10, 21)");

    rangeList.remove([10, 11]);
    expect(rangeList.toString()).toBe("[1, 8) [11, 21)");

    rangeList.remove([15, 17]);
    expect(rangeList.toString()).toBe("[1, 8) [11, 15) [17, 21)");

    rangeList.remove([3, 19]);
    expect(rangeList.toString()).toBe("[1, 3) [19, 21)");
});

test('test case 2: add operation with input overlapping with existing ranges to the left', () => {
    const rangeList = new RangeList();
    expect(rangeList.toString()).toBe("");

    rangeList.add([30, 80]);
    expect(rangeList.toString()).toBe("[30, 80)");

    rangeList.add([23, 33]);
    expect(rangeList.toString()).toBe("[23, 80)");

    rangeList.add([1, 23]);
    expect(rangeList.toString()).toBe("[1, 80)");
});

test('test case 3: add operation with input overlapping with existing ranges to the right', () => {
    const rangeList = new RangeList();
    expect(rangeList.toString()).toBe("");

    rangeList.add([30, 80]);
    expect(rangeList.toString()).toBe("[30, 80)");

    rangeList.add([68, 89]);
    expect(rangeList.toString()).toBe("[30, 89)");

    rangeList.add([89, 200]);
    expect(rangeList.toString()).toBe("[30, 200)");
});

test('test case 4: add operation with input fully covered by existing ranges', () => {
    const rangeList = new RangeList();
    expect(rangeList.toString()).toBe("");

    rangeList.add([30, 200]);
    expect(rangeList.toString()).toBe("[30, 200)");

    rangeList.add([68, 89]);
    expect(rangeList.toString()).toBe("[30, 200)");
});

test('test case 5: add operation with input fully covering existing ranges', () => {
    const rangeList = new RangeList();
    expect(rangeList.toString()).toBe("");

    rangeList.add([68, 89]);
    expect(rangeList.toString()).toBe("[68, 89)");

    rangeList.add([30, 200]);
    expect(rangeList.toString()).toBe("[30, 200)");
});

test('test case 6: add operation with input across existing ranges', () => {
    const rangeList = new RangeList();
    expect(rangeList.toString()).toBe("");

    rangeList.add([30, 60]);
    expect(rangeList.toString()).toBe("[30, 60)");

    rangeList.add([68, 89]);
    expect(rangeList.toString()).toBe("[30, 60) [68, 89)");

    rangeList.add([40, 68]);
    expect(rangeList.toString()).toBe("[30, 89)");
});

test('test case 7: add operation with input with negative numbers', () => {
    const rangeList = new RangeList();
    expect(rangeList.toString()).toBe("");

    rangeList.add([-30, -1]);
    expect(rangeList.toString()).toBe("[-30, -1)");

    rangeList.add([-89, -68]);
    expect(rangeList.toString()).toBe("[-89, -68) [-30, -1)");

    rangeList.add([-200, -100]);
    expect(rangeList.toString()).toBe("[-200, -100) [-89, -68) [-30, -1)");

    rangeList.add([-101, -60]);
    expect(rangeList.toString()).toBe("[-200, -60) [-30, -1)");
});

test('test case 8: remove operation with input overlapping with existing ranges to the left', () => {
    const rangeList = new RangeList();
    expect(rangeList.toString()).toBe("");

    rangeList.add([30, 80]);
    expect(rangeList.toString()).toBe("[30, 80)");

    rangeList.remove([23, 33]);
    expect(rangeList.toString()).toBe("[33, 80)");

    rangeList.remove([1, 33]);
    expect(rangeList.toString()).toBe("[33, 80)");
});

test('test case 9: remove operation with input overlapping with existing ranges to the right', () => {
    const rangeList = new RangeList();
    expect(rangeList.toString()).toBe("");

    rangeList.add([30, 80]);
    expect(rangeList.toString()).toBe("[30, 80)");

    rangeList.remove([68, 89]);
    expect(rangeList.toString()).toBe("[30, 68)");

    rangeList.remove([68, 200]);
    expect(rangeList.toString()).toBe("[30, 68)");
});

test('test case 10: remove operation with input fully covered by existing ranges', () => {
    const rangeList = new RangeList();
    expect(rangeList.toString()).toBe("");

    rangeList.add([30, 200]);
    expect(rangeList.toString()).toBe("[30, 200)");

    rangeList.remove([68, 89]);
    expect(rangeList.toString()).toBe("[30, 68) [89, 200)");

    rangeList.remove([40, 68]);
    expect(rangeList.toString()).toBe("[30, 40) [89, 200)");
});

test('test case 11: remove operation with input fully covering the existing ranges', () => {
    const rangeList = new RangeList();
    expect(rangeList.toString()).toBe("");

    rangeList.add([68, 89]);
    expect(rangeList.toString()).toBe("[68, 89)");

    rangeList.remove([30, 200]);
    expect(rangeList.toString()).toBe("");
});

test('test case 12: remove operation with input across existing ranges', () => {
    const rangeList = new RangeList();
    expect(rangeList.toString()).toBe("");

    rangeList.add([30, 60]);
    expect(rangeList.toString()).toBe("[30, 60)");

    rangeList.add([68, 89]);
    expect(rangeList.toString()).toBe("[30, 60) [68, 89)");

    rangeList.remove([40, 68]);
    expect(rangeList.toString()).toBe("[30, 40) [68, 89)");
});

test('test case 13: remove operation with input with negative numbers', () => {
    const rangeList = new RangeList();
    expect(rangeList.toString()).toBe("");

    rangeList.add([-30, -1]);
    expect(rangeList.toString()).toBe("[-30, -1)");

    rangeList.remove([-89, -20]);
    expect(rangeList.toString()).toBe("[-20, -1)");

    rangeList.remove([-10, -1]);
    expect(rangeList.toString()).toBe("[-20, -10)");

    rangeList.add([-5, -1]);
    expect(rangeList.toString()).toBe("[-20, -10) [-5, -1)");

    rangeList.remove([-12, -4]);
    expect(rangeList.toString()).toBe("[-20, -12) [-4, -1)");
});
