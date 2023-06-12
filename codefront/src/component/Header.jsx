import { useNavigate } from "react-router-dom";

function Header(){


  const navigate = useNavigate();

  const moveToCodeEditor = () => {
    navigate("/codeEditor");

  };


  return (
        <header className="">
        <div className="page-header min-vh-100">
          <div className="oblique position-absolute top-0 h-100 d-md-block d-none">
            <div
              className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
              style={{
                "background-image":
                  "url(https://demos.creative-tim.com/soft-ui-design-system/assets/img/curved-images/curved11.jpg)",
              }}
            ></div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-7 d-flex justify-content-center flex-column">
                <h1 className="text-gradient text-primary" style={{fontSize: "2.5em"}}>Your Work With</h1>
                <h1 className="mb-4" style={{fontSize: "2.5em"}}>AI Coding System</h1>
                <p className="lead pe-5 me-5">
                  The time for coding with AI. Personalized Recommendation
                  with StoryTelling are waiting
                </p>
                <div className="buttons">
                  <button
                    type="button"
                    className="btn bg-gradient-primary mt-4"
                    onClick={moveToCodeEditor}
                  >
                    Get Started
                  </button>
                  <button
                    type="button"
                    className="btn text-primary shadow-none mt-4"
                  >
                    Read more
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
}

export default Header;