<script>
	export let form;
</script>

<section class="gradient-custom">
	<div class="container-fluid h-100">
		<div class="row d-flex justify-content-center align-items-center h-100">
			<div class="col-12 col-md-8 col-lg-6 col-xl-5">
				<div class="card text-white mt-5 mb-5" style="border-radius: 1rem;background:#111827;">
					<div class="card-body p-5 text-center">
						<form method="POST" action="?/register">
							<div class="mb-md-5 mt-md-4">
								<h2 class="fw-bold mb-2 text-uppercase">Register</h2>
								<p class="text-white-50 mb-5">Please Enter Your Details !</p>

								<div class={`error-success ${form?.error ? 'text-danger' : 'text-success'}`}>
									{#if form?.message}
										<p>{form?.message}</p>
									{/if}
								</div>

								<div class="row" style="text-align:left;">
									<div class="col-lg-6 col-xl-12">
										<div class="form-outline form-white mb-4">
											<label class="form-label" for="name">Name</label>
											<input required type="name" name="name" class="form-control form-control-md" />
										</div>
									</div>
									<div class="col-lg-6 col-xl-12">
										<div class="form-outline form-white mb-4">
											<label class="form-label" for="email">Email</label>
											<input required type="email" name="email" class="form-control form-control-md" />
										</div>
									</div>
								</div>

								<div class="row" style="text-align:left;">
									<div class="col-lg-6 col-xl-12">
										<div class="form-outline form-white mb-4">
											<label class="form-label" for="password">Password</label>
											<input required minlength="8" type="password" name="password" class="form-control form-control-md" />
										</div>
									</div>

									<div class="col-lg-6 col-xl-12">
										<div class="form-outline form-white mb-4">
											<label class="form-label" for="passwordConfirm">Confirm Password</label>
											<input
												required
												minlength="8"
												type="password"
												name="passwordConfirm"
												class="form-control form-control-md"
											/>
										</div>
									</div>
								</div>
								<button class="btn px-5" style="background-color:#fc682f">Register</button>
							</div>
						</form>

						<!-- Already have an account link -->
						<div>
							<p class="mb-0">
								Already have an account? <a href="/login" class="text-white-50 fw-bold">Login</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

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
