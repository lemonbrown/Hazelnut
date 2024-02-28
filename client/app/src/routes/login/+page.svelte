<script>
	export let data;
</script>

<div class="container">
    <div class="columns is-centered">
        <div class="column is-half">
            <div class="block">
                <span class="title">Login</span>
            </div>
            <div class="block">
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
                  <button class="button" type="submit">Login</button>
                </form>
            </div>
            <hr />
              <div class="block">
                <a href="/register" class="button is-outlined">create an account</a>
              </div>
        </div>
    </div>
</div>