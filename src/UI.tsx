import {
  FaArtstation,
  FaCode,
  FaLinkedin,
  FaSquareGithub,
  FaSquareInstagram,
  FaSquareTwitter,
  FaSquareXTwitter,
} from "react-icons/fa6";

export function UI() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          zIndex: 1000,
          padding: "2rem",
          boxSizing: "border-box",
          pointerEvents: "none",
          maxWidth: "600px",
        }}
      >
        <h1
          style={{
            width: "100%",
            textAlign: "center",
            fontFamily: '"Cabin Sketch", sans-serif',
            color: "#000",
            margin: 0,
          }}
        >
          Raymarched "Liquid Glass"
        </h1>
        <p
          style={{
            width: "100%",
            textAlign: "center",
            fontFamily: '"Cabin Sketch", sans-serif',
            color: "#000",
            margin: 0,
          }}
        >
          Fork of my{" "}
          <a
            href="https://x.com/CantBeFaraz/status/1819129892903997908"
            target="_blank"
          >
            raymarched material using default ThreeJS lIghting demo.
          </a>{" "}
          Changed material properties to approximate glass.
        </p>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1rem",
            gap: "1rem",
            pointerEvents: "all",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <a
              href="https://github.com/FarazzShaikh/demo-2025-raymarched-liquid-glass"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#000",
                textDecoration: "none",
                pointerEvents: "all",
              }}
            >
              <FaCode size="1.5rem" />
            </a>
            <p
              style={{
                margin: 0,
                fontFamily: '"Cabin Sketch", sans-serif',
                color: "#000",

                textAlign: "center",
              }}
            >
              Code
            </p>
          </div>
        </div>
      </div>

      <footer
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          padding: "2rem",
          boxSizing: "border-box",
          color: "#fff",
          zIndex: 1000,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.5rem",
          }}
        >
          <a
            href="https://github.com/FarazzShaikh"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#fff",
              textDecoration: "none",
              pointerEvents: "all",
            }}
          >
            <FaSquareGithub size="1.5rem" />
          </a>
          <a
            href="https://x.com/cantBeFaraz"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#fff",
              textDecoration: "none",
              pointerEvents: "all",
            }}
          >
            <FaSquareTwitter size="1.5rem" />
          </a>
          <a
            href="https://x.com/cantBeFaraz"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#fff",
              textDecoration: "none",
              pointerEvents: "all",
            }}
          >
            <FaSquareXTwitter size="1.5rem" />
          </a>
          <a
            href="https://www.linkedin.com/in/faraz-shaikh-811655166/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#fff",
              textDecoration: "none",
              pointerEvents: "all",
            }}
          >
            <FaLinkedin size="1.5rem" />
          </a>
          <a
            href="https://www.artstation.com/farazshaikh"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#fff",
              textDecoration: "none",
              pointerEvents: "all",
            }}
          >
            <FaArtstation size="1.5rem" />
          </a>
          <a
            href="https://www.instagram.com/cantBeFaraz/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#fff",
              textDecoration: "none",
              pointerEvents: "all",
            }}
          >
            <FaSquareInstagram size="1.5rem" />
          </a>
        </div>
        <p
          style={{
            fontFamily: "sans-serif",
            fontSize: "0.9rem",
            margin: 0,
            textAlign: "right",
          }}
        >
          Design and code by Faraz
          <br />
          Freelance WebGL technical artist and developer
          <br />
          <a
            href="mailto:farazzshaikh@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#fff",
              textDecoration: "underline",
              pointerEvents: "all",
            }}
          >
            farazzshaikh@gmail.com
          </a>
        </p>
      </footer>
    </>
  );
}
