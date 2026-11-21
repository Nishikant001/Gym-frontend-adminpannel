// =====================================================================
//  HOME PAGE IMAGES
//  1) Apni images ko  src/assets/home/  folder me daalo (naam kuch bhi ho sakta hai)
//  2) Neeche FILES me har slot ke aage apni file ka POORA naam (extension ke saath) likh do.
//     Khaali "" chhodoge to placeholder / purani image dikhegi.
// =====================================================================
import heroFallback from "../../assets/landing/hero.webp";

export const FILES = {
  hero: "Professional Red Bench Press Setup.png",                 // Section 1 – top hero background      e.g. "gym-machine.jpg"
  welcome: "Cinematic Back Workout in a Modern Gym.png",              // Section 2 – back-boy / athlete image e.g. "back-boy.png"
  branchJaydevVihar: "Modern Red and Black Gym Interior.png",    // Branch card 1                        e.g. "jaydev.jpg"
  branchBfdEnhanced: "Modern Red-and-Black Gym Interior.png",    // Branch card 2                        e.g. "enhanced.jpg"
  cta: "BFD 20 KG Barbell Plate Close-Up.png",                  // Last section – plate image           e.g. "plate.png"
};

// ---- iske neeche kuch change karne ki zarurat nahi ----
const files = import.meta.glob("../../assets/home/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}", {
  eager: true,
  query: "?url",
  import: "default",
});

const pick = (name) => {
  if (!name) return null;
  const hit = Object.entries(files).find(([path]) => path.split("/").pop() === name);
  if (!hit && import.meta.env.DEV) console.warn(`[siteImages] "${name}" src/assets/home/ me nahi mili`);
  return hit ? hit[1] : null;
};

export const HOME_IMAGES = {
  hero: pick(FILES.hero) || heroFallback,
  welcome: pick(FILES.welcome),
  branches: {
    "jaydev-vihar": pick(FILES.branchJaydevVihar),
    "bfd-enhanced": pick(FILES.branchBfdEnhanced),
  },
  cta: pick(FILES.cta),
};