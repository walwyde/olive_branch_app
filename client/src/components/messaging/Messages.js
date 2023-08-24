import React from "react";
import { Link } from "react-router-dom";

const messages = () => {
  return (
    <div>
      <ul>
        <li>
          <div className="card">
            <div className="card-content">
              <h6 className="card-title">john</h6>
              <p className="card-text truncate">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi omnis veniam unde. Voluptatem, aliquam labore animi
                non consequuntur quidem ipsum, saepe libero quos corrupti
                maxime! Ratione sunt modi dolorum dicta!
              </p>
            </div>
            <div className="card-action">
              <Link to="/messages/22" className="right">
                Chat
              </Link>
            </div>
          </div>
        </li>
        <li>
          <div className="card">
            <div className="card-content">
              <h6 className="card-title">john</h6>
              <p className="card-text truncate">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi omnis veniam unde. Voluptatem, aliquam labore animi
                non consequuntur quidem ipsum, saepe libero quos corrupti
                maxime! Ratione sunt modi dolorum dicta!
              </p>
            </div>
            <div className="card-action">
              <Link to="/messages/22" className="right">
                Chat
              </Link>
            </div>
          </div>
        </li>
        <li>
          <div className="card">
            <div className="card-content">
              <h6 className="card-title">john</h6>
              <p className="card-text truncate">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi omnis veniam unde. Voluptatem, aliquam labore animi
                non consequuntur quidem ipsum, saepe libero quos corrupti
                maxime! Ratione sunt modi dolorum dicta!
              </p>
            </div>
            <div className="card-action">
              <Link to="/messages/22" className="right">
                Chat
              </Link>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default messages;
