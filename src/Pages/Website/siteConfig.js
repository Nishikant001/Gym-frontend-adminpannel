// =====================================================================
//  BHARAT FIITNESS DEN – central website content & configuration
//  Sab public pages (Home, About, Services, Wellness, Membership,
//  Contact, Branch pages) yahin se data uthate hain.
//
//  ⚠️  "TODO" wali values (phone, WhatsApp, email, hours, map links,
//  social links) brief me nahi di gayi thi – publish se pehle inhe
//  asli details se replace karein. Prices bhi jaan-boojh kar nahi
//  daale gaye (brief: "Do not publish prices until approved").
// =====================================================================

export const BRAND = {
  name: "Bharat Fiitness Den",
  short: "BFD",
  tagline: "Stronger Today. Stronger Tomorrow.",
  city: "Bhubaneswar",
  year: 2026,
};

// ---------- CONTACT (TODO: asli details daalein) ----------
export const CONTACT = {
  email: "", // TODO e.g. info@bharatfitnessden.com
  whatsapp: "+91 8339905571", // TODO digits only with country code e.g. 919XXXXXXXXX
  instagram: "https://www.instagram.com/bharatfiitnessden?cnvx=aXliZXBvNmdhdHV6", // handle brief/landing se (@bharatfiitnessden)
  facebook: "https://www.facebook.com/share/1HfRWw4tRz/", // TODO
  youtube: "", // TODO
};

// ---------- BRANCHES ----------
export const BRANCHES = [
  {
    slug: "jaydev-vihar",
    name: "Bharat Fiitness Den – Jaydev Vihar",
    short: "Jaydev Vihar",
    badge: "Established Branch",
    area: "Jaydev Vihar Square, Bhubaneswar",
    address: "Jaydev Vihar Square, Bhubaneswar, Odisha",
    sqft: "8,000+",
    tagline: "Well-equipped fitness centre for everyday training.",
    description:
      "Our Jaydev Vihar branch is the place where the BFD journey began. Spread across 8,000+ sq. ft., it is an established, well-equipped fitness centre with modern equipment and professional trainers — built for members who want a reliable, motivating space for everyday training.",
    highlights: [
      "8,000+ sq. ft. training floor",
      "Modern strength & cardio equipment",
      "Professional, supportive trainers",
      "Membership options from 1 month to 1 year",
    ],
    phone: "+91 8339901557", // TODO
    hours: "", // TODO e.g. Mon–Sat 5:30 AM – 10:30 PM
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Bharat+Fiitness+Den+Jaydev+Vihar+Bhubaneswar",
    mapsEmbed:
      "https://www.google.com/maps?q=Bharat+Fiitness+Den+Jaydev+Vihar+Bhubaneswar&output=embed",
    facilities: [
      "Strength & resistance zone",
      "Cardio zone",
      "Functional training area",
      "Personal training support",
    ],
  },
  {
    slug: "bfd-enhanced",
    name: "Bharat Fiitness Den | Enhanced",
    short: "BFD Enhanced",
    badge: "Flagship Destination",
    area: "Bishandayal Complex, Forest Park Road, Bhubaneswar",
    address: "Bishandayal Complex, Forest Park Road, Bhubaneswar, Odisha",
    sqft: "24,000+",
    tagline: "The flagship premium fitness destination.",
    description:
      "BFD Enhanced is our flagship — a 24,000+ sq. ft. premium fitness destination on Forest Park Road with 130+ advanced machines, 36+ Panatta stations, specialist training zones and dedicated wellness and recovery facilities, all under one roof.",
    highlights: [
      "24,000+ sq. ft. premium facility",
      "130+ advanced machines",
      "36+ Panatta stations",
      "Specialist training & wellness facilities",
    ],
    phone: "+91 8339905571", // TODO
    hours: "", // TODO
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Bishandayal+Complex+Forest+Park+Road+Bhubaneswar",
    mapsEmbed:
      "https://www.google.com/maps?q=Bishandayal+Complex+Forest+Park+Road+Bhubaneswar&output=embed",
    facilities: [
      "130+ advanced machines",
      "36+ Panatta stations",
      "HYROX & functional zone",
      "Wellness & recovery area",
      "Diet café & supplements",
    ],
  },
];

// ---------- NAVIGATION ----------
export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about-us" },
  { label: "Services", to: "/services" },
  { label: "Wellness & Recovery", to: "/wellness-recovery" },
  { label: "Membership Plans", to: "/membership" },
  { label: "Contact Us", to: "/contact" },
];

// ---------- SERVICES ----------
export const SERVICES = [
  {
    slug: "strength-training",
    title: "Strength Training",
    icon: "Dumbbell",
    short:
      "Strength and resistance training using machines, free weights and structured programmes.",
    long:
      "Build real, lasting strength with a floor designed for resistance training. From guided machine circuits to free-weight work and progressive structured programmes, our trainers help you lift with confidence, correct form and a clear plan.",
    benefits: [
      "Machine and free-weight training under one roof",
      "Structured, progressive programmes",
      "Form guidance from professional trainers",
      "Suitable for beginners through to experienced lifters",
    ],
    suitable: "Anyone who wants to build strength, muscle and confidence.",
  },
  {
    slug: "cardio-training",
    title: "Cardio Training",
    icon: "HeartPulse",
    short:
      "Cardiovascular conditioning, endurance and stamina development.",
    long:
      "Improve your endurance and everyday stamina with a dedicated cardio zone. Whether you prefer steady-state sessions or interval-based work, you can build conditioning at a pace that suits your fitness level.",
    benefits: [
      "Dedicated cardio equipment area",
      "Endurance and stamina development",
      "Plans for steady-state and interval training",
      "Easy to combine with strength programmes",
    ],
    suitable: "Members focusing on fat loss, stamina or overall conditioning.",
  },
  {
    slug: "hyrox-functional-training",
    title: "HYROX & Functional Training",
    icon: "Flame",
    short:
      "Functional movements, conditioning and performance-focused training.",
    long:
      "Train the way modern athletes do. Functional movement patterns, conditioning circuits and HYROX-style sessions build strength, engine and mobility together — ideal for members chasing performance rather than just aesthetics.",
    benefits: [
      "Functional movement and conditioning circuits",
      "HYROX-style performance training",
      "Builds strength, engine and mobility together",
      "Coach-led sessions with progressions",
    ],
    suitable: "Members who want athletic, performance-focused fitness.",
  },
  {
    slug: "personal-training",
    title: "Personal Training",
    icon: "UserCheck",
    short:
      "Individualised coaching, workout planning and progress support.",
    long:
      "One-to-one coaching built around you. Your trainer plans your workouts, guides every session and tracks your progress so that you always know what to do next and why.",
    benefits: [
      "Individualised workout planning",
      "One-to-one coaching and form correction",
      "Regular progress tracking and support",
      "Goal-based programmes",
    ],
    suitable: "Members who want accountability, guidance and faster progress.",
  },
  {
    slug: "kickboxing",
    title: "Kickboxing",
    icon: "Swords",
    short:
      "Fitness-based kickboxing, coordination, agility and conditioning.",
    long:
      "A high-energy, fitness-based kickboxing experience that improves coordination, agility and conditioning. Sessions focus on technique and fitness — a powerful way to train hard and enjoy it.",
    benefits: [
      "Fitness-based kickboxing sessions",
      "Improves coordination and agility",
      "Full-body conditioning",
      "Great stress-buster",
    ],
    suitable: "Anyone looking for a dynamic alternative to routine gym work.",
  },
  {
    slug: "zumba-group-classes",
    title: "Zumba & Group Classes",
    icon: "Users",
    short:
      "Instructor-led group fitness sessions; schedules published when confirmed.",
    long:
      "Train with a community. Instructor-led group sessions bring music, energy and motivation together. Class schedules differ by branch and are shared once confirmed by the branch team.",
    benefits: [
      "Instructor-led group fitness",
      "Fun, high-energy, community atmosphere",
      "All fitness levels welcome",
      "Schedules confirmed by the branch team",
    ],
    suitable: "Members who enjoy training in a group and staying motivated.",
  },
  {
    slug: "yoga",
    title: "Yoga",
    icon: "Flower2",
    short: "Flexibility, balance, mobility and mindful movement.",
    long:
      "Balance your training with yoga. Improve flexibility, mobility and body awareness while giving your mind a moment to slow down. A perfect complement to strength and cardio work.",
    benefits: [
      "Improves flexibility and mobility",
      "Builds balance and body awareness",
      "Supports mindful movement",
      "Complements strength and cardio training",
    ],
    suitable: "Anyone seeking flexibility, balance and a calmer routine.",
  },
  {
    slug: "pilates",
    title: "Pilates",
    icon: "Activity",
    short: "Core strength, posture, stability and body control.",
    long:
      "Pilates focuses on controlled, precise movement to build core strength, posture and stability. It is a smart way to improve how your body moves — in the gym and in everyday life.",
    benefits: [
      "Core strength and stability",
      "Better posture and body control",
      "Low-impact, controlled movement",
      "Supports overall training quality",
    ],
    suitable: "Members who want core strength, posture and body control.",
  },
  {
    slug: "diet-cafe-nutrition",
    title: "Diet Café & Nutrition",
    icon: "Salad",
    short:
      "Food, beverages and nutrition guidance available at the relevant branch.",
    long:
      "Fuel your training with healthy food and beverages and nutrition guidance, available at the relevant branch (BFD Enhanced). Menus will be shared once confirmed.",
    benefits: [
      "Healthy food and beverage options",
      "General nutrition guidance",
      "Convenient, right inside the gym",
      "Availability depends on branch",
    ],
    suitable: "Members who want to support training with better everyday nutrition.",
  },
  {
    slug: "supplements",
    title: "Supplements",
    icon: "ShoppingBag",
    short:
      "Approved sports nutrition products and guidance.",
    long:
      "A selection of approved sports nutrition products with general guidance from our team, available at the relevant branch. Supplements are not a substitute for a balanced diet and this is not medical advice — please consult a qualified professional for health concerns.",
    benefits: [
      "Approved sports nutrition products",
      "General product guidance from the team",
      "Available at the relevant branch",
      "Product details shared once confirmed",
    ],
    suitable: "Members looking to complement a balanced diet and training plan.",
  },
];

// ---------- WELLNESS & RECOVERY ----------
export const WELLNESS = [
  {
    id: "sauna",
    title: "Sauna",
    icon: "Thermometer",
    text: "Unwind after a hard session in a warm, relaxing sauna environment. A comfortable way to slow down and reset.",
  },
  {
    id: "red-light-therapy",
    title: "Red-Light Therapy",
    icon: "Sun",
    text: "Red-light sessions offered as part of our recovery experience. Session details and protocols are confirmed by our wellness team.",
  },
  {
    id: "cold-plunge",
    title: "Cold Plunge",
    icon: "Snowflake",
    text: "A refreshing cold-plunge experience popular with athletes as part of their recovery routine.",
  },
  {
    id: "massage",
    title: "Massage",
    icon: "Hand",
    text: "Relaxing massage services to help you unwind and feel your best after intense training.",
  },
  {
    id: "spine-care",
    title: "Spine Care",
    icon: "Bone",
    text: "Spine-care and posture-focused wellness support, offered where available. This is not a medical treatment.",
  },
];

export const WELLNESS_FAQS = [
  {
    q: "Where are the wellness & recovery facilities available?",
    a: "Wellness and recovery facilities are part of BFD Enhanced on Forest Park Road. Availability of individual services is confirmed by the branch team.",
  },
  {
    q: "Is the wellness area included in my membership?",
    a: "Inclusions vary by plan and branch. Please enquire and our team will confirm what is included and what may be an add-on.",
  },
  {
    q: "Are these services medical treatments?",
    a: "No. Our wellness and recovery offerings are lifestyle and relaxation services, not medical treatment, and we do not promise any guaranteed results. Please consult a doctor for medical concerns.",
  },
  {
    q: "Do I need to book in advance?",
    a: "Operating protocols and booking requirements are confirmed by the branch team. Contact us or book a gym tour to learn more.",
  },
  {
    q: "Can beginners use these facilities?",
    a: "Yes — our team will explain how each facility works. If you have any health condition, please check with your doctor first.",
  },
];

// ---------- MEMBERSHIP ----------
export const PLANS = [
  { id: "1m", label: "1 Month", months: 1, note: "Try BFD and experience the floor." },
  { id: "3m", label: "3 Months", months: 3, note: "Build a consistent routine." },
  { id: "6m", label: "6 Months", months: 6, note: "Commit to visible progress.", popular: true },
  { id: "12m", label: "12 Months", months: 12, note: "The full-year transformation.", best: true },
];

export const PLAN_INCLUSIONS = [
  "Access to the training floor at your chosen branch",
  "Guidance from professional trainers",
  "Strength and cardio equipment access",
  "Inclusions beyond this are confirmed by the branch team",
];

export const PLAN_ADDONS = [
  "Personal training",
  "Group classes (where offered)",
  "Wellness & recovery services (where offered)",
];

export const MEMBERSHIP_FAQS = [
  {
    q: "What are the membership prices?",
    a: "Prices are confirmed directly by each branch team. Send an enquiry and we will share the latest plan details.",
  },
  {
    q: "Can I switch between branches?",
    a: "Branch access depends on the plan you choose. Please ask our team while enquiring.",
  },
  {
    q: "Can I visit before joining?",
    a: "Absolutely. Book a gym tour and visit your preferred branch — subject to confirmation by the team.",
  },
  {
    q: "Are final terms confirmed by the branch?",
    a: "Yes. Final terms, validity, inclusions and exclusions are always confirmed by the branch team.",
  },
];

// ---------- FORM OPTIONS ----------
export const FORM_OPTIONS = {
  branches: ["Jaydev Vihar", "BFD Enhanced", "Not sure"],
  goals: [
    "Weight loss",
    "Muscle building",
    "Strength",
    "General fitness",
    "Functional training",
    "Other",
  ],
  services: [
    "Strength",
    "Cardio",
    "HYROX",
    "Personal training",
    "Group classes",
    "Wellness",
    "Not sure",
  ],
  memberships: ["1 month", "3 months", "6 months", "12 months", "Need guidance"],
  timelines: [
    "Immediately",
    "Within 7 days",
    "Within 15 days",
    "Within a month",
    "Exploring",
  ],
  contactPrefs: ["Phone", "WhatsApp", "Email"],
  enquiryTypes: [
    "Membership",
    "Personal training",
    "Group classes",
    "Wellness & recovery",
    "Corporate / bulk",
    "General question",
  ],
};

// ---------- ABOUT ----------
export const PHILOSOPHY = [
  { title: "Consistency", text: "Results come from showing up. We design every programme so that training becomes a habit, not a phase." },
  { title: "Discipline", text: "Discipline is a skill. Our trainers help you build structure, accountability and routines that last." },
  { title: "Performance", text: "From first-timers to athletes, we focus on moving better, getting stronger and performing at your best." },
  { title: "Community", text: "A gym is only as strong as its people. We build a supportive, respectful community that lifts everyone." },
];

export const JOURNEY = [
  {
    title: "Where it began – Jaydev Vihar",
    text: "Bharat Fiitness Den started at Jaydev Vihar Square, Bhubaneswar, with a simple goal: a well-equipped, honest gym with professional trainers for everyday training.",
  },
  {
    title: "Growing with our members",
    text: "As the BFD community grew, so did the demand for more equipment, more specialist training and a complete fitness experience.",
  },
  {
    title: "BFD Enhanced – the flagship",
    text: "BFD Enhanced opened on Forest Park Road as our flagship: 24,000+ sq. ft., 130+ advanced machines, 36+ Panatta stations and dedicated wellness facilities.",
  },
  {
    title: "The road ahead",
    text: "BFD is building a scalable base for online memberships, payments and a member app — making fitness easier to start and to keep going.",
  },
];

// ---------- EQUIPMENT BRANDS (subject to confirmation) ----------
export const EQUIPMENT_BRANDS = [
  "Panatta",
  "Tunturi",
  "Booty Builder",
  "HOIST",
  "SHUA",
  "Nautilus",
  "Precor",
  "Jordan",
  "Life Fitness",
];

// ---------- helpers ----------
export const telHref = (n) => (n ? `tel:${n.replace(/\s+/g, "")}` : "");
export const waHref = (text = "Hi BFD, I would like to know more about membership.") =>
  CONTACT.whatsapp
    ? `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`
    : "";

// ---------- HOME PAGE (redesign) ----------
// Counter bar. value = number jo animate hoga, suffix = "+" etc.
// ⚠️ 5,000+ members figure design se liya gaya hai – publish se pehle confirm karein.
export const HOME_STATS = [
  { icon: "Users", value: 5000, suffix: "+", label: "Members", format: true },
  { icon: "MapPin", value: BRANCHES.length, suffix: "", label: "Branches" },
  { icon: "Dumbbell", value: 130, suffix: "+", label: "Advanced Equipments", note: "(at BFD Enhanced)" },
  { icon: "Layers", value: 24000, suffix: "+", label: "Sq. Ft. (Enhanced)", format: true },
];

export const HOME_FEATURES = [
  { icon: "Award", label: "World-Class Equipment" },
  { icon: "UserCheck", label: "Certified Trainers" },
  { icon: "HeartPulse", label: "Fitness & Wellness" },
  { icon: "Users", label: "A Strong Fitness Community" },
];

// Home page ke branch cards ka chhota text (branch data BRANCHES se aata hai)
export const HOME_BRANCH_CARD = {
  "jaydev-vihar": {
    text: "A complete fitness hub with modern equipment and professional trainers.",
    flag: "",
  },
  "bfd-enhanced": {
    text: "A premium fitness destination with 130+ advanced equipments, wellness & recovery facilities.",
    flag: "Flagship Premium Branch",
  },
};

// Home page "More than a gym" tiles – slug se SERVICES se link hota hai
export const HOME_SERVICE_TILES = [
  { icon: "Dumbbell", label: "Strength Training", to: "/services/strength-training" },
  { icon: "Activity", label: "Cardio", to: "/services/cardio-training" },
  { icon: "Flame", label: "HYROX & Functional", to: "/services/hyrox-functional-training" },
  { icon: "Users", label: "Group Classes", to: "/services/zumba-group-classes" },
  { icon: "Flower2", label: "Yoga & Pilates", to: "/services/yoga" },
  { icon: "Snowflake", label: "Wellness & Recovery", to: "/wellness-recovery" },
];
