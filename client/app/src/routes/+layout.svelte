<script>
    export let data;
</script>

<nav class="navbar" role="navigation" aria-label="main navigation" >
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <span class="has-text-weight-bold is-italic" style="font-family: 'DM Sans', sans-serif">threadr</span>
      </a>
    </div>
    <div class="navbar-end">
        <div class="navbar-item">
            <span class="mr-3">
                {data.user.name}
            </span>
          <div class="buttons">
            <a href="/user/thread" class="button is-outlined">
                <span class="material-symbols-outlined">
                    edit
                </span>
                <span>
                    create thread
                </span>
            </a>
          </div>
        </div>
      </div>
  </nav>

  <slot />