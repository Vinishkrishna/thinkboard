import { Route,Routes } from "react-router"

import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import NoteDetailPage from "./pages/NoteDetailPage"
// import toast from "react-hot-toast"
//by default it will use forest theme,as in tailwind.config.js
const App = () => {
  return (
    <div className="relative h-full w-full"> 
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      {/* <button onClick={() => toast.success("congrats")} className="text-red-500 p-4 bg-pink-300">Click me</button> */}
      {/* <button className="btn btn-primary">click me</button> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
}

export default App