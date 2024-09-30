//Imports for the component.
//React
import React from "react";
//Next
import Link from "next/link";
import Image from "next/image";
//Components
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "../ui/badge";

interface LessonsCardProps {
  lesson: {
    id: number | undefined;
    title: string;
    cover: string;
    modulo: number;
  };
  status: 0 | 1 | null;
  link: string;
  lessonNumber: string;
}

const LessonsCard = ({
  lesson,
  status,
  link,
  lessonNumber,
}: LessonsCardProps) => {
  return (
    <Link className="relative" href={link}>
      <Card className="h-full min-w-64">
        {status === 1 && (
          <Image
            className="absolute top-[-11px] right-[-16px] z-10"
            src={"/icons/lessons/readylesson.png"}
            height={70}
            width={70}
            alt="Lección completada"
          ></Image>
        )}

        <CardHeader className="max-h-[20vh]">
          <Image
            style={{ height: "20vh" }}
            height={800}
            width={800}
            src={lesson.cover}
            alt=""
          />
        </CardHeader>
        <CardContent>
          <p className="text-sm line-clamp-1">{lesson.title}</p>
          <Badge>Módulo {lesson.modulo}</Badge>{" "}
          <span className="text-xs text-primary dark:text-primary-foreground/45 ml-2">
            {lessonNumber}
          </span>
        </CardContent>
      </Card>
    </Link>
  );
};

export default LessonsCard;
