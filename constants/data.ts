import { NavItem } from "@/types";

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: "Candice Schiner",
    company: "Dell",
    role: "Frontend Developer",
    verified: false,
    status: "Active"
  },
  {
    id: 2,
    name: "John Doe",
    company: "TechCorp",
    role: "Backend Developer",
    verified: true,
    status: "Active"
  },
  {
    id: 3,
    name: "Alice Johnson",
    company: "WebTech",
    role: "UI Designer",
    verified: true,
    status: "Active"
  },
  {
    id: 4,
    name: "David Smith",
    company: "Innovate Inc.",
    role: "Fullstack Developer",
    verified: false,
    status: "Inactive"
  },
  {
    id: 5,
    name: "Emma Wilson",
    company: "TechGuru",
    role: "Product Manager",
    verified: true,
    status: "Active"
  },
  {
    id: 6,
    name: "James Brown",
    company: "CodeGenius",
    role: "QA Engineer",
    verified: false,
    status: "Active"
  },
  {
    id: 7,
    name: "Laura White",
    company: "SoftWorks",
    role: "UX Designer",
    verified: true,
    status: "Active"
  },
  {
    id: 8,
    name: "Michael Lee",
    company: "DevCraft",
    role: "DevOps Engineer",
    verified: false,
    status: "Active"
  },
  {
    id: 9,
    name: "Olivia Green",
    company: "WebSolutions",
    role: "Frontend Developer",
    verified: true,
    status: "Active"
  },
  {
    id: 10,
    name: "Robert Taylor",
    company: "DataTech",
    role: "Data Analyst",
    verified: false,
    status: "Active"
  }
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard/overview",
    icon: "dashboard",
    isActive: true,
    shortcut: ["d", "d"],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: "Bookings",
    url: "/dashboard/bookings",
    icon: "booking",
    isActive: false,
    items: [
      {
        title: "Booking List",
        url: "/dashboard/bookings",
        icon: "sheet"
      },
      {
        title: "Add Train Journey",
        url: "/dashboard/bookings/create",
        icon: "add"
      },
      {
        title: "List Tickets",
        url: "/dashboard/tickets",
        icon: "ticket"
      }
    ]
  },
  {
    title: "Trains",
    url: "/dashboard/trains",
    icon: "train",
    isActive: false,
    items: [
      {
        title: "List Train",
        url: "/dashboard/trains",
        icon: "sheet"
      },
      {
        title: "Create New Train",
        url: "/dashboard/trains/create",
        icon: "plus"
      }
    ]
  },
  {
    title: "Carriages",
    url: "/dashboard/carriages",
    icon: "carriage",
    isActive: false,
    items: [
      {
        title: "Carriage List",
        url: "/dashboard/carriages",
        icon: "sheet"
      },
      {
        title: "Add Carriage",
        url: "/dashboard/carriages/create",
        icon: "add"
      }
    ]
  },
  {
    title: "Carriage Types",
    url: "/dashboard/carriage-types",
    icon: "type",
    isActive: false,
    items: [
      {
        title: "Carriage Types List",
        url: "/dashboard/carriage-types",
        icon: "sheet"
      },
      {
        title: "Add Carriage Type",
        url: "/dashboard/carriage-types/create",
        icon: "add"
      }
    ]
  },
  // {
  //   title: "Seats",
  //   url: "/dashboard/seats",
  //   icon: "seat",
  //   isActive: false,
  //   items: [
  //     {
  //       title: "Seat List",
  //       url: "/dashboard/seats",
  //       icon: "sheet"
  //     },
  //     {
  //       title: "Add Seat",
  //       url: "/dashboard/seats/create",
  //       icon: "add"
  //     }
  //   ]
  // },
  {
    title: "Seat Types",
    url: "/dashboard/seat-types",
    icon: "type",
    isActive: false,
    items: [
      {
        title: "Seat Types List",
        url: "/dashboard/seat-types",
        icon: "sheet"
      },
      {
        title: "Add Seat Type",
        url: "/dashboard/seat-types/create",
        icon: "add"
      }
    ]
  },
  {
    title: "Passengers",
    url: "/dashboard/passengers",
    icon: "user",
    isActive: false,
    items: [
      {
        title: "Passenger List",
        url: "/dashboard/passengers",
        icon: "sheet"
      },
      {
        title: "Add Passenger",
        url: "/dashboard/passengers/create",
        icon: "add"
      }
    ]
  },
  {
    title: "Passenger Types",
    url: "/dashboard/passenger-types",
    icon: "type",
    isActive: false,
    items: [
      {
        title: "Passenger Types List",
        url: "/dashboard/passenger-types",
        icon: "sheet"
      },
      {
        title: "Add Passenger Type",
        url: "/dashboard/passenger-types/create",
        icon: "add"
      }
    ]
  },
  {
    title: "Provinces",
    url: "/dashboard/provinces",
    icon: "map",
    isActive: false,
    items: [
      {
        title: "Province List",
        url: "/dashboard/provinces",
        icon: "sheet"
      },
      {
        title: "Add Province",
        url: "/dashboard/provinces/create",
        icon: "add"
      }
    ]
  },
  {
    title: "Stations",
    url: "/dashboard/stations",
    icon: "station",
    isActive: false,
    items: [
      {
        title: "Station List",
        url: "/dashboard/stations",
        icon: "sheet"
      },
      {
        title: "Add Station",
        url: "/dashboard/stations/create",
        icon: "add"
      }
    ]
  },
  {
    title: "Railway Networks",
    url: "/dashboard/railway-networks",
    icon: "network",
    isActive: false,
    items: [
      {
        title: "Railway Networks List",
        url: "/dashboard/railway-networks",
        icon: "sheet"
      },
      {
        title: "Add Railway Network",
        url: "/dashboard/railway-networks/create",
        icon: "add"
      }
    ]
  },
  {
    title: "Train Journeys",
    url: "/dashboard/train-journeys",
    icon: "journey",
    isActive: false,
    items: [
      {
        title: "Journey List",
        url: "/dashboard/train-journeys",
        icon: "sheet"
      },
      {
        title: "Add Train Journey",
        url: "/dashboard/train-journeys/create",
        icon: "add"
      }
    ]
  },

  // {
  //   title: "Employee",
  //   url: "/dashboard/employee",
  //   icon: "user",
  //   shortcut: ["e", "e"],
  //   isActive: false,
  //   items: [] // No child items
  // },
  // {
  //   title: "Product",
  //   url: "/dashboard/product",
  //   icon: "product",
  //   shortcut: ["p", "p"],
  //   isActive: false,
  //   items: [] // No child items
  // },
  // {
  //   title: "Tasks",
  //   url: "/dashboard/tasks",
  //   icon: "product",
  //   shortcut: ["p", "p"],
  //   isActive: false,
  //   items: [] // No child items
  // },
  // {
  //   title: "Account",
  //   url: "#", // Placeholder as there is no direct link for the parent
  //   icon: "billing",
  //   isActive: true,

  //   items: [
  //     {
  //       title: "Profile",
  //       url: "/dashboard/profile",
  //       icon: "userPen",
  //       shortcut: ["m", "m"]
  //     },
  //     {
  //       title: "Login",
  //       shortcut: ["l", "l"],
  //       url: "/",
  //       icon: "login"
  //     }
  //   ]
  // },
  // {
  //   title: "Kanban",
  //   url: "/dashboard/kanban",
  //   icon: "kanban",
  //   shortcut: ["k", "k"],
  //   isActive: false,
  //   items: [] // No child items
  // },
  // {
  //   title: "Chats",
  //   url: "/chats",
  //   shortcut: ["c", "c"],
  //   isActive: false,
  //   icon: "chats",
  //   items: [] // No child items
  //   // icon: <IconSettings size={18} />,
  // },
  {
    title: "Settings",
    url: "/settings",
    shortcut: ["s", "s"],
    isActive: false,
    icon: "settings",
    items: [] // No child items
    // icon: <IconSettings size={18} />,
  }
];
