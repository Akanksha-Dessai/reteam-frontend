import axios from "axios";


export const getAllWorkspaces = async () => {
  return await axios.get("http://localhost:8011/api/workspace/all");
};

export const getUserWorkspaces = async () => {
  return await axios.get("http://localhost:8011/api/workspace/user-workspaces", {
    headers: {  },
  });
};

export const createWorkspace = async (data) => {
  try {
    const response = await axios.post("http://localhost:8011/api/workspace/create", data, {
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
    return await axios.delete(`http://localhost:8011/api/workspace/${id}`, {
      headers: {  },
    });
  };
  
