const Footer = () => {
  return (
    <div style={{ height: "100%" }}>
      <footer
        style={{
          textAlign: "center",
          lineHeight: "3rem",
          border: "none",
          backgroundColor: "#FBF3FF",
          marginTop: "5rem",
          minHeight: "100px",
          position: "sticky",
          bottom: 0,
        }}
      >
        <div style={{ color: "#845ec2", fontWeight: "700" }}>
          무엇을 써야 있어보일까
        </div>
        <div style={{ color: "#845ec2", fontWeight: "500" }}>
          <a href="https://kdt-gitlab.elice.io/sw_track/class_04/web_2_project/team12/frontend">
            GITLAB
          </a>
          <span> | </span>
          <a href="https://www.notion.so/elice/32045bed5e93437384c769a36644b568">
            NOTION
          </a>
        </div>
        <span>Copyright © 2023 SW4_Team12. All Rights Reserved.</span>
      </footer>
    </div>
  );
};
export default Footer;
