import { Avatar } from "@nextui-org/react";

/**
 * @description Section for å vise teamet vårt
 * @author Borgar Flaen Stensrud
 */

const TeamSection = () => {
  return (
    <section className="flex flex-col items-center gap-5 mt-10 mb-10">
      <h2 className="text-3xl font-bold">Team</h2>
      <div className="flex flex-row flex-wrap justify-center gap-5 gap-row-5">
        <div className="flex flex-row items-center gap-4 bg-dark text-secondary shadow-md rounded-lg p-5">
          <Avatar src="/images/about/people/borgar.jpg" size="lg" />
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold">Borgar Flaen Stensrud</h3>
            <p className="text-lg">CTO | Lead Programmer</p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4 bg-dark text-secondary shadow-md rounded-large p-5">
          <Avatar src="/images/about/people/abdallah.png" size="lg" />
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold">Abdallah Amidu Ndikumana</h3>
            <p className="text-lg">Frontend Developer | Stockfish expert</p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4 bg-dark text-secondary shadow-md rounded-large p-5">
          <Avatar src="/images/about/people/eriktobias.png" size="lg" />
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold">Erik-Tobias Huseby Ellefsen</h3>
            <p className="text-lg">Frontend Developer</p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4 bg-dark text-secondary shadow-md rounded-large p-5">
          <Avatar src="/images/about/people/hussein.jpg" size="lg" />
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold">Hussein Abdul-Ameer</h3>
            <p className="text-lg">Backend Developer</p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4 bg-dark text-secondary shadow-md rounded-large p-5">
          <Avatar src="/images/about/people/kevin.png" size="lg" />
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold">Kevin Tomasz Matarewicz</h3>
            <p className="text-lg">Frontend Developer</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
