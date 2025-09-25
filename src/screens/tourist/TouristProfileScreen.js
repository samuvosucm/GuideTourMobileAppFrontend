import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../contexts/AuthContext";

export default function TouristProfileScreen({ navigation }) {
  const { user, loading, logOut } = useContext(AuthContext);
  const { width } = Dimensions.get("window");
  const PROFILE_SIZE = width * 0.25;

  const handleLogOut = async () => {
    await logOut();
    navigation.reset({
      index: 0,
      routes: [{ name: "SignInScreen" }],
  });  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#b05454ff" />
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.container}>
          <Text>Could not load user data</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogOut}>
            <Text style={styles.buttonText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          {user.profilePhoto ? (
            <Image
              source={{ uri: user.profilePhoto }}
              style={[styles.profilePhoto, { width: PROFILE_SIZE, height: PROFILE_SIZE, borderRadius: PROFILE_SIZE / 2 }]}
            />
          ) : (
            <View
              style={[styles.profilePlaceholder, { width: PROFILE_SIZE, height: PROFILE_SIZE, borderRadius: PROFILE_SIZE / 2 }]}
            >
              <Text style={[styles.profileInitial, { fontSize: PROFILE_SIZE * 0.4 }]}>
                {user.username?.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.profileDataContainer}>
          <Text style={styles.profileDataTag}>Name</Text>
          <Text style={styles.profileDataValue}>{user.username}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.profileDataContainer}>
          <Text style={styles.profileDataTag}>Email</Text>
          <Text style={styles.profileDataValue}>{user.email}</Text>
        </View>
        <View style={styles.line} />
        
        <View style={styles.footerButton}>
          <TouchableOpacity style={styles.button} onPress={handleLogOut}>
            <Text style={styles.buttonText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 40,
    flex: 1,
  },
  header: {
    width: '100%',
    height: 150, 
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePhoto: {
  },
  profilePlaceholder: {
    marginBottom: 5,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontWeight: '700',
    color: '#fff',
  },
  profileDataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileDataTag: {
    fontWeight: '700',
    fontSize: 17,
    width: 80,
  },
  profileDataValue: {
    fontSize: 17
  },
  line: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1.5,
    width: '100%',            
    marginVertical: 10,  
    marginBottom: 10      
  },
  footerButton: {
    flex: 1, 
    justifyContent: 'flex-end', 
    alignItems: 'center' 
  },
  button: {
    backgroundColor: '#b05454ff',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginVertical: 30,
  },
  buttonText: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
    fontWeight: '600'
  },
});
