import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import api from "../../services/axiosInstance";

export const AgendamentoBarbearia = () => {
  const hoje = new Date().toISOString().split("T")[0]; // Captura a data atual no formato YYYY-MM-DD

  const [agendamentos, setAgendamentos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(hoje); // Define a data inicial como o dia atual
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [error, setError] = useState("");

  // 🔹 Buscar TODOS os agendamentos ao carregar a página
  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const response = await api.get("/api/agendamentos");
        console.log("📌 Todos os agendamentos carregados:", response.data);
        setAgendamentos(response.data);
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
        setError("Erro ao carregar agendamentos. Tente novamente mais tarde.");
      }
    };

    fetchAgendamentos();
    fetchAgendamentosByDate(new Date(hoje)); // Buscar agendamentos para a data atual ao abrir a página
  }, []);

  // 🔹 Quando um dia é clicado no calendário, buscar os agendamentos dessa data
  const fetchAgendamentosByDate = async (date) => {
    try {
      const response = await api.get(`/api/agendamentos`, {
        params: { data: date.toISOString().split("T")[0] },
      });

      console.log(
        "📌 Agendamentos carregados para",
        date.toISOString().split("T")[0],
        ":",
        response.data
      );

      // 🔹 Ordena os agendamentos por horário em ordem crescente
      const agendamentosOrdenados = response.data.sort((a, b) => a.horario.localeCompare(b.horario));

      setSelectedEvents(agendamentosOrdenados);
      setError("");
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
      setError("Erro ao carregar agendamentos. Tente novamente mais tarde.");
    }
  };

  // 🔹 Quando uma data é clicada no calendário
  const handleDateClick = (info) => {
    const date = new Date(info.dateStr);
    console.log("📌 Data clicada no calendário:", date.toISOString().split("T")[0]);

    setSelectedDate(info.dateStr);
    fetchAgendamentosByDate(date);
  };

  // 🔹 Formatação dos eventos para o FullCalendar
  const formatEvents = () => {
    return agendamentos.map((agendamento) => ({
      id: agendamento.id,
      title: `${agendamento.servico.nome} - ${agendamento.barbeiro.nome}`,
      start: `${agendamento.data}T${agendamento.horario}`,
    }));
  };

  // 🔹 Função para formatar data no formato BR (dd/mm/yyyy)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="flex flex-col items-center bg-[#f9fafb] min-h-screen p-4">
      <h1 className="text-2xl md:text-3xl font-bold text-[#111827] mb-6 text-center">
        Gerenciamento de Agendamentos
      </h1>

      <div className="w-full max-w-7xl bg-white p-4 md:p-6 shadow-md rounded-lg">
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
            today: "Voltar para o mês atual",
            month: "Mês",
            week: "Semana",
          }}
          height="auto"
          contentHeight={600}
          aspectRatio={1.35}
          dayCellClassNames={() =>
            "hover:bg-gray-200 hover:scale-105 transition-all"
          }
          timeZone="local"
        />
      </div>

      {/* 🔹 Exibir detalhes do agendamento do dia selecionado */}
      {selectedDate && (
        <div className="w-full max-w-3xl mt-8 p-4 md:p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-lg md:text-xl font-semibold text-[#111827] mb-4">
            Agendamentos para {formatDate(selectedDate)}
          </h2>

          {selectedEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {selectedEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-4 md:p-5 bg-gray-100 shadow-md rounded-lg"
                >
                  <h4 className="font-bold text-[#111827] text-sm md:text-base">
                    Cliente: {event.cliente?.nome || "Não informado"}
                  </h4>
                  <p className="text-gray-600 text-sm md:text-base">
                    Serviço: {event.servico?.nome || "Não informado"} - R$ {event.servico?.preco || "0,00"}
                  </p>
                  <p className="text-gray-600 text-sm md:text-base">
                    Barbeiro: {event.barbeiro?.name || "Não informado"}
                  </p>
                  <p className="text-gray-600 text-sm md:text-base">
                    Horário: {event.horario || "Não informado"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center text-sm md:text-base">
              Nenhum agendamento para este dia.
            </p>
          )}
        </div>
      )}

      {/* 🔹 A mensagem de erro só aparece se NÃO houver eventos */}
      {error && selectedEvents.length === 0 && (
        <div className="mt-4 p-3 md:p-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-center text-sm md:text-base">
          {error}
        </div>
      )}
    </div>
  );
};
