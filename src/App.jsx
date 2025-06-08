import Create from "./components/Create.jsx";
import Read from "./components/Read.jsx";

const App = () => {
  return (
    <div className="min-h-screen mt-5 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col lg:flex-row p-4 md:p-8 lg:p-12 gap-8 md:gap-10 lg:gap-12">
      <Create/>
      <Read />
    </div>
  );
};

export default App;