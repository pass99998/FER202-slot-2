import React, { useState } from "react";
import DishCards from "./Dishcards";
import BookingForm from "./Bookingform";
import ComponentDemo from "./Componentdemo";
import ReactBootstrapSite from "./Reactbootstrapsite";

// Đặt file này ở src/App.js
// Nhớ import CSS Bootstrap 5 trong src/index.js:
//   import 'bootstrap/dist/css/bootstrap.min.css';
//   import 'bootstrap/dist/js/bootstrap.bundle.min.js';   // nếu cần JS plugin

const EXERCISES = [
  { key: "ex7", label: "Ex 7 – Cards", component: <DishCards /> },
  { key: "ex8", label: "Ex 8 – Form", component: <BookingForm /> },
  { key: "ex9", label: "Ex 9 – Component", component: <ComponentDemo /> },
  { key: "ex10", label: "Ex 10 – React-Bootstrap", component: <ReactBootstrapSite /> },
];

function App() {
  const [current, setCurrent] = useState("ex7");

  const active = EXERCISES.find((e) => e.key === current);

  return (
    <div>
      <div className="bg-white border-bottom py-3">
        <div className="container d-flex flex-wrap gap-2">
          {EXERCISES.map((e) => (
            <button
              key={e.key}
              type="button"
              className={
                "btn btn-sm " +
                (current === e.key ? "btn-primary" : "btn-outline-primary")
              }
              onClick={() => setCurrent(e.key)}
            >
              {e.label}
            </button>
          ))}
        </div>
      </div>

      {active.component}
    </div>
  );
}

export default App;
