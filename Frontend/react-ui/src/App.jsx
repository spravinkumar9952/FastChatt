import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Home from "./Pages/Home"
import ChatBox from "./Components/ChatBox";


const router = createBrowserRouter([
    {
        path: "/",
        element : <Home/>
    },
    {
        path : "/chat",
        element : <ChatBox/>
    }
]);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RouterProvider router={router}/>
      </header>
    </div>
  );
}

export default App;
