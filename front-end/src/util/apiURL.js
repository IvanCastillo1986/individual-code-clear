export const apiURL = () => {
  return window.location.hostname === "localhost"
    ? "http://localhost:3005"
    : "https://pursuit-capstone-7011.herokuapp.com";
};
