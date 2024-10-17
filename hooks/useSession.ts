export const logOut = async () => {
  await fetch("/api/auth/logout", { method: "DELETE" });
  window.location.reload();
};

// export const auth = async () => {
//   const res = await fetch("/api/auth");
//   const data = await res.json();
//   return data?.data || null;
// };
