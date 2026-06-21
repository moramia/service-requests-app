const axios = require("axios");
const { API } = require("../config");
const { runTest } = require("../utils/runTest");
const { runFuzz } = require("../utils/runFuzz");
const { randomValue } = require("../utils/fuzzGenerators");

async function fuzzRegister() {
  console.log("\n=== РЕГИСТРАЦИЯ ===");

  await runTest(
    "пустое тело",
    () => axios.post(`${API}/auth/register`, {}),
    400
  );

  await runTest(
    "неверные типы данных",
    () =>
      axios.post(`${API}/auth/register`, {
        name: 123,
        email: true,
        password: [],
      }),
    400
  );

  await runTest(
    "пустые поля",
    () =>
      axios.post(`${API}/auth/register`, {
        name: "",
        email: "",
        password: "",
      }),
    400
  );

  await runTest(
    "неверный email",
    () =>
      axios.post(`${API}/auth/register`, {
        name: "Ivan",
        email: "not-email",
        password: "123456",
      }),
    400
  );

  await runTest(
    "короткий пароль",
    () =>
      axios.post(`${API}/auth/register`, {
        name: "Ivan",
        email: "ivan@test.ru",
        password: "123",
      }),
    400
  );

  await runTest(
    "длинный пароль",
    () =>
      axios.post(`${API}/auth/register`, {
        name: "Ivan",
        email: "ivan@test.ru",
        password: "A".repeat(10000),
      }),
    400
  );

  await runTest(
    "длинное имя",
    () =>
      axios.post(`${API}/auth/register`, {
        name: "A".repeat(1000),
        email: "ivan@test.ru",
        password: "123456",
      }),
    400
  );

  await runTest(
    "unicode имя",
    () =>
      axios.post(`${API}/auth/register`, {
        name: "测试用户",
        email: `unicode${Date.now()}@mail.ru`,
        password: "123456",
      }),
    201
  );

  await runTest(
    "длинный email",
    () =>
      axios.post(`${API}/auth/register`, {
        name: "Ivan",
        email: `${"a".repeat(5000)}@mail.ru`,
        password: "123456",
      }),
    400
  );

  await runTest(
    "подмена роли (игнорируется, создаётся client)",
    () =>
      axios.post(`${API}/auth/register`, {
        name: "Ivan",
        email: `test${Date.now()}@mail.ru`,
        password: "123456",
        role: "master",
      }),
    201
  );

  const duplicateEmail = `dup_${Date.now()}@test.ru`;
  await axios.post(`${API}/auth/register`, {
    name: "User",
    email: duplicateEmail,
    password: "123456",
  });

  await runTest(
    "дублирование email",
    () =>
      axios.post(`${API}/auth/register`, {
        name: "User",
        email: duplicateEmail,
        password: "123456",
      }),
    409
  );

  console.log("\n=== РЕГИСТРАЦИЯ С ГЕНЕРАЦИЕЙ ===");

  for (let i = 0; i < 100; i++) {
    await runFuzz(`register #${i + 1}`, () =>
      axios.post(`${API}/auth/register`, {
        name: randomValue(),
        email: randomValue(),
        password: randomValue(),
      })
    );
  }
}

module.exports = { fuzzRegister };
