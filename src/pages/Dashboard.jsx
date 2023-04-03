import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import Select from "react-select";
import { toast } from "react-toastify";
import { Tabs } from "antd";
import { Stack, Box } from "@mui/material";


import TextAreaComp from "../components/TextAreaComp";
import HeaderComp from "../components/HeaderComp";
import "../styles.css";
import { updatePrompt } from "../api/user.api";

const DashboardPage = () => {
  const navigate = useNavigate();

  const [isRequest, setIsRequest] = useState(false);
  const options = [
    { label: "Baptist", value: "Baptist" },
    { label: "Souther Baptist", value: "SBapist" },
    { label: "Non-Denominational", value: "NDenominational" },
    { label: "Pentecostal", value: "Pentecostal" },
    { label: "Lutheran", value: "Lutheran" },
    { label: "Seventh Day Adventist", value: "sventh" },
    { label: "Methodist", value: "Methodist" },
  ];

  const options_1 = [
    { label: "Reformed", value: "Reformed" },
    { label: "Paedobaptist", value: "Paedobaptist" },
    { label: "Credobaptist", value: "Credobaptist" },
    { label: "Egalitarian", value: "Egalitarian" },
    { label: "Charismatic", value: "Charismatic" },
    { label: "Missional", value: "Missional" },
    { label: "Methodist", value: "Methodist" },
  ];

  const options_2 = [
    { label: "Charles Spurgeon", value: "Charles" },
    { label: "John Wesley", value: "John" },
    { label: "Douglas Wilson", value: "Douglas" },
    { label: "Jen Wilkin", value: "Jen" },
    { label: "Matt Chandler", value: "Matt" },
    { label: "Tony Evans", value: "Tony" },
    { label: "Craig Groeschel", value: "Craig" },
    { label: "Kevin Deyoung", value: "Kevin" },
    { label: "Steven Furtick", value: "Steven" },
  ];

  const [selected, setSelected] = useState([]);
  const [selected1, setSelected1] = useState([]);
  const [selected2, setSelected2] = useState([]);

  const form = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      username: yup.string().required("username is required").min(6).max(15),
      password: yup.string().required("password is requried").min(8),
      confirmPassword: yup
        .string()
        .required("Confirm password is requried")
        .min(8)
        .oneOf([yup.ref("password")], "Confirm password not match"),
    }),
    onSubmit: (values) => onSignUp(values),
  });

  const [text, setText] = useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const onChangePrompt = async () => {
    console.log("This is the text value of text editor:", text);
    const { response, err } = await updatePrompt({text});
    console.log("response",response);
    if (response) {
      toast.success(" Prompt update success ");
      let user_job = localStorage.getItem("user_job", response.job);
      let user_distinctive = localStorage.getItem("user_distinctive", response.distinctive);
      let user_writer = localStorage.getItem("user_writer", response.writer);

      var prompt = text + 
      "You are a " + 
      user_job + 
      " and your theoretical distinctives are " + 
      user_distinctive + 
      ", and your favoirte writers are "+ 
      user_writer + ". ";

      localStorage.setItem("basePrompt", prompt);
      navigate("/");
    }
    if (err) toast.error(err.message);
  };

  const items = [
    {
      key: "1",
      label: `Update Prompt`,
    },
    {
      key: "2",
      label: `Update Screening Questions`,
    },
  ];

  const [show_case, setShowCase] = useState(1);
  const onTabChange = (key) => {
    setShowCase(key);
  };

  return (
    <Stack spacing={2}>
      <HeaderComp></HeaderComp>
      <Box
        component="form"
        noValidate
        onSubmit={form.handleSubmit}
        sx={{ margin: "50px 100px" }}
        style={{ padding: "3rem" }}
      >
        <div id="tab1">
          <h1>Prompt Sentence</h1>
          <TextAreaComp
            defaultValue={localStorage.getItem("user_base_prompt")}
            textValue={text}
            onTextAreaChange={handleTextChange}
          />
          <LoadingButton
            style={{ marginTop: "40px" }}
            type="submit"
            size="large"
            variant="contained"
            loading={isRequest}
            onClick={onChangePrompt}
            color="success"
          >
            Update
          </LoadingButton>
        </div>
        {/* <Tabs defaultActiveKey="1" items={items}  style={{fontStyle: "bold" , color:"white"}}  onChange={onTabChange} />
        {show_case == 1 ? (
          <div id="tab1">
            <h1>Prompt Sentence</h1>
            <TextAreaComp
              defaultValue={localStorage.getItem("basePrompt")}
              textValue={text}
              onTextAreaChange={handleTextChange}
            />
            <LoadingButton
              style={{ marginTop: "40px" }}
              type="submit"
              size="large"
              variant="contained"
              loading={isRequest}
              onClick={onChangePrompt}
              color="success"
            >
              {" "}
              UPdate{" "}
            </LoadingButton>
          </div>
        ) : (
          <div id="tab2">
            <h1>Modify Screening Questions</h1>
            <Select
              options={options}
              value={selected}
              onChange={setSelected}
              labelledBy={"Select"}
              isCreatable={true}
              style={{ color: "red" }}
            />{" "}
            &nbsp;
            <h2>Please choose one that express you. (Multiple choices)</h2>
            <MultiSelect
              options={options_1}
              value={selected1}
              onChange={setSelected1}
              labelledBy={"Select"}
              isCreatable={true}
            />
            <h2>Please choose one that express you. (Multiple choices)</h2>
            <MultiSelect
              options={options_2}
              value={selected2}
              onChange={setSelected2}
              labelledBy={"Select"}
              isCreatable={true}
              color="success"
            />
            <LoadingButton
              style={{ "margin-top": "40px" }}
              type="submit"
              size="large"
              variant="contained"
              loading={isRequest}
              onClick={onChangePrompt}
              color="success"
            >
              {" "}
              Change{" "}
            </LoadingButton>
          </div>
        )} */}
      </Box>
    </Stack>
  );
};

export default DashboardPage;
