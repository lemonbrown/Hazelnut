<script>
	export let data;
</script>

<div class="container">
    <div class="columns is-centered">
        <div class="column is-half">
            <div class="block">
                <span class="title">Register</span>
            </div>
            <form class="" method="POST">
                <div class="field">
                  <label class="label">Email</label>
                  <div class="control">
                    <input class="input" type="email" placeholder="e.g. alex@example.com" name="email">
                  </div>
                </div>
                <div class="field">
                  <label class="label">Password</label>
                  <div class="control">
                    <input class="input" type="password" placeholder="********" name="password">
                  </div>
                </div>
                <div class="field">
                    <label class="label">Confirm Password</label>
                    <div class="control">
                      <input class="input" type="password" placeholder="********" name="confirmPassword">
                    </div>
                  </div>
                <button class="button" type="submit">Register</button>
              </form>
        </div>
    </div>
</div>