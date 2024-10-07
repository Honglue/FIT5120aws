import { useNavigate } from "react-router-dom";
import earth from "../../../public/images/earth-icon.jpg";
import info from "../../../public/images/info-icon.jpg";
import indicator from "../../../public/images/indicator-icon.jpg";
import idea from "../../../public/images/idea.jpg";
import reward from "../../../public/images/reward.jpg";
import "./DetailsPage.css";

function DetailsPage() {
  const navigate = useNavigate();

  return (
    <div className="details-page">
      <header className="details-header">
        <h2
          style={{ fontWeight: "500", fontSize: "30px", textAlign: "center" }}
        >
          A platform to Empower You
        </h2>
        <p className="lead" style={{ fontSize: "18px" }}>
          We are here to empower refugee families with the necessary tools. Here
          is how.
        </p>
      </header>

      <div className="grid-container">
        <div
          className="details-card"
          onClick={() => navigate("/nutrition-map")}
        >
          <img src={earth} alt="earth" />
          <h4>Nutrition Map</h4>
          <p>Check nutrition deficiencies from your origin country</p>
        </div>

        <div className="details-card" onClick={() => navigate("/indicator")}>
          <img src={indicator} alt="indicator" />
          <h4>Nutrition Indicator</h4>
          <p>Access important health-related info and support resources</p>
        </div>

        <div
          className="details-card"
          onClick={() => navigate("/recommendations")}
        >
          <img src={reward} alt="reward" />
          <h4>Dish Recommender</h4>
          <p>Find out how to improve your children's nutrition</p>
        </div>

        <div className="details-card" onClick={() => navigate("/information")}>
          <img src={info} alt="info" />
          <h4>Nutrition Info</h4>
          <p>Access important health-related info and support resources</p>
        </div>

        <div className="details-card" onClick={() => navigate("/quiz")}>
          <img src={idea} alt="idea" />
          <h4>Nutrition Quiz</h4>
          <p>Assess your nutrition knowledge to learn more</p>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
