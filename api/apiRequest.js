export default $axios => ({
    // Disabled
    // createUser(payload) {
    //     return $axios.$post(`/users`, payload)
    // },

    async getUser(credentials) {
        const authorization = encodeCredentials(credentials);
        return await $axios.$get(`/users`,  {headers: authorization})
        .then(response => {
            return response.user;
        })
        .catch(err => {
            console.log(err)
            if (err.response.status === 401) { // access denied to show validation errors
                const error = new Error(err.response.statusText)
                error.status = err.response.status
                throw  error;
            } else {
                throw new Error(handlePageError(err.response.status));
              }
        })
    },
    
    async createPost(payload) {
        return $axios.$post(`/post`, payload)
    },

    async showPost(id) {
        return $axios.$get(`/post/${id}`)
    },
  
    async show() {
        return await $axios.$get(`/post`)
            .then(response => {
                return response
            })
            .catch(err => {
                throw new Error(handlePageError(err.response.status));
            })
    },
  
    updatePost(payload, id) {
        return $axios.$get(`/post/${id}`, payload)
    },
  
    deletePost(id) {
        return $axios.$delete(`/post/${id}`)
    },


  })
  
  function encodeCredentials(credentials){
    const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`)
   return { 'Authorization': `Basic ${encodedCredentials}`}
}

  /**
   * Error handler return path depending on response's status code
   * @param {Integer} statusCode 
   */
  function handlePageError(statusCode) {
    const code = statusCode
    if (code === 500) {
      return "/error"
    } else if (code === 403 ){
        return "/forbidden"
      } else if (code === 404) {
          return "/notfound"
    }
  }