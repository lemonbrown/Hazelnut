<script>
import snarkdown from 'snarkdown';
	export let data;

    const formatted = snarkdown(data.thread.content);


</script>

<div class="container">
    <div class="columns is-centered">
        <div class="column is-half">
            posted by lemon 8 hours ago

            <div class="block">
                <span class="has-text-weight-bold is-size-4">{data.thread.title}</span>
            </div>
            <div class="block">
                {@html snarkdown(data.thread.content)}
            </div>
        </div>
    </div>
</div>