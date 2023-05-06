import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UsersTable from "./pages/UsersTable"
import PieChart from "./pages/PieChart"
import { useUserStore } from "./store";
import { User } from "./api";

function App() {
  const [cityData, setCityData] = useState<{ type: string, value: number }[]>([]);

  const { users } = useUserStore();

  useEffect(() => {
    const cities: { [key: string]: number } = {};

    // Count cities amount for pie chart
    users.forEach((user: User) => {
      const city: string = user?.address?.city;
      if(city) {
        if (cities[city]) {
          cities[city] += 1;
        } else {
          cities[city] = 1;
        }
      }
    });

    const data: { type: string, value: number }[] = Object.entries(cities).map(([type, value]) => ({
      type,
      value: (value / users.length) * 100,
    }));
  
    setCityData(data);
  }, [users]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsersTable />} />
        <Route path="/pie-chart" element={<PieChart cityData={cityData} />} />
      </Routes>
    </Router>
  );
}

export default App;

