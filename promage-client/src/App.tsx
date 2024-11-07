import { BrowserRouter, Route, Routes,  } from "react-router-dom";


import ProjectsContextContainer from "./contexts/ProjectsContext";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import TasksContextContainer from "./contexts/TasksContext";
import ProjectManagersContextContainer from "./contexts/ProjectManagersContext";

const App = () => {
  return (
    <BrowserRouter>
      <ProjectsContextContainer>
        <TasksContextContainer>
          <ProjectManagersContextContainer>
            <Routes>
              <Route path="/" element={<Projects />} />
              <Route path="/tasks/:id" element={<Tasks />} />
            </Routes>
          </ProjectManagersContextContainer>
        </TasksContextContainer>
      </ProjectsContextContainer>
    </BrowserRouter>
  )
}
export default App;
