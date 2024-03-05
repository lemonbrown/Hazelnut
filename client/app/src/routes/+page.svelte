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
        <div class="mb-2 is-flex">
          <div class="is-flex-direction-row " style='max-width: fit-content;'>
            <div style="display:flex;width:60px;justify-content: center;align-items: center">
              <span style="" class="has-text-weight-bold is-size-4	mr-3">{thread.upvotes ?? 0}</span>
            </div>
          </div>
          <div class="is-flex-direction-row">
            <a href="/thread/{thread.uid}" class="has-text-weight-bold is-size-4 is-black" style="color:#4a4a4a">{thread.title}</a>
          </div>
        </div>
          <div class="is-flex">
            <div class="is-flex-direction-row" style='width:60px'></div>
            {#each thread.tags?.split(',') as tag}
            <div class="is-flex-direction-row mr-2 has-text-weight-bold ">
                {tag}
            </div>   
            {/each}         
          </div>
      </div>
      {/each}

      {#if data.threads.length <= 0}
      <div class="block has-text-weight-bold" style='color:lightgray'>Nothing here...</div> 
      {/if}
    
    </div>
  </div>