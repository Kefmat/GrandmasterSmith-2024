import Text from "@features/Common/Components/Text/text";
/**
 * @description Layout for tech stack section på about page
 * @author Borgar Flaen Stensrud
 */
const TechStackSection = () => {
  return (
    <div className="flex flex-col gap-3 bg-secondary shadow-md rounded-lg mt-5">
      <div className="bg-dark py-5">
        <Text
          variant="h1"
          size="4xl"
          color="secondary"
          className="text-center "
        >
          Our Tech Stack
        </Text>
        <Text
          variant="body1"
          size="lg"
          color="secondary"
          className="text-center"
        >
          We use the latest technology to provide the best user experience
        </Text>
      </div>
      <div className="flex flex-row justify-center gap-5 p-5">
        <img src="images/about/techStack/html5.png" width="150px" />
        <img src="images/about/techStack/css3.png" width="150px" />
        <img src="images/about/techStack/mongodb.jpg" width="300px" />
        <img src="images/about/techStack/nodejs.jpg" width="150px" />
        <img src="images/about/techStack/React.svg" width="150px" />
      </div>
    </div>
  );
};
export default TechStackSection;
