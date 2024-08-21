import React, { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };
  const data = [
    {
      question: "What is FoodieHub?",
      answer:
        "FoodieHub is a unique and innovative platform designed to make your culinary journey more delightful and personalized..",
    },
    {
      question:
        "Do I need to create an account to use FoodieHub, and is it free?",
      answer:
        "Yes, For those who choose to register, creating an account is completely free.",
    },
    {
      question: "Can I save or favorite recipes for future reference?",
      answer:
        "Absolutely! Our FoodieHub recipe suggestions platform provides a convenient way for you to save and favorite recipes that catch your eye.",
    },
    {
      question: "Is there an option for step-by-step cooking instructions?",
      answer:
        "Yes, we have got you covered! Our recipes come with detailed step-by-step cooking instructions to make your cooking experience as smooth as possible",
    },

    {
      question: "Is FoodieHub available in multiple languages or regions?",
      answer:
        "Yes, At FoodieHub, we believe that great food knows no boundaries. Thats why we have made our platform available in multiple languages and regions to cater to a diverse global audience.",
    },
    {
      question: "How can I provide feedback or report issues with the system?",
      answer:
        'You can use the "Contact Us" form on our website or Many users choose to reach out to us via our social media channels.',
    },
  ];

  return (
    <>
      <div className="wrapper">
        <div className="accordion">
          <h1>FAQs</h1>
          {data.map((item, i) => (
            <div className="item">
              <div className="title" onClick={() => toggle(i)}>
                <h2>{item.question}</h2>
                <span>{selected === i ? "-" : "+"}</span>
              </div>
              <div className={selected === i ? "content show" : "content"}>
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default FAQ;
