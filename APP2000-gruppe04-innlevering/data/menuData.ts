//export const getMenuDataServerSide = async (ctx) => {
// ... (existing server-side logic)
//};

export const getMenuDataClientSide = async (): Promise<any> => {
  try {
    const fetchMenuData = async (): Promise<any> => {
      const response = await fetch("/api/user-data");
      const data = await response.json();
      return data;
    };
    const menuData = await fetchMenuData();
    console.log("getmenuData", menuData);
    return menuData;
  } catch (error) {
    console.error("Error fetching menu data client-side:", error);
    throw error;
  }
};
