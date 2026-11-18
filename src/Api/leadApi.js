import api from "./axios";

// Public lead capture (membership enquiry / gym tour / contact form).
// Backend endpoint expected: POST /leads  (change path here if different)
export const submitLead = async (payload) => {
  const { data } = await api.post("/leads", {
    ...payload,
    sourcePage: window.location.pathname,
    submittedAt: new Date().toISOString(),
  });
  return data;
};
