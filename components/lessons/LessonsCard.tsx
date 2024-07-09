"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
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
}

const LessonsCard = ({ lesson, status, link }: LessonsCardProps) => {
  return (
    <Link href={link}>
      <Card className="relative h-full min-w-64">
        {status === 1 && (
          <Image
            className="absolute top-[-11px] right-[-8px] z-10"
            src={"/icons/lessons/readylesson.png"}
            height={70}
            width={70}
            alt="Lección completada"
          ></Image>
        )}

        <CardHeader className="max-h-[20vh]">
          <img style={{ height: "20vh" }} src={lesson.cover} alt="" />
        </CardHeader>
        <CardContent>
          <p className="text-sm line-clamp-1">{lesson.title}</p>

          <Badge>Modulo {lesson.modulo}</Badge>
        </CardContent>
      </Card>
    </Link>
  );
};

export default LessonsCard;
