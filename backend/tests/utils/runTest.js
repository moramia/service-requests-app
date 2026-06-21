const testStats = {
  total: 0,
  passed: 0,
  failed: 0,
};

function resetTestStats() {
  testStats.total = 0;
  testStats.passed = 0;
  testStats.failed = 0;
}

async function runTest(name, request, expectedStatus) {
  testStats.total++;

  try {
    const response = await request();

    if (expectedStatus && response.status !== expectedStatus) {
      testStats.failed++;
      console.log(
        `[TEST] ${name} -> FAIL: ожидалось ${expectedStatus}, получено ${response.status}`
      );
    } else {
      testStats.passed++;
      console.log(`[TEST] ${name} -> PASS (${response.status})`);
    }
  } catch (err) {
    const status = err.response?.status;

    if (expectedStatus && status === expectedStatus) {
      testStats.passed++;
      console.log(`[TEST] ${name} -> PASS (${status})`);
    } else {
      testStats.failed++;
      console.log(
        `[TEST] ${name} -> FAIL: ожидалось ${expectedStatus}, получено ${status ?? "NO RESPONSE"}`
      );
    }
  }
}

module.exports = { runTest, testStats, resetTestStats };
