function randomString(length) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]{}()!@#$%^&*😀测试";

  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

function randomValue() {
  const variants = [
    null,
    undefined,
    true,
    false,
    0,
    1,
    -1,
    123456789,
    "",
    [],
    {},
    { $ne: null },
    { $gt: "" },
    randomString(5),
    randomString(20),
    randomString(200),
    randomString(5000)
  ];

  return variants[
    Math.floor(Math.random() * variants.length)
  ];
}

module.exports = {
  randomString,
  randomValue
};