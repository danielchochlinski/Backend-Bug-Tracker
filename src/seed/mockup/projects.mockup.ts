export const projects = [
  {
    name: "project one",
    priority: 0,
    users: [
      { _id: "123", admin: true, role: 3 },
      { _id: "124", admin: false, role: 1 },
      { _id: "125", admin: false, role: 1 },
    ],
  },
  {
    name: "project two",
    priority: 0,
    users: [
      { _id: "123", admin: true, role: 3 },
      { _id: "126", admin: false, role: 2 },
    ],
  },
  {
    name: "project three",
    priority: 0,
    users: [
      { _id: "124", admin: false, role: 1 },
      { _id: "125", admin: true, role: 3 },
    ],
  },
];
