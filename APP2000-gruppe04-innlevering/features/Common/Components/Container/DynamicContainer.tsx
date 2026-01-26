import { useRouter } from "next/router";
import { MainContent } from "../../Layout/Component/MainContent";
import { FullWidthMainContent } from "../../Layout/Component/FullWidthMainContent";

export function useDynamicContainer() {
  const { pathname } = useRouter();

  // Determine the container based on the route
  const Container = pathname === "/" ? FullWidthMainContent : MainContent;

  return Container;
}
