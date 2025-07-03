import React, { createContext, useContext, useState } from "react";

type AudioContextType = {
  audioEnabled: boolean;
  setAudioEnabled: (enabled: boolean) => void;
};

const AudioContext = createContext<AudioContextType>({
  audioEnabled: false, // Desactivado por defecto
  setAudioEnabled: () => {},
});

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [audioEnabled, setAudioEnabled] = useState(false); // Desactivado por defecto

  return (
    <AudioContext.Provider value={{ audioEnabled, setAudioEnabled }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);