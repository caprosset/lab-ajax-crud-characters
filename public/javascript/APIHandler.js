class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
    this.APIRequest = axios.create({
      baseURL: `${this.BASE_URL}/characters`,
    });
  }

  getFullList () {
    return this.APIRequest
    .get()
    .then( (response) => {
      console.log("data", response.data); // Iteration 2
      return response.data; // Iteration 3 - Fetch all characters
    })
    .catch( (err) => console.log(err));
  }

  getOneRegister(id) {
    return this.APIRequest
    .get(`/${id}`)
    .then( (response) => {
      console.log('response', response.data); // Iteration 2
      return response.data; // Iteration 3 - Fetch one character
    })
    .catch( (err) => console.log(err))
  }

  createOneRegister (newCharacter) {
    return this.APIRequest
    .post('', newCharacter)
    .then( (response) => console.log(`Character created: ${response.data}`)) // Iteration 2
    .catch( (err) => console.log(err));
  }

  updateOneRegister (id, charToUpdate) {
    return this.APIRequest
    .put(`/${id}`, charToUpdate)
    .then( () => console.log(`Character ${id} has been updated`)) // Iteration 2
    .catch( (err) => console.log(err));
  }

  deleteOneRegister (id) {
    return this.APIRequest
    .delete(`/${id}`)
    .then( () => console.log(`Character id ${id} has been deleted`)) // Iteration 2
    .catch( (err) => console.log(err));
  }
}