import { axiosSecureInstance } from "./axios";

export const getAllWorkspaces = async () => {
  return await axiosSecureInstance.get("api/workspace/all");
};

export const getUserWorkspaces = async () => {
  return await axiosSecureInstance.get("api/workspace/user-workspaces", {
    headers: {  },
  });
};

export const createWorkspace = async (data) => {
  try {
    const response = await axiosSecureInstance.post("api/workspace/create", data, {
      headers: { },
    });

    console.log("API Response:", response.data); // Debugging log
    return response;
  } catch (error) {
    console.error("API Error:", error.response ? error.response.data : error.message);
    throw error;
  }
};


export const deleteWorkspace = async (id) => {
    return await axiosSecureInstance.delete(`api/workspace/${id}`, {
      headers: {  },
    });
  };
  
