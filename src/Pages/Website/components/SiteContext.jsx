import { createContext, useContext } from "react";

// openEnquiry(branchLabel?) / openTour(branchLabel?) – SiteLayout provide karta hai
export const SiteContext = createContext({
  openEnquiry: () => {},
  openTour: () => {},
});

export const useSite = () => useContext(SiteContext);
