import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Remove the loading indicator once JS runs
document.getElementById("js-loading")?.remove();

createRoot(document.getElementById("root")!).render(<App />);
