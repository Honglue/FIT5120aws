import "./AwarenessSection.css"; // You can create this file for specific styles

function AwarenessSection() {
  return (
    <section className="awareness-section">
      <div className="awareness-text">
        <h2>Awareness Gap</h2>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout...
        </p>
      </div>
      <div className="awareness-image">
        <img src="path-to-your-awareness-image" alt="Awareness" />
      </div>
    </section>
  );
}

export default AwarenessSection;
