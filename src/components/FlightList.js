import React, { useState } from "react";
import { Table, Button, Modal, Pagination } from "react-bootstrap";

const FlightList = ({ flights }) => {
  const [show, setShow] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const flightsPerPage = 10;

  const handleShow = (flight) => {
    setSelectedFlight(flight);
    setShow(true);
  };

  const handleClose = () => {
    setSelectedFlight(null);
    setShow(false);
  };

  const totalPages = Math.ceil(flights.length / flightsPerPage);
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = flights.slice(indexOfFirstFlight, indexOfLastFlight);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatDateTime = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "Asia/Ho_Chi_Minh",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  if (flights.length === 0) return <p>No flights found.</p>;

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Flight</th>
            <th>Airline</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentFlights.map((flight) => (
            <tr key={flight.flight_number}>
              <td>{flight.flight.iata || "N/A"}</td>
              <td>{flight.airline.name || "N/A"}</td>
              <td>
                {flight.departure.airport} ({flight.departure.iata})
              </td>
              <td>
                {flight.arrival.airport} ({flight.arrival.iata})
              </td>
              <td>{flight.flight_status}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleShow(flight)}
                >
                  Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <Pagination>
        {[...Array(totalPages).keys()].map((number) => (
          <Pagination.Item
            key={number + 1}
            active={number + 1 === currentPage}
            onClick={() => handlePageChange(number + 1)}
          >
            {number + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      {/* Modal for Flight Details */}
      {selectedFlight && (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Flight Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Flight Information</h5>
            <p>
              <strong>Flight:</strong> {selectedFlight.flight.iata || "N/A"}
            </p>
            <p>
              <strong>Airline:</strong> {selectedFlight.airline.name || "N/A"}
            </p>
            <h5>Departure</h5>
            <p>
              <strong>Airport:</strong> {selectedFlight.departure.airport} (
              {selectedFlight.departure.iata})
            </p>
            <p>
              <strong>Scheduled Time:</strong>{" "}
              {formatDateTime(selectedFlight.departure.scheduled)}
            </p>
            <h5>Arrival</h5>
            <p>
              <strong>Airport:</strong> {selectedFlight.arrival.airport} (
              {selectedFlight.arrival.iata})
            </p>
            <p>
              <strong>Scheduled Time:</strong>{" "}
              {formatDateTime(selectedFlight.arrival.scheduled)}
            </p>
            <h5>Status</h5>
            <p>{selectedFlight.flight_status || "N/A"}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default FlightList;
