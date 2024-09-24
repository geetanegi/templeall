// ExampleComponent.tsx
import React, { useEffect } from "react";
import apiService from "./apiService";

const ExampleComponent: React.FC = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, status } = await apiService.get<any>(
          "https://jsonplaceholder.typicode.com/users",
        ); // Replace with your endpoint
        console.log("Fetched data:", data);
        console.log("Status:", status);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const postData = async () => {
      try {
        const newData = {
          id: 1,
          name: "Harry Potter",
          username: "Bret",
          email: "Sincere@april.biz",
          address: {
            street: "Kulas Light",
            suite: "Apt. 556",
            city: "Gwenborough",
            zipcode: "92998-3874",
            geo: {
              lat: "-37.3159",
              lng: "81.1496",
            },
          },
          phone: "1-770-736-8031 x56442",
          website: "hildegard.org",
          company: {
            name: "Romaguera-Crona",
            catchPhrase: "Multi-layered client-server neural-net",
            bs: "harness real-time e-markets",
          },
        }; // Replace with your data
        const { data, status } = await apiService.post<any>(
          "https://jsonplaceholder.typicode.com/users",
          newData,
        ); // Replace with your endpoint
        console.log("Posted data:", data);
        console.log("Status:", status);
      } catch (error) {
        console.error("Error posting data:", error);
      }
    };

    fetchData();
    postData();
  }, []);

  return (
    <div>
      <h1>Test Component of API's</h1>
      <div>Check the console for data!</div>;
    </div>
  );
};

export default ExampleComponent;
