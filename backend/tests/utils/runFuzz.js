const fuzzStats = {
  total: 0,
  serverErrors: 0,
  noResponse: 0,
};

function resetFuzzStats() {
  fuzzStats.total = 0;
  fuzzStats.serverErrors = 0;
  fuzzStats.noResponse = 0;
}

async function runFuzz(name, request) {
  fuzzStats.total++;

  try {
    const response = await request();

    if (response.status >= 500) {
      fuzzStats.serverErrors++;
      console.log(`[FUZZ] ${name} -> FAIL SERVER ERROR ${response.status}`);
      return;
    }

    console.log(`[FUZZ] ${name} -> OK (${response.status})`);
  } catch (err) {
    const status = err.response?.status;

    if (!status) {
      fuzzStats.noResponse++;
      console.log(`[FUZZ] ${name} -> FAIL NO RESPONSE`);
      return;
    }

    if (status >= 500) {
      fuzzStats.serverErrors++;
      console.log(`[FUZZ] ${name} -> FAIL SERVER ERROR ${status}`);
      return;
    }

    console.log(`[FUZZ] ${name} -> OK (${status})`);
  }
}

module.exports = { runFuzz, fuzzStats, resetFuzzStats };
