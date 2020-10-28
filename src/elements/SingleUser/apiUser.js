export const follow = (userId, followId) => {
  return fetch("/users/follow", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      followId,
      userId,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
};

export const unfollow = (userId, unfollowId) => {
  return fetch("/users/unfollow", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      unfollowId,
      userId,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
};
