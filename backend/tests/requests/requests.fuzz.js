const axios = require("axios");
const { API } = require("../config");
const { runTest } = require("../utils/runTest");
const { runFuzz } = require("../utils/runFuzz");
const { randomValue } = require("../utils/fuzzGenerators");

async function createTestUserAndGetToken() {
  const email = `fuzz_${Date.now()}@test.ru`;
  const password = "123456";

  const response = await axios.post(`${API}/auth/register`, {
    name: "FuzzUser",
    email,
    password,
  });

  return response.data.token;
}

async function getTokenMaster() {
  try {
    const response = await axios.post(`${API}/auth/login`, {
      email: "master@test.com",
      password: "123456",
    });
    return response.data.token;
  } catch (err) {
    if (err.response?.status === 401) {
      throw new Error(
        "Master-пользователь не найден. Создайте его в MongoDB Atlas"
      );
    }
    throw err;
  }
}

async function createTestRequest(token) {
  const res = await axios.post(
    `${API}/requests`,
    {
      title: "Test request",
      description: "Test description",
      location: "Test location",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data._id;
}

async function fuzzRequestsClient(token, requestId) {
  console.log("\n=== ЗАЯВКИ (CLIENT) ===");

  await runTest(
    "без токена",
    () => axios.get(`${API}/requests`),
    401
  );

  await runTest(
    "неверный id",
    () =>
      axios.get(`${API}/requests/not-valid-id`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    400
  );

  await runTest(
    "неверные типы данных",
    () =>
      axios.post(
        `${API}/requests`,
        {
          title: 123,
          description: true,
          location: {},
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    400
  );

  await runTest(
    "пустые поля",
    () =>
      axios.post(
        `${API}/requests`,
        {
          title: "",
          description: "",
          location: "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    400
  );

  await runTest(
    "длинный заголовок",
    () =>
      axios.post(
        `${API}/requests`,
        {
          title: "A".repeat(10000),
          description: "Test",
          location: "101",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    400
  );

  await runTest(
    "длинное описание",
    () =>
      axios.post(
        `${API}/requests`,
        {
          title: "Test",
          description: "A".repeat(50000),
          location: "101",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    400
  );

  await runTest(
    "длинное название помещения",
    () =>
      axios.post(
        `${API}/requests`,
        {
          title: "Test",
          description: "Test",
          location: "A".repeat(50000),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    400
  );

  await runTest(
    "попытка клиента изменить статус",
    () =>
      axios.put(
        `${API}/requests/${requestId}`,
        { status: "done" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    403
  );
}

async function fuzzRequestsMaster(token, requestId) {
  console.log("\n=== ЗАЯВКИ (MASTER) ===");

  await runTest(
    "пустой статус",
    () =>
      axios.put(
        `${API}/requests/${requestId}`,
        { status: "" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    400
  );

  await runTest(
    "noSQL инъекция в статус",
    () =>
      axios.put(
        `${API}/requests/${requestId}`,
        { status: { $ne: null } },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    400
  );

  await runTest(
    "недопустимый статус",
    () =>
      axios.put(
        `${API}/requests/${requestId}`,
        { status: "invalid-status" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    400
  );
}

async function randomRequestFuzz(token) {
  console.log("\n=== ЗАЯВКИ С ГЕНЕРАЦИЕЙ ===");

  for (let i = 0; i < 100; i++) {
    await runFuzz(`request #${i + 1}`, () =>
      axios.post(
        `${API}/requests`,
        {
          title: randomValue(),
          description: randomValue(),
          location: randomValue(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    );
  }
}

module.exports = {
  createTestUserAndGetToken,
  getTokenMaster,
  createTestRequest,
  fuzzRequestsClient,
  fuzzRequestsMaster,
  randomRequestFuzz,
};
