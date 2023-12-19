export const useUserStore = defineStore('user', () => {
  const BASE_URL = 'https://localhost:7124';
  const user = ref(null);

  async function loadUser() {
    return new Promise((resolve, reject) => {
      useFetch(`${BASE_URL}/api/AppUser/Get`, {
        method: 'GET',
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      }).then(response => {
        if (!response.ok) throw new Error('Failed to load user');
        user.value = response.data;
        resolve(response.data);
      }).catch(error => {
        console.error('Error loading user:', error);
        reject(error);
      });
    });
  }

  async function updateEmail(newEmail) {
    return new Promise((resolve, reject) => {
      useFetch(`${BASE_URL}/api/AppUser/UpdateEmail`, {
        method: 'PUT',
        headers: {
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newEmail: newEmail }) // Achte auf die korrekte Schreibweise
      }).then(async response => {
        if (!response.ok) {
          const errorText = await response.message;
          throw new Error(`Failed to update email: ${errorText}`);
        }
        user.value.email = newEmail;
        resolve();
      }).catch(error => {
        console.error('Error updating email:', error);
        reject(error);
      });
    });
  }



  async function updateEmail2(newEmail) {
    try {
      const { data, error } = await useFetch(`${BASE_URL}/api/AppUser/UpdateEmail`, {
        method: 'PUT',
        headers: {
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newEmail: newEmail })
      });

      if (!data) {
        throw new Error(`Failed to update email: ${response.status}`);
      }

      user.value.email = newEmail;
      return response.data;
    } catch (error) {
      console.error('Error updating email:', error);
      throw error;
    }
  }


  async function updatePassword(oldPassword, newPassword) {
    try {
      const { data, error } = await useFetch(`${BASE_URL}/api/AppUser/UpdatePassword`, {
        method: 'PUT',
        headers: {
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword })
      });

      if (!data) {
        throw new Error(`Failed to update password: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  }





  async function deleteUser() {
    const response = await useFetch(`${BASE_URL}/api/AppUser/Delete`, {
      method: 'DELETE',
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    });
    return response.data;
  }

  return {
    user,
    loadUser,
    updateEmail,
    updateEmail2,
    updatePassword,
    deleteUser
  };
});
