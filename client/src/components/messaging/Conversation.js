import React from "react";
import { Link } from "react-router-dom";

const Conversation = () => {
  return (
    <div>
      <h4 className="yellow-text center">Active Conversation</h4>
      <div className="row">
        <div className="col m4 hide-on-med-and-down">
          <div className="card">
            <div className="card-image">
              <img src="https://picsum/photos/300" alt="" srcset="" />
            </div>
            <div className="card-content">
              <span className="card-title center">John Doe</span>
            </div>
            <div className="card-action">
              <Link to="." onClick={() => history.goBack()} className="right">
                Close Chat
              </Link>
            </div>
          </div>
        </div>
        <div className="col m6 push-l2">
          <div className="card">
            <div className="card-content">
              <span className="card-title">me</span>
              <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quo reprehenderit ex voluptate consequuntur autem, vero tenetur animi, praesentium, labore rerum veniam nihil? Perferendis laudantium inventore nisi repellendus, consequuntur magni.</p>
            </div>
            <div className="card-content">
              <span className="card-title">
                john
              </span>
              <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere reprehenderit vero voluptas eligendi ad placeat dolorem cum ducimus blanditiis deserunt, error officia ut itaque natus nostrum dolores. Voluptatibus, molestiae? Commodi?</p>
            </div>

            <div className="card-action hide-on-med-and-up">
              <Link to="." onClick={() => history.back()}>Close Chat</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
