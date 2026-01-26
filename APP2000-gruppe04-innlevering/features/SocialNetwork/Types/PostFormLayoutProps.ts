export default interface PostFormLayoutProps {
  handlePost: (e: React.MouseEvent<HTMLButtonElement>) => void;
  description: string;
  setDescription: (description: string) => void;
}