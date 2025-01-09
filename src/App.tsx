import React from 'react';
import { Flow } from './components/Flow';
import { Sidebar } from './components/Sidebar';
import { ModalContainer } from './components/ModalContainer';

function App() {
  return (
    <>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar side="left" />
        <Flow />
        <Sidebar side="right" />
      </div>
      <ModalContainer />
    </>
  );
}

export default App;