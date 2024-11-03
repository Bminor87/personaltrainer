import { getCustomers } from "../../services/customers-service";
import { getTrainingsWithCustomer } from "../../services/trainings-service";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import _ from "lodash";

export default function Stats() {
  const customers = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  const trainings = useQuery({
    queryKey: ["trainings"],
    queryFn: getTrainingsWithCustomer,
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
        { id: 3, name: "Uptime guarantee", value: "99.9%" },
        { id: 4, name: "Paid out to creators", value: "$70M" },
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

  useEffect(() => {}, []);

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

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
                Trusted by Athletes worldwide
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

          {/* Stat block begins */}
          <div className="bg-gray-900">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
              <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
                <div className="flex p-px lg:col-span-4">
                  <div className="overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]">
                    <div className="text-center">
                      <LineChart width={600} height={400} data={data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                        <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                      </LineChart>
                    </div>
                    <div className="p-10">
                      <h3 className="text-sm/4 font-semibold text-gray-400">
                        Releases
                      </h3>
                      <p className="mt-2 text-lg font-medium tracking-tight text-white">
                        Push to deploy
                      </p>
                      <p className="mt-2 max-w-lg text-sm/6 text-gray-400">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        In gravida justo et nulla efficitur, maximus egestas sem
                        pellentesque.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex p-px lg:col-span-2">
                  <div className="overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 lg:rounded-tr-[2rem]">
                    <img
                      alt=""
                      src="https://tailwindui.com/plus/img/component-images/bento-02-integrations.png"
                      className="h-80 object-cover object-center"
                    />
                    <div className="p-10">
                      <h3 className="text-sm/4 font-semibold text-gray-400">
                        Integrations
                      </h3>
                      <p className="mt-2 text-lg font-medium tracking-tight text-white">
                        Connect your favorite tools
                      </p>
                      <p className="mt-2 max-w-lg text-sm/6 text-gray-400">
                        Curabitur auctor, ex quis auctor venenatis, eros arcu
                        rhoncus massa.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex p-px lg:col-span-2">
                  <div className="overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 lg:rounded-bl-[2rem]">
                    <img
                      alt=""
                      src="https://tailwindui.com/plus/img/component-images/bento-02-security.png"
                      className="h-80 object-cover object-center"
                    />
                    <div className="p-10">
                      <h3 className="text-sm/4 font-semibold text-gray-400">
                        Security
                      </h3>
                      <p className="mt-2 text-lg font-medium tracking-tight text-white">
                        Advanced access control
                      </p>
                      <p className="mt-2 max-w-lg text-sm/6 text-gray-400">
                        Vestibulum ante ipsum primis in faucibus orci luctus et
                        ultrices posuere cubilia.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex p-px lg:col-span-4">
                  <div className="overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]">
                    <img
                      alt=""
                      src="https://tailwindui.com/plus/img/component-images/bento-02-performance.png"
                      className="h-80 object-cover object-left"
                    />
                    <div className="p-10">
                      <h3 className="text-sm/4 font-semibold text-gray-400">
                        Performance
                      </h3>
                      <p className="mt-2 text-lg font-medium tracking-tight text-white">
                        Lightning-fast builds
                      </p>
                      <p className="mt-2 max-w-lg text-sm/6 text-gray-400">
                        Sed congue eros non finibus molestie. Vestibulum euismod
                        augue vel commodo vulputate. Maecenas at augue sed elit
                        dictum vulputate.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Stat block ends */}
        </div>
      </div>
    </div>
  );
}
