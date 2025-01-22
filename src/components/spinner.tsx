// Spinner.tsx
import React from "react";
import styled, { keyframes } from "styled-components";

// Define the keyframe for spinning animation
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Define the keyframe for the bouncing text
const bounce = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-30px); /* Adjusted height for bounce */
  }
  100% {
    transform: translateY(0);
  }
`;

// Spinner styles using styled-components
const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const SpinnerElement = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #3498db; // Blue color for the spinner
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;

const BouncingText = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: #3498db;
  animation: ${bounce} 1.5s ease-in-out infinite; /* Adjusted duration for bouncing */
`;

const Spinner: React.FC = () => {
  return (
    <SpinnerWrapper>
      <SpinnerElement />
      <div className="mt-5">

      <BouncingText>Loading...</BouncingText>
      </div>
    </SpinnerWrapper>
  );
};

export default Spinner;
