const attachLastMessages = (friends, Chat, email) => {
  return friends.map((friend) => {
    // Find the last message between the logged-in user and this friend
    const lastMessage = [...Chat]
      .reverse() // start from newest
      .find(
        (msg) =>
          (msg.from === email && msg.to === friend.email) ||
          (msg.from === friend.email && msg.to === email)
      );

    return {
      ...friend,
      lastMessage: lastMessage ? lastMessage.message : null,
      lastMessageTimestamp: lastMessage ? lastMessage.timestamp : null,
      lastMessageFromYou: lastMessage ? lastMessage.from === email : false,
    };
  });
};
export default attachLastMessages;
