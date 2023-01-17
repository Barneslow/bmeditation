import { createDrawerNavigator } from "@react-navigation/drawer";
import FavouritesScreen from "../../screens/FavouritesScreen";
import DrawerContent from "./DrawerContent";

const FavouritesDrawer = createDrawerNavigator();

export const FavouritesNavigator = () => {
  return (
    <FavouritesDrawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <FavouritesDrawer.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          headerStyle: {
            backgroundColor: "#ab3745",
            borderBottomWidth: 0.5,
          },
          headerLeft: () => null,

          headerTintColor: "#0d0c22",
          headerTitleStyle: {
            fontFamily: "SourceSansProBlack",
            fontSize: 24,
            color: "rgb(250, 249, 246)",
          },
        }}
      />
    </FavouritesDrawer.Navigator>
  );
};
