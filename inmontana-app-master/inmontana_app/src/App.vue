<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark" ref="NavBarInMontana">
      <router-link to="/" class="navbar-brand">Home</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/map" class="nav-link">Map</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/personalTrips" class="nav-link">My Trips</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/publicTrips" class="nav-link">Public Trips</router-link>
        </li>
      </div>
      <button class="btn btn-danger" @click="logout">Logout</button>
    </nav>
    <router-view />
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          //alert("Successfully logged out");
          this.$router.push("/");
        })
        .catch(error => {
          //alert(error.message);
          this.$router.push("/");
        });
    },
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
input {
  margin-right: 20px;
}
</style>
