import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import { userSignUp } from "../api/user.api";
import { useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import { MultiSelect } from "react-multi-select-component";
import Select from 'react-select';

import "../styles.css";


const SignupPage = () => {
  const navigate = useNavigate();

  const [isRequest, setIsRequest] = useState(false);
  const options = [
    { label: "Baptist", value: "Baptist" },
    { label: "Souther Baptist", value: "SBapist" },
    { label: "Non-Denominational", value: "NDenominational" },
    { label: "Pentecostal", value: "Pentecostal" },
    { label: "Lutheran", value: "Lutheran" },
    { label: "Seventh Day Adventist", value: "sventh" },
    { label: "Methodist", value: "Methodist" }
  ];

  const options_1 = [
    { label: "Reformed", value: "Reformed" },
    { label: "Paedobaptist", value: "Paedobaptist" },
    { label: "Credobaptist", value: "Credobaptist" },
    { label: "Egalitarian", value: "Egalitarian" },
    { label: "Charismatic", value: "Charismatic" },
    { label: "Missional", value: "Missional" },
    { label: "Methodist", value: "Methodist" }
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
      email: ""
    },
    validationSchema: yup.object({
      username: yup.string()
        .required("username is required")
        .min(6)
        .max(15),
      email: yup.string()
        .required("email is required"),
      password: yup.string()
        .required("password is requried")
        .min(8),
      confirmPassword: yup.string()
        .required("Confirm password is requried")
        .min(8)
        .oneOf([yup.ref("password")], "Confirm password not match")
    }),
    onSubmit: (values) => onSignUp(values)
  });

  const onSignUp = async ({ username, password, email }) => {
    const role = 1;
    const { response, err } = await userSignUp({ username, password, email, selected, selected1, selected2, role });
    if (response) {
      // const reresponse = churchAcc({ selected, selected1, selected2 });
      toast.success("Signup success");
      navigate("/signin");
    }
    if (err) toast.error(err.message);
  };

  return (
    <Box component="form" noValidate onSubmit={form.handleSubmit}>
      <Stack spacing={2}>
        <h1>Register a Church Account</h1>
        <TextField fullWidth placeholder="username" name="username" value={form.values.username} onChange={form.handleChange} error={form.touched.username && form.errors.username != undefined} helperText={form.touched.username && form.errors.username} />
        <TextField fullWidth placeholder="email" name="email" value={form.values.email} onChange={form.handleChange} error={form.touched.email && form.errors.email != undefined} helperText={form.touched.email && form.errors.email} />
        <TextField fullWidth type="password" placeholder="password" name="password" value={form.values.password} onChange={form.handleChange} error={form.touched.password && form.errors.password != undefined} helperText={form.touched.password && form.errors.password} />
        <TextField fullWidth type="password" placeholder="Confirm password" name="confirmPassword" value={form.values.confirmPassword} onChange={form.handleChange} error={form.touched.confirmPassword && form.errors.confirmPassword != undefined} helperText={form.touched.confirmPassword && form.errors.confirmPassword} />
        <h1>Please answer the following questions</h1>
        &nbsp;
        <h2>Please choose one that express you. (Only One choice)</h2>
        <Select options={options} value={selected} onChange={setSelected} labelledBy={"Select"} isCreatable={true} style={{ color: "red" }} />
        &nbsp;
        <h2>Please choose one that express you. (Multiple choices)</h2>
        <MultiSelect options={options_1} value={selected1} onChange={setSelected1} labelledBy={"Select"} isCreatable={true} />
        &nbsp;
        <h2>Please choose one that express you. (Multiple choices)</h2>
        <MultiSelect options={options_2} value={selected2} onChange={setSelected2} labelledBy={"Select"} isCreatable={true} color="success" />
        <LoadingButton type="submit" size="large" variant="contained" loading={isRequest} color="success" >
          signup
        </LoadingButton>
        <Button component={Link} to="/signin" size="small">
          signin
        </Button>
      </Stack>
    </Box>

  );
};

export default SignupPage;