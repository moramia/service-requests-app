const axios = require("axios");
const { API } = require("../config");
const { runTest } = require("../utils/runTest");
const { runFuzz } = require("../utils/runFuzz");
const { randomValue } = require("../utils/fuzzGenerators");

async function fuzzLogin() {
  console.log("\n=== ЛОГИН ===");

  await runTest(
    "пустое тело",
    () => axios.post(`${API}/auth/login`, {}),
    400
  );

  await runTest(
    "неверные типы данных",
    () =>
      axios.post(`${API}/auth/login`, {
        email: {},
        password: [],
      }),
    400
  );

  await runTest(
    "неверные данные",
    () =>
      axios.post(`${API}/auth/login`, {
        email: "unknown@mail.ru",
        password: "123456",
      }),
    401
  );

  await runTest(
    "noSQL инъекция",
    () =>
      axios.post(`${API}/auth/login`, {
        email: { $ne: null },
        password: { $ne: null },
      }),
    400
  );

  console.log("\n=== ЛОГИН С ГЕНЕРАЦИЕЙ ===");

  for (let i = 0; i < 100; i++) {
    await runFuzz(`login #${i + 1}`, () =>
      axios.post(`${API}/auth/login`, {
        email: randomValue(),
        password: randomValue(),
      })
    );
  }
}

module.exports = { fuzzLogin };
