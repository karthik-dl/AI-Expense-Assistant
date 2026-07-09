import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>AI Expense Assistant</h1>
      <h2>{message}</h2>
    </div>
  );
}

export default App;