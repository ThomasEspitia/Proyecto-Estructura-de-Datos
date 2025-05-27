import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './Calendario.css';

function Calendario() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="p-4 w-full">
      <h2 className="text-2xl font-bold mb-4">Calendario</h2>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl max-w-md mx-auto">
        <Calendar
          onChange={setDate}
          value={date}
          className="rounded-lg"
        />
        <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
          Fecha seleccionada: <span className="font-semibold">{date.toDateString()}</span>
        </p>
      </div>
    </div>
  );
}

export default Calendario;
