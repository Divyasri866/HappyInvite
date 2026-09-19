const API = {
  getToken() {
    return localStorage.getItem('happyInviteToken');
  },
  setToken(token) {
    if (token) {
      localStorage.setItem('happyInviteToken', token);
    } else {
      localStorage.removeItem('happyInviteToken');
    }
  },
  getUser() {
    try {
      const u = localStorage.getItem('happyInviteUser');
      return u ? JSON.parse(u) : null;
    } catch (e) {
      return null;
    }
  },
  setUser(user) {
    if (user) {
      localStorage.setItem('happyInviteUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('happyInviteUser');
    }
  },
  logout() {
    localStorage.removeItem('happyInviteToken');
    localStorage.removeItem('happyInviteUser');
    window.location.href = 'login.html';
  },
  async request(endpoint, options = {}) {
    const token = this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(endpoint, {
        ...options,
        headers,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'An error occurred during request.');
      }
      return data;
    } catch (err) {
      console.error(`API Error [${endpoint}]:`, err.message);
      throw err;
    }
  },
  // Auth API
  async register(name, email, password) {
    const data = await this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    if (data.token && data.user) {
      this.setToken(data.token);
      this.setUser(data.user);
    }
    return data;
  },
  async login(email, password) {
    const data = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.token && data.user) {
      this.setToken(data.token);
      this.setUser(data.user);
    }
    return data;
  },
  async getMe() {
    return await this.request('/api/auth/me');
  },
  // Saved Templates API
  async getSavedTemplates(sort = 'time') {
    return await this.request(`/api/saved-templates?sort=${sort}`);
  },
  async addSavedTemplate(title, category = '', img = '', link = '') {
    return await this.request('/api/saved-templates', {
      method: 'POST',
      body: JSON.stringify({ title, category, img, link }),
    });
  },
  async deleteSavedTemplate(id) {
    return await this.request(`/api/saved-templates/${id}`, {
      method: 'DELETE',
    });
  },
  async clearSavedTemplates() {
    return await this.request('/api/saved-templates', {
      method: 'DELETE',
    });
  },
  // Contact & Feedback API
  async submitContact(name, email, message) {
    return await this.request('/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name, email, message }),
    });
  },
  async submitFeedback(name, rating, comments) {
    return await this.request('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({ name, rating, comments }),
    });
  },
  async getTestimonials() {
    return await this.request('/api/feedback/testimonials');
  },
  // Custom Invitations API
  async saveInvitation(invitationData) {
    return await this.request('/api/invitations', {
      method: 'POST',
      body: JSON.stringify(invitationData),
    });
  },
  async getInvitation(token) {
    return await this.request(`/api/invitations/${token}`);
  }
};
