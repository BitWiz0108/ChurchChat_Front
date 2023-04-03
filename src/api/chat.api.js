import axiosClient from "./axios.client";

export const chatCompletion = async ({ prompt }) => {
  prompt = localStorage.getItem("basePrompt") + prompt;
  try {
    const response = await axiosClient.post("chats", { prompt });
    return { response };
  } catch (err) {
    return { err };
  }
};

