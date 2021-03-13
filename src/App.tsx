import React from 'react';

import Layout from './hoc/Layout/Layout';
import ToDo from './pages/ToDo/ToDo';

function App() {
  return (
    <div className="App">
      <Layout>
        <ToDo />
      </Layout>
    </div>
  );
}

export default App;
