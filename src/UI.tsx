export function UI() {
  return (
    <>
      <h2
        style={{
          fontWeight: "200",
          fontSize: "1rem",
          margin: 0,
          position: "absolute",
          top: 0,
          left: 0,
          color: "white",
          fontFamily: '"Roboto", sans-serif',
          padding: "0.5rem",
          fontStyle: "italic",
        }}
      >
        Fully lit Raymarched material using ThreeJS's lighting system.
      </h2>
      <a
        href="https://twitter.com/CantBeFaraz"
        target="_blank"
        style={{
          fontWeight: "400",
          fontSize: "1rem",
          margin: 0,
          position: "absolute",
          bottom: 0,
          right: 0,
          color: "white",
          fontFamily: '"Roboto", sans-serif',
          padding: "0.5rem",
          textDecoration: "underline",
          textUnderlineOffset: "0.2rem",
        }}
      >
        Faraz Shaikh
      </a>
    </>
  );
}
