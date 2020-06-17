import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [repositories])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `New Repository ${Date.now()}`,
      url: "https://github.com/josepholiveira",
      techs: "js, react",
    })

    const repository = response.data
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)

    setRepositories([...repositories])

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.title}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
            </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
