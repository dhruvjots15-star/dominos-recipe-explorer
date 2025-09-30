import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type TeamView = "Category Team" | "Chef Team" | "MDM (POS) Team";

interface TeamViewContextType {
  currentTeam: TeamView;
  setTeamView: (team: TeamView) => void;
}

const TeamViewContext = createContext<TeamViewContextType | undefined>(undefined);

export const TeamViewProvider = ({ children }: { children: ReactNode }) => {
  const [currentTeam, setCurrentTeam] = useState<TeamView>(() => {
    const stored = localStorage.getItem("teamView");
    return (stored as TeamView) || "Category Team";
  });

  const setTeamView = (team: TeamView) => {
    localStorage.setItem("teamView", team);
    setCurrentTeam(team);
    // Force reload to apply new team view
    window.location.reload();
  };

  return (
    <TeamViewContext.Provider value={{ currentTeam, setTeamView }}>
      {children}
    </TeamViewContext.Provider>
  );
};

export const useTeamView = () => {
  const context = useContext(TeamViewContext);
  if (context === undefined) {
    throw new Error("useTeamView must be used within a TeamViewProvider");
  }
  return context;
};
