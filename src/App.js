import React from "react";
import FlightSearch from "./components/FlightSearch";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <Container className="my-4 col-md-8">
      <h1 className="text-center">Flight Tracker</h1>
      <FlightSearch />
    </Container>
  );
};

export default App;
