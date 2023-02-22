import { createDrawerNavigator } from "@react-navigation/drawer";
import { Colors } from "../../colors/colors";
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
          headerLeft: () => null,

          headerTintColor: "#0d0c22",
          headerTitleStyle: {
            fontFamily: "SourceSansProBlack",
            fontSize: 24,
            color: Colors.red,
          },
        }}
      />
    </FavouritesDrawer.Navigator>
  );
};
