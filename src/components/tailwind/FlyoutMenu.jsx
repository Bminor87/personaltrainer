import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { reset } from "../../services/api";

import { useQueryClient } from "@tanstack/react-query";

import {
  ChevronDownIcon,
  UserGroupIcon,
  PlayCircleIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
  ChartPieIcon,
} from "@heroicons/react/20/solid";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const menu = [
  {
    name: "Statistics",
    description: "Some statistics and charts about your business",
    href: "/",
    icon: ChartPieIcon,
  },
  {
    name: "Trainings",
    description: "A list of upcoming training sessions",
    href: "/trainings",
    icon: BriefcaseIcon,
  },
  {
    name: "Calendar",
    description: "Your training sessions in the calendar UI",
    href: "/calendar",
    icon: CalendarDaysIcon,
  },
  {
    name: "Customers",
    description: "A list of your customers",
    href: "/customers",
    icon: UserGroupIcon,
  },
];

export default function FlyoutMenu() {
  const queryClient = useQueryClient();

  const resetApi = async () => {
    reset();
    queryClient.invalidateQueries("customers");
    queryClient.invalidateQueries("trainings");
  };

  return (
    <Popover className="relative ml-6">
      <PopoverButton className="inline-flex items-center gap-x-1 text-md font-semibold text-white">
        <span>Menu</span>
        <ChevronDownIcon aria-hidden="true" className="h-5 w-5" />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm/6 shadow-lg ring-1 ring-gray-900/5">
          <div className="p-4">
            {menu.map((item) => (
              <Popover.Button
                as={Link}
                to={item.href}
                key={item.name}
                className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <item.icon
                    aria-hidden="true"
                    className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                  />
                </div>
                <div>
                  <span className="font-semibold text-gray-900">
                    {item.name}
                  </span>
                  <p className="mt-1 text-gray-600">{item.description}</p>
                </div>
              </Popover.Button>
            ))}
          </div>
          <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
            <a
              href="#demo"
              className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
            >
              <PlayCircleIcon
                aria-hidden="true"
                className="h-5 w-5 flex-none text-gray-400"
              />
              Watch Demo
            </a>
            <Button
              color="error"
              onClick={resetApi}
              className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
            >
              <ArrowPathIcon
                aria-hidden="true"
                className="h-5 w-5 flex-none text-gray-400"
              />
              Reset API
            </Button>
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
