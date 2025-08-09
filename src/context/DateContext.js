import { createContext,useState } from "react";

export const MonthYearContext = createContext();

export const MonthYearProvider = ({ children }) => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  return (
    <MonthYearContext.Provider
      value={{ selectedMonth, setSelectedMonth, selectedYear, setSelectedYear }}
    >
      {children}
    </MonthYearContext.Provider>
  );
};