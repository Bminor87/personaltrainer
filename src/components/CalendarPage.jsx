import { Calendar, dayjsLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import {
  getTrainingsWithCustomer,
  deleteTraining,
  createTraining,
} from "../services/trainings-service";

import { BASE_URL } from "../services/api";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import { useEffect, useState, useMemo } from "react";

import dayjs from "dayjs";

export default function CalendarPage() {
  const { data: trainings } = useQuery({
    queryKey: ["trainings"],
    queryFn: getTrainingsWithCustomer,
  });

  const [currentView, setCurrentView] = useState(Views.MONTH);

  const DragAndDropCalendar = withDragAndDrop(Calendar);

  const [events, setEvents] = useState([]);

  const localizer = dayjsLocalizer(dayjs);

  useEffect(() => {
    if (trainings) {
      setEvents(
        trainings.map((training) => ({
          title:
            training.customer.firstname +
            " " +
            training.customer.lastname +
            " (" +
            training.activity +
            ")",
          start: dayjs(training.date).toDate(),
          end: dayjs(training.date).add(training.duration, "minute").toDate(),
          link: training,
        }))
      );
    }
  }, [trainings]);

  const eventModified = async ({ event, start, end }) => {
    const training = event.link;
    const updatedTraining = {
      ...training,
      customer: BASE_URL + "/customers/" + training.customer.id,
      date: start,
      duration: dayjs(end).diff(dayjs(start), "minute"),
    };
    await deleteTraining(training.id);
    await createTraining(updatedTraining);
  };

  const queryClient = useQueryClient();

  const recreteMutation = useMutation({
    mutationFn: eventModified,
    onSuccess: queryClient.invalidateQueries("trainings"),
  });

  return (
    <div style={{ height: "100vh" }}>
      <DragAndDropCalendar
        localizer={localizer}
        events={events}
        draggableAccessor={(event) => true}
        style={{ height: "100%" }}
        onDragStart={(event) => console.log("Drag started", event)}
        onEventDrop={recreteMutation.mutate}
        onEventResize={recreteMutation.mutate}
        defaultView={currentView}
        onView={(view) => setCurrentView(view)}
      />
    </div>
  );
}
