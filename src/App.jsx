import Create from "./components/Create.jsx";
import Read from "./components/Read.jsx";

const App = () => {
  return (
    <div className="mt-5 min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 flex flex-col lg:flex-row p-4 md:p-8 lg:p-12 gap-8 md:gap-10 lg:gap-12">
      <Create/>
      <Read />
    </div>
  );
};

export default App;