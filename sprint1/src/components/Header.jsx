// rfce to create this esaily
function Header({ title, body }) {
  return (
    <>
      <div>
        <h1>{title}</h1>
        <h2>[We can do this]</h2>
        <p>Just figuring this out.</p>
        <p>{body}</p>
      </div>
    </>
  );
}
// Default Props
Header.defaultsprops = {
  title: "Default title",
  body: "Default text body",
};

export default Header;
