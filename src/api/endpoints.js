export const endpoints = {
  // AUTH
  userLogin: "/api/auth/login/user",
  doctorLogin: "/api/auth/login/doctor",
  register: "/api/identity/register",

  // AUTH gerekli (Authorize)
  medicines: "/api/medical-data/medicines",
  frequencies: "/api/medical-data/frequencies",
  allergies: "/api/medical-data/allergies",
  userAllergies: "/api/medical-data/user-allergies",

  // Reminders (Authorize)
  reminders: "/api/reminders",

  // Test
  testPublic: "/api/test/public",
  testPrivate: "/api/test/private",
};
