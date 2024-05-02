export default class Api {
  constructor() {
    this.base_url = 'https://around.nomoreparties.co/v1/web_id_03';
    this.api_key = 'e6bfcf1b-7995-431d-8c59-a9177358962b';
  }

  getAllCards() {
    return this._getDataFromApi(`${this.base_url}/cards`);
  }

  likeCard(cardId) {
    return this._putDataToApi(`${this.base_url}/cards/likes/${cardId}`);
  }

  dislikeCard(cardId) {
    return this._deleteDataFromApi(`${this.base_url}/cards/likes/${cardId}`);
  }

  getUserInfo() {
    return this._getDataFromApi(`${this.base_url}/users/me`);
  }

  setUserInfo(formData) {
    return this._patchDataToApi(`${this.base_url}/users/me`, {
      name: formData.nama,
      about: formData.title,
    });
  }

  createNewCard(formData) {
    return this._postDataToApi(`${this.base_url}/cards`, {
      name: formData.nama_tempat,
      link: formData.link_gambar,
    });
  }

  deleteCard(cardId) {
    return this._deleteDataFromApi(`${this.base_url}/cards/${cardId}`);
  }

  updateAvatar(formData) {
    return this._patchDataToApi(`${this.base_url}/users/me/avatar`, {
      avatar: formData.avatar,
    });
  }

  async _patchDataToApi(url, data) {
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.api_key,
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        return await response.json();
      }

      throw new Error('Error patching data' + response.status);
    } catch (error) {
      console.error('Error patching data:', error);
      throw error;
    }
  }

  async _getDataFromApi(url) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: this.api_key,
        },
      });
      if (response.ok) {
        return await response.json();
      }

      throw new Error('Error patching data' + response.status);
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  async _putDataToApi(url, data = {}) {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.api_key,
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        return await response.json();
      }

      throw new Error('Error patching data' + response.status);
    } catch (error) {
      console.error('Error putting data:', error);
      throw error;
    }
  }

  async _deleteDataFromApi(url) {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: this.api_key,
        },
      });
      if (response.ok) {
        return await response.json();
      }

      throw new Error('Error patching data' + response.status);
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
  }

  async _postDataToApi(url, data) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.api_key,
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        return await response.json();
      }

      throw new Error('Error patching data' + response.status);
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  }
}
