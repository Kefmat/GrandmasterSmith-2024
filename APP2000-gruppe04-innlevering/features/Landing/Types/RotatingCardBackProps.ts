export default interface RotatingCardBackProps {
  color?: string;
  image?: string;
  icon?: string | JSX.Element;
  title?: string;
  description?: string;
  action?: {
    type: "external" | "internal";
    label: string;
    route?: string;
  };
}
