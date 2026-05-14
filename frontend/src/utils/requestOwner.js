export function isRequestOwner(request, userId) {
  if (!request || userId == null) return false;
  const uid =
    request.userId && typeof request.userId === "object" && "_id" in request.userId
      ? String(request.userId._id)
      : String(request.userId);
  return uid === String(userId);
}
