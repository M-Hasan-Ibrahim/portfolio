export const profile = {
  firstName: "Mohamad Hassan",
  lastName: "IBRAHIM",
  birthDate: "2003-11-07",
  profession: "Software Engineer",
  location: "France, Île-de-France, Gif-sur-Yvette",
  summary:
    "I’m a software engineer specializing in AI, full-stack development, and user centric design. I build products that make technology feel simple, useful, and human. My focus is not only on writing code, but on creating experiences that people can understand, trust, and enjoy using. From AI-powered tools to immersive digital environments, I aim to reduce complexity, solve real problems, and build software that helps people feel more capable.",
};

export const projects = [
  {
    title: "Passive Haptics and Movement Gain in Virtual Reality",
    description:
      "Designed a VR interaction system in Unity that combines passive haptics, movement gain, and fingertip-based interaction so one physical board can represent multiple virtual surfaces and puzzle objects.",
    date: "June 2026",
    technologies: ["Unity", "C#", "OpenXR", "XR Hands"],
    details: [
      "Designed and developed a VR interaction system combining passive haptics and movement gain to make a single physical board behave as multiple virtual objects.",
      "Implemented the Byblos puzzle scene and Maze Game, using precise fingertip-based interaction for continuous surface navigation and tactile feedback.",
      "Developed fixed gain behavior to amplify real hand movement in VR, allowing users to reach virtual elements while remaining within a limited physical space.",
      "Collaborated on calibration, virtual surface alignment, gain testing, interaction design, visual scene assembly, report writing, and final presentation preparation.",
    ],
    githubLink: "",
    images: [],
  },
  {
    title: "Geo-Social Dating App",
    description:
      "Built a React Native geo-social dating app with a serverless AWS backend for authentication, profiles, location-based discovery, matching, messaging, media storage, AI suggestions, and profile verification.",
    date: "April 2026",
    technologies: [
      "React Native",
      "AWS Cognito",
      "Lambda",
      "PostgreSQL",
      "S3",
      "ChatGPT API",
    ],
    details: [
      "Developed a geo-social dating app with a frontend in React Native/Expo and a scalable serverless backend on AWS.",
      "Built backend services for authentication, user profiles, location-based discovery, matching, real-time messaging, posts, stories, and media storage.",
      "Implemented a ranking algorithm combining interests, distance, and introversion similarity for personalized user discovery.",
      "Added AI assistant and chat suggestion features with the ChatGPT API, plus profile verification using AWS Rekognition.",
    ],
    githubLink: "",
    images: [],
  },
  {
    title: "Fundamentals of Computer Graphics Project",
    description:
      "Created a hybrid rasterization and ray-tracing renderer with BVH acceleration, model processing, smoothing, and a particle-based waterfall simulation integrated into animated ray-traced output.",
    date: "Jan. 2026",
    technologies: ["OpenGL", "Blender", "Ray Tracing", "BVH"],
    details: [
      "Built a hybrid rasterization and ray-tracing renderer accelerated with BVH optimization.",
      "Applied vertex welding and bilateral smoothing to improve a decimated 3D model.",
      "Built a particle-based waterfall simulation and integrated animated droplets into the ray-traced output.",
    ],
    githubLink: "",
    images: [],
  },
  {
    title: "Level 1 SOC Analyst AI Agent",
    description:
      "Developed a Dockerized SOC AI agent prototype for automated alert triage, combining FastAPI, PostgreSQL, a React dashboard, external threat enrichment APIs, and JSON playbooks for common attack scenarios.",
    date: "July 2025",
    technologies: ["Python", "LangChain", "FastAPI", "React", "PostgreSQL", "Docker"],
    details: [
      "Built a Dockerized SOC AI Agent prototype for automated alert triage.",
      "Integrated external tools using API request methods for threat enrichment.",
      "Designed JSON playbooks for common attack scenarios.",
      "Developed backend with FastAPI and PostgreSQL, plus a frontend dashboard for alert reports.",
    ],
    githubLink: "",
    images: [],
  },
  {
    title: "Multi-threaded Cut Scene Detector",
    description:
      "Built a Java and OpenCV cut scene detection system, comparing single-threaded, producer-consumer, and parallel processing models to evaluate concurrency performance trade-offs.",
    date: "June 2025",
    technologies: ["Java", "OpenCV"],
    details: [
      "Designed a cut scene detection system in Java, leveraging multi-threading.",
      "Conducted a comparative analysis of single-threaded, producer-consumer, and parallel processing models.",
      "Evaluated performance trade-offs to demonstrate efficiency gains through concurrency.",
    ],
    githubLink: "",
    images: [],
  },
  {
    title: "Complete Campus Area Network",
    description:
      "Designed and configured a complete campus area network with VLANs, inter-VLAN routing, OSPFv2, firewall security, ACLs, and IPsec VPN using Packet Tracer and CCNA practices.",
    date: "Sep. 2024",
    technologies: ["Packet Tracer", "CCNA"],
    details: [
      "Designed and configured a complete campus area network for buildings using several technologies.",
      "Configured VLANs, inter-VLAN routing, and OSPFv2.",
      "Implemented firewall security, ACL configurations, and IPsec VPN.",
    ],
    githubLink: "",
    images: [],
  },
  {
    title: "Computer Vision Drone Detection Model",
    description:
      "Fine-tuned a YOLOv8 drone detection model using a custom dataset from personal and online images, optimizing the model for a practical balance between speed and accuracy.",
    date: "June 2024",
    technologies: ["Python", "YOLOv8", "vast.ai"],
    details: [
      "Fine-tuned YOLOv8 for drone detection, optimizing model size for speed and accuracy.",
      "Created a custom drone dataset using personal and online images.",
    ],
    githubLink: "",
    images: [],
  },
];

export const courses = [
  {
    institution: "Telecom Paris",
    description: "Description placeholder.",
    groups: [
      {
        title: "SPAI: Signal Processing & Artificial Intelligence",
        description: "Description placeholder.",
        items: [
          "Statistics",
          "Time Series",
          "Machine Learning",
          "Optimization for Machine Learning",
          "Machine Learning for Text Mining",
          "Deep Learning",
          "Signal Processing",
          "Speech and Audio Processing",
        ],
      },
      {
        title: "IGR: 3D & Interactive Systems",
        description: "Description placeholder.",
        items: [
          "Interactive 3D Application Development",
          "Interactive Application Development: Desktop, Mobile, and Web",
          "Fundamentals of Computer Graphics",
          "Human-Machine Interaction",
          "Visualisation",
        ],
      },
      {
        title: "Software Engineering",
        description: "Description placeholder.",
        items: [],
      },
    ],
  },
  {
    institution: "Faculty of Engineering in Lebanon",
    description: "Description placeholder.",
    groups: [
      {
        title: "Software Courses",
        description: "Description placeholder.",
        items: [],
      },
      {
        title: "Other Courses",
        description: "Description placeholder.",
        items: [],
      },
    ],
  },
];

export const contacts = [
  {
    label: "Instagram",
    value: "@eazen023",
    href: "https://www.instagram.com/eazen023",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/mohamad-hassan-ibrahim-275933289",
    href: "https://www.linkedin.com/in/mohamad-hassan-ibrahim-275933289/",
  },
  {
    label: "GitHub",
    value: "github.com/M-Hasan-Ibrahim",
    href: "https://github.com/M-Hasan-Ibrahim",
  },
  {
    label: "Email",
    value: "mohamadhasan0711@gmail.com",
    href: "mailto:mohamadhasan0711@gmail.com",
  },
  {
    label: "Phone",
    value: "+33 6 05 80 28 09",
    href: "tel:+33605802809",
  },
];



