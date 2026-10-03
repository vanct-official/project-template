export const uiFrameworkCommands = [
  {
    id: "bootstrap",
    name: "Bootstrap 5",
    category: "UI Frameworks",
    technology: "CSS / JS",
    description: "The world's most popular front-end open source toolkit for responsive design.",
    link: "https://getbootstrap.com/docs/5.3/getting-started/introduction/",
    type: "install",
    commands: [
      "npm install bootstrap"
    ],
    tags: ["bootstrap", "css", "framework", "responsive", "grid", "components"]
  },
  {
    id: "react-bootstrap",
    name: "React Bootstrap",
    category: "UI Frameworks",
    technology: "React / Bootstrap",
    description: "Bootstrap 5 components built with React from the ground up without jQuery.",
    link: "https://react-bootstrap.netlify.app/",
    type: "install",
    commands: [
      "npm install react-bootstrap bootstrap"
    ],
    tags: ["react-bootstrap", "bootstrap", "react", "components", "ui"]
  },
  {
    id: "antd",
    name: "Ant Design",
    category: "UI Frameworks",
    technology: "React",
    description: "An enterprise-class UI design language and React UI library with rich components.",
    link: "https://ant.design/",
    type: "install",
    commands: [
      "npm install antd"
    ],
    tags: ["antd", "ant-design", "ui", "enterprise", "react", "components"]
  },
  {
    id: "mui",
    name: "Material UI (MUI)",
    category: "UI Frameworks",
    technology: "React",
    description: "Comprehensive React component library based on Google's Material Design.",
    link: "https://mui.com/",
    type: "install",
    commands: [
      "npm install @mui/material @emotion/react @emotion/styled",
      "npm install @mui/icons-material"
    ],
    tags: ["mui", "material-ui", "emotion", "components", "react", "design"]
  },
  {
    id: "mui-icons",
    name: "MUI Icons",
    category: "UI Frameworks",
    technology: "React",
    description: "Official Material Design icons converted to reusable SVG React components.",
    link: "https://mui.com/material-ui/icons/",
    type: "install",
    commands: [
      "npm install @mui/icons-material"
    ],
    tags: ["mui", "material-ui", "icons", "svg", "design"]
  },
  {
    id: "tailwind-vite",
    name: "Tailwind CSS (Vite)",
    category: "UI Frameworks",
    technology: "CSS / Vite",
    description: "Utility-first CSS framework for rapid UI development (Reference only).",
    link: "https://tailwindcss.com/",
    type: "install",
    commands: [
      "npm install tailwindcss @tailwindcss/vite"
    ],
    tags: ["tailwind", "css", "utilities", "vite", "styling"]
  }
];

export default uiFrameworkCommands;
