//took help of users section from collabai

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Modal, Typography, Input } from "antd";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { createWorkspace, getAllWorkspaces, getUserWorkspaces, deleteWorkspace } from "../../../api/workspaceapi";

const { Title } = Typography;

const ListWorkspace = () => {
  const navigate = useNavigate();
  const [workspaceList, setWorkspaceList] = useState([]);
  const [dataLoader, setDataLoader] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [workspaceIdToDelete, setWorkspaceIdToDelete] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    //const storedRole = localStorage.getItem("role"); // Assuming user role is stored
    //setUserRole(storedRole);
    //fetchWorkspaces(storedRole);
    fetchWorkspaces();
  }, [addModal]);

  const fetchWorkspaces = async (role) => {
    try {
      setDataLoader(true);
      let response;

  
       // response = await getUserWorkspaces(); // Fetch only the user's workspaces
      

      response = await getAllWorkspaces();

      setWorkspaceList(response?.data?.workspaces);
      setDataLoader(false);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
      setDataLoader(false);
    }
  };

  const handleCreateWorkspace = async () => {
    try {
      await createWorkspace({ workspacename: workspaceName });
      setAddModal(false);
      setWorkspaceName("");
      //fetchWorkspaces(userRole); // Refresh list
      alert("sucessfully created");
      fetchWorkspaces();
    } catch (error) {
      console.error("Error creating workspace:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteWorkspace(workspaceIdToDelete);
      setDeleteModalVisible(false);
      fetchWorkspaces(userRole);
    } catch (error) {
      console.error("Error deleting workspace:", error);
    }
  };

  const columns = [
    {
      title: "Workspace Name",
      dataIndex: "workspacename",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button
            style={{ marginRight: 10 }}
            onClick={() => navigate(`/workspace/${record._id}`)}
            icon={<AiOutlineEdit />}
          ></Button>
          <Button
            shape="circle"
            danger
            onClick={() => {
              setWorkspaceIdToDelete(record._id);
              setDeleteModalVisible(true);
            }}
          >
            <AiOutlineDelete />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center justify-content-between">
        <Title level={2}>Workspaces</Title>
        <Button onClick={() => setAddModal(true)}>+ Create Workspace</Button>
      </div>
      <Table
        loading={dataLoader}
        columns={columns}
        dataSource={workspaceList?.map((workspace) => ({ ...workspace, key: workspace._id }))}
        pagination={{ pageSize: 10 }}
        bordered
        responsive
      />

      <Modal
        title="Confirm Delete"
        open={deleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
      >
        Are you sure you want to delete this workspace?
      </Modal>

      <Modal
        title="Create Workspace"
        open={addModal}
        onOk={handleCreateWorkspace}
        onCancel={() => setAddModal(false)}
        okButtonProps={{ disabled: !workspaceName }}
      >
        <Input
          placeholder="Enter workspace name"
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
        />
        <text><i>The Minimum length of workspace should be 4.</i></text>
      </Modal>
    </div>
  );
};

export default ListWorkspace;
