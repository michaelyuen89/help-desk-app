
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Michael Yuen',
    email: 'michaelyuen89@mail.com',
    password: '123456',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Sunghan Nam',
    email: 'testemail@gmail.com',
    password: '123456',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    password: '123456',
  },
  {
    id: '5512dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Jane Doe',
    email: 'janedoe@gmail.com',
    password: '123456',
  },
  {
    id: '6684dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Brie Doe',
    email: 'brie@getzealthy.com',
    password: '123456',
  },
  {
    id: '2211dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Kyle Doe',
    email: 'kyle@getzealthy.com',
    password: '123456',
  },  
  {
    id: '1234dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Shanti Braford',
    email: 'shantibraford@gmail.com',
    password: '123456',
  },
];

const tickets = [
  {
    user_id: users[0].id,
    name: "Michael Yuen",
    email: "michaelyuen89@gmail.com",
    description: "Hi, I need help installing some software",
    status: 'new',
    date: '2024-04-14',
  },
  {
    user_id: users[1].id,
    name: "Sunghan Nam",
    email: "testemail@gmail.com",
    description: "Help! my screen froze.",
    status: 'in progress',
    date: '2024-04-06',
  },
  {
    user_id: users[2].id,
    name: "John Doe",
    email: "johndoe@gmail.com",
    description: "Hi, I am requesting a new mouse.",
    status: 'in progress',
    date: '2024-04-16',
  },
  {
    user_id: users[3].id,
    name: "Jane Doe",
    email: "janedoe@gmail.com",
    description: "Hi, I would like an extra monitor.",
    status: 'in progress',
    date: '2022-12-02',
  },
  {
    user_id: users[4].id,
    name: "Brie Doe",
    email: "brie@getzealthy.com",
    description: "Hi, I would like an extra keyboard too.",
    status: 'new',
    date: '2022-12-05',
  },
  {
    user_id: users[5].id,
    name: "Kyle Doe",
    email: "kyle@getzealthy.com",
    description: "Hi, testing a second ticket",
    status: 'resolved',
    date: '2024-04-17',
  },
  {
    user_id: users[6].id,
    name: "Shanti Braford",
    email: "Shanti@gmail.com",
    description: "Testing tickets",
    status: 'resolved',
    date: '2024-04-17',
  },
]


module.exports = {
  users,
  tickets,
}
