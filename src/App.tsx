import { useState } from "react";
import LoginPage from "./screens/LoginPage";
import UserPage from "./screens/UserPage";
import Header from "./components/Header";

function App() {
  const [cardId, setCardId] = useState<string | null>(null);

  const onLogin = (id: string) => {
    console.log("Logged in as", id);

    setCardId(id);
  };

  return (
    <>
      <Header />
      {cardId ? (
        <UserPage userId={cardId} onLogout={() => setCardId(null)} />
      ) : (
        <LoginPage onLogin={onLogin} />
      )}
    </>
  );
}

export default App;
