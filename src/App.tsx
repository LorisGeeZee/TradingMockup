import { RouterProvider } from "react-router-dom";
import { routes } from "./utils/routes";

function App() {
  return (
    <RouterProvider router={routes} future={{ v7_startTransition: true }} />
  );
}

export default App;
