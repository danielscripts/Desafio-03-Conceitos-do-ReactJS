import React, { useEffect, useState } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  },[]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repo ${Date.now()}`,
      owner: "Daniel Corrêa"
    });
    setRepositories([...repositories,response.data]);
  }

  function handleRemoveRepository(id) {
    // TODO
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ));
    api.delete(`repositories/${id}`);
      
    
  }
  

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
        <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}> Remover </button>
        </li>
        )}
      </ul>

      <button onClick={handleAddRepository}> Adicionar </button>
    </div>
  );
}

export default App;