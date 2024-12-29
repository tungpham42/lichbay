import React, { useState } from "react";
import axios from "axios";
import FlightList from "./FlightList";
import { Form, Button, Spinner, Alert, Row, Col } from "react-bootstrap";

const FlightSearch = () => {
  const [filters, setFilters] = useState({
    airline_name: "",
    airline_iata: "",
    flight_number: "",
    flight_iata: "",
  });
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchFlights = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://api.aviationstack.com/v1/flights`,
        {
          params: {
            access_key: "f19088eb2cf6bd9acc44bf26f889aa96",
            ...filters,
          },
        }
      );
      setFlights(response.data.data);
    } catch (err) {
      setError("Failed to fetch flight data. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (Object.values(filters).every((value) => value.trim() === "")) {
      setError("Please enter at least one search criteria.");
      return;
    }
    searchFlights();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <Form onSubmit={handleSearch} className="mb-4">
        <Row>
          <Col md={6}>
            <Form.Group controlId="airline_name">
              <Form.Label>Airline Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter airline name"
                name="airline_name"
                value={filters.airline_name}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="airline_iata">
              <Form.Label>Airline IATA Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter airline IATA code (e.g., AA)"
                name="airline_iata"
                value={filters.airline_iata}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={6}>
            <Form.Group controlId="flight_number">
              <Form.Label>Flight Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter flight number"
                name="flight_number"
                value={filters.flight_number}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="flight_iata">
              <Form.Label>Flight IATA Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter flight IATA code (e.g., AA123)"
                name="flight_iata"
                value={filters.flight_iata}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="mt-3">
          Search
        </Button>
      </Form>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <FlightList flights={flights} />
      )}
    </div>
  );
};

export default FlightSearch;
