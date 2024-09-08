import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "Pizza Co.",
    url: "https://drive.google.com/drive/folders/1WJWhbQLfe34X3wMmwHkkEnaMTiWoMyme",
    image: "projects/project1.png",
    description: "My first React project",
  },
  {
    title: "SIS",
    url: "https://drive.google.com/drive/folders/1WJWhbQLfe34X3wMmwHkkEnaMTiWoMyme",
    image: "projects/project2.png",
    description: "Student Information System I developed using ASP.NET Core",
  },
  {
    title: "UMS ",
    url: "https://drive.google.com/drive/folders/1WJWhbQLfe34X3wMmwHkkEnaMTiWoMyme",
    image: "projects/project3.png",
    description:
      "The User Management System project that resulted from my internship at Jotform",
  },
  {
    title: "Artech",
    url: "https://drive.google.com/drive/folders/1WJWhbQLfe34X3wMmwHkkEnaMTiWoMyme",
    image: "projects/project4.png",
    description:
      "The website that resulted from my internship at Artech Global Software Inc",
  },
  {
    title: "Shooping Therapy",
    url: "https://drive.google.com/drive/folders/1WJWhbQLfe34X3wMmwHkkEnaMTiWoMyme",
    image: "projects/project5.png",
    description: "My graduation project developed with React Native technology",
  },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, -0.4, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        position={[-1, -0.6, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 2.5,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
