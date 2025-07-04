import Avatar from "@/components/widgets/Avatar";
import NoDataFound from "@/components/widgets/NoDataFound";
import { dateFormat } from "@/utils/customFunctions/DateFormat";
import { Col } from "reactstrap";

const CustomerQA = ({ data }) => {
  return (
    <Col xl={7}>
      <div className="review-people">
        {data?.length > 0 ? (
          <ul className="review-list">
            {data?.map((elem) => (
              <li key={elem?.id}>
                <div className="people-box">
                  <div>
                    <div className="people-image">
                      <Avatar data={elem?.consumer?.profile_image} name={elem?.consumer?.name} />
                    </div>
                  </div>

                  <div className="people-comment">
                    <div className="people-name">
                      <a className="name">{elem?.consumer?.name}</a>
                      <h6 className="text-content">{dateFormat(elem?.created_at)}</h6>
                      <div className="product-rating"></div>
                    </div>

                    <div className="reply">
                      <p>{elem?.description}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <NoDataFound customClass="no-data-added" title="NoReviewYet" description="NoReviewYetDescription" />
        )}
      </div>
    </Col>
  );
};

export default CustomerQA;
