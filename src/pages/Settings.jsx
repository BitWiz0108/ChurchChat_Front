import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { Table } from "antd";
import HeaderComp from "../components/HeaderComp";
import { getAllAccounts } from "../api/user.api";

import "../styles.css";

const Settings = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const getAllAccountData = async () => {
      const { response, err } = await getAllAccounts();
      const usersData = response.map((user, index) => {
        return {
          ...user,
          key: index + 1,
          userrole: user.role ==1 ? "Church Account" : "SuperAdmin"
        };
      });
      setTableData(usersData);
    };
    getAllAccountData();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "key",
      defaultSortOrder: "descend",
    },
    {
      title: "Name",
      dataIndex: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "who am I",
      dataIndex: "job",
    },
    {
      title: "Distinctive",
      dataIndex: "distintive",
    },
    {
      title: "favorite writers",
      dataIndex: "writer",
    },
    {
      title: "User Type",
      dataIndex: "userrole",
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {};
  return (
    <Stack spacing={2}>
      <HeaderComp></HeaderComp>
      <Box>
        <div style={{ margin: "50px 100px" }}>
          <h1>Signed Church Accounts</h1>
          <Table columns={columns} dataSource={tableData} onChange={onChange} />
        </div>
      </Box>
    </Stack>
  );
};
export default Settings;
