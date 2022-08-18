const usernames = [
  'davidrose',
  'alexisrose',
  'steviebud',
  'johnnyrose',
  'moirarose'
];

const emails = [
  'drose@gmail.com',
  'alexisrose@gmail.com',
  'sbud@gmail.com',
  'johnnyrose@gmail.com',
  'moira@gmail.com'
];

const thoughts = [
  'Ew, David',
  'Fold in the cheese',
  'I am trying very hard not to connect with people right now',
  'Very uninterested in that opinion',
  'Tweet us on Facebook'
]

const users= [];

const getRandomUser = () => {
   
  for (let i = 0; i < 5; i++) {
    const username = usernames[i];
    const thought =  thoughts[i];
    const email = emails[i];

    users.push({
      username,
      email,
      thought,
    });
  }
  return users;
}


// Export the functions for use in seed.js
module.exports = { getRandomUser };
