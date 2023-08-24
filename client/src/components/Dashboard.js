import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { loadCurrentProfile } from "../Actions/profile";

const Dashboard = ({
  loadCurrentProfile,
  auth: { loading: authloading, user },
  profile: { profile, loading },
}) => {

  React.useEffect(() => {
    loadCurrentProfile()
  }, [loading, authloading])
  return (
    <div>
      <h3 className="yellow-text center">Dashboard</h3>

      <div className="row">
        <div className="col s12 m5">
          <div className="card">
            <div className="card-image">
              <img
                src="https://picsum/photos/400"
                alt="user"
                className="responsive"
              />
            </div>
            <div className="card-content">
              <p className="card-title center">
                <span
                  style={{ position: "absolute", right: "3rem", top: 50 }}
                  className="badge yellow accent-4 "
                >
                  24
                </span>
                John Doe
              </p>
              <p className="card-text">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Voluptate veritatis vitae tempore illo qui velit, veniam
                voluptatibus sequi quas, officia dignissimos temporibus officiis
                praesentium nulla eaque? Ad impedit, quidem necessitatibus
                laudantium officiis assumenda fugit ex, consequuntur ut illo
                aut, optio omnis sit. Totam eaque magnam, veniam accusamus nam
                doloremque placeat?
              </p>
            </div>
            <div className="card-action row">
              <div className="col s6">
                <Link
                  className="btn-small yellow darken-3"
                  to={`/edit-profile/22`}
                >
                  Edit Profile
                </Link>
              </div>
              <div className="col s6">
                <Link className="btn-small red darken-3" to={`/delete-profile`}>
                  Delete Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col s12 m5 push-l2">
          <span className="badge left red accent-4 white-text">Addiction</span>{" "}
          <h5>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
            nihil.
          </h5>
          <hr />
          <span className="badge left orange accent-4 white-text">History</span>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem odit
            quas molestias eligendi sint similique debitis, atque dolorum
            exercitationem dolorem minus incidunt quod recusandae nesciunt
            culpa, cumque assumenda dolor necessitatibus.
          </p>
          <hr />
          <span className="badge left blue accent-4 white-text">Contact</span>
          <div>
            <p>
              <i className="material-icons left">phone</i>
              222 333 555
            </p>
            <p>
              <i className="material-icons left">email</i>
              mail@mail.com
            </p>
            <p>
              <i className="material-icons left">pin</i>
              Jos, Jos South
            </p>
          </div>
          <hr />
          <span className="badge left blue darken-1 white-text">
            Medications
          </span>
          <ul>
            <li>1 ---> Lorem ipsum dolor sit amet.</li>
            <li> 2 --> Lorem ipsum dolor sit amet.</li>
            <li>3----> Lorem ipsum dolor sit amet.</li>
          </ul>
          <hr />
          <span className="badge left blue white-text">doctor</span>
          <div>
            <p>
              <i className="material-icons left">male</i>
              Doctor Sarah Smith
            </p>

            <p>
              <i className="material-icons">phone</i>
              222 333 444
            </p>

            <p>
              <i className="material-icons">pin</i>
              Salman Specialist Hospital, Jos North
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  loadCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { loadCurrentProfile })(Dashboard);