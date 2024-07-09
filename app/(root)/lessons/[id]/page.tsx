//Components
import NavbarLessons from "@/components/lessons/NavbarLessons";
import { buscarLesson } from "@/utils/lessons/buscarLesson";

interface PagePropsxd {
  params: {
    id: string;
  };
}
const page = async ({ params }: PagePropsxd) => {
  const numParam = parseInt(params.id);
  const leccion = await buscarLesson(numParam);

  return (
    <div>
      <NavbarLessons
        numParam={numParam}
        modulo={leccion?.id_modulo}
        leccion={leccion?.numero_leccion}
      />

      <article className="md:pl-5 mt-4 md:mt-20">
        <div
          dangerouslySetInnerHTML={{ __html: leccion?.html_leccion || "" }}
        />
      </article>
    </div>
  );
};

export default page;
