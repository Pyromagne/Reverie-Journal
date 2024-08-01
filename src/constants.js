export const isMobile = window.innerWidth <= 768 && window.innerHeight <= 1024;

export const centuryGothicFont = {
  fontFamily: 'Century Gothic, sans-serif',
};
  
export const dynamicPopupStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(80%, 600px)",
  //height: "min(88%, 90vh)",
  overflowY: "auto",
  p: 4,
};

export const dynamicPopupStyle2 = {
  position: "absolute",
  top: isMobile ? "50%" : "43%", // Adjust the top value as needed
  left: "50%",
  width: isMobile ? "100%" : "min(80%, 600px)", // Adjust the maximum width as needed (600px in this example)
  height: isMobile ? "90vh" : "min(82%, 90vh)", // Adjust the maximum height as needed (1500px in this example)
  transform: "translate(-50%, -50%)",
  overflowY: "auto",
  p: 4
};

export const dps3 = {
  background: 'rgb(255,255,255)',
  backdropFilter: 'blur(15px)',
  border: 'solid #9ca3af 1px',
  borderRadius: '20px',
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overflowY: "scroll",
  scrollbarWidth: "none",
  p: '34px',
  width: isMobile ? "100%" : "min(80%, 600px)", // Adjust the maximum width as needed (600px in this example)
  height: isMobile ? "90vh" : "min(82%, 90vh)", // Adjust the maximum height as needed (1500px in this example)
}