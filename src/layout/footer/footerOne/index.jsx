import ThemeOptionContext from "@/context/themeOptionsContext";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "reactstrap";
import FooterAbout from "../widgets/FooterAbout";
import FooterCategories from "../widgets/FooterCategories";
import FooterHelpCenter from "../widgets/FooterHelpCenter";
import FooterLogo from "../widgets/FooterLogo";
import FooterNewsLetter from "../widgets/FooterNewsLetter";
import FooterSocial from "../widgets/FooterSocial";
import FooterStoreInformation from "../widgets/FooterStoreInformation";
import FooterUsefulLinks from "../widgets/FooterUsefulLinks";
import SubFooter from "../widgets/SubFooter";

const FooterOne = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { t } = useTranslation("common");
  const [openClose, setOpenClose] = useState({
    helpCenter: false,
    categories: false,
    useFulLinks: false,
    storeInfo: false,
  });
  const toggle = (toggleKey) => {
    setOpenClose((prevState) => ({
      ...prevState,
      [toggleKey]: !prevState[toggleKey],
    }));
  };

  return (
    <footer className="footer-light">
      <FooterNewsLetter style="basic" />
      <section className="section-b-space light-layout section-t-space">
        <Container>
          <Row className="footer-theme g-sm-4 g-2">
            <Col lg="4" md="6" xl="3">
              <div className="footer-content h-auto">
                <FooterLogo />
                <FooterAbout />
                {themeOption?.footer?.social_media_enable && <FooterSocial />}
              </div>
            </Col>
            <Col xl="2" lg="3" md="4" onClick={() => toggle("categories")}>
              <div className="sub-title">
                <div className={`footer-title ${openClose?.categories ? "show" : ""}`}>
                  <h4>{t("Categories")}</h4>
                </div>
                <FooterCategories />
              </div>
            </Col>
            <Col lg="2" md="3" className="col-xl">
              <div className="sub-title" onClick={() => toggle("useFulLinks")}>
                <div className={`footer-title ${openClose?.useFulLinks ? "show" : ""}`}>
                  <h4>{t("UsefulLinks")}</h4>
                </div>
                <FooterUsefulLinks />
              </div>
            </Col>
            <Col xl="2" md="3" onClick={() => toggle("helpCenter")}>
              <div className="sub-title">
                <div className={`footer-title ${openClose?.helpCenter ? "show" : ""}`}>
                  <h4>{t("HelpCenter")}</h4>
                </div>
                <FooterHelpCenter />
              </div>
            </Col>
            <Col xl="3" md="6" lg="4" onClick={() => toggle("storeInfo")}>
              <div className="sub-title">
                <div className={`footer-title ${openClose?.storeInfo ? "show" : ""}`}>
                  <h4>{t("StoreInformation")}</h4>
                </div>
                <div className="footer-content">
                  <FooterStoreInformation icon={true} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <SubFooter />
    </footer>
  );
};

export default FooterOne;
