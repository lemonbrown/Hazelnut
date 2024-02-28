<script>
  export let data;
</script>

<div class="columns is-mobile mt-3">
    <div class="column is-half is-offset-one-quarter">

      <div class="block">
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input class="input" type="email" placeholder="search by text or #tag...">
            <span class="icon is-small is-left">
              
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>
      </div>
      {#each data.threads as thread}
      <div class="block">
        <div class="block">
          <div>
            <span class="has-text-weight-bold is-size-4	">{thread.title}</span>
          </div>
          <div>
            <div class="is-flex">
              <div class="is-flex-direction-row mr-2 has-text-weight-bold ">
                  #test
              </div>   
              <div class="is-flex-direction-row has-text-weight-bold ">
                #test2
            </div>             
            </div>
          </div>
        </div>
        <div>
          <div class="is-flex">
            <div class="is-flex-direction-row">
              <span class="material-symbols-outlined">
                chat_bubble
                </span>
            </div>
            <div class="is-flex-direction-row">
              <div class="ml-1 mb-1">15</div>
            </div>
          </div>

        </div>
      </div>
      {/each}
    
    </div>
  </div>