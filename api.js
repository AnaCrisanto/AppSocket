const API_URL = 'https://apisockets.onrender.com';

export const getLists = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al obtener las listas');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getLists:', error);
    throw error;
  }
};

export const getOneList = async (_id) => {
  try {
    const response = await fetch(`${API_URL}/${_id}`);
    if (!response.ok) {
      throw new Error('Error al obtener el elemento');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getOneList:', error);
    throw error;
  }
};

export const insertList = async (data) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error('Error al insertar el elemento');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en insertList:', error);
    throw error;
  }
};


export const updateList = async (_id, updatedList) => {
  try {
    const response = await fetch(`${API_URL}/${_id}`, {
      method: "PUT",
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(updatedList)
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el elemento');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en updateList:', error);
    throw error;
  }
};

export const deleteList = async (_id) => {
  try {
    const response = await fetch(`${API_URL}/${_id}`, {
      method: "DELETE",
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error('Error al eliminar el elemento');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en deleteList:', error);
    throw error;
  }
};
