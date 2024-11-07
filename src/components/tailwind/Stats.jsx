import { getCustomers } from "../../services/customers-service";
import { getTrainingsWithCustomer } from "../../services/trainings-service";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import _ from "lodash";
// React Chart Component
import { AgCharts } from "ag-charts-react";

export default function Stats() {
  const customers = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  const trainings = useQuery({
    queryKey: ["trainings"],
    queryFn: getTrainingsWithCustomer,
  });

  const [chartOptions, setChartOptions] = useState({
    // Data: Data to be displayed in the chart
    data: [],
    background: {
      fill: "rgba(0,0,0, 0.2)",
    },
    series: [
      {
        type: "bar",
        xKey: "training",
        yKey: "minutes",
        label: {
          color: "white",
          formatter: function (params) {
            return params.value + " min";
          },
        },
      },
    ],
    title: { text: "Total training times", color: "white" },
    axes: [
      {
        type: "category",
        position: "bottom",
        title: { text: "Training", color: "white" },
        label: { color: "white" },
      },
      {
        type: "number",
        position: "left",
        title: { text: "Duration (min)", color: "white" },
        label: { color: "white" },
      },
    ],
  });

  const buildStats = async () => {
    console.log(_.defaults({ a: 1 }, { a: 3, b: 2 })); // Just checking if lodash works
    return {
      data: [
        { id: 1, name: "Customers", value: customers.data.length },
        {
          id: 2,
          name: "Training sessions reserved",
          value: trainings.data.length,
        },
        { id: 3, name: "Customer satisfaction*", value: "99.9%" },
        { id: 4, name: "Yearly revenue*", value: "$700K" },
      ],
    };
  };

  const { data: stats, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: buildStats,
  });

  const statsMutation = useMutation({
    queryKey: ["stats"],
    queryFn: buildStats,
    onSuccess: (data) => {
      setStats(data);
    },
  });

  useEffect(() => {
    setChartOptions((prev) => ({
      ...prev,
      data: _.reduce(
        trainings.data, // collection
        (result, training) => {
          const repeatedTraining = result.find(
            (item) => item.training === training.activity
          );
          if (repeatedTraining) {
            repeatedTraining.minutes += training.duration;
          } else {
            result.push({
              training: training.activity,
              minutes: training.duration,
            });
          }
          return result;
        }, // iterator function
        [] // accumulator (initial value)
      ),
    }));
  }, [trainings.data]);

  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {isLoading ? (
            <div className="text-center">
              <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Loading statistics...
              </h2>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Personal Trainer App
              </h2>
              <p className="mt-4 text-lg/8 text-gray-300">
                Below are some stats from your PT work.
              </p>
            </div>
          )}
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats?.data?.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-white/5 p-8">
                <dt className="text-sm/6 font-semibold text-gray-300">
                  {stat.name}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="bg-gray-900 mt-8">
            <div className="text-center">
              <AgCharts options={chartOptions} />
            </div>
          </div>
          <p className="mt-8 text-sm/6 text-gray-300 text-center">
            * This stat is made up
          </p>
        </div>
      </div>
    </div>
  );
}
