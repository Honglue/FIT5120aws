import React from "react";
import "./Information.css";
import help from "../../../public/images/help.png";
import info from "../../../public/images/info.png";
import betterNutrition from "../../../public/BetterNutrition.pdf";

const Information: React.FC = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = betterNutrition;
    link.download = "Better Nutrition.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container my-5 pt-4">
      <main>
        <section className="hero">
          <div className="hero-image-container">
            <img src={help} alt="Hands" className="hero-image" />
            {/* <div className="dark-overlay"></div> */}
          </div>

          <div className="hero-content">
            <h1>Essential Health Information</h1>
          </div>
        </section>

        <section className="info">
          <div className="info-block">
            <h2>Nutrition Basics</h2>
            <p>
              Healthy eating is very important for your children. It helps them
              grow strong, stay active, and learn better. By offering a variety
              of good foods every day, you can help them stay healthy and happy.
              Let’s make healthy eating easy for your family!
            </p>
          </div>

          <div className="info-block">
            <h3>Australian Guidelines for Healthy Eating</h3>
            <p>
              <strong>Guideline 1:</strong> To stay at a healthy weight, be
              active and eat the right amount of nutritious food and drinks.
              Children and teens should eat healthy foods to grow well and be
              active every day. Check their growth regularly. Older people
              should eat healthy foods and stay active to keep strong muscles
              and a healthy weight.
            </p>
            <p>
              <strong>Guideline 2:</strong> Eat a variety of healthy foods every
              day from these five groups:
              <ul>
                <li>
                  Vegetables: Different types and colours, including beans.
                </li>
                <li>Fruits</li>
                <li>
                  Grains: Whole Grain foods like bread, rice, pasta, and oats.
                </li>
                <li>
                  Proteins: Lean meats, poultry, fish, eggs, tofu, nuts, seeds,
                  and beans.
                </li>
                <li>
                  Dairy: Milk, yoghurt, cheese, or alternatives, mostly
                  reduced-fat.
                </li>
              </ul>
              Drink plenty of water.
            </p>
            <p>
              <strong>Guideline 3:</strong> Limit foods with unhealthy fats,
              added salt, sugars, and alcohol. Limit high-fat foods like cakes,
              pastries, and fried foods. Use healthier fats like olive oil and
              avocado. Limit salty foods: Choose low-sodium options and avoid
              adding salt. Limit sugary foods and drinks like candy, soft
              drinks, and sports drinks. If you drink alcohol, keep it to a
              small amount. Pregnant or breastfeeding women should avoid
              alcohol.
            </p>
            <p>
              <em>Reference:</em> Official Australian Dietary Guidelines.
              <a
                href="https://www.eatforhealth.gov.au/sites/default/files/2022-09/n55a_australian_dietary_guidelines_summary_131014_1.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more here.
              </a>
            </p>
          </div>

          <div className="info-block">
            <h2>Key Contact Information for Food Support</h2>
            <p>
              <strong>Friends of Refugees</strong>
              <br />
              Address: 1D Parsons Avenue, Springvale, VIC 3171
              <br />
              Phone: 03 9574 6291
              <br />
              Email: email@for.org.au
              <br />
              Website:{" "}
              <a
                href="https://friendsofrefugees.org.au/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://friendsofrefugees.org.au/
              </a>
            </p>
            <p>
              <strong>
                Asylum Seeker Resource Centre (ASRC) Foodbank and Community
                Kitchen
              </strong>
              <br />
              Address: 214-218 Nicholson St, Footscray VIC 3011
              <br />
              Phone: 03 9326 6066
              <br />
              Website:{" "}
              <a
                href="https://asrc.org.au/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://asrc.org.au/
              </a>
            </p>
            <p>
              <strong>Victorian Refugee Health Network</strong>
              <br />
              Great resource to get help for health.
              <br />
              Website:{" "}
              <a
                href="https://refugeehealthnetwork.org.au/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://refugeehealthnetwork.org.au/
              </a>
            </p>
          </div>
        </section>

        <section className="hero" style={{ paddingTop: "40px" }}>
          <div className="hero-image-container">
            <img src={info} alt="Hands" className="hero-image" />
            <div className="dark-overlay"></div>
          </div>

          <div className="hero-content">
            <h1>
              Download a Concise Page of <br /> Health Information
            </h1>
            <button
              className="download-button"
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                borderColor: "#6366F1",
                borderRadius: "25px",
              }}
              onClick={handleDownload}
            >
              Download
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Information;
