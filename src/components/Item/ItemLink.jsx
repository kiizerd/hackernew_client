import StyledLink, { StyledRouterLink } from "../StyledLink";

const ExternalLink = ({ link, title, url }) => {
  const host = `(${link.host})`;
  return (
    <>
      <StyledLink target="_blank" href={url}>
        {title}
      </StyledLink>
      {link ? (
        <i style={{ marginLeft: 5, fontSize: "0.9rem" }}>{host}</i>
      ) : (
        false
      )}
    </>
  );
};

// If url truthy navigate to external page,
// otherwise route to local page
export default ({ link, title, url }) => {
  return url ? (
    <ExternalLink link={link} title={title} url={url} />
  ) : (
    <StyledRouterLink to={link}>{title}</StyledRouterLink>
  );
};
