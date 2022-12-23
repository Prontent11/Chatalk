import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home/home.component";
import ChatPage from "./pages/chat/chat.component";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/chats",
    element: <ChatPage />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
