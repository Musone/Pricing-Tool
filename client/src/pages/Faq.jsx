import React from "react";
import { FAQ_DATA } from "../constants/faqData";

export default function Faq() {
  return (
    <div className="container">
      <div className="container  border-bottom">
        <h1>Frequently Asked Questions</h1>
      </div>

      <br />

      <div className="container">
        {FAQ_DATA?.map((entry) => (
          <div className="mb-5">
            <h4>{entry.question}</h4>
            <p>{entry.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
