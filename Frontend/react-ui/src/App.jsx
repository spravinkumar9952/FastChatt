import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Home from "./Pages/Home"
import ChatBox from "./Pages/ChatBox";
import UserListView from "./Pages/UsersListView";


const router = createBrowserRouter([
    {
        path: "/",
        element : <Home/>
    },
    {
        path : "/chat",
        element : <ChatBox/>
    },
    {
        path : "/usersList",
        element : <UserListView/>
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
