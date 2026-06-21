const axios = require("axios");
const { API } = require("./config");
const { fuzzRegister } = require("./auth/register.fuzz");
const { fuzzLogin } = require("./auth/login.fuzz");
const {
  createTestUserAndGetToken,
  getTokenMaster,
  createTestRequest,
  fuzzRequestsClient,
  fuzzRequestsMaster,
  randomRequestFuzz,
} = require("./requests/requests.fuzz");
const { fuzzStats, resetFuzzStats } = require("./utils/runFuzz");
const { testStats, resetTestStats } = require("./utils/runTest");

async function checkServer() {
  try {
    await axios.get(`${API}/`);
  } catch (err) {
    if (!err.response) {
      throw new Error(
        `API недоступен по адресу ${API}. Запустите backend: npm run start:backend`
      );
    }
  }
}

async function main() {
  resetFuzzStats();
  resetTestStats();

  try {
    await checkServer();
    await fuzzRegister();
    await fuzzLogin();

    const clientToken = await createTestUserAndGetToken();
    const requestId = await createTestRequest(clientToken);

    await fuzzRequestsClient(clientToken, requestId);
    await randomRequestFuzz(clientToken);

    try {
      const masterToken = await getTokenMaster();
      await fuzzRequestsMaster(masterToken, requestId);
    } catch (err) {
      console.warn(`\nТесты master пропущены: ${err.message}`);
    }

    console.log(`
========================
РЕЗУЛЬТАТ ТЕСТИРОВАНИЯ
========================
Детерминированные тесты: ${testStats.total} (pass: ${testStats.passed}, fail: ${testStats.failed})
Случайных запросов: ${fuzzStats.total}
Ошибок сервера (500+): ${fuzzStats.serverErrors}
Без ответа: ${fuzzStats.noResponse}
`);

    if (testStats.failed > 0 || fuzzStats.serverErrors > 0) {
      console.error("\nФаззинг завершён с ошибками");
      process.exit(1);
    }

    console.log("\nФаззинг завершён успешно");
  } catch (err) {
    console.error("\nКритическая ошибка при выполнении фаззинга:");
    console.error(err.message || err);
    process.exit(1);
  }
}

main();
