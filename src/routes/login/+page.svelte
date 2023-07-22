<script>
	export let form;
</script>

<section class="vh-100 gradient-custom">
	<div class="container h-100">
		<div class="row d-flex justify-content-center align-items-center h-100">
			<div class="col-12 col-md-8 col-lg-6 col-xl-5">
				<div class="card text-white" style="border-radius: 1rem;background:#111827;">
					<div class="card-body p-5 text-center">
						<form method="POST" action="?/login">
							<div class="mb-md-5 mt-md-4">
								<h2 class="fw-bold mb-2 text-uppercase">Login</h2>
								<p class="text-white-50 mb-5">Please Enter Your Credentials !</p>
								<div class={`error-success ${form?.error ? 'text-danger' : 'text-success'}`}>
									{#if form?.message}
										<p>{form?.message}</p>
									{/if}
								</div>
								<div class="form-outline form-white mb-4" style="text-align:left;">
									<label class="form-label" for="typeEmailX">Email</label>
									<input type="email" name="email" class="form-control form-control-md" />
								</div>

								<div class="form-outline form-white mb-4" style="text-align:left;">
									<label class="form-label" for="typePasswordX">Password</label>
									<input type="password" name="password" class="form-control form-control-md" />
								</div>

								<p class="small mb-5 pb-lg-2 text-end">
									<a class="text-white-50" href="/forgot_password">Forgot password?</a>
								</p>

								<button class="btn px-5" style="background-color:#fc682f">Login</button>
							</div>
						</form>

						<div>
							<p class="mb-0">
								Don't have an account? <a href="/register" class="text-white-50 fw-bold">Register</a
								>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Custom CSS style for the background gradient -->
<style>
	.gradient-custom {
		/* fallback for old browsers */
		background: white;

		/* Chrome 10-25, Safari 5.1-6 */
		background: -webkit-linear-gradient(to right, rgb(255, 255, 255), rgb(255, 255, 255));

		/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		background: linear-gradient(to right, rgb(255, 255, 255), rgb(255, 255, 255));
	}
</style>
