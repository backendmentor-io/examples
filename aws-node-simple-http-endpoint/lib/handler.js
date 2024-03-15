export const handler = async (event) => {
  // Your logic goes here...

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Lambda!' }),
  };
};
