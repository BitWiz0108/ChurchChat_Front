import axios from "axios";
import axiosClient from "./axios.client";

export const userSignUp = async ({ username, password, email, selected, selected1, selected2, role }) => {
  try {
    let str1 = selected.value;
    let s_value2 = [];
    let s_value3 = [];
    for (let i = 0; i < selected1.length; i++) {
      s_value2[i] = selected1[i].label;
    }
    for (let j = 0; j < selected2.length; j++) {
      s_value3[j] = selected2[j].label;
    }

    let str2 = s_value2.toString();
    let str3 = s_value3.toString();
    const response = await axiosClient.post(
      "users/signup",
      { username, password, email, str1, str2, str3, role }
    );

    return { response };
  } catch (err) {
    return { err };
  }

};

// export const churchAcc = async ({ selected, selected1, selected2 }) => {
//   try {
//     var data = [];
//     for (let i = 0; i < selected1.length; i++) {
//       data.push(selected1[i].label)
//     }
//     var selected_1 = { data };
//     data = [];
//     for (let j = 0; j < selected2.length; j++) {
//       data.push(selected2[j].label)
//     }
//     // var selected_2 = { data };
//     // var prompt = "Please ignore our previous conversation and let us start a fresh conversation. Imagine you are a " + selected.label +
//     //   ", not an AI language model. So please answer as if you are a " + selected.label
//     //   + ". Your Theological Distinctives are " + JSON.stringify(selected_1.data) + ". Your favorite writers are " + JSON.stringify(selected_2.data)
//     //   + " . So ";
//     // localStorage.setItem("basePrompt", prompt);
//     // const response = await axiosClient.post("chats", { prompt });
//     return { response };
//   } catch (err) {
//     return { err };
//   }
// };

export const userSignIn = async ({
  username,
  password
}) => {
  try {
    const response = await axiosClient.post(
      "users/signin",
      { username, password }
    );

    return { response };
  } catch (err) {
    return { err };
  }
};

export const getAllAccounts = async () => {
  try {
    const response = await axiosClient.get("users/getAll");
    return { response };
  } catch (err) {
    return { err };
  }
};

export const userCheckTkn = async () => {
  try {
    const response = await axiosClient.get("users/check-token");
    return { response };
  } catch (err) {
    return { err };
  }
};


export const updatePrompt = async ( text ) => {
  console.log("!!!!!", text);
  try {
    const response = await axiosClient.post("users/updateBasePrompt", text);
    return { response };
  } catch (err) {
    return { err };
  }
};