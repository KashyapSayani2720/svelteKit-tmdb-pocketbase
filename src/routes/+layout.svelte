<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { currentUser, pb } from '$lib/pocketbase';
	// import '../app.postcss';
    export let data;
</script>

{#if data?.profile}
<div class="bg-neutral text-neutral-content">
	<div class="max-w-xl mx-auto navbar">
		<!-- <div class="navbar-start">
			<a href="/" class="btn btn-ghost text-xl">PB + SK</a>
		</div> -->
		<div class="navbar-end">
			<ul class="menu menu-horizontal">
				{#if data.profile}
					<li><a href="/">{data.profile.email}</a></li>
					<li>
						<form
							method="POST"
							action="/logout"
							use:enhance={() => {
								return async ({ result }) => {
									pb.authStore.clear();
									await applyAction(result);
								};
							}}
						>
							<button>Log Out</button>
						</form>
					</li>
				{:else}
					<li><a href="/login">Log in</a></li>
					<li><a href="/register">Register</a></li>
				{/if}
			</ul>
		</div>
	</div>
</div>
{/if}

<div>
	<slot />
</div>