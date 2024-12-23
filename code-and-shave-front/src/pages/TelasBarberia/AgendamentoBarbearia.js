import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";

export const AgendamentoBarbearia = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [error, setError] = useState("");

  const fetchAgendamentos = async () => {
    try {
        const response = await axios.get("/api/agendamentos-barbearia"); // Substituir pela URL real
        setAgendamentos(response.data);
    } catch (err) {
        setError("Erro ao carregar agendamentos. Tente novamente mais tarde.");
        console.error(err);
        }
    }

    useEffect(() => {
        fetchAgendamentos();
    }, []);

    const formatEvents = () => {
        return agendamentos.map((agendamento) => ({
        id: agendamento.id,
        title: `${agendamento.servico} - ${agendamento.cliente}`,
        date: agendamento.data,
        }));
    }

    const handleDateClick = (info) => {
        const date = info.dateStr;
        console.log("Data clicada (original):", date);

        setSelectedDate(date);
        const eventsForDate = agendamentos.filter(
            (agendamento) => agendamento.data === date
        );
        setSelectedEvents(eventsForDate);
    }

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`; 
    }      


  return (
    <div className="flex flex-col items-center bg-[#f9fafb] min-h-screen p-4">
      <h1 className="text-2xl font-bold text-[#111827] mb-6">
        Gerenciamento de Agendamentos
      </h1>

      <div className="w-full max-w-7xl bg-white p-4 shadow-md rounded-lg">
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={formatEvents()}
            dateClick={handleDateClick}
            locale="pt-br"
            headerToolbar={{
                start: "prev,next today",
                center: "title",
                end: "dayGridMonth,dayGridWeek",
            }}
            buttonText={{
                today: "Hoje",
                month: "Mês",
                week: "Semana",
            }}
            height="auto"
            dayCellClassNames={() => "hover:bg-gray-200 hover:scale-105 transition-all"}
            timeZone="local"
        />
      </div>

      {selectedDate && (
        <div className="w-full max-w-3xl mt-8">
          <h2 className="text-xl font-semibold text-[#111827] mb-4">
            Agendamentos para {selectedDate ? formatDate(selectedDate) : ''}
          </h2>
          {selectedEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {selectedEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-4 bg-white shadow-md rounded-lg"
                >
                  <h4 className="font-bold text-[#111827]">
                    Cliente: {event.cliente}
                  </h4>
                  <p className="text-gray-600">Serviço: {event.servico}</p>
                  <p className="text-gray-600">Horário: {event.horario}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Nenhum agendamento para este dia.</p>
          )}
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-center">
          {error}
        </div>
      )}
    </div>
  );
}