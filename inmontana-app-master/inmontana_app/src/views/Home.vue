<template>
<div class="containerr">
	<div class="d-flex justify-content-center h-100">
		<div class="card" style="margin-top:10%">
			<div class="card-header">
          <div class="row align-items-center">
            <div class="col">
              <h3 style="color: #007688;">Sign In</h3>

            </div>
            <div class="col">
            </div>
            <div class="col">
              <img src="../assets/logo_transparent.png" class="img-fluid">
            </div>
          </div>
			</div>
			<div class="card-body">
        <form @submit.prevent="login">
					<div class="input-group form-group">
            <input type="email" class="form-control" placeholder="E-mail" v-model="email" />
					</div>
					<div class="input-group form-group">
						<input type="password" class="form-control" placeholder="Password" v-model="password">
					</div>
					<div class="form-group">
						<input type="submit" value="Login" class="btn float-center login_btn">
					</div>
				</form>
			</div>
			<div class="card-footer">
				<div style="color: black" class="d-flex justify-content-center links">
					Don't have an account?<a style="color: #007688" href="/register">Sign Up</a>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Home",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          const navBar = this.$refs.NavBarInMontana;
          var t = document.createTextNode("nume user");
          navBar.appendChild(t);
        } else {
          // No user is signed in.
        }
      });

      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          //alert("Successfully logged in");
          this.$router.push("/map");
        })
        .catch(error => {
          //alert(error.message);
        });
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

    }
  }
};
</script>
