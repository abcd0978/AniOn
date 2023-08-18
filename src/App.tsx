import React from "react";
import * as laftelApi from "./api/laftel";
function App() {
  return (
    <p>
      <button onClick={() => laftelApi.getAnimeList({ sort: "cnt_eval" })}>
        fwafe
      </button>
    </p>
  );
}

export default App;
