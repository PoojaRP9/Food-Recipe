import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import "./Quote.css";

const Quote = () => {
  return (
    <>
      <div className="section quote">
        <p className="quote-text">
          <FaQuoteLeft className="quote-icon" /> Cooking is all about people.
          Food is maybe the only universal thing that really has the power to
          bring everyone together. No matter what culture, everywhere around the
          world, people get together to eat.
        </p>
        <p className="quote-author">- Guy Fieri</p>
      </div>
    </>
  );
};
export default Quote;
