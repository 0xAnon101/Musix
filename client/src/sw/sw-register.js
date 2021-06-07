export function LocalRegister() {
  const swPath = `./sw.js`;
  if ("serviceWorker" in navigator) {
    window.onload = () => {
      navigator.serviceWorker
        .register(swPath)
        .then((registration) => {
          registration.onupdatefound = () => {
            const installation = registration.installing;
            installation.onstatechange = () => {
              if (installation.state === "activated") {
                console.log(
                  "%cSW Activated",
                  "font-size: 1.2rem; color: green; font-weight: bolder"
                );
              }
            };
          };
        })
        .catch((error) => {
          console.log(
            "%cError while registering SW:",
            "font-size: 1.2rem; color: red; font-weight: bolder"
          );
          console.log(error);
        });
    };
  }
}
