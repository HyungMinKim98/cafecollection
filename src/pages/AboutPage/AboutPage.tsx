import React from 'react';

const AboutPage = () => {
  return (
    <div>
      <h1>About Coffee</h1>
      <section className="history">
        <h2>History of Coffee</h2>
        <p>The history of coffee dates back to the 15th century, and possibly earlier with a number of reports and legends surrounding its first use. The original domesticated coffee plant is said to have been from Ethiopia.</p>
      </section>

      <section className="origins">
        <h2>Origins of Coffee</h2>
        <p>Coffee plants are native to tropical regions of Africa and Asia, but can now be found across the globe in over 70 countries.</p>
      </section>

      <section className="types">
        <h2>Types of Coffee</h2>
        <p>There are two main species of coffee that are cultivated today: Arabica and Robusta. Arabica coffee is generally more highly regarded than Robusta, as it tends to be more flavorful.</p>
      </section>
    </div>
  );
};

export default AboutPage;